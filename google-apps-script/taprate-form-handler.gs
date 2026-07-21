/**
 * TapRate — Save website enquiries to Google Sheets + notify your team
 *
 * Setup: see docs/GOOGLE-SHEETS-FORMS.md
 */

const FORM_SECRET = '';
const SHEET_NAME = 'Enquiries';

/** Email alert on every new enquiry (uses your Google account). Leave empty to disable. */
const NOTIFY_EMAIL = 'hello@taprate.in';

/** WhatsApp via CallMeBot (free). Leave phone or apikey empty to disable. */
const WHATSAPP_PHONE = '+918401625979';
const CALLMEBOT_API_KEY = '';

const HEADERS = [
  'Timestamp (IST)',
  'Form Type',
  'Name',
  'Phone',
  'Email',
  'Business Name',
  'Product',
  'Quantity',
  'City',
  'Subject',
  'Message',
  'Page URL',
];

function doGet() {
  return ContentService.createTextOutput('TapRate form endpoint is running.');
}

function doPost(e) {
  try {
    if (!e.postData || !e.postData.contents) {
      throw new Error('Empty request body');
    }

    const data = JSON.parse(e.postData.contents);

    if (FORM_SECRET && data.secret !== FORM_SECRET) {
      throw new Error('Unauthorized');
    }

    if (data._gotcha) {
      return jsonOut_({ ok: true });
    }

    const sheet = getSheet_();
    ensureHeaders_(sheet);

    const ts = Utilities.formatDate(new Date(), 'Asia/Kolkata', 'yyyy-MM-dd HH:mm:ss');

    sheet.appendRow([
      ts,
      data.formType || '',
      data.name || '',
      data.phone || '',
      data.email || '',
      data.business || '',
      data.product || '',
      data.quantity || '',
      data.city || '',
      data.subject || '',
      data.message || '',
      data.pageUrl || '',
    ]);

    notifyNewEnquiry_(data, ts);

    return jsonOut_({ ok: true });
  } catch (err) {
    return jsonOut_({ ok: false, error: String(err.message || err) });
  }
}

/** Run from Apps Script editor to test email/WhatsApp without submitting the website form. */
function testTapRateNotifications() {
  notifyNewEnquiry_(
    {
      formType: 'test',
      name: 'Test User',
      phone: '+91 98765 43210',
      email: 'test@example.com',
      product: 'NFC Smart Business Card',
      message: 'This is a test notification from Apps Script.',
      pageUrl: 'https://www.taprate.in/enquiry.html',
    },
    Utilities.formatDate(new Date(), 'Asia/Kolkata', 'yyyy-MM-dd HH:mm:ss')
  );
}

function notifyNewEnquiry_(data, ts) {
  try {
    if (NOTIFY_EMAIL) {
      sendEmailNotification_(data, ts);
    }
    if (WHATSAPP_PHONE && CALLMEBOT_API_KEY) {
      sendWhatsAppNotification_(data, ts);
    }
  } catch (err) {
    Logger.log('Notification failed: ' + err);
  }
}

function sendEmailNotification_(data, ts) {
  const subject = 'New TapRate enquiry — ' + (data.name || 'Unknown');
  const plain = formatEnquiryPlain_(data, ts);
  const html =
    '<div style="font-family:Inter,sans-serif;line-height:1.6;color:#0F172A">' +
    '<h2 style="margin:0 0 12px">New website enquiry</h2>' +
    '<p style="color:#64748B;margin:0 0 16px">' +
    ts +
    ' · ' +
    escapeHtml_(data.formType || 'form') +
    '</p>' +
    '<table style="border-collapse:collapse;width:100%;max-width:520px">' +
    row_('Name', data.name) +
    row_('Phone', data.phone, true) +
    row_('Email', data.email) +
    row_('Business', data.business) +
    row_('Product', data.product) +
    row_('Quantity', data.quantity) +
    row_('City', data.city) +
    row_('Subject', data.subject) +
    row_('Message', data.message) +
    '</table>' +
    '<p style="margin-top:20px;font-size:14px"><a href="' +
    escapeHtml_(data.pageUrl || '') +
    '">View source page</a></p>' +
    '</div>';

  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    subject: subject,
    body: plain,
    htmlBody: html,
    name: 'TapRate Website',
  });
}

function row_(label, value, isPhone) {
  if (!value) return '';
  const v = escapeHtml_(String(value));
  const display =
    isPhone && value
      ? '<a href="tel:' + escapeHtml_(String(value).replace(/\s/g, '')) + '">' + v + '</a>'
      : v;
  return (
    '<tr><td style="padding:8px 12px 8px 0;font-weight:600;vertical-align:top;width:120px">' +
    label +
    '</td><td style="padding:8px 0">' +
    display +
    '</td></tr>'
  );
}

function formatEnquiryPlain_(data, ts) {
  const lines = [
    'New TapRate website enquiry',
    'Time: ' + ts,
    'Form: ' + (data.formType || ''),
    '',
    'Name: ' + (data.name || ''),
    'Phone: ' + (data.phone || ''),
    'Email: ' + (data.email || ''),
    'Business: ' + (data.business || ''),
    'Product: ' + (data.product || ''),
    'Quantity: ' + (data.quantity || ''),
    'City: ' + (data.city || ''),
    'Subject: ' + (data.subject || ''),
    'Message: ' + (data.message || ''),
    '',
    'Page: ' + (data.pageUrl || ''),
  ];
  return lines.filter(function (line) {
    return !line.match(/^[^:]+:\s*$/);
  }).join('\n');
}

function sendWhatsAppNotification_(data, ts) {
  const text = [
    '🆕 TapRate enquiry',
    ts,
    'Name: ' + (data.name || '—'),
    'Phone: ' + (data.phone || '—'),
    data.product ? 'Product: ' + data.product : '',
    data.message ? 'Note: ' + String(data.message).slice(0, 200) : '',
  ]
    .filter(Boolean)
    .join('\n');

  const phone = WHATSAPP_PHONE.replace(/\s/g, '').replace(/^\+/, '');
  const url =
    'https://api.callmebot.com/whatsapp.php?phone=' +
    encodeURIComponent('+' + phone) +
    '&text=' +
    encodeURIComponent(text) +
    '&apikey=' +
    encodeURIComponent(CALLMEBOT_API_KEY);

  const res = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
  if (res.getResponseCode() >= 400) {
    Logger.log('CallMeBot response: ' + res.getContentText());
  }
}

function escapeHtml_(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function jsonOut_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  return sheet;
}

function ensureHeaders_(sheet) {
  if (sheet.getLastRow() > 0) return;
  sheet.appendRow(HEADERS);
  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
}

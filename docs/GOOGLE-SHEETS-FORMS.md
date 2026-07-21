# Save Enquiries to Google Sheets

When someone submits the **Design My Card** or **Contact** form, a new row is appended to your Google Sheet. You can also get **email** and **WhatsApp** alerts on each submission.

---

## Step-by-step setup (about 15 minutes)

### Step 1 — Create the spreadsheet

1. Go to [Google Sheets](https://sheets.google.com) and sign in with the Google account you want to own enquiries (e.g. your business Gmail).
2. Click **Blank spreadsheet**.
3. Name it **TapRate Enquiries** (top-left title).

You do not need to add columns manually. The script creates a tab named **Enquiries** with headers on the first real submission.

---

### Step 2 — Open Apps Script

1. In that spreadsheet menu: **Extensions → Apps Script**.
2. A new tab opens with a code editor and a default `function myFunction()`.
3. Select all default code and delete it.
4. Open `google-apps-script/taprate-form-handler.gs` from this website project on your computer.
5. Copy the entire file and paste it into the Apps Script editor.
6. At the top of the script, set:
   - **`NOTIFY_EMAIL`** — your inbox (default `hello@taprate.in`). Use the Gmail that will send alerts.
   - **`WHATSAPP_PHONE`** — already set to `+918401625979`; change if needed.
   - **`CALLMEBOT_API_KEY`** — leave empty until Step 6 if you want WhatsApp.
7. Click **Save** (disk icon). Name the project **TapRate Form Handler**.

---

### Step 3 — Authorize the script (first time)

1. In the function dropdown (toolbar), choose **`testTapRateNotifications`**.
2. Click **Run**.
3. Google asks for permissions → **Review permissions**.
4. Choose your account → **Advanced** → **Go to TapRate Form Handler (unsafe)** (wording may vary) → **Allow**.
5. Check your email — you should receive a **test enquiry** email (if `NOTIFY_EMAIL` is set).

If email did not arrive, check Spam and confirm `NOTIFY_EMAIL` is correct.

---

### Step 4 — Deploy the Web App

1. In Apps Script, click **Deploy → New deployment**.
2. Click the gear icon next to “Select type” → choose **Web app**.
3. Set:
   - **Description:** TapRate enquiry form
   - **Execute as:** Me
   - **Who has access:** Anyone
4. Click **Deploy**.
5. If prompted, authorize again.
6. Copy the **Web app URL**. It must end with **`/exec`** (not `/dev`).

Keep this URL private-ish — anyone with it could POST data. Use `FORM_SECRET` (below) to reduce abuse.

---

### Step 5 — Connect the website

1. In this project, open **`js/form-config.js`**.
2. Paste your Web App URL:

```javascript
window.TAPRATE_FORMS = {
  scriptUrl: 'https://script.google.com/macros/s/AKfycbxxxxxxxx/exec',
  secret: '',
};
```

3. **Optional but recommended:** In Apps Script set `FORM_SECRET` to a random string (e.g. `tr_8k2mN9pQ4x`). Put the **same** string in `secret` in `form-config.js`.
4. Upload / redeploy the website (Netlify drag-and-drop, Git push, etc.) so live visitors load the updated `form-config.js`.

---

### Step 6 — Test from the live site

1. Open **https://www.taprate.in/enquiry.html** (or your local copy if `scriptUrl` is already set).
2. Submit a test enquiry with your real phone number.
3. Within a few seconds you should see:
   - A new row in the **Enquiries** sheet tab
   - An email at `NOTIFY_EMAIL`

If the form shows an error, open the browser **Developer tools → Console** and check for messages. If the row appears in Sheets but the site shows an error, CORS may be blocking the response — the save still worked.

---

### Step 7 — WhatsApp alerts (optional)

Email is enough for most teams. For instant WhatsApp to **+91 8401625979** via [CallMeBot](https://www.callmebot.com/blog/free-api-whatsapp-messages/) (free, unofficial):

1. Add **+34 684 72 96 73** to your phone contacts as **CallMeBot**.
2. In WhatsApp, send this exact message to CallMeBot:  
   `I allow callmebot to send me messages`
3. CallMeBot replies with your **apikey**.
4. In Apps Script, set:
   ```javascript
   const CALLMEBOT_API_KEY = 'your-apikey-here';
   ```
5. Run **`testTapRateNotifications`** again — you should get a WhatsApp message.
6. **Deploy → Manage deployments → Edit → Version: New version → Deploy** (required after any script change).

---

## When you change the script later

Google does **not** auto-update the live Web App when you edit code.

1. **Deploy → Manage deployments**
2. Click the pencil icon on the active deployment
3. **Version:** New version
4. **Deploy**

---

## Column reference

| Column | Source |
|--------|--------|
| Timestamp (IST) | Server time when submitted |
| Form Type | `enquiry`, `enquiry-home`, or `contact` |
| Name, Phone, Email, … | Form fields |
| Page URL | Page the user submitted from |

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| No rows in sheet | `scriptUrl` empty or wrong in `form-config.js`; redeploy site |
| No email | Run `testTapRateNotifications`; check Spam; confirm MailApp authorization |
| No WhatsApp | `CALLMEBOT_API_KEY` set; completed CallMeBot activation; redeploy Web App |
| `Unauthorized` | Match `FORM_SECRET` in script and `secret` in `form-config.js` |
| CORS in browser console | Often harmless if the row appears in Sheets |

---

## Forms included

- `enquiry.html` — full enquiry form
- `contact.html` — contact form
- `index.html` — homepage quick enquiry

---

## Quick checklist

- [ ] Sheet created  
- [ ] Script pasted and saved  
- [ ] `testTapRateNotifications` run — email received  
- [ ] Web app deployed (Anyone)  
- [ ] URL in `js/form-config.js`  
- [ ] Website redeployed  
- [ ] Live test submission → row + email  
- [ ] (Optional) CallMeBot + WhatsApp test  

**Support:** +91 8401625979

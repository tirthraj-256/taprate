# Deploy TapRate Website

Your site is a **static website** — no build step required. Upload the folder and go live.

## Option 1: Netlify (Recommended — Free)

1. Go to [https://app.netlify.com](https://app.netlify.com) and sign up
2. Drag and drop the entire `Taprate Website` folder onto Netlify
3. Your site goes live instantly at a URL like `random-name.netlify.app`
4. **Custom domain:** Site settings → Domain management → Add `www.taprate.in`
5. Update DNS at your domain registrar:
   - `A` record → `75.2.60.5`
   - `CNAME` for `www` → `your-site.netlify.app`

`netlify.toml` is already included for caching and redirects.

---

## Option 2: Vercel (Free)

1. Go to [https://vercel.com](https://vercel.com) and sign up
2. Click **Add New → Project**
3. Import from folder or connect GitHub
4. Set **Root Directory** to this folder
5. Deploy — no build command needed
6. Add custom domain `taprate.in` in Project Settings → Domains

---

## Option 3: GitHub Pages (Free)

1. Create a GitHub repository
2. Upload all files to the repo
3. Go to **Settings → Pages**
4. Source: Deploy from branch → `main` → `/ (root)`
5. Site live at `username.github.io/repo-name`
6. Custom domain: add `CNAME` file with `www.taprate.in`

---

## Option 4: Shared Hosting (cPanel)

1. Log in to your hosting cPanel
2. Open **File Manager → public_html**
3. Upload all files from this folder
4. Ensure `index.html` is in `public_html` root
5. Visit `yourdomain.com`

---

## Before Going Live — Checklist

- [ ] `logo.png` is in the website root
- [ ] Replace `hello@taprate.in` with your real email if different
- [ ] Update Google Maps embed if needed
- [ ] Connect enquiry forms to Google Sheets — see `docs/GOOGLE-SHEETS-FORMS.md` and set `js/form-config.js`
- [ ] Submit `sitemap.xml` to [Google Search Console](https://search.google.com/search-console)
- [ ] Set up Google Business Profile with address and phone
- [ ] Point domain DNS to your host

---

## Connect Contact Forms

### Google Sheets (recommended)

Enquiry and contact forms POST to a Google Apps Script Web App and append rows to your spreadsheet.

1. Follow **`docs/GOOGLE-SHEETS-FORMS.md`**
2. Paste the Web App URL into **`js/form-config.js`**

### Netlify Forms (alternative)

Add `netlify` attribute to any form:
```html
<form data-form netlify name="enquiry">
```

### Formspree (alternative)

Change form action to:
```html
<form action="https://formspree.io/f/YOUR_ID" method="POST">
```

---

## Files Included

| File | Purpose |
|------|---------|
| `index.html` | Homepage |
| `sitemap.xml` | SEO sitemap |
| `robots.txt` | Search engine rules |
| `netlify.toml` | Netlify config |
| `logo.png` | Brand logo |
| `css/main.css` | Navy + gold brand styles |
| `js/components.js` | Header & footer |
| `docs/COMPLETE-WEBSITE-BLUEPRINT.md` | Full strategy doc |

**Support:** Call +91 8401625979

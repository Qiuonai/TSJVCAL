# S Javed & Co. — Report Verification Portal (Vercel version)

Same portal as before, restructured to deploy on **Vercel** via **GitHub**, entirely
through your web browser — no software installed on your computer, no terminal.

## What's in this project

```
sjaved-verify-vercel/
├── index.html          Homepage — search box to verify by reference number
├── verify.html          Verification result page
├── styles.css           Shared styling
├── package.json
└── api/
    ├── verify/
    │   └── [ref].js      Backend function: GET /api/verify/SJC-VAL-2026-1644
    └── data/
        └── reports.json  Report records — today's "database"
```

---

## Step 1 — Create a GitHub account (skip if you have one)

Go to [github.com](https://github.com) → **Sign up** → follow the prompts.

## Step 2 — Create a new repository and upload the files, in your browser

1. Once logged in, click the **+** icon top-right → **New repository**.
2. Name it `sjaved-verify` → set it to **Private** → click **Create repository**.
3. On the empty repo page, click **"uploading an existing file"** (a blue link
   in the middle of the page).
4. Unzip the project folder I gave you on your computer, then **drag the entire
   contents** of the `sjaved-verify-vercel` folder — `index.html`, `verify.html`,
   `styles.css`, `package.json`, and the `api` folder — into the browser upload
   box. GitHub uploads folders as long as you drag them in together with the
   files.
5. Scroll down, click **Commit changes**.

Your code is now on GitHub, entirely through the browser.

## Step 3 — Create a Vercel account and import the repo

1. Go to [vercel.com](https://vercel.com) → **Sign Up** → choose **Continue with
   GitHub** (this links the two automatically).
2. On your Vercel dashboard, click **Add New...** → **Project**.
3. Find `sjaved-verify` in the list of your GitHub repos → click **Import**.
4. Leave all the settings on their defaults (Vercel auto-detects this as a
   static site with serverless functions) → click **Deploy**.

Wait about a minute — Vercel builds and deploys automatically. When it finishes,
click the preview to open your live site. Try searching `SJC-VAL-2026-1644` on
the homepage to confirm it works.

**From now on, every change is this simple:** edit a file directly on GitHub
(open the file in your repo, click the pencil/edit icon, save) — Vercel
redeploys automatically within a minute, with no extra steps.

---

## Step 4 — Connect sjavedverification.com

1. In your Vercel project, go to the **Settings** tab → **Domains**.
2. Type `sjavedverification.com` (or `www.sjavedverification.com`) → click
   **Add**.
3. Vercel shows you DNS records to add — usually an **A record** (for the root
   domain) or a **CNAME record** (for a subdomain like `www` or `verify`).
4. Go to wherever you registered `sjavedverification.com` (Namecheap, GoDaddy,
   etc.) → DNS settings → add the exact record(s) Vercel showed you.
5. Back in Vercel, it validates automatically once DNS updates — usually within
   minutes to a few hours. **SSL is issued and renewed automatically**, free.

---

## Adding a new report

1. On GitHub, open `api/data/reports.json` in your repo.
2. Click the pencil (✎) icon top-right of the file to edit it in the browser.
3. Add a new entry, keyed by the reference number **in uppercase**, following
   the existing example:

```json
"SJC-VAL-2026-XXXX": {
  "referenceNumber": "SJC-VAL-2026-XXXX",
  "reportTitle": "Management Review Report — Asset Valuation",
  "subjectName": "Client Name",
  "purpose": "One-line description of what the report is for.",
  "reportDate": "DD Month YYYY",
  "caEnrolmentNo": "1644",
  "preparedFor": "Destination / purpose",
  "exchangeRate": "1 EUR = ৳XXX.XX",
  "totalAssetsBDT": 0.00,
  "totalAssetsEUR": 0.00,
  "totalIncomeBDT": 0.00,
  "totalIncomeEUR": 0.00,
  "sha256": "<hash of the exact issued PDF>",
  "contactEmail": "info@sjavedco.com"
}
```

4. Scroll down, click **Commit changes** directly on the `main` branch.

Vercel redeploys automatically — no need to visit Vercel at all for routine
updates.

**Getting the SHA-256 hash** of a finished PDF, before sending it to the client
(you'll need to do this step on your computer, using whatever tool you already
have — this one step isn't avoidable since it reads the actual file):
- **Windows (PowerShell):** `Get-FileHash "report.pdf" -Algorithm SHA256`
- **Mac/Linux:** `shasum -a 256 report.pdf`

**This JSON-file approach is fine at low volume.** Once you're issuing many
reports regularly, this can move to a proper database (e.g. Vercel Postgres or
any hosted database) without changing the website itself — only the lookup
logic in `api/verify/[ref].js` would change.

## Generating the QR code for a report

Each report's QR code should encode:

```
https://sjavedverification.com/verify.html?ref=SJC-VAL-2026-XXXX
```

Paste that URL into any QR generator, e.g.
[qr-code-generator.com](https://www.qr-code-generator.com/), and add the image
to your report PDF.

---

## Cost

Vercel's **Hobby plan is free** and covers this comfortably at low traffic —
you won't need your Azure credit for this path at all. If you'd rather keep
everything inside Azure instead (since you already have the credit), the earlier
Azure Static Web Apps version of this project still works the same way — just
say so and I'll hand that version back.

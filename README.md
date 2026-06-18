# Monk Wise Media — Website

This is your agency website, built with Next.js, Tailwind CSS, and Supabase.
This guide assumes **zero coding experience** — follow it top to bottom.

---

## What's in this project

- A one-page site: Hero, Services, Work/Portfolio (template), Process, Testimonials (template), Contact form, Footer.
- A working contact form that saves every submission into a Supabase database AND emails you a notification.
- SEO basics already set up (page titles, descriptions, sitemap, robots.txt, structured data).

---

## Part 1 — Open the project in VS Code

1. Install [VS Code](https://code.visualstudio.com/) if you haven't already.
2. Install [Node.js](https://nodejs.org/) (choose the "LTS" version) — this lets your computer run the website locally.
3. Unzip the project folder you downloaded, open VS Code, then `File > Open Folder` and select the `monkwise` folder.
4. Open the built-in terminal in VS Code: `Terminal > New Terminal`.
5. In that terminal, type:
   ```
   npm install
   ```
   This installs everything the website needs. Wait for it to finish.

---

## Part 2 — Set up Supabase (your database)

This is what stores every contact form submission so you never lose a lead.

1. Go to [supabase.com](https://supabase.com) and sign up (free plan is enough to start).
2. Click **New Project**. Give it any name (e.g. "monk-wise-media"), set a database password (save it somewhere), choose the region closest to your customers (e.g. Mumbai/Singapore for India), and click **Create**.
3. Once the project is ready, click the **SQL Editor** icon in the left sidebar, then **New query**.
4. Open the file `supabase/setup.sql` from this project, copy everything inside it, paste it into the Supabase SQL editor, and click **Run**.
   - This creates a `leads` table where every contact form submission will be saved.
5. Now go to **Project Settings** (gear icon, bottom of sidebar) > **API**.
   - Copy the **Project URL** — you'll need this in Part 4.
   - Copy the **anon public** key — you'll need this in Part 4.
   - Copy the **service_role** key (click "Reveal" first) — you'll need this too. **Keep this one secret, never share it publicly.**

---

## Part 3 — Set up Resend (email notifications)

This is what emails you whenever someone fills out the contact form.

1. Go to [resend.com](https://resend.com) and sign up (free plan covers this easily).
2. After signing up, go to **API Keys** in the sidebar and click **Create API Key**. Name it anything, copy the key it gives you.
3. That's it for now — for testing, Resend lets you send from `onboarding@resend.dev` to your own email without extra setup. (Later, if you want emails to come from your own domain like `hello@monkwisemedia.com`, you can add and verify your domain inside Resend — ask me when you're ready and I'll walk you through it.)

---

## Part 4 — Add your secret keys to the project

1. In VS Code, find the file called `.env.local.example` in the project's file list.
2. Make a copy of it and rename the copy to exactly: `.env.local`
3. Open `.env.local` and fill in the values you copied earlier:
   ```
   NEXT_PUBLIC_SUPABASE_URL=paste your Supabase Project URL here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=paste your Supabase anon public key here
   SUPABASE_SERVICE_ROLE_KEY=paste your Supabase service_role key here

   RESEND_API_KEY=paste your Resend API key here
   NOTIFY_EMAIL=the email address you want lead notifications sent to
   ```
4. Save the file. This file is private — it will never be uploaded to GitHub or shown publicly (it's already excluded via `.gitignore`).

---

## Part 5 — Preview the website on your computer

In the VS Code terminal, type:
```
npm run dev
```
Then open your browser and go to: `http://localhost:3000`

You should see your website. Try submitting the contact form to test that it saves to Supabase and emails you. Press `Ctrl+C` in the terminal to stop the preview when you're done.

---

## Part 6 — Put your real content in

Some sections are templates waiting for your real content:

- **`src/components/Portfolio.tsx`** — replace the `CASE_STUDIES` list with your real client names, numbers, and a one-line summary of what you did.
- **`src/components/Testimonials.tsx`** — replace the `TESTIMONIALS` list with real client quotes once you have them.

To edit either file: open it in VS Code, find the text between quotes, and replace it with your real content. You don't need to touch anything else in those files.

If you ever want help editing these, just tell me what to change and I'll do it for you.

---

## Part 7 — Put the project on GitHub (so Vercel can deploy it)

1. Go to [github.com](https://github.com) and sign up if you don't have an account.
2. Click the **+** icon (top right) > **New repository**. Name it `monkwise-website`, keep it Private, click **Create repository**.
3. Back in VS Code's terminal, run these one at a time:
   ```
   git init
   git add .
   git commit -m "Initial website"
   git branch -M main
   git remote add origin PASTE_YOUR_GITHUB_REPO_URL_HERE
   git push -u origin main
   ```
   (Your repo URL is shown on the GitHub page after creating the repository — it looks like `https://github.com/yourname/monkwise-website.git`)

---

## Part 8 — Deploy on Vercel (make it live on the internet)

1. Go to [vercel.com](https://vercel.com) and sign up using your GitHub account (easiest option).
2. Click **Add New > Project**, then find and select your `monkwise-website` repo, click **Import**.
3. Before clicking Deploy, expand **Environment Variables** and add the same 5 values from your `.env.local` file:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `RESEND_API_KEY`
   - `NOTIFY_EMAIL`
4. Click **Deploy**. Wait 1-2 minutes.
5. You'll get a live URL like `monkwise-website.vercel.app` — your website is now live!

---

## Part 9 — Connect your own domain (optional)

If you own a domain like `monkwisemedia.com`:

1. In your Vercel project, go to **Settings > Domains**, type your domain, click **Add**.
2. Vercel will show you DNS records to add. Go to wherever you bought the domain (GoDaddy, Namecheap, Hostinger, etc.), find DNS settings, and add the records Vercel showed you.
3. Wait 10 minutes to a few hours for it to activate.

---

## Need changes later?

Just tell me what you want changed — new sections, different copy, a new color, more services, anything — and I'll edit the code for you. You'll just need to `git push` again (or I can show you exactly what to type) and Vercel will redeploy automatically.

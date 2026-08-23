# Deploy the portfolio

This portfolio is configured as a static GitHub Pages site. Every push to the
`main` branch builds, tests, and publishes it automatically.

## 1. Preview it locally

Install Node.js 22 or newer, then run:

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. The professional portfolio is the homepage. The
unlinked fun edition remains available at <http://localhost:3000/fun>.

## 2. Create the GitHub Pages repository

For the clean root URL, create a public repository using your actual GitHub
username:

```text
YOUR-GITHUB-USERNAME.github.io
```

For example, the GitHub account `Takerdat23` should use
`takerdat23.github.io`. A differently named repository also works, but GitHub
publishes it below a repository path such as
`https://takerdat23.github.io/datnguyen.github.io/`.

Do not initialize a new repository with a README, `.gitignore`, or license.

In the new repository, open **Settings → Pages**. Under **Build and deployment**,
set **Source** to **GitHub Actions**.

## 3. Upload this project

From this project directory, replace both username placeholders and run:

```bash
git init
git branch -M main
git add .
git commit -m "Deploy academic portfolio"
git remote add origin https://github.com/YOUR-GITHUB-USERNAME/YOUR-GITHUB-USERNAME.github.io.git
git push -u origin main
```

Open the repository's **Actions** tab and select **Deploy portfolio to GitHub
Pages**. When both jobs are green, the site is live at:

```text
https://YOUR-GITHUB-USERNAME.github.io
```

## 4. Turn on worldwide visitor analytics

1. Create or sign in to a Cloudflare account.
2. Open **Web Analytics** and select **Add a site**.
3. Enter only the hostname `YOUR-GITHUB-USERNAME.github.io`, then select it and
   choose **Done**.
4. In **Manage site**, copy the token from the provided JavaScript snippet. The
   token is the value after `"token":`.
5. In the GitHub repository, open **Settings → Secrets and variables → Actions**.
6. Select **New repository secret**.
7. Name it `CLOUDFLARE_WEB_ANALYTICS_TOKEN` and paste the token as its value.
8. Open **Actions → Deploy portfolio to GitHub Pages → Run workflow** to rebuild
   the site with analytics enabled.

Cloudflare may take a few minutes to show the first visits. Use its Web
Analytics dashboard to view page views and country-level reach. The Cloudflare
token is embedded in the public page by design; the GitHub secret simply keeps
it out of the source history.

## 5. Publish future changes

After editing the portfolio, run:

```bash
git add .
git commit -m "Update portfolio"
git push
```

GitHub Actions will publish the update automatically.

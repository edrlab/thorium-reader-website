# Google Analytics Setup

The GA script is injected at build time via the `PUBLIC_GA_MEASUREMENT_ID` environment variable. It only appears in production builds (`import.meta.env.PROD`) and is omitted entirely if the variable is not set.

## Testing locally

Run a production build with the variable set, then preview it:

```sh
PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX pnpm build && pnpm preview
```

Open the preview URL and check the page source for the `gtag/js` script tag to confirm injection.

## Deploying via GitHub Actions

The workflow reads the variable from a **repository secret** (not an environment secret). Environment secrets are scoped to jobs that declare `environment:` — the build job does not, so they would resolve to an empty string.

To configure it:

1. Go to **Settings → Secrets and variables → Actions → Repository secrets**
2. Click **New repository secret**
3. Name: `PUBLIC_GA_MEASUREMENT_ID`, value: your measurement ID (e.g. `G-XXXXXXXXXX`)

The workflow already passes it to the build step:

```yaml
- name: Build
  run: pnpm build
  env:
    PUBLIC_GA_MEASUREMENT_ID: ${{ secrets.PUBLIC_GA_MEASUREMENT_ID }}
```

No workflow changes are needed.

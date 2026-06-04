# Getting Started

## Prerequisites

- [Node.js](https://nodejs.org/) LTS
- [pnpm](https://pnpm.io/) v11

## Setup

```sh
pnpm install
```

## Development

```sh
pnpm dev
```

Opens a local dev server at `http://localhost:4321`. The default locale (`en`) is served at `/en/`; the root `/` redirects to the best match from your browser's language preferences.

## Build and preview

```sh
pnpm build       # outputs to ./dist
pnpm preview     # serves ./dist locally
```

To test a production build with Google Analytics injected:

```sh
PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX pnpm build && pnpm preview
```

See `docs/google-analytics.md` for the full GA setup.

## Deployment

Pushes to `main` trigger the GitHub Actions workflow at `.github/workflows/deploy.yml`, which builds and deploys to GitHub Pages automatically. See `docs/google-analytics.md` for how to configure the GA secret.

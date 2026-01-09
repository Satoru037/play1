<!-- @format -->

# I Got Mind – QA Automation

Playwright test suite for [https://igotmind.ca/](https://igotmind.ca/), covering authenticated and public flows.

## Run locally

1. Install dependencies:

```bash
npm ci
```

2. Run tests:

```bash
npm test
```

### Update snapshots

```bash
npm run update-snapshots
```

### View the HTML report

```bash
npm run report
```

## CI schedule

The GitHub Actions workflow is in `.github/workflows/igotmind.yml` (runs Mondays 9:00 AM IST / 3:30 AM UTC).

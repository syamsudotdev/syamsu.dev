#!/usr/bin/env sh

# Clean old screenshots
rm -rf playwright/screenshots

# Run OG image generation (no dev server needed)
pnpm exec playwright test tests/og-images.spec.ts

# Move screenshots to public/meta
mkdir -p public/meta
mv playwright/screenshots/* public/meta/

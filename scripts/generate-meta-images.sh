#!/usr/bin/env sh

# Delete file if exists
rm -rf playwright/screenshots
rm -rf public/meta/*

# Run playwright tests
pnpm exec playwright test tests/screenshot.spec.ts

# Move screenshots to meta-images directory
mv playwright/screenshots/* public/meta/
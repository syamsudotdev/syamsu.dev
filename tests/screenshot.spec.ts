import { test } from '@playwright/test';
import fs from 'node:fs';

const baseScreenshotDir = 'playwright/screenshots';

test('screenshot homepage', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');
  await page.screenshot({
    path: `${baseScreenshotDir}/homepage.jpeg`,
    quality: 100,
    clip: { x: 0, y: 0, width: 600, height: 300 },
  });
});

test('screenshot posts archive', async ({ page }) => {
  await page.goto('/posts');
  await page.waitForLoadState('domcontentloaded');
  await page.screenshot({
    path: `${baseScreenshotDir}/posts.jpeg`,
    quality: 100,
    clip: { x: 0, y: 0, width: 600, height: 300 },
  });
});

test('screenshot posts', async ({ context }) => {
  const filenames = fs.readdirSync('posts');
  const slugs = filenames.map(f => f.replace(/\.mdx?$/, ''));

  for (const slug of slugs) {
    const page = await context.newPage();
    try {
      await page.goto(`/posts/${slug}`);
      await page.waitForLoadState('domcontentloaded');
      await page.screenshot({
        path: `${baseScreenshotDir}/${slug}.jpeg`,
        quality: 100,
        clip: { x: 0, y: 0, width: 600, height: 300 },
      });
    } catch (error) {
      console.error(`Failed to screenshot ${slug}:`, error);
    } finally {
      await page.close();
    }
  }
});

import { test } from '@playwright/test';
import { getPostWithLink } from '~/loaders/posts';

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

test(`screenshot posts`, async ({ context }) => {
  const posts = await getPostWithLink();

  for (const post of posts) {
    const page = await context.newPage();
    try {
      await page.goto(`/posts/${post.link}`);
      await page.waitForLoadState('domcontentloaded');
      await page.screenshot({
        path: `${baseScreenshotDir}/${post.link}.jpeg`,
        quality: 100,
        clip: { x: 0, y: 0, width: 600, height: 300 },
      });
    } catch (error) {
      console.error(`Failed to screenshot ${post.link}:`, error);
    } finally {
      await page.close();
    }
  }
});

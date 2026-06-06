import { test, expect } from '@playwright/test';

test.describe('client-side navigation (staticFunctionMiddleware)', () => {
  test('homepage → posts archive via client-side nav', async ({ page }) => {
    const failedRequests: string[] = [];
    page.on('response', res => {
      if (res.url().includes('/_serverFn/') && res.status() >= 400) {
        failedRequests.push(`${res.url()} — ${res.status()}`);
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Click "View all writing" link in LatestPosts section
    const viewAllLink = page.locator('text=View all writing');
    await viewAllLink.click();

    await page.waitForURL('**/posts**');
    await expect(page.locator('h1', { hasText: 'Writing' })).toBeVisible();

    const postLinks = page.locator('a[href^="/posts/"]');
    await expect(postLinks).not.toHaveCount(0);

    const serverFnErrors = failedRequests.filter(r => r.includes('/_serverFn/'));
    expect(serverFnErrors).toEqual([]);
  });

  test('posts archive → individual post via client-side nav', async ({ page }) => {
    const failedRequests: string[] = [];
    page.on('response', res => {
      if (res.url().includes('/_serverFn/') && res.status() >= 400) {
        failedRequests.push(`${res.url()} — ${res.status()}`);
      }
    });

    await page.goto('/posts');
    await page.waitForLoadState('networkidle');

    const firstPostLink = page.locator('a[href^="/posts/"]').first();
    const href = await firstPostLink.getAttribute('href');
    await firstPostLink.click();

    await page.waitForURL(`**${href}**`);
    await expect(page.locator('h1').first()).toBeVisible();

    const serverFnErrors = failedRequests.filter(r => r.includes('/_serverFn/'));
    expect(serverFnErrors).toEqual([]);
  });

  test('homepage → individual post via client-side nav', async ({ page }) => {
    const failedRequests: string[] = [];
    page.on('response', res => {
      if (res.url().includes('/_serverFn/') && res.status() >= 400) {
        failedRequests.push(`${res.url()} — ${res.status()}`);
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Click a post link in LatestPosts (exclude "View all writing")
    const latestPostLink = page.locator('a[href^="/posts/"]').filter({ hasNotText: 'View all writing' }).first();
    const href = await latestPostLink.getAttribute('href');
    await latestPostLink.click();

    await page.waitForURL(`**${href}**`);
    await expect(page.locator('h1').first()).toBeVisible();

    const serverFnErrors = failedRequests.filter(r => r.includes('/_serverFn/'));
    expect(serverFnErrors).toEqual([]);
  });
});

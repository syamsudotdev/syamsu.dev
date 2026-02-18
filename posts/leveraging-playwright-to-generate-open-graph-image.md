+++
date = 2024-12-27T07:11:17
description = ""
draft = false
slug = "leveraging-playwright-to-generate-open-graph-image"
tags = ["web", "programming", "javascript"]
title = "Leveraging Playwright to Generate Open Graph Image"
layout = "layouts/blog.tsx"
+++

![Playwright Logo](/images/playwright-logo.svg)

I was implementing meta tags for twitter [summary large card](https://developer.x.com/en/docs/x-for-websites/cards/overview/summary-card-with-large-image). Creating the images and cropping them manually would be time consuming for every blog post. In this post, I'll show you how I automated this process using Playwright - typically an end-to-end testing tool - to programmatically generate consistent social media preview images.

So, I thought I would automate this using end-to-end testing tool, [Playwright](https://playwright.dev/). I knew I read this in Playwright documentation that it is able to take screenshots, and [I was right](https://playwright.dev/docs/screenshots). Playwright claims to be a reliable end-to-end testing. And I can vouch for that it is snappier runtime compared to Cypress. At least, that is what I experience from using them both. Although maybe Cypress has already improved so much after the last time I used it 3 years ago.

## Installation

Setting up Playwright is easy using npm, yarn, or pnpm.

```bash
# if you use npm
npm init playwright@latest
# if you use pnpm
pnpm create playwright
```

Follow the prompts to create several options, i.e., directory name, GitHub Actions workflow, and their browsers.
This will create following files for you to get started

```bash
playwright.config.ts
package.json
package-lock.json
tests/
  example.spec.ts
tests-examples/
  demo-todo-app.spec.ts
```

## Setting up Playwright

`playwright.config.ts` is the entry point in which Playwright setup everything before running your tests. It is a good thing that this file includes comments as its config documentation. For me, I only changed the base url and device I would use.

```typescript
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:5173',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // roughly iPhone 14 Pro Max
        viewport: { width: 600, height: 1000 },
      },
    },
  ],
});
```

### Configuration Explained

The key parts of my Playwright configuration:

- `baseURL`: Points to my local development server
- `viewport`: Set to 600x1000 to match my desired image width
- Single browser project using Chromium for consistency

Notice that I set that device's viewport to 600 x 1000, this is because my aim is to create a screenshot of 600px in width. While the height is just so that my CSS' auto margins and auto height does not break the page.

## Writing tests

Since I only care about generating screenshots for now. I wrote my tests just to do that.

### Taking screenshot of homepage

Below code is how I am taking screenshot of my homepage.

```typescript
import { test } from '@playwright/test';

const baseScreenshotDir = 'playwright/screenshots';

test('screenshot homepage', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');
  await page.screenshot({
    path: `${baseScreenshotDir}/index.jpeg`,
    quality: 100,
    clip: { x: 0, y: 0, width: 600, height: 300 },
  });
});
```

Notice how I pass the clip arguments, I use 600 and 300 for width and height. This is how I create my meta images 600 x 300 pixels in dimensions. This nice API from Playwright helps me create the screenshots without having to crop them in another process.

### Taking screenshots of articles

Taking screenshots of blog posts requires visiting them one by one. Because this is my own blog, I can query my own blog posts internally. And I am iterating over the posts link.

```typescript
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
```

## Running the tests

After writing tests, run them with playwright

```bash
npx playwright test
# or pnpm
pnpm exec playwright test
```

Below is an example of resulting tests
![Example meta screenshot](/images/screenshot-meta-example.png)

## Conclusion

Using Playwright to generate meta image screenshots automates my blog's image creation workflow. The setup was straightforward, and the API is intuitive to use. This solution saves time and ensures consistency across all blog posts.

While this approach might seem unconventional, it demonstrates how testing tools like Playwright can be repurposed for content generation tasks. The ability to precisely control screenshot dimensions and quality makes it a valuable tool for automating image-related workflows.

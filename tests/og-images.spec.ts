import { test } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const templatePath = path.resolve('scripts/og-template.html');
const baseScreenshotDir = 'playwright/screenshots';

function parseFrontmatter(content: string) {
  const match = content.match(/^\+\+\+([\s\S]*?)\+\+\+/);
  if (!match) return null;

  const fm: Record<string, string> = {};
  for (const line of match[1].trim().split('\n')) {
    const eqIdx = line.indexOf('=');
    if (eqIdx === -1) continue;
    const key = line.slice(0, eqIdx).trim();
    let val = line.slice(eqIdx + 1).trim();
    // Strip quotes
    if (val.startsWith('"') && val.endsWith('"')) {
      val = val.slice(1, -1);
    }
    // Parse array tags = ["a", "b"]
    if (val.startsWith('[') && val.endsWith(']')) {
      val = val.slice(1, -1).replace(/"/g, '').split(',').map(s => s.trim()).join(', ');
    }
    fm[key] = val;
  }
  return fm;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  });
}

function getFirstParagraph(content: string): string {
  const afterFm = content.replace(/^\+\+\+[\s\S]*?\+\+\+/, '').trim();
  const lines = afterFm.split('\n').filter(l => l.trim() && !l.startsWith('!') && !l.startsWith('#'));
  const first = lines[0] || '';
  // Strip markdown formatting
  return first
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .substring(0, 160)
    .trim();
}

test('generate OG images from template', async ({ page }) => {
  await page.setViewportSize({ width: 1200, height: 630 });
  const filenames = fs.readdirSync('posts');
  const slugs = filenames.map(f => f.replace(/\.mdx?$/, ''));

  for (const slug of slugs) {
    const content = fs.readFileSync(`posts/${slug}.md`, 'utf-8');
    const fm = parseFrontmatter(content);
    if (!fm) {
      console.error(`No frontmatter in ${slug}`);
      continue;
    }

    const description = fm.description || getFirstParagraph(content);
    const tags = (fm.tags || '').split(', ').filter(Boolean);
    const date = formatDate(fm.date || '2025-01-01');
    const title = fm.title || slug;

    await page.goto(`file://${templatePath}`);
    await page.waitForLoadState('domcontentloaded');

    // Fill in the template
    await page.evaluate(({ title, description, date, tags }) => {
      document.getElementById('title')!.textContent = title;
      document.getElementById('description')!.textContent = description;
      document.getElementById('date')!.textContent = date;
      const tagsEl = document.getElementById('tags')!;
      tagsEl.innerHTML = '';
      for (const tag of tags) {
        const span = document.createElement('span');
        span.className = 'tag';
        span.textContent = tag;
        tagsEl.appendChild(span);
      }
    }, { title, description, date, tags });

    // Wait for fonts to load
    await page.waitForTimeout(500);

    await page.screenshot({
      path: `${baseScreenshotDir}/${slug}.jpeg`,
      type: 'jpeg',
      quality: 90,
      clip: { x: 0, y: 0, width: 1200, height: 630 },
    });

    console.log(`✓ ${slug}`);
  }
});

test('generate OG images for static pages', async ({ page }) => {
  await page.setViewportSize({ width: 1200, height: 630 });
  // Homepage OG
  await page.goto(`file://${templatePath}`);
  await page.waitForLoadState('domcontentloaded');
  await page.evaluate(() => {
    document.getElementById('title')!.textContent = 'syamsu.dev';
    document.getElementById('description')!.textContent = 'Thoughts on software, infrastructure, and the occasional existential crisis.';
    document.getElementById('date')!.textContent = '';
    document.getElementById('tags')!.innerHTML = '';
  });
  await page.waitForTimeout(500);
  await page.screenshot({
    path: `${baseScreenshotDir}/homepage.jpeg`,
    type: 'jpeg',
    quality: 90,
    clip: { x: 0, y: 0, width: 1200, height: 630 },
  });

  // Posts archive OG
  await page.goto(`file://${templatePath}`);
  await page.waitForLoadState('domcontentloaded');
  await page.evaluate(() => {
    document.getElementById('title')!.textContent = 'Writing';
    document.getElementById('description')!.textContent = 'All posts, sorted by date.';
    document.getElementById('date')!.textContent = '';
    document.getElementById('tags')!.innerHTML = '';
  });
  await page.waitForTimeout(500);
  await page.screenshot({
    path: `${baseScreenshotDir}/posts.jpeg`,
    type: 'jpeg',
    quality: 90,
    clip: { x: 0, y: 0, width: 1200, height: 630 },
  });
});

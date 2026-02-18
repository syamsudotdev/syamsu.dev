# Syamsu.dev Portfolio & Blog

A personal portfolio and blog built with **TanStack Start** and **TanStack Router**, featuring Static Site Generation (SSG) and a custom Swiss Design system.

## Key Features

- **Type-safe routing**: Built with TanStack Router for end-to-end type safety.
- **Static Site Generation (SSG)**: High performance with pre-rendered static HTML.
- **Markdown-based blog**: Content pipeline using `remark`, `unified`, and `react-markdown`.
- **Swiss Style Design**: Clean, minimalist aesthetic utilizing Helvetica/Arial, grid layouts, and flat design via Tailwind CSS.
- **RSS Feed**: Automated RSS generation for blog posts.
- **SEO Ready**: Optimized meta tags and head management.

## Tech Stack

- **Framework**: TanStack Start (Beta)
- **Router**: TanStack Router (v1)
- **Styling**: Tailwind CSS
- **Content**: Remark / Unified / React Markdown
- **Build Tool**: Vite
- **Runtime**: Node.js / TypeScript

## Getting Started

### Installation

This project uses `pnpm`. Install the dependencies:

```bash
pnpm install
```

### Development

Start the development server:

```bash
pnpm dev
```

### Build

To create a production build with pre-rendered static HTML:

```bash
pnpm build
```

### Preview

Preview the production build locally:

```bash
pnpm start
```

### RSS Generation

Generate the RSS feed manually:

```bash
pnpm rss-gen
```

## Project Structure

- `src/routes/`: File-based routing using TanStack Router.
- `posts/`: Markdown files for blog content.
- `src/lib/posts.ts`: Data layer for fetching and processing Markdown posts.
- `public/`: Static assets.
- `rss-generator.ts`: Script for generating the RSS feed.

---

Built with precision and Swiss design principles.

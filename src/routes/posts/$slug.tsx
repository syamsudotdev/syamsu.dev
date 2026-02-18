import { createFileRoute, Link } from '@tanstack/react-router';
import Markdown from 'react-markdown';
import { createServerFn } from '@tanstack/react-start';
import { staticFunctionMiddleware } from '@tanstack/start-static-server-functions';
import remarkFrontmatter from 'remark-frontmatter';
import { remark } from 'remark';
import stripMarkdown from 'strip-markdown';
import { ReactNode } from 'react';
import remarkGfm from 'remark-gfm';
import { buildOpenGraphTwitterMeta } from '~/utils/seo';

const getPostContent = createServerFn({ method: 'GET' })
  .middleware([staticFunctionMiddleware])
  .inputValidator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    const fs = await import('node:fs/promises');
    const content = await fs.readFile(`posts/${slug}.md`, 'utf-8');
    const titleLine = content
      .split('\n')
      .find(line => line.startsWith('title = "'));

    const title = titleLine?.substring(
      titleLine.indexOf('"') + 1,
      titleLine.lastIndexOf('"'),
    );

    const tagsLine = content
      .split('\n')
      .find(line => line.startsWith('tags = '));
    const tags: string[] = JSON.parse(
      tagsLine?.substring(tagsLine.indexOf('= ') + 1)?.trim() || '[]',
    );

    const dateLine = content
      .split('\n')
      .find(line => line.startsWith('date = '));
    const dateString =
      dateLine
        ?.substring(dateLine.indexOf('= ') + 1)
        ?.trim()
        ?.substring(0, 10) || '';

    const strippedMarkdown = await remark()
      .use(stripMarkdown)
      .process(content.substring(content.lastIndexOf('+++') + 3));

    const short = strippedMarkdown
      .toString()
      .split('\n')
      .slice(1)
      .join(' ')
      .trim()
      .replace('<!--more-->', '')
      .substring(0, 200);
    const post = content.replace('<!--more-->', '');
    return {
      title: title || '',
      short,
      post,
      tags,
      date: dateString,
    };
  });

export const Route = createFileRoute('/posts/$slug')({
  loader: async ({
    params,
  }): Promise<{
    title: string;
    short: string;
    post: string;
    tags: string[];
    date: string;
  }> => {
    return await getPostContent({ data: params.slug });
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return {};
    return {
      title: `syamsu.dev - Posts - ${loaderData.title}`,
      meta: [
        {
          name: 'description',
          content: loaderData.short,
        },
        ...buildOpenGraphTwitterMeta({
          title: `syamsu.dev - ${loaderData.title}`,
          description: loaderData.short,
          imagePath: `${params.slug}.jpeg`,
        }),
      ],
    };
  },
  component: PostComponent,
});

function PostComponent() {
  const loaderData = Route.useLoaderData() as {
    title: string;
    short: string;
    post: string;
    tags: string[];
    date: string;
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="pt-16 pb-12 px-6 border-b border-gray-200">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {/* Back Navigation */}
            <Link
              to="/posts"
              className="inline-flex items-center text-gray-500 hover:text-navy-blue transition-colors font-mono text-sm"
            >
              <span className="mr-2">←</span>
              BACK TO POSTS
            </Link>

            {/* Post Header */}
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-black text-navy-blue leading-tight tracking-tighter">
                {loaderData.title}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-4 text-gray-500 font-mono text-sm uppercase tracking-wider">
                <span className="tabular-nums">{loaderData.date}</span>
                <span className="text-gray-300">■</span>
                <div className="flex flex-wrap gap-x-4">
                  {loaderData.tags.map((tag, index) => (
                    <Link
                      key={index}
                      to="/posts"
                      className="hover:text-blue-grotto transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <article className="prose prose-lg max-w-none 
            prose-headings:text-navy-blue prose-headings:font-bold prose-headings:tracking-tight
            prose-a:text-blue-grotto prose-a:no-underline hover:prose-a:underline
            prose-strong:text-navy-blue
            prose-img:rounded-none prose-img:border prose-img:border-gray-200 prose-img:shadow-none">
            <Markdown
              remarkPlugins={[[remarkFrontmatter, 'toml'], [remarkGfm]]}
              components={{
                h1: ({ children }) => (
                  <h1 className="text-4xl font-bold text-navy-blue mt-12 mb-6">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-3xl font-bold text-navy-blue mt-10 mb-5">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-2xl font-bold text-navy-blue mt-8 mb-4">
                    {children}
                  </h3>
                ),
                img: ({ src, alt }) => (
                  <img
                    src={src}
                    alt={alt}
                    className="mx-auto my-12 max-w-full h-auto border border-gray-200"
                  />
                ),
                a: ({ href, children }) => (
                  <a
                    href={href || ''}
                    className="text-blue-grotto hover:underline transition-colors"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {children}
                  </a>
                ),
                p: ({ children }) => (
                  <p className="text-gray-800 leading-relaxed mb-6 has-[img]:mb-0">
                    {children}
                  </p>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-navy-blue pl-6 py-4 my-8 bg-off-white italic text-gray-700">
                    {children}
                  </blockquote>
                ),
                pre: function Pre(props) {
                  const { children, className, ...rest } = props;
                  return (
                    <pre
                      {...rest}
                      className={`${className} p-6 bg-gray-900 border-l-4 border-blue w-full block overflow-x-auto my-8 text-sm font-mono`}
                    >
                      {children}
                    </pre>
                  );
                },
                code(props) {
                  const { children, className, ...rest } = props;
                  const isCodeBlock =
                    typeof children === 'string' &&
                    children.trim().includes('\n');
                  const isInline =
                    typeof children === 'string' &&
                    !children.trim().includes('\n');
                  
                  if (isCodeBlock && !isInline) {
                    return (
                      <code {...rest} className={className}>
                        {(children as string)
                          .split('\n')
                          .filter(Boolean)
                          .map((line, index) => (
                            <div key={index + 1} className="flex">
                              <span className="border-r border-gray-700 pr-4 mr-4 min-w-8 text-right text-gray-500 select-none">
                                {(index + 1).toString()}
                              </span>
                              <span className="text-gray-100">{line}</span>
                            </div>
                          ))}
                      </code>
                    );
                  }

                  if (isInline) {
                    return (
                      <code className="font-mono text-blue-grotto bg-gray-100 px-1.5 py-0.5 text-sm">
                        {children}
                      </code>
                    );
                  }

                  return <code {...rest} className={className}>{children}</code>;
                },
                table: ({ children }) => (
                  <div className="overflow-x-auto my-8">
                    <table className="w-full border-collapse border border-gray-200">
                      {children}
                    </table>
                  </div>
                ),
                th: ({ children }) => (
                  <th className="border border-gray-200 bg-gray-50 text-navy-blue text-left p-4 font-bold uppercase text-xs tracking-wider">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="border border-gray-200 p-4 text-gray-700">
                    {children}
                  </td>
                ),
              }}
            >
              {loaderData.post}
            </Markdown>
          </article>
        </div>
      </section>
    </main>
  );
}

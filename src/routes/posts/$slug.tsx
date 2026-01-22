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
    <main className="min-h-screen bg-base-dark">
      {/* Header Section */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {/* Back Navigation */}
            <Link
              to="/posts"
              className="inline-flex items-center text-[#92B4BC] hover:text-[#E8F1F2] transition-colors text-sm font-medium text-lg"
            >
              <span className="mr-2">←</span>
              Back to all posts
            </Link>

            {/* Post Header */}
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold text-[#E8F1F2] leading-tight">
                {loaderData.title}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-[#92B4BC]">
                <div className="flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="size-4"
                  >
                    <path d="M5.75 7.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM5 10.25a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0ZM10.25 7.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM7.25 8.25a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0ZM8 9.5A.75.75 0 1 0 8 11a.75.75 0 0 0 0-1.5Z" />
                    <path
                      fillRule="evenodd"
                      d="M4.75 1a.75.75 0 0 0-.75.75V3a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2V1.75a.75.75 0 0 0-1.5 0V3h-5V1.75A.75.75 0 0 0 4.75 1ZM3.5 7a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v4.5a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1V7Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-medium">{loaderData.date}</span>
                </div>

                {loaderData.tags.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="size-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.5 2A2.5 2.5 0 0 0 2 4.5v3.879a2.5 2.5 0 0 0 .732 1.767l7.5 7.5a2.5 2.5 0 0 0 3.536 0l3.878-3.878a2.5 2.5 0 0 0 0-3.536l-7.5-7.5A2.5 2.5 0 0 0 8.38 2H4.5ZM5 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div className="flex flex-wrap gap-2">
                      {loaderData.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-[#385D65]/20 text-[#E8F1F2] rounded text-xs font-medium border border-[#385D65]/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <article className="prose prose-invert prose-lg max-w-none">
            <Markdown
              remarkPlugins={[[remarkFrontmatter, 'toml'], [remarkGfm]]}
              components={{
                h1: ({ children }) => (
                  <h1 className="text-3xl font-bold text-[#E8F1F2] mt-8 mb-4">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-2xl font-bold text-[#E8F1F2] mt-6 mb-3">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl font-semibold text-[#E8F1F2] mt-4 mb-2">
                    {children}
                  </h3>
                ),
                img: ({ src, alt }) => (
                  <img
                    src={src}
                    alt={alt}
                    className="rounded-lg mx-auto my-8 max-w-full h-auto shadow-lg bg-white"
                  />
                ),
                a: ({ href, children }) => (
                  <a
                    href={href || ''}
                    className="text-[#92B4BC] hover:text-[#E8F1F2] underline transition-colors"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {children}
                  </a>
                ),
                p: ({ children }) => (
                  <p className="text-[#E8F1F2]/90 leading-relaxed mb-4 has-[img]:mb-0">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc ml-6 mb-4 space-y-1 text-[#E8F1F2]/90">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal ml-6 mb-4 space-y-1 text-[#E8F1F2]/90">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="text-[#E8F1F2]/90">{children}</li>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-[#385D65] pl-4 py-2 my-6 bg-[#1E363B]/30 rounded-r text-[#E8F1F2]/90 italic">
                    {children}
                  </blockquote>
                ),
                pre: function Pre(props) {
                  const { children, className, ...rest } = props;
                  return (
                    <pre
                      {...rest}
                      className={`${className} p-4 bg-[#0F1419] border border-[#385D65]/30 rounded-lg w-full block overflow-x-auto my-6 text-sm`}
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
                  const NumberedLines: ReactNode =
                    isCodeBlock && !isInline ? (
                      (children as string)
                        .split('\n')
                        .filter(Boolean)
                        .map((line, index) => {
                          return (
                            <div key={index + 1} className="flex">
                              <span className="border-r border-[#385D65]/30 pr-3 mr-3 min-w-8 text-right text-[#92B4BC] select-none text-xs">
                                {(index + 1).toString()}
                              </span>
                              <span className="text-[#E8F1F2]">{line}</span>
                            </div>
                          );
                        })
                    ) : isInline ? (
                      <span className="font-mono text-[#92B4BC] bg-[#385D65]/20 px-1.5 py-0.5 rounded text-sm">
                        {children}
                      </span>
                    ) : (
                      children
                    );

                  return (
                    <code {...rest} className={className}>
                      {NumberedLines}
                    </code>
                  );
                },
                table: ({ children }) => (
                  <div className="overflow-x-auto my-6">
                    <table className="w-full border-collapse border border-[#385D65]/30 rounded-lg overflow-hidden">
                      {children}
                    </table>
                  </div>
                ),
                th: ({ children }) => (
                  <th className="border border-[#385D65]/30 bg-[#385D65]/20 text-[#E8F1F2] text-left p-3 font-semibold">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="border border-[#385D65]/30 p-3 text-[#E8F1F2]/90">
                    {children}
                  </td>
                ),
              }}
              className="text-[#E8F1F2]"
            >
              {loaderData.post}
            </Markdown>
          </article>
        </div>
      </section>
    </main>
  );
}

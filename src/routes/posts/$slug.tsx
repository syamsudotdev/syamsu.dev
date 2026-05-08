import { createFileRoute, Link } from '@tanstack/react-router';
import Markdown from 'react-markdown';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import { buildOpenGraphTwitterMeta } from '~/utils/seo';
import { getPostContent } from '~/lib/post-content';

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
      meta: [
        { title: `${loaderData.title} — syamsu.dev` },
        {
          name: 'description',
          content: loaderData.short,
        },
        ...buildOpenGraphTwitterMeta({
          title: `${loaderData.title} — syamsu.dev`,
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
    <main className="min-h-screen bg-paper">
      {/* Header */}
      <section className="pt-20 pb-12 px-6 border-b border-rule">
        <div className="max-w-prose mx-auto">
          <Link
            to="/posts"
            className="inline-flex items-center font-mono text-ui uppercase text-pencil hover:text-ink transition-colors mb-8"
          >
            <span className="mr-2">←</span>
            Back to writing
          </Link>

          <h1 className="font-display text-display mb-6">
            {loaderData.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 font-mono text-ui uppercase text-pencil">
            <span>{loaderData.date}</span>
            <span className="text-rule">|</span>
            <div className="flex flex-wrap gap-x-3">
              {loaderData.tags.map((tag, index) => (
                <span key={index} className="text-redline">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6">
        <div className="max-w-prose mx-auto">
          <article className="prose prose-lg max-w-none
            prose-headings:font-heading prose-headings:text-ink prose-headings:tracking-tight
            prose-p:font-body prose-p:text-body prose-p:text-ink/80
            prose-a:text-redline prose-a:no-underline hover:prose-a:underline hover:prose-a:decoration-redline
            prose-strong:text-ink
            prose-blockquote:border-l-2 prose-blockquote:border-redline prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-pencil
            prose-img:rounded-none prose-img:border prose-img:border-rule
            prose-code:text-redline prose-code:bg-redline-wash prose-code:font-mono
            prose-pre:bg-ink prose-pre:border-l-2 prose-pre:border-redline">
            <Markdown
              remarkPlugins={[[remarkFrontmatter, 'toml'], [remarkGfm]]}
              components={{
                h1: ({ children }) => (
                  <h1 className="font-heading text-[2rem] text-ink mt-12 mb-6 tracking-tight">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="font-heading text-[1.5rem] text-ink mt-10 mb-5 tracking-tight">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="font-heading text-[1.25rem] text-ink mt-8 mb-4 tracking-tight">
                    {children}
                  </h3>
                ),
                img: ({ src, alt }) => (
                  <img
                    src={src}
                    alt={alt}
                    className="mx-auto my-12 max-w-full h-auto border border-rule"
                  />
                ),
                a: ({ href, children }) => (
                  <a
                    href={href || ''}
                    className="redaction-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {children}
                  </a>
                ),
                p: ({ children }) => (
                  <p className="font-body text-ink/80 leading-[1.75] mb-6 has-[img]:mb-0">
                    {children}
                  </p>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-2 border-redline pl-6 py-4 my-8 italic text-pencil">
                    {children}
                  </blockquote>
                ),
                pre: function Pre(props) {
                  const { children, className, ...rest } = props;
                  return (
                    <pre
                      {...rest}
                      className={`${className || ''} p-6 bg-ink border-l-2 border-redline w-full block overflow-x-auto my-8 text-sm font-mono`}
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
                              <span className="border-r border-pencil/30 pr-4 mr-4 min-w-8 text-right text-pencil select-none">
                                {(index + 1).toString()}
                              </span>
                              <span className="text-paper">{line}</span>
                            </div>
                          ))}
                      </code>
                    );
                  }

                  if (isInline) {
                    return (
                      <code className="font-mono text-redline bg-redline-wash px-1.5 py-0.5 text-sm">
                        {children}
                      </code>
                    );
                  }

                  return <code {...rest} className={className}>{children}</code>;
                },
                table: ({ children }) => (
                  <div className="overflow-x-auto my-8">
                    <table className="w-full border-collapse border border-rule">
                      {children}
                    </table>
                  </div>
                ),
                th: ({ children }) => (
                  <th className="border border-rule bg-bleed text-ink text-left p-4 font-mono text-ui uppercase tracking-wider">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="border border-rule p-4 text-ink/70">
                    {children}
                  </td>
                ),
              }}
            >
              {loaderData.post}
            </Markdown>
          </article>

          <div className="mt-16 pt-8 border-t border-rule flex justify-between items-center">
            <Link to="/posts" className="redaction-link font-mono text-ui uppercase">
              ← Back to writing
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
import Markdown from 'react-markdown';
import { Route } from './+types/post';
import fs from 'node:fs/promises';
import remarkFrontmatter from 'remark-frontmatter';
import { remark } from 'remark';
import { Link } from 'react-router';
import { buildOpenGraphTwitterMeta } from '~/loaders/og-twitter';
import stripMarkdown from 'strip-markdown';
import { ReactNode } from 'react';
import remarkGfm from 'remark-gfm';

export function meta(arg: Route.MetaArgs) {
  return [
    { title: `syamsu.dev - Posts - ${arg.data.title}` },
    {
      name: 'description',
      content: arg.data.short,
    },
    ...buildOpenGraphTwitterMeta({
      title: `syamsu.dev - ${arg.data.title}`,
      description: arg.data.short,
      imagePath: `${arg.params.slug}.jpeg`,
    }),
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const content = await fs.readFile(`posts/${params.slug}.md`, 'utf-8');
  const titleLine = content
    .split('\n')
    .find(line => line.startsWith('title = "'));

  const title = titleLine?.substring(
    titleLine.indexOf('"') + 1,
    titleLine.lastIndexOf('"')
  );

  const tagsLine = content.split('\n').find(line => line.startsWith('tags = '));
  const tags: string[] = JSON.parse(
    tagsLine?.substring(tagsLine.indexOf('= ') + 1)?.trim() || '[]'
  );

  const dateLine = content.split('\n').find(line => line.startsWith('date = '));
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
  return { title, short, post, tags, date: dateString };
}

export default function Page({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <h1 className="font-bold text-xl mx-[16px]">{loaderData.title}</h1>
      <div className="mx-[16px] flex flex-1 items-center space-x-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="size-5"
        >
          <path d="M5.75 7.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM5 10.25a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0ZM10.25 7.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM7.25 8.25a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0ZM8 9.5A.75.75 0 1 0 8 11a.75.75 0 0 0 0-1.5Z" />
          <path
            fillRule="evenodd"
            d="M4.75 1a.75.75 0 0 0-.75.75V3a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2V1.75a.75.75 0 0 0-1.5 0V3h-5V1.75A.75.75 0 0 0 4.75 1ZM3.5 7a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v4.5a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1V7Z"
            clipRule="evenodd"
          />
        </svg>
        <p>{loaderData.date}</p>
      </div>
      <span className="min-h-px max-h-px mx-[16px] bg-base-light" />
      <Markdown
        remarkPlugins={[[remarkFrontmatter, 'toml'], [remarkGfm]]}
        components={{
          h1: ({ children }) => (
            <h1 className="font-bold text-xl">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="font-bold text-lg my-2">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="font-semibold my-2">{children}</h3>
          ),
          img: ({ src, alt }) => (
            <img
              src={src}
              alt={alt}
              className="rounded mx-auto my-4 max-h-[50vh] xl:max-w-[60vw] xl:max-h-[30vh] bg-base-light"
            />
          ),
          a: ({ href, children }) => (
            <Link to={href || ''} className="underline" target="_blank">
              {children}
            </Link>
          ),
          p: ({ children }) => (
            <p className="mb-2 has-[img]:mb-0">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc ml-4 mb-2">{children}</ul>
          ),
          pre: function Pre(props) {
            const { children, className, ...rest } = props;

            return (
              <pre
                {...rest}
                className={`${className} px-[16px] py-[8px] bg-slate-800 w-full block overflow-x-auto`}
              >
                {children}
              </pre>
            );
          },
          code(props) {
            const { children, className, ...rest } = props;
            const isCodeBlock =
              typeof children === 'string' && children.trim().includes('\n');
            const isInline =
              typeof children === 'string' && !children.trim().includes('\n');
            const NumberedLines: ReactNode =
              isCodeBlock && !isInline ? (
                children
                  .split('\n')
                  .filter(Boolean)
                  .map((line, index) => {
                    return (
                      <p key={index + 1} className="flex flex-row">
                        <span className="border-r pr-1 min-w-6 text-right">
                          {(index + 1).toString()}
                        </span>
                        <span className="min-w-2" />
                        <span>{line}</span>
                      </p>
                    );
                  })
              ) : isInline ? (
                <span className="font-mono text-amber-500">{children}</span>
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
            <table className="xl:w-3/5 w-full border-collapse border">
              {children}
            </table>
          ),
          th: ({ children }) => (
            <th className="border border-[#E8F1F2] bg-base-light text-base-dark text-left pl-2">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-[#E8F1F2] pl-2 pr-4">{children}</td>
          ),
        }}
        className="mx-[16px] flex flex-col text-[#E8F1F2]"
      >
        {loaderData.post}
      </Markdown>
      <span className="min-h-[24px] max-h-[24px]" />
      <div className="mx-[16px] flex flex-1 items-center space-x-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="size-5"
        >
          <path
            fillRule="evenodd"
            d="M4.5 2A2.5 2.5 0 0 0 2 4.5v3.879a2.5 2.5 0 0 0 .732 1.767l7.5 7.5a2.5 2.5 0 0 0 3.536 0l3.878-3.878a2.5 2.5 0 0 0 0-3.536l-7.5-7.5A2.5 2.5 0 0 0 8.38 2H4.5ZM5 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
            clipRule="evenodd"
          />
        </svg>
        <p>{loaderData.tags.join(', ')}</p>
      </div>
    </>
  );
}

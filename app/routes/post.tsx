import Markdown from 'react-markdown';
import { Route } from './+types/post';
import fs from 'node:fs/promises';
import remarkFrontmatter from 'remark-frontmatter';
import { remark } from 'remark';
import { Link } from 'react-router';
import { buildOpenGraphTwitterMeta } from '~/loaders/og-twitter';
import stripMarkdown from 'strip-markdown';
import { ReactNode } from 'react';

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
  return { title, short, post, date: dateString };
}

export default function Page({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <h1 className="font-bold text-xl mx-[32px]">{loaderData.title}</h1>
      <span className="min-h-1" />
      <p className="mx-[32px]">{loaderData.date}</p>
      <Markdown
        remarkPlugins={[[remarkFrontmatter, 'toml']]}
        components={{
          h1: ({ children }) => (
            <h1 className="font-bold text-xl">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="font-bold text-lg my-2">{children}</h2>
          ),
          img: ({ src, alt }) => (
            <img
              src={src}
              alt={alt}
              className="rounded mx-auto my-4 max-h-[50vh] xl:max-w-[60vw] xl:max-h-[30vh]"
            />
          ),
          a: ({ href, children }) => (
            <Link to={href || ''} className="underline">
              {children}
            </Link>
          ),
          p: ({ children }) => (
            <p className="mb-4 has-[img]:mb-0">{children}</p>
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
                children.split('\n').map((line, index) => {
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
        }}
        className="mx-[32px] flex flex-col text-[#E8F1F2]"
      >
        {loaderData.post}
      </Markdown>
    </>
  );
}

import Markdown from 'react-markdown';
import { Route } from './+types/post';
import fs from 'node:fs/promises';
import remarkFrontmatter from 'remark-frontmatter';
import { Link } from 'react-router';
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nightOwl as PrismStyle } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export function meta(arg: Route.MetaArgs) {
  return [
    { title: `syamsu.dev - Posts - ${arg.data.title}` },
    {
      name: 'description',
      content: arg.data.short,
    },
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
  const short = content.split('<!--more-->')[0];
  const post = content.replace('<!--more-->', '');
  return { title, short, post };
}

export default function Page({ loaderData }: Route.ComponentProps) {
  return (
    <Markdown
      remarkPlugins={[[remarkFrontmatter, 'toml']]}
      components={{
        h1: ({ children }) => (
          <h1 className="font-bold text-xl my-4">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="font-bold text-lg my-2">{children}</h2>
        ),
        img: ({ src, alt }) => (
          <img
            src={src}
            alt={alt}
            className="rounded mx-auto my-4 max-w-[600px]"
          />
        ),
        a: ({ href, children }) => (
          <Link to={href || ''} className="underline">
            {children}
          </Link>
        ),
        code(props) {
          const { children, className, ...rest } = props;
          const match = /language-(\w+)/.exec(className || '');
          return match ? (
            <SyntaxHighlighter
              {...(rest as React.ComponentProps<typeof SyntaxHighlighter>)}
              className="rounded text-base"
              showLineNumbers
              language={match[1]}
              style={PrismStyle}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code {...rest} className={className}>
              {children}
            </code>
          );
        },
      }}
      className="mt-[68px] mx-[16px] xl:mx-[32px] flex flex-col text-[#E8F1F2]"
    >
      {loaderData.post}
    </Markdown>
  );
}

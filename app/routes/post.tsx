import Markdown from 'react-markdown';
import { Route } from './+types/post';
import fs from 'node:fs/promises';
import remarkFrontmatter from 'remark-frontmatter';
import { remark } from 'remark';
import { Link } from 'react-router';
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nightOwl as PrismStyle } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { buildOpenGraphTwitterMeta } from '~/loaders/og-twitter';
import stripMarkdown from 'strip-markdown';

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

  const strippedMarkdown = await remark()
    .use(stripMarkdown)
    .process(content.substring(content.lastIndexOf('+++') + 3));

  const short = strippedMarkdown
    .toString()
    .split('\n')
    .slice(1)
    .join(' ')
    .trim()
    .substring(0, 200);
  const post = content.replace('<!--more-->', '');
  return { title, short, post };
}

export default function Page({ loaderData }: Route.ComponentProps) {
  return (
    <Markdown
      remarkPlugins={[[remarkFrontmatter, 'toml']]}
      components={{
        h1: ({ children }) => <h1 className="font-bold text-xl">{children}</h1>,
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
        p: ({ children }) => <p className="mb-4 has-[img]:mb-0">{children}</p>,
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
      className="mx-[32px] flex flex-col text-[#E8F1F2]"
    >
      {loaderData.post}
    </Markdown>
  );
}

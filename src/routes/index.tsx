import { createFileRoute, Link } from '@tanstack/react-router';
import { buildOpenGraphTwitterMeta } from '~/utils/seo';
import { getLatestPosts, PostDetailResult } from '~/lib/posts';

export const Route = createFileRoute('/')({
  loader: () => (getLatestPosts as any)(),
  head: () => ({
    meta: [
      { title: 'syamsu.dev' },
      { name: 'description', content: 'Mochamad Noor Syamsu Web Homepage' },
      ...buildOpenGraphTwitterMeta({
        title: 'syamsu.dev',
        description: 'Mochamad Noor Syamsu Web Homepage',
        imagePath: 'homepage.jpeg',
      }),
    ],
  }),
  component: HomeComponent,
});

const YEARS_EXP = (
  (new Date().getTime() - new Date(2016, 7).getTime()) /
  31_536_000_000
)
  .toString()
  .split('.')[0];

const PROJECTS = [
  {
    title: '99.co (Android & iOS)',
    shortDescription:
      'Native Android and iOS applications for property marketplace in Singapore.',
    description: `
Cobroke agent : feature to help agents to cobroke other agents' listed properties
Featured agent : feature to help agents to showcase their profile in certain area
Unlink Auto-Import : feature to help agents to unlink their auto-imported properties from automated sync
      `.trim(),
    time: '2024 - now',
    tech: ['Android', 'GitHub', 'Java', 'iOS', 'Kotlin', 'Swift'],
  },
  {
    title: 'Mangkunegaran (React-Native, iOS, Android)',
    shortDescription:
      'A mobile application for Mangkunegaran Palace to showcase their collection and history.',
    description: `
Launched MVP in 3 months time
Detox end-to-end tests
      `.trim(),
    time: '2024',
    tech: [
      'Android',
      'Azure DevOps',
      'Detox',
      'Expo',
      'iOS',
      'React-Native',
      'TypeScript',
    ],
  },
  {
    title: 'Merdeka Mengajar (NextJS, Playwright)',
    shortDescription:
      'A Progressive-Web-App to help teachers all accross Indonesia, providing upskilling courses, teaching materials, community, etc. Based on NextJS.',
    description: `
I was promoted in the early 2023 to a Full-stack Engineer position and tasked to help on the web platform. I am currently working on user event tracking, bugfixing, and end-to-end tests.
      `.trim(),
    time: '2023 - 2024',
    tech: [
      'NextJS',
      'Gitlab',
      'JIRA',
      'TypeScript',
      'ReactJS',
      'Playwright',
      'Tailwind CSS',
    ],
  },
  {
    title: 'Merdeka Mengajar (Android)',
    shortDescription:
      'A native Android application on Android to help teachers all accross Indonesia, providing upskilling courses, teaching materials, communities, etc. Based on Kotlin, Jetpack Compose, and Jetpack Compose Navigation.',
    description: `
Currently working on its core products :
  Home : homepage dedicated to many of Merdeka Mengajar products
  Ide Praktik : examples of teaching approaches and tools
  Untuk Anda : curated articles, videos, documents
  Pencarian : global search for teaching materials with over 7000 available content
  Profil : profile page for teachers to showcase their achieved certificates, self-pace learning, and portofolios
  In-app browser : a wrapper inside our app specifically engineered to support our PWA platforms with JavaScript bridge interface
      `.trim(),
    time: '2022 - 2024',
    tech: [
      'Android',
      'Dagger 2',
      'Gitlab',
      'JIRA',
      'JUnit 4',
      'JUnit 5',
      'Android LiveData',
      'Robolectric',
      'Kotlin',
      'Kotlin Coroutine',
      'ViewModel',
      'Jetpack Compose',
      'Jetpack Compose Navigation',
      'Ktor',
      'Firebase A/B Testing',
      'Firebase Authentication',
      'Firebase Remote Config',
      'Firebase Crashlytics',
      'WebView',
    ],
  },
  {
    title: 'Monika',
    shortDescription:
      'An open-source software initiative by Hyperjump Technology. Monika is a command-line interface application based on NodeJS to monitor internet service health.',
    description: `
Currently contributing as one of its maintainers.
      `.trim(),
    time: '2022 - Now',
    tech: ['NodeJS', 'Oclif', 'TypeScript', 'GitHub', 'Tailwind CSS'],
  },
  {
    title: 'Lyfe Pintar',
    shortDescription:
      'A web app to create online resume, job listing, and job application.',
    description: `
Launched MVP in 3 months time
Backoffice report with Looker Studio
Search job listing with Algolia Search
      `.trim(),
    time: '2023',
    tech: [
      'Azure DevOps Repository',
      'Azure DevOps Repository',
      'Azure DevOps Boards',
      'Algolia Search',
      'ReactJS',
      'TypeScript',
      'Firebase Authentication',
      'Firebase Cloud Storage',
      'Firebase Cloud Firestore',
      'Firebase Hosting',
      'Firebase Emulator',
      'Firebase Remote Config',
      'AirTable',
      'Google Analytics',
      'Google BigQuery',
      'Google Looker Studio',
      'TypeScript',
      'Tailwind CSS',
    ],
  },
  {
    title: 'Credikini',
    shortDescription: 'A Buy-Now-Pay-Later MVP native android application.',
    description: `
Created MVP from scratch in 3 months with features below :
Registration, login, logout
KYC form
Transactions
      `.trim(),
    time: '2021',
    tech: [
      'Android',
      'Kotlin',
      'AndroidX Navigation',
      'LiveData',
      'Android ViewModel',
      'AndroidX CameraX',
    ],
  },
  {
    title: 'Aruna Heroes',
    shortDescription:
      'A native android application working as a client for Odoo ERP.',
    description: `
Launched MVP from scratch in 3 months (offline-first application, unit tests, continous integration, app authentication, purchase order, manage contacts)
Offline-first app engineered using Android Work Manager and Android Room Database
Led and grew team from 2 android engineers to 4 android engineers
Enforced team culture to maintain continous integration, unit tests, and code review
      `.trim(),
    time: '2020 - 2021',
    tech: [
      'Android',
      'Kotlin',
      'AndroidX Navigation',
      'Android LiveData',
      'Android ViewModel',
      'Android Room Database',
      'Android Work Manager',
      'Retrofit',
      'JIRA',
      'Gitlab',
      'Gitlab Pipeline',
      'Moshi JSON parser',
    ],
  },
  {
    title: 'Cakap Android',
    shortDescription:
      'A native android application for Edtech company to schedule and learn new language in video call and chat.',
    description: `
Migrated Java codebase to full Kotlin
Worked closely with Vietnamese team in English
Created full-featured chat with Qiscus SDK
Created full-featured payment with Midtrans SDK
Led and grew team from 2 android engineers to 4 android engineers
Managed android engineers' workload
      `.trim(),
    time: '2018 - 2020',
    tech: [
      'Android',
      'Kotlin',
      'Android LiveData',
      'Android ViewModel',
      'Retrofit',
      'RxJava 2',
      'JIRA',
      'Gitlab',
      'Gson JSON parser',
      'Agora Video Call SDK',
      'Qiscus Chat SDK',
    ],
  },
];

type ProjectData = {
  title: string;
  shortDescription: string;
  description: string;
  tech: string[];
  time: string;
};

function ProjectCard({ data }: { data: ProjectData }) {
  const { title, shortDescription, description, tech, time } = data;
  return (
    <div className="py-8 border-b border-rule group">
      <div className="flex flex-col lg:flex-row lg:gap-12">
        <div className="lg:w-48 shrink-0 mb-4 lg:mb-0">
          <span className="font-mono text-ui uppercase text-pencil">{time}</span>
        </div>
        <div className="flex-1">
          <h3 className="font-heading text-heading-lg mb-3 group-hover:text-redline transition-colors">
            {title}
          </h3>
          <p className="font-body text-body text-ink/80 mb-4">
            {shortDescription}
          </p>
          <div className="space-y-1 mb-4">
            {description.split('\n').map((line, index) => (
              <p key={index} className="text-pencil text-sm flex items-start">
                <span className="text-redline mr-2">—</span>
                {line.replace(/^- /, '')}
              </p>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {tech.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())).map((t, i) => (
              <span key={i} className="font-mono text-[11px] uppercase text-pencil">
                {t}{i < tech.length - 1 ? ' ·' : ''}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function LatestPosts({ posts }: { posts: PostDetailResult[] }) {
  return (
    <div className="space-y-0">
      {posts.map((post) => (
        <Link
          key={post.slug}
          to="/posts/$slug"
          params={{ slug: post.slug }}
          className="group block py-6 border-b border-rule"
        >
          <div className="flex items-start justify-between gap-8">
            <div className="flex-1">
              <h3 className="font-heading text-heading-lg mb-2 group-hover:text-redline transition-colors">
                {post.title}
              </h3>
              <p className="text-pencil text-sm line-clamp-2">{post.short}</p>
            </div>
            <span className="font-mono text-ui uppercase text-pencil shrink-0 mt-2">
              {post.date}
            </span>
          </div>
        </Link>
      ))}
      <Link
        to="/posts"
        className="group block py-6 border-b border-rule"
      >
        <div className="flex items-center justify-between">
          <span className="font-heading text-heading-lg group-hover:text-redline transition-colors">
            View all writing
          </span>
          <span className="text-redline text-2xl group-hover:translate-x-2 transition-transform">→</span>
        </div>
      </Link>
    </div>
  );
}

function HomeComponent() {
  const latestPosts = Route.useLoaderData();

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6">
        <div className="max-w-content mx-auto relative">
          <span className="page-number -left-4 top-0">01</span>
          <div className="relative z-10 max-w-prose mx-auto">
            <h1 className="font-display text-display mb-8">
              Mochamad Noor<br />Syamsu
            </h1>
            <p className="font-body text-body text-ink/80 max-w-md mb-8">
              Software engineer who writes about building things.
              {' '}{YEARS_EXP} years crafting with Kotlin, TypeScript,
              and modern ecosystems.
            </p>
            <div className="flex gap-6">
              <a href="#works" className="redaction-link font-mono text-ui uppercase">
                View work
              </a>
              <Link to="/posts" className="redaction-link font-mono text-ui uppercase">
                Read writing
              </Link>
            </div>
          </div>
          <span className="annotation hidden lg:block absolute right-8 top-12 -rotate-3">
            ← hello
          </span>
        </div>
      </section>

      <div className="section-rule max-w-content mx-auto" />

      {/* Latest Writing */}
      <section className="relative py-20 px-6">
        <div className="max-w-content mx-auto relative">
          <span className="page-number -left-4 top-0">02</span>
          <div className="relative z-10 max-w-prose mx-auto">
            <h2 className="font-mono text-ui uppercase tracking-widest text-pencil mb-10">
              Recent Writing
            </h2>
            <LatestPosts posts={latestPosts} />
          </div>
        </div>
      </section>

      <div className="section-rule max-w-content mx-auto" />

      {/* Projects */}
      <section id="works" className="relative py-20 px-6">
        <div className="max-w-content mx-auto relative">
          <span className="page-number -left-4 top-0">03</span>
          <div className="relative z-10 max-w-content mx-auto">
            <h2 className="font-mono text-ui uppercase tracking-widest text-pencil mb-10">
              Projects
            </h2>
            <div>
              {PROJECTS.map((data) => (
                <ProjectCard key={`${data.title}-${data.time}`} data={data} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="section-rule max-w-content mx-auto" />

      {/* About */}
      <section id="about-me" className="relative py-20 px-6">
        <div className="max-w-content mx-auto relative">
          <span className="page-number -left-4 top-0">04</span>
          <div className="relative z-10 max-w-prose mx-auto">
            <h2 className="font-mono text-ui uppercase tracking-widest text-pencil mb-10">
              About
            </h2>
            <div className="space-y-6 font-body text-body">
              <p>
                I am a Full Stack Engineer specializing in Android and web
                development. My methodology prioritizes clean architecture,
                maintainability, and performance.
              </p>
              <p>
                Leveraging Kotlin for mobile and TypeScript for web, I build
                scalable systems that solve complex problems. My experience
                spans from initial MVP delivery to maintaining high-traffic
                platforms.
              </p>
              <p>
                Precision in documentation and clarity in code are my core
                principles. I believe software should be as legible as it is
                functional.
              </p>
            </div>
            <div className="mt-12 pt-8 border-t border-rule">
              <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase text-pencil">
                {['Kotlin', 'TypeScript', 'NextJS', 'Firebase', 'Android', 'ReactJS'].map(
                  (skill) => (
                    <span key={skill} className="flex items-center gap-2">
                      <span className="text-redline">→</span> {skill}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
          <span className="annotation hidden lg:block absolute right-8 top-16 rotate-2">
            proud of this
          </span>
        </div>
      </section>
    </main>
  );
}

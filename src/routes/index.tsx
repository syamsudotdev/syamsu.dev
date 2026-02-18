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
    <div className="group border border-gray-200 hover:border-l-8 hover:border-l-blue-grotto transition-all duration-75">
      <div className="p-8">
        <div className="mb-6">
          <h3 className="text-2xl font-bold tracking-tight text-navy-blue uppercase">
            {title}
          </h3>
          <p className="text-blue-grotto font-bold text-sm tracking-widest mt-1">
            {time}
          </p>
        </div>

        <p className="text-navy-blue text-lg leading-tight mb-6">
          {shortDescription}
        </p>

        <div className="space-y-2 mb-6">
          {description.split('\n').map((line, index) => (
            <p key={index} className="text-navy-blue flex items-start text-sm">
              <span className="mr-2">→</span>
              {line.replace(/^- /, '')}
            </p>
          ))}
        </div>

        <div className="border-t border-gray-100 pt-6">
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-bold text-blue-grotto uppercase">
            {tech
              .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
              .map((technology, index) => (
                <span key={index}>
                  {technology}
                  {index < tech.length - 1 && <span className="ml-4">/</span>}
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
      {posts.map((post) => (
        <Link
          key={post.slug}
          to="/posts/$slug"
          params={{ slug: post.slug }}
          className="group border-t-2 border-blue pt-6 flex flex-col"
        >
          <p className="text-xs font-bold text-blue-grotto uppercase tracking-widest mb-4">
            {post.date}
          </p>
          <h3 className="text-xl font-bold leading-tight text-navy-blue mb-4 group-hover:text-blue transition-colors">
            {post.title}
          </h3>
          <p className="text-navy-blue/80 leading-snug text-sm flex-1 mb-6">
            {post.short}
          </p>
          <div className="text-navy-blue font-bold text-xs uppercase tracking-widest">
            Read Article →
          </div>
        </Link>
      ))}

      <Link
        to="/posts"
        className="group border-t-2 border-blue pt-6 flex flex-col justify-between"
      >
        <div>
          <h3 className="text-xl font-bold leading-tight text-navy-blue mb-2">
            Archive
          </h3>
          <p className="text-navy-blue/80 text-sm">
            Explore the complete collection of technical thoughts and guides.
          </p>
        </div>
        <div className="mt-8 text-navy-blue font-bold text-xs uppercase tracking-widest">
          View All Posts →
        </div>
      </Link>
    </div>
  );
}

function HomeComponent() {
  const latestPosts = Route.useLoaderData();

  return (
    <main className="min-h-screen bg-white text-navy-blue font-sans selection:bg-blue selection:text-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-12">
          <div className="col-span-12 lg:col-span-8 space-y-12">
            <h1 className="text-6xl md:text-8xl font-bold leading-[0.9] tracking-tighter text-navy-blue">
              FULL STACK
              <br />
              ENGINEER
              <br />
              & MOBILE
              <br />
              DEVELOPER.
            </h1>

            <p className="text-xl md:text-2xl font-medium max-w-2xl leading-tight">
              Crafting robust solutions with {YEARS_EXP} years of expertise in
              Kotlin, TypeScript, and modern ecosystems. Functional simplicity
              meets technical precision.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#works"
                className="px-8 py-4 bg-navy-blue text-white hover:bg-blue transition-colors font-bold uppercase tracking-widest text-sm text-center"
              >
                View Portfolio
              </a>
              <Link
                to="/posts"
                className="px-8 py-4 border-2 border-navy-blue text-navy-blue hover:bg-navy-blue hover:text-white transition-all font-bold uppercase tracking-widest text-sm text-center"
              >
                Read Notes
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Posts */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl font-bold uppercase tracking-tight mb-4">
            Latest Posts
          </h2>
          <div className="w-full border-b-4 border-blue" />
        </div>
        <LatestPosts posts={latestPosts} />
      </section>

      {/* Featured Projects */}
      <section id="works" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl font-bold uppercase tracking-tight mb-4">
            Featured Projects
          </h2>
          <div className="w-full border-b-4 border-blue" />
        </div>

        <div className="grid grid-cols-1 gap-8">
          {PROJECTS.map((data) => (
            <ProjectCard key={`${data.title}-${data.time}`} data={data} />
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about-me" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl font-bold uppercase tracking-tight mb-4 text-navy-blue">
            About
          </h2>
          <div className="w-full border-b-4 border-blue" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <h3 className="text-3xl font-bold leading-none uppercase">
              Sam
              <br />
              Syamsu
            </h3>
          </div>

          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-6 text-lg leading-snug">
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

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-gray-100">
              {[
                { title: 'Development', desc: 'Full-stack systems' },
                { title: 'Mobile', desc: 'Native Kotlin' },
                { title: 'Innovation', desc: 'Modern stacks' },
                { title: 'Collaboration', desc: 'Team leadership' },
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="text-blue-grotto font-black">■</div>
                  <h4 className="font-bold uppercase text-sm">{item.title}</h4>
                  <p className="text-xs text-navy-blue/70">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 pt-8 text-xs font-bold uppercase tracking-widest text-blue-grotto">
              {['Kotlin', 'TypeScript', 'NextJS', 'Firebase', 'Android', 'ReactJS'].map(
                (skill) => (
                  <span key={skill}>→ {skill}</span>
                )
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

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

function Card({ data }: { data: ProjectData }) {
  const { title, shortDescription, description, tech, time } = data;
  return (
    <div className="group flex flex-col text-[#E8F1F2] rounded-xl border border-[#385D65]/30 bg-gradient-to-br from-[#1E363B]/60 to-[#385D65]/40 hover:border-[#385D65]/60 transition-all duration-300 hover:shadow-lg hover:shadow-[#385D65]/20 overflow-hidden">
      <div className="p-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
          <div className="flex-1">
            <h3 className="text-2xl font-bold tracking-tight leading-tight text-[#E8F1F2] group-hover:text-white transition-colors">
              {title}
            </h3>
            <p className="text-[#92B4BC] mt-2 font-medium">{time}</p>
          </div>
        </div>

        <p className="text-[#E8F1F2]/90 text-lg leading-relaxed mb-6">
          {shortDescription}
        </p>

        <div className="space-y-3 mb-6">
          {description.split('\n').map((line, index) => (
            <p
              key={index}
              className="text-[#92B4BC] leading-relaxed flex items-start"
            >
              <span className="text-[#385D65] mr-2 mt-1 text-sm">▸</span>
              {line.replace(/^- /, '')}
            </p>
          ))}
        </div>

        <div className="border-t border-[#385D65]/20 pt-6">
          <p className="text-sm font-medium text-[#92B4BC] mb-3">
            Technologies
          </p>
          <div className="flex flex-wrap gap-2">
            {tech
              .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
              .map((technology, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-[#385D65]/20 text-[#E8F1F2] rounded-full text-sm font-medium border border-[#385D65]/30 hover:bg-[#385D65]/30 transition-colors"
                >
                  {technology}
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
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map(post => (
        <Link
          key={post.slug}
          to="/posts/$slug"
          params={{ slug: post.slug }}
          className="group flex flex-col text-[#E8F1F2] rounded-xl border border-[#385D65]/30 bg-gradient-to-br from-[#1E363B]/60 to-[#385D65]/40 hover:border-[#385D65]/60 transition-all duration-300 hover:shadow-lg hover:shadow-[#385D65]/20 overflow-hidden"
        >
          <div className="flex flex-col p-6 flex-1">
            <h3 className="text-xl font-bold tracking-tight leading-tight text-[#E8F1F2] group-hover:text-white transition-colors mb-3">
              {post.title}
            </h3>
            <p className="text-[#92B4BC] text-sm font-medium mb-4">
              {post.date}
            </p>
            <p className="text-[#E8F1F2]/90 leading-relaxed flex-1 mb-6">
              {post.short}
            </p>
            <div className="flex items-center text-[#92B4BC] group-hover:text-[#E8F1F2] transition-colors text-sm font-medium">
              <span>Read more</span>
              <span className="ml-2 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </div>
          </div>
        </Link>
      ))}

      <Link
        to="/posts"
        className="group flex flex-col justify-center items-center text-[#E8F1F2] rounded-xl border border-[#385D65]/50 bg-gradient-to-br from-[#385D65]/20 to-[#1E363B]/20 hover:border-[#385D65]/80 transition-all duration-300 hover:shadow-lg hover:shadow-[#385D65]/20 min-h-[200px]"
      >
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-[#385D65]/30 rounded-full flex items-center justify-center text-2xl group-hover:bg-[#385D65]/50 transition-colors">
            📚
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#E8F1F2] group-hover:text-white transition-colors mb-2">
              View All Posts
            </h3>
            <p className="text-[#92B4BC] text-sm">
              Explore my complete blog archive
            </p>
          </div>
          <div className="flex items-center text-[#92B4BC] group-hover:text-[#E8F1F2] transition-colors text-sm font-medium">
            <span>Browse all</span>
            <span className="ml-2 group-hover:translate-x-1 transition-transform">
              →
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

function HomeComponent() {
  const latestPosts = Route.useLoaderData();

  return (
    <main className="min-h-screen bg-base-dark">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1E363B] via-[#0F2027] to-[#2C5364] opacity-90" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-[#E8F1F2] to-[#92B4BC] bg-clip-text text-transparent">
                Full Stack
              </span>{' '}
              Engineer
              <br />&{' '}
              <span className="bg-gradient-to-r from-[#E8F1F2] to-[#92B4BC] bg-clip-text text-transparent">
                Mobile
              </span>{' '}
              Developer
            </h1>

            <p className="text-xl md:text-2xl text-[#92B4BC] max-w-2xl mx-auto leading-relaxed">
              With {YEARS_EXP} years of experience crafting fast, efficient
              solutions using Kotlin, TypeScript, NextJS, and Firebase. Welcome
              to my digital portfolio.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <a
                href="#works"
                className="px-[35px] py-[17px] bg-gradient-to-r from-[#385D65] to-[#1E363B] text-[#E8F1F2] rounded-lg transition-all duration-300 font-medium"
              >
                View My Work
              </a>
              <Link
                to="/posts"
                className="px-8 py-4 border border-[#385D65] text-[#E8F1F2] rounded-lg hover:bg-[#385D65]/20 transition-all duration-300 font-medium"
              >
                Read My Posts
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold">
              Latest{' '}
              <span className="bg-gradient-to-r from-[#E8F1F2] to-[#92B4BC] bg-clip-text text-transparent">
                Posts
              </span>
            </h2>
            <p className="text-xl text-[#92B4BC] max-w-2xl mx-auto">
              Thoughts, tutorials, and insights from my journey in tech
            </p>
          </div>

          <LatestPosts posts={latestPosts} />
        </div>
      </section>

      <section
        id="works"
        className="py-20 px-6 bg-gradient-to-b from-[#1E363B]/20 to-transparent"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold">
              Featured{' '}
              <span className="bg-gradient-to-r from-[#E8F1F2] to-[#92B4BC] bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
            <p className="text-xl text-[#92B4BC] max-w-2xl mx-auto">
              A showcase of my recent work and technical achievements
            </p>
          </div>

          <div className="space-y-8">
            {PROJECTS.map(data => (
              <Card key={`${data.title}-${data.time}`} data={data} />
            ))}
          </div>
        </div>
      </section>

      <section id="about-me" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold">
              About{' '}
              <span className="bg-gradient-to-r from-[#E8F1F2] to-[#92B4BC] bg-clip-text text-transparent">
                Me
              </span>
            </h2>
            <p className="text-xl text-[#92B4BC] max-w-2xl mx-auto">
              Passionate about creating digital experiences that make a
              difference
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-[#E8F1F2]">
                  Hello, I&apos;m Sam
                </h3>
                <p className="text-[#92B4BC] leading-relaxed">
                  Hi there! I&apos;m Sam, and I love building things. With{' '}
                  {YEARS_EXP} years in the field, I&apos;ve grown into a Full
                  Stack Engineer who specializes in Android and web development.
                  My toolkit includes Kotlin, TypeScript, NextJS, and Firebase -
                  tools I use to craft fast, efficient solutions that actually
                  work.
                </p>
                <p className="text-[#92B4BC] leading-relaxed">
                  On the Android side, Kotlin is my go-to language. I dig how
                  expressive it is and how it helps me write cleaner code. When
                  I&apos;m working on web projects, I rely on TypeScript to keep
                  things organized and scalable.
                </p>
                <p className="text-[#92B4BC] leading-relaxed">
                  One thing I take pride in is writing code that others can
                  understand and maintain. I believe in solid documentation -
                  not just because it&apos;s good practice, but because I have
                  been on the other side, trying to figure out undocumented
                  code. Trust me, future developers will thank you for good
                  docs!
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {[
                  'Kotlin',
                  'TypeScript',
                  'NextJS',
                  'Firebase',
                  'Android',
                  'ReactJS',
                ].map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-[#385D65]/30 text-[#E8F1F2] rounded-full text-sm font-medium border border-[#385D65]/50"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {[
                {
                  title: 'Development',
                  description:
                    'Full-stack development with modern frameworks and technologies',
                  icon: '💻',
                },
                {
                  title: 'Mobile',
                  description:
                    'Native Android development with Kotlin and modern architecture',
                  icon: '📱',
                },
                {
                  title: 'Innovation',
                  description:
                    'Always exploring new technologies and creative solutions',
                  icon: '🚀',
                },
                {
                  title: 'Collaboration',
                  description:
                    'Working with teams to build amazing products together',
                  icon: '👥',
                },
              ].map((skill, index) => (
                <div
                  key={index}
                  className="text-[#E8F1F2] rounded-lg border border-[#385D65]/30 bg-gradient-to-b from-[#1E363B]/40 to-[#385D65]/40 p-6 text-center space-y-4"
                >
                  <div className="w-12 h-12 mx-auto bg-[#385D65]/30 rounded-xl flex items-center justify-center text-2xl">
                    {skill.icon}
                  </div>
                  <h4 className="font-semibold text-[#E8F1F2]">
                    {skill.title}
                  </h4>
                  <p className="text-sm text-[#92B4BC] leading-relaxed">
                    {skill.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

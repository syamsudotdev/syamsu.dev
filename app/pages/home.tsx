import { ReactNode } from 'react';
import { Link } from 'react-router';
import { Fragment } from 'react/jsx-runtime';
import { PostDetailResult } from '~/loaders/posts';

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
- Cobroke agent : feature to help agents to cobroke other agents' listed properties
- Featured agent : feature to help agents to showcase their profile in certain area
- Unlink Auto-Import : feature to help agents to unlink their auto-imported properties from automated sync
      `.trim(),
    time: '2024 - now',
    tech: ['Android', 'GitHub', 'Java', 'iOS', 'Kotlin', 'Swift'],
  },
  {
    title: 'Mangkunegaran (React-Native, iOS, Android)',
    shortDescription:
      'A mobile application for Mangkunegaran Palace to showcase their collection and history.',
    description: `
- Launched MVP in 3 months time
- Detox end-to-end tests
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
  - Home : homepage dedicated to many of Merdeka Mengajar products
  - Ide Praktik : examples of teaching approaches and tools
  - Untuk Anda : curated articles, videos, documents
  - Pencarian : global search for teaching materials with over 7000 available content
  - Profil : profile page for teachers to showcase their achieved certificates, self-pace learning, and portofolios
  - In-app browser : a wrapper inside our app specifically engineered to support our PWA platforms with JavaScript bridge interface
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
- Launched MVP in 3 months time
- Backoffice report with Looker Studio
- Search job listing with Algolia Search
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
- Registration, login, logout
- KYC form
- Transactions
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
- Launched MVP from scratch in 3 months (offline-first application, unit tests, continous integration, app authentication, purchase order, manage contacts)
- Offline-first app engineered using Android Work Manager and Android Room Database
- Led and grew team from 2 android engineers to 4 android engineers
- Enforced team culture to maintain continous integration, unit tests, and code review
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
- Migrated Java codebase to full Kotlin
- Worked closely with Vietnamese team in English
- Created full-featured chat with Qiscus SDK
- Created full-featured payment with Midtrans SDK
- Led and grew team from 2 android engineers to 4 android engineers
- Managed android engineers' workload
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

function Card(data: { data: ProjectData }) {
  const { title, shortDescription, description, tech, time } = data.data;
  return (
    <div className="text-[#E8F1F2] rounded-lg border border-[#385D65]/30 bg-gradient-to-b from-[#1E363B]/40 to-[#385D65]/40">
      <div className="flex flex-col space-y-1.5 p-6 pb-2">
        <h3 className="pb-2 font-semibold tracking-tight leading-none border-b border-[#385D65]/30">
          {title}
        </h3>
        <p className="text-[#92B4BC]">{time}</p>
        <p>{shortDescription}</p>
      </div>
      {description.split('\n').map(s => (
        <p key={s} className="px-6">
          {s}
        </p>
      ))}
      <div className="flex items-center p-6 pt-0 mt-4">
        Technologies :{' '}
        {tech
          .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
          .join(', ')}
      </div>
    </div>
  );
}

export function LatestPosts({ posts }: { posts: PostDetailResult[] }) {
  return (
    <section
      id="latest-posts"
      className="container mx-auto space-y-6 px-[24px] xl:px-0 xl:w-4/5"
    >
      <div className="flex">
        <h2 className="font-bold tracking-tighter text-[#E8F1F2]">
          Latest Posts
        </h2>
        <Link
          to="/posts"
          className="ml-auto font-bold text-[#E8F1F2] hover:underline"
        >
          All Posts &gt;
        </Link>
      </div>
      <div className="block xl:grid xl:grid-cols-3 xl:gap-4 space-y-4 xl:space-y-0">
        {posts.map(post => (
          <Fragment key={post.slug}>
            <div className="flex flex-col text-[#E8F1F2] rounded-lg border border-[#385D65]/30 bg-gradient-to-b from-[#1E363B]/40 to-[#385D65]/40">
              <div className="flex flex-col space-y-1.5 p-6 pb-2">
                <h3 className="pb-2 font-semibold tracking-tight leading-none border-b border-[#385D65]/30">
                  {post.title}
                </h3>
                <p className="text-[#92B4BC]">{post.date}</p>
                <p>{post.short}</p>
              </div>
              <Link
                to={`/posts/${post.slug}`}
                className="items-center m-6 ml-auto hover:underline"
              >
                See more &gt;
              </Link>
            </div>
          </Fragment>
        ))}
      </div>
    </section>
  );
}

export default function HomePage({ latestPosts }: { latestPosts: ReactNode }) {
  return (
    <main className="flex-col w-full">
      <div className="h-4" />
      {latestPosts}
      <div className="h-10" />
      <section
        id="works"
        className="container mx-auto space-y-6 px-[24px] xl:px-0 xl:w-4/5"
      >
        <h2 className="font-bold tracking-tighter text-[#E8F1F2]">Works</h2>
        {PROJECTS.map(data => (
          <Card key={`${data.title}-${data.time}`} data={data} />
        ))}
      </section>
      <div className="h-10" />
      <section className="container px-[24px] xl:px-0 mx-auto space-y-4 xl:w-4/5">
        <h1 id="about-me" className="font-bold tracking-tighter text-[#E8F1F2]">
          About Me
        </h1>
        <p className="text-[#E8F1F2]">
          Hi there! I&apos;m Sam, and I love building things. With {YEARS_EXP}{' '}
          years in the field, I&apos;ve grown into a Full Stack Engineer who
          specializes in Android and web development. My toolkit includes
          Kotlin, TypeScript, NextJS, and Firebase - tools I use to craft fast,
          efficient solutions that actually work.
        </p>
        <p className="text-[#E8F1F2]">
          On the Android side, Kotlin is my go-to language. I dig how expressive
          it is and how it helps me write cleaner code. When I&apos;m working on
          web projects, I rely on TypeScript to keep things organized and
          scalable.
        </p>
        <p className="text-[#E8F1F2]">
          For web development, NextJS is my framework of choice - it just makes
          sense when you are working with React on the frontend and need solid
          server-side capabilities. When I need to get an MVP out quickly,
          Firebase is my secret weapon.
        </p>
        <p className="text-[#E8F1F2]">
          Speaking of Firebase, I have put pretty much every Firebase tool
          through its paces - from A/B Testing and Remote Config to
          Authentication and Cloud Firestore. These tools are fantastic for
          getting features up and running quickly, especially when you are
          building that crucial first version of a product.
        </p>
        <p className="text-[#E8F1F2]">
          I&apos;m also well-versed in Firebase&apos;s other offerings -
          Crashlytics for keeping tabs on app stability, Cloud Storage for
          handling files, Cloud Messaging for notifications, and Cloud Functions
          for those special backend needs.
        </p>
        <p className="text-[#E8F1F2]">
          One thing I take pride in is writing code that others can understand
          and maintain. I believe in solid documentation - not just because
          it&apos;s good practice, but because I have been on the other side,
          trying to figure out undocumented code. Trust me, future developers
          will thank you for good docs!
        </p>
      </section>
    </main>
  );
}

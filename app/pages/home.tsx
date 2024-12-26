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

export default function HomePage() {
  return (
    <main className="flex-col w-full">
      <section className="flex flex-col xl:justify-center items-center mx-auto w-full xl:w-3/4 h-screen">
        <div className="h-4" />
        <div className="flex flex-col space-y-4 w-[18em] xl:w-[24em]">
          <div className="mx-auto">
            <h1 className="font-bold text-[#E8F1F2] text-2xl max-w-[80vw] xl:max-w-full">
              Hi! I am Sam,
            </h1>
            <div className="h-2" />
            <h1 className="font-bold text-[#E8F1F2] text-2xl max-w-[80vw] xl:max-w-full">
              Your Digital Development Partner
            </h1>
            <div className="h-2" />
            <p className="text-[#92B4BC]">
              With {YEARS_EXP}+ Years Expertise in Android, Kotlin, NodeJS,
              ReactJS, and NextJS. Seamlessly blending tech brilliance and
              aesthetic finesse. Elevate your digital game with me.
            </p>
          </div>
          <p className="mx-auto font-bold text-2xl text-transparent bg-clip-text text-center bg-gradient-to-r from-[#385D65] to-[#E8F1F2]">
            Where Experience Meets Innovation!
          </p>
        </div>
        <div className="h-4" />
        <div className="flex flex-col space-y-4 xl:flex-row xl:space-x-4 xl:space-y-0">
          <a
            className="inline-flex justify-center items-center py-4 w-56 font-medium text-[#1E363B] bg-[#E8F1F2] rounded-md shadow transition-colors hover:border hover:border-[#E8F1F2] hover:bg-[#E8F1F2]/60 hover:text-[#1E363B] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#385D65] xl:w-28 xl:py-2"
            href="mailto:hi@syamsu.dev"
          >
            Get in Touch
          </a>
          <a
            className="inline-flex justify-center items-center py-4 w-56 font-medium text-[#1E363B] bg-[#E8F1F2] rounded-md shadow transition-colors hover:border hover:border-[#E8F1F2] hover:bg-[#E8F1F2]/60 hover:text-[#1E363B] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#385D65] xl:w-28 xl:py-2"
            href="#works"
          >
            My Works
          </a>
          <a
            className="inline-flex justify-center items-center py-4 w-56 font-medium text-[#E8F1F2] rounded-md border border-[#E8F1F2] shadow transition-colors hover:bg-[#E8F1F2]/90 hover:text-[#1E363B] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#385D65] xl:w-28 xl:py-2"
            href="#about-me"
          >
            About Me
          </a>
        </div>
      </section>
      <div className="h-4" />
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
          Hello, I&apos;m Sam, a Full Stack Engineer with a wealth of experience
          in Android app and web development, complemented by expertise in using
          Firebase products. My proficiency in technologies like Kotlin,
          TypeScript, NextJS, and Firebase positions me as a full stack engineer
          capable of delivering quick, efficient, and high-quality solutions for
          both web and Android platforms. With {YEARS_EXP} years of professional
          experience, I&apos;ve become adept at crafting robust and innovative
          solutions that span various technologies.
        </p>
        <p className="text-[#E8F1F2]">
          In Android app development, I&apos;m a proficient user of Kotlin,
          leveraging its expressive syntax and powerful features to create
          efficient and user-friendly mobile applications. For web development,
          TypeScript is my language of choice, allowing me to build dynamic and
          scalable web applications.
        </p>
        <p className="text-[#E8F1F2]">
          In full-stack development, I prefer NextJS as my web framework,
          seamlessly integrating ReactJS for the user interface and NodeJS for
          the backend. While I excel in a variety of technologies, I
          specifically turn to Firebase products for quick Minimum Viable
          Product (MVP) development.
        </p>
        <p className="text-[#E8F1F2]">
          I have a wealth of experience in utilizing Firebase products such as
          A/B Testing, Remote Config, Authentication, and Cloud Firestore to
          rapidly implement features for MVPs. These tools enable me to swiftly
          incorporate dynamic configuration changes, user authentication, and
          efficient data storage, creating a seamless and personalized
          experience for users during the initial development phases.
        </p>
        <p className="text-[#E8F1F2]">
          Additionally, I am well-versed in Firebase Crashlytics to ensure
          stability, Firebase Cloud Storage for scalable cloud storage needs,
          Firebase Cloud Messaging for streamlined communication, and Firebase
          Cloud Functions for extending functionality as needed.
        </p>
        <p className="text-[#E8F1F2]">
          In addition to crafting exemplary code, I&apos;m dedicated to
          knowledge sharing. Through comprehensive documentation, I ensure that
          the next developer, whether a colleague or successor, can seamlessly
          pick up where I left off. This commitment to thorough documentation
          not only facilitates smooth transitions but also contributes to the
          overall sustainability of the projects I undertake.
        </p>
      </section>
    </main>
  );
}

// Skills and capabilities shown in the Expertise and Technical stack sections.
// `icon` is a Simple Icons export name (https://simpleicons.org); leave it out
// for skills without a recognisable logo and the label is shown on its own.

export interface Skill {
  label: string;
  icon?: string;
}

export interface SkillGroup {
  id: string;
  title: string;
  summary: string;
  skills: Skill[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    summary: 'Interfaces that are fast, accessible and easy to maintain.',
    skills: [
      { label: 'JavaScript', icon: 'siJavascript' },
      { label: 'React', icon: 'siReact' },
      { label: 'Next.js', icon: 'siNextdotjs' },
      { label: 'Vue.js', icon: 'siVuedotjs' },
      { label: 'Tailwind CSS', icon: 'siTailwindcss' },
      { label: 'HTML', icon: 'siHtml5' },
      { label: 'CSS', icon: 'siCss' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    summary: 'APIs, business logic, authentication and integrations.',
    skills: [
      { label: 'Python', icon: 'siPython' },
      { label: 'Django', icon: 'siDjango' },
      { label: 'Django REST Framework' },
      { label: 'Node.js', icon: 'siNodedotjs' },
      { label: 'PHP', icon: 'siPhp' },
    ],
  },
  {
    id: 'mobile',
    title: 'Mobile',
    summary: 'Native Android apps with shared Kotlin where it helps.',
    skills: [
      { label: 'Android', icon: 'siAndroid' },
      { label: 'Kotlin', icon: 'siKotlin' },
      { label: 'Kotlin Multiplatform', icon: 'siKotlin' },
      { label: 'Jetpack Compose', icon: 'siJetpackcompose' },
    ],
  },
  {
    id: 'ai',
    title: 'Artificial intelligence',
    summary: 'Language models and retrieval built into real products.',
    skills: [
      { label: 'Large language models' },
      { label: 'AI integrations' },
      { label: 'Retrieval-augmented generation' },
      { label: 'Embeddings' },
      { label: 'Vector databases' },
      { label: 'Computer vision', icon: 'siOpencv' },
    ],
  },
  {
    id: 'voice',
    title: 'AI voice & automation',
    summary: 'Agents that talk to people and to other systems.',
    skills: [
      { label: 'Retell AI' },
      { label: 'Conversational voice agents' },
      { label: 'Website integrations' },
      { label: 'n8n', icon: 'siN8n' },
      { label: 'Workflow automation' },
      { label: 'API integrations' },
    ],
  },
  {
    id: 'data',
    title: 'Databases & infrastructure',
    summary: 'Storage, search and deployment for production systems.',
    skills: [
      { label: 'PostgreSQL', icon: 'siPostgresql' },
      { label: 'SQL & NoSQL' },
      { label: 'Redis', icon: 'siRedis' },
      { label: 'ChromaDB' },
      { label: 'Pinecone' },
      { label: 'Docker', icon: 'siDocker' },
      { label: 'Nginx', icon: 'siNginx' },
      { label: 'Cloud deployment' },
    ],
  },
];

export const expertise = [
  {
    number: '01',
    icon: 'browser',
    title: 'Full-Stack Web Development',
    text: 'Building modern web applications, dashboards, business platforms, REST APIs, authentication systems and scalable backend services.',
    tech: ['React', 'Next.js', 'Vue.js', 'Django', 'Node.js', 'PostgreSQL'],
  },
  {
    number: '02',
    icon: 'phone',
    title: 'Mobile Application Development',
    text: 'Developing practical Android applications with intuitive interfaces, structured architecture and reliable functionality.',
    tech: ['Android', 'Kotlin', 'Jetpack Compose', 'Kotlin Multiplatform'],
  },
  {
    number: '03',
    icon: 'spark',
    title: 'AI & Intelligent Applications',
    text: 'Integrating LLMs, retrieval systems, vector databases and AI capabilities into useful software products.',
    tech: ['LLMs', 'RAG', 'Embeddings', 'ChromaDB', 'Pinecone'],
  },
  {
    number: '04',
    icon: 'wave',
    title: 'Voice AI & Automation',
    text: 'Building conversational voice agents with Retell AI, integrating agents into websites, connecting business systems and automating workflows with APIs and automation platforms.',
    tech: ['Retell AI', 'Webhooks', 'REST APIs', 'n8n'],
  },
] as const;

export const process = [
  { title: 'Understand', text: 'Clarify the problem, the people who will use the product and the requirements.' },
  { title: 'Design', text: 'Plan the architecture and the user experience before writing the code.' },
  { title: 'Build', text: 'Develop, integrate, test and refine the solution in working increments.' },
  { title: 'Deliver', text: 'Deploy, document and support the product as agreed.' },
] as const;

export const highlights = [
  { title: 'End-to-end product development', text: 'From the first conversation to a product in people’s hands.' },
  { title: 'API design and system integrations', text: 'Connecting payments, messaging, CRMs and internal tools.' },
  { title: 'AI and voice agent implementation', text: 'Agents that answer, understand and take action.' },
  { title: 'Deployment and production-oriented engineering', text: 'Shipping to real users, with code that stays easy to change.' },
] as const;

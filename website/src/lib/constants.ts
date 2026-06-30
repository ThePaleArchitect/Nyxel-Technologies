export interface SLAItem {
  tier: string;
  responseTime: string;
  whoReplies: string;
}

export interface CharterPrinciple {
  num: string;
  title: string;
  description: string;
}

export interface RosterMember {
  handle: string;
  role: string;
  experience: string;
  stack: string[];
  timezone: string;
}

export const SLA_TABLE: SLAItem[] = [
  { tier: 'Personal', responseTime: '24–48 hrs', whoReplies: 'Senior Frontend Engineer' },
  { tier: 'Incubation', responseTime: '12–24 hrs', whoReplies: 'Lead Architect' },
  { tier: 'Scale', responseTime: '4–12 hrs', whoReplies: 'Lead Architect + CTO Advisor' },
  { tier: 'Incident', responseTime: '≤2 hrs', whoReplies: 'On-call Engineering Lead' },
];

export const CHARTER_PRINCIPLES: CharterPrinciple[] = [
  {
    num: 'I',
    title: 'Exclusivity & Full IP Ownership',
    description: 'Your intellectual property is yours—exclusively. We retain nothing, we fork nothing. We sign your NDA before we even see your repository.',
  },
  {
    num: 'II',
    title: 'Extreme Anonymity',
    description: 'We do not advertise our builders, our founders, or our client names. We write code, build infrastructure, and disappear in silence.',
  },
  {
    num: 'III',
    title: 'Zero Technical Debt Tolerance',
    description: 'Every backend, API, and cloud deployment is written with static type verification, strict logging, and robust test suites targeting >90% coverage.',
  },
  {
    num: 'IV',
    title: 'Strict Security Isolation',
    description: 'We enforce compartmentalization. No single engineer touches your entire stack. Squads are assembled dynamically with isolated access rights.',
  },
  {
    num: 'V',
    title: 'Immutable Integrity',
    description: 'Our work guidelines and operational rules are verified and attested on-chain. We stand by our contracts and release milestones with cryptographic proof.',
  },
  {
    num: 'VI',
    title: 'Rapid Stabilization Response',
    description: 'For critical systems, our on-call engineers respond within 2 hours. Triage, stabilization, hotfix deployment, and complete RCAs are executed immediately.',
  },
];

export const ROSTER: RosterMember[] = [
  {
    handle: 'Architect Ω',
    role: 'Lead Systems Architect',
    experience: '16 yrs',
    stack: ['Rust', 'Go', 'K8s', 'CockroachDB'],
    timezone: 'UTC -5',
  },
  {
    handle: 'Distributed Δ',
    role: 'Senior Backend Engineer',
    experience: '12 yrs',
    stack: ['Node.js', 'Python', 'Kafka', 'Redis'],
    timezone: 'UTC +1',
  },
  {
    handle: 'Interface Γ',
    role: 'Principal Frontend Engineer',
    experience: '10 yrs',
    stack: ['React', 'Next.js', 'Framer', 'Tailwind'],
    timezone: 'UTC -8',
  },
  {
    handle: 'Cloud Ψ',
    role: 'DevOps / SRE Lead',
    experience: '14 yrs',
    stack: ['Terraform', 'AWS/GCP', 'Prometheus'],
    timezone: 'UTC +3',
  },
  {
    handle: 'Data Σ',
    role: 'Data / ML Engineer',
    experience: '9 yrs',
    stack: ['PostgreSQL', 'Snowflake', 'dbt', 'Python'],
    timezone: 'UTC +5:30',
  },
  {
    handle: 'Mobile Ξ',
    role: 'Mobile Architect',
    experience: '11 yrs',
    stack: ['Swift', 'Kotlin', 'React Native'],
    timezone: 'UTC +10',
  },
];

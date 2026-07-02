export type Company = {
  id: string;
  name: string;
  url: string;
  description: string;
};

export type Service = {
  id: string;
  title: string;
  description: string;
};

export type Experience = {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
};

/** Content sourced from faridaiman.com */
export const COMPANIES: Company[] = [
  {
    id: "ctos",
    name: "CTOS",
    url: "https://ctosdigital.com/",
    description:
      "CTOS is a credit scoring platform that helps businesses to assess the creditworthiness of their customers. It uses advanced algorithms to analyze a customer's financial history, credit score, and other relevant data to determine their creditworthiness.",
  },
  {
    id: "esri-malaysia",
    name: "Esri Malaysia",
    url: "https://esrimalaysia.com.my/",
    description:
      "Esri Malaysia, founded in 1983, is the exclusive distributor of Esri's ArcGIS. Based in Selangor, it delivers GIS solutions, modernises geospatial infrastructure, and supports government and enterprises with advanced spatial analytics.",
  },
  {
    id: "aleph-labs",
    name: "Aleph Labs",
    url: "https://www.aleph-labs.com",
    description:
      "Aleph Labs, founded in 2006 in Singapore, is a creative engineering studio blending research, design, and technology to craft impactful digital experiences across industries, fostering innovation, collaboration, and user-centered solutions.",
  },
];

export const SERVICES: Service[] = [
  {
    id: "web-app-development",
    title: "End-to-End Web App Development",
    description:
      "I deliver complete web solutions from front-end to backend integrations, ensuring scalability, performance, and seamless user experiences across the entire development lifecycle.",
  },
  {
    id: "micro-frontends",
    title: "Micro Front-ends Development",
    description:
      "I design and implement micro front-end architectures, enabling modular, maintainable, and independent deployment of UI components for complex enterprise-scale applications.",
  },
  {
    id: "workflow-automation",
    title: "Business Workflow Automation",
    description:
      "I streamline business processes using n8n, automating repetitive tasks, integrating services, and boosting efficiency with customized, low-code workflow automation solutions.",
  },
];

export const SKILLS = [
  "Web Development",
  "Software Engineering",
  "React",
  "Next.js",
  "JavaScript",
  "TypeScript",
  "Full Stack Development",
  "AI Engineering",
  "Micro Frontends",
  "Workflow Automation",
] as const;

export const EXPERIENCE: Experience[] = [
  {
    id: "ctos-exp",
    company: "CTOS Data Systems",
    role: "Software Engineer",
    period: "2024 — Present",
    description:
      "Building enterprise credit scoring and assessment platforms for businesses across Malaysia.",
  },
  {
    id: "esri-exp",
    company: "Esri Malaysia",
    role: "Software Developer",
    period: "2022 — 2024",
    description:
      "Delivered GIS solutions and geospatial web applications for government and enterprise clients.",
  },
  {
    id: "aleph-exp",
    company: "Aleph Labs",
    role: "Frontend Engineer",
    period: "2020 — 2022",
    description:
      "Built micro front-end architectures and creative digital experiences for enterprise clients.",
  },
];

export const PORTFOLIO_BIO =
  "Software Engineering not only as a profession but also as a passion. I love to create and innovate, always striving to improve my skills and knowledge in the field.";

export const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/farid-aiman-mohamed-ali/",
  },
  { label: "GitHub", href: "https://github.com/ifaridaiman" },
  { label: "Threads", href: "https://www.threads.com/@ifaridaiman" },
] as const;

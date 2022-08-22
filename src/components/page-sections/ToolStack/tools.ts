import { IconType } from 'react-icons';
import { AiFillGithub, AiFillHtml5 } from 'react-icons/ai';
import { FaCss3Alt, FaBootstrap, FaReact, FaVuejs, FaGitSquare, FaNodeJs } from 'react-icons/fa';
import {
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiExpress,
  SiNuxtdotjs,
  SiMysql,
  SiJavascript,
  SiJest,
  SiPrisma,
  SiCypress,
  SiPostgresql,
} from 'react-icons/si';

export interface ITool {
  col: number;
  row: number;
  icon: IconType;
  title: string;
  href: string;
}

export const tools: ITool[] = [
  {
    col: 4,
    row: 1,
    icon: FaCss3Alt,
    title: 'CSS 3',
    href: 'https://www.w3.org/Style/CSS/Overview.en.html',
  },
  {
    col: 6,
    row: 1,
    href: 'https://www.w3.org/TR/2014/REC-html5-20141028/',
    title: 'HTML 5',
    icon: AiFillHtml5,
  },
  {
    col: 2,
    row: 2,
    href: 'https://nextjs.org/',
    title: 'Next JS',
    icon: SiNextdotjs,
  },
  {
    col: 8,
    row: 2,
    href: 'https://getbootstrap.com',
    title: 'Bootstrap',
    icon: FaBootstrap,
  },
  {
    col: 4,
    row: 3,
    href: 'https://reactjs.org/',
    title: 'React JS',
    icon: FaReact,
  },
  {
    col: 6,
    row: 3,
    href: 'https://tailwindcss.com/',
    title: 'Tailwin: CSS',
    icon: SiTailwindcss,
  },
  {
    col: 1,
    row: 4,
    href: 'https://vuejs.org',
    title: 'Vu: JS',
    icon: FaVuejs,
  },
  {
    col: 9,
    row: 4,
    href: 'http://expressjs.com/',
    title: 'Expres: JS',
    icon: SiExpress,
  },
  {
    col: 3,
    row: 5,
    href: 'https://git-scm.com',
    title: 'Git',
    icon: FaGitSquare,
  },
  {
    col: 5,
    row: 5,
    href: 'https://www.typescriptlang.org',
    title: 'Typescript',
    icon: SiTypescript,
  },
  {
    col: 7,
    row: 5,
    href: 'https://www.nodejs.org',
    title: 'Nod: JS',
    icon: FaNodeJs,
  },
  {
    col: 1,
    row: 6,
    href: 'https://nuxtjs.org/',
    title: 'Nux: JS',
    icon: SiNuxtdotjs,
  },
  {
    col: 9,
    row: 6,
    href: 'https://www.mysql.com',
    title: 'MySql',
    icon: SiMysql,
  },
  {
    col: 4,
    row: 7,
    href: 'https://www.javascript.com',
    title: 'Javascript',
    icon: SiJavascript,
  },
  {
    col: 6,
    row: 7,
    href: 'https://jestjs.io',
    title: 'Jest',
    icon: SiJest,
  },
  {
    col: 2,
    row: 8,
    href: 'https://github.com',
    title: 'Github',
    icon: AiFillGithub,
  },
  {
    col: 8,
    row: 8,
    href: 'https://www.prisma.io/',
    title: 'Prisma',
    icon: SiPrisma,
  },
  {
    col: 4,
    row: 9,
    href: 'https://www.cypress.io/',
    title: 'Cypress',
    icon: SiCypress,
  },
  {
    col: 6,
    row: 9,
    href: 'https://www.postgresql.org',
    title: 'PostgreSql',
    icon: SiPostgresql,
  },
];

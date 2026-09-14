export type Skill = {
  id: number;
  name: string;
  slug: string;
  iconKey: string;
  accent: string;
};

export type PortfolioData = {
  profile: {
    fullName: string;
    eyebrow: string;
    tagline: string;
    description: string;
    biography: string;
    portraitPath: string;
    location: string;
    availability: string;
  };
  socials: Array<{ platform: string; label: string; url: string }>;
  photos: Array<{
    id: number;
    src: string;
    alt: string;
    caption: string;
    width: number;
    height: number;
  }>;
  projects: Array<{
    id: number;
    title: string;
    slug: string;
    kicker: string;
    summary: string;
    url: string | null;
    skills: Skill[];
  }>;
  experiences: Array<{
    id: number;
    title: string;
    kicker: string;
    summary: string;
    skills: Skill[];
  }>;
  posts: Post[];
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  publishedAt: Date;
  readingMinutes: number;
};

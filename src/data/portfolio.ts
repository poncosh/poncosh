import { asc, eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { cache } from "react";
import { getDb } from "@/db/client";
import {
  experiences,
  experienceSkills,
  photos,
  posts,
  profiles,
  projects,
  projectSkills,
  skills,
  socialLinks,
} from "@/db/schema";
import { fallbackData } from "./fallback";
import type { PortfolioData, Post, Skill } from "./types";

function shouldUseBuildFallback() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) return true;

  if (process.env.NEXT_PHASE !== "phase-production-build") return false;

  try {
    return new URL(connectionString).hostname.endsWith(".internal");
  } catch {
    return false;
  }
}

async function readPortfolioFromDatabase(): Promise<PortfolioData> {
  const db = getDb();
  const [profileRows, socialRows, photoRows, projectRows, experienceRows, postRows, projectSkillRows, experienceSkillRows] =
    await Promise.all([
        db.select().from(profiles).where(eq(profiles.id, 1)).limit(1),
        db.select().from(socialLinks).where(eq(socialLinks.profileId, 1)).orderBy(asc(socialLinks.sortOrder), asc(socialLinks.id)),
        db.select().from(photos).orderBy(asc(photos.sortOrder), asc(photos.id)),
        db.select().from(projects).orderBy(asc(projects.sortOrder), asc(projects.id)),
        db.select().from(experiences).orderBy(asc(experiences.sortOrder), asc(experiences.id)),
        db.select().from(posts).where(eq(posts.status, "published")).orderBy(asc(posts.publishedAt), asc(posts.id)),
        db.select({
          projectId: projectSkills.projectId,
          id: skills.id,
          name: skills.name,
          slug: skills.slug,
          iconKey: skills.iconKey,
          accent: skills.accent,
        }).from(projectSkills).innerJoin(skills, eq(projectSkills.skillId, skills.id)).orderBy(asc(projectSkills.projectId), asc(projectSkills.sortOrder), asc(projectSkills.skillId)),
        db.select({
          experienceId: experienceSkills.experienceId,
          id: skills.id,
          name: skills.name,
          slug: skills.slug,
          iconKey: skills.iconKey,
          accent: skills.accent,
        }).from(experienceSkills).innerJoin(skills, eq(experienceSkills.skillId, skills.id)).orderBy(asc(experienceSkills.experienceId), asc(experienceSkills.sortOrder), asc(experienceSkills.skillId)),
    ]);

  const profile = profileRows[0];
  if (!profile) return fallbackData;

  const byProject = new Map<number, Skill[]>();
  for (const row of projectSkillRows) {
    const collection = byProject.get(row.projectId) ?? [];
    collection.push(row);
    byProject.set(row.projectId, collection);
  }

  const byExperience = new Map<number, Skill[]>();
  for (const row of experienceSkillRows) {
    const collection = byExperience.get(row.experienceId) ?? [];
    collection.push(row);
    byExperience.set(row.experienceId, collection);
  }

  return {
    profile,
    socials: socialRows,
    photos: photoRows,
    projects: projectRows.map((project) => ({ ...project, skills: byProject.get(project.id) ?? [] })),
    experiences: experienceRows.map((experience) => ({ ...experience, skills: byExperience.get(experience.id) ?? [] })),
    posts: postRows,
  };
}

const getCachedPortfolioData = unstable_cache(
  readPortfolioFromDatabase,
  ["portfolio-data-v1"],
  {
    revalidate: 3600,
    tags: ["portfolio-data"],
  },
);

function hydratePortfolioData(data: PortfolioData): PortfolioData {
  return {
    ...data,
    posts: data.posts.map((post) => ({
      ...post,
      publishedAt: new Date(post.publishedAt),
    })),
  };
}

async function readPortfolio(): Promise<PortfolioData> {
  if (shouldUseBuildFallback()) return hydratePortfolioData(fallbackData);

  try {
    const data = await getCachedPortfolioData();
    return hydratePortfolioData(data);
  } catch (error) {
    console.warn("Portfolio database unavailable; using bundled seed data.", error);
    return hydratePortfolioData(fallbackData);
  }
}

export const getPortfolioData = cache(readPortfolio);

export const getPostBySlug = cache(async (slug: string): Promise<Post | null> => {
  const data = await getPortfolioData();
  return data.posts.find((post) => post.slug === slug) ?? null;
});

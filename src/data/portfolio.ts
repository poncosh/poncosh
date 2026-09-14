import { asc, eq } from "drizzle-orm";
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

async function readPortfolio(): Promise<PortfolioData> {
  if (shouldUseBuildFallback()) return fallbackData;

  try {
    const db = getDb();
    const [profileRows, socialRows, photoRows, projectRows, experienceRows, postRows, projectSkillRows, experienceSkillRows] =
      await Promise.all([
        db.select().from(profiles).limit(1),
        db.select().from(socialLinks).orderBy(asc(socialLinks.sortOrder)),
        db.select().from(photos).orderBy(asc(photos.sortOrder)),
        db.select().from(projects).orderBy(asc(projects.sortOrder)),
        db.select().from(experiences).orderBy(asc(experiences.sortOrder)),
        db.select().from(posts).where(eq(posts.status, "published")).orderBy(asc(posts.publishedAt)),
        db.select({
          projectId: projectSkills.projectId,
          id: skills.id,
          name: skills.name,
          slug: skills.slug,
          iconKey: skills.iconKey,
          accent: skills.accent,
        }).from(projectSkills).innerJoin(skills, eq(projectSkills.skillId, skills.id)).orderBy(asc(projectSkills.sortOrder)),
        db.select({
          experienceId: experienceSkills.experienceId,
          id: skills.id,
          name: skills.name,
          slug: skills.slug,
          iconKey: skills.iconKey,
          accent: skills.accent,
        }).from(experienceSkills).innerJoin(skills, eq(experienceSkills.skillId, skills.id)).orderBy(asc(experienceSkills.sortOrder)),
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
  } catch (error) {
    console.warn("Portfolio database unavailable; using bundled seed data.", error);
    return fallbackData;
  }
}

export const getPortfolioData = cache(readPortfolio);

export const getPostBySlug = cache(async (slug: string): Promise<Post | null> => {
  const data = await getPortfolioData();
  return data.posts.find((post) => post.slug === slug) ?? null;
});

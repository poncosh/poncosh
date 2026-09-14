import {
  boolean,
  integer,
  pgSchema,
  primaryKey,
  serial,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

export const portfolio = pgSchema("portfolio");

export const profiles = portfolio.table("profiles", {
  id: serial("id").primaryKey(),
  fullName: varchar("full_name", { length: 120 }).notNull(),
  eyebrow: varchar("eyebrow", { length: 120 }).notNull(),
  tagline: varchar("tagline", { length: 180 }).notNull(),
  description: varchar("description", { length: 400 }).notNull(),
  portraitPath: varchar("portrait_path", { length: 255 }).notNull(),
  location: varchar("location", { length: 120 }).notNull(),
  availability: varchar("availability", { length: 160 }).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const socialLinks = portfolio.table("social_links", {
  id: serial("id").primaryKey(),
  profileId: integer("profile_id").references(() => profiles.id, { onDelete: "cascade" }).notNull(),
  platform: varchar("platform", { length: 32 }).notNull(),
  label: varchar("label", { length: 80 }).notNull(),
  url: varchar("url", { length: 255 }).notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
});

export const photos = portfolio.table("photos", {
  id: serial("id").primaryKey(),
  src: varchar("src", { length: 255 }).notNull(),
  alt: varchar("alt", { length: 180 }).notNull(),
  caption: varchar("caption", { length: 180 }).notNull(),
  width: integer("width").notNull(),
  height: integer("height").notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
});

export const skills = portfolio.table("skills", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull(),
  category: varchar("category", { length: 50 }).notNull(),
  iconKey: varchar("icon_key", { length: 50 }).notNull(),
  accent: varchar("accent", { length: 20 }).notNull(),
}, (table) => [uniqueIndex("skills_slug_unique").on(table.slug)]);

export const projects = portfolio.table("projects", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 140 }).notNull(),
  slug: varchar("slug", { length: 120 }).notNull(),
  kicker: varchar("kicker", { length: 80 }).notNull(),
  summary: text("summary").notNull(),
  url: varchar("url", { length: 255 }),
  sortOrder: integer("sort_order").default(0).notNull(),
}, (table) => [uniqueIndex("projects_slug_unique").on(table.slug)]);

export const projectSkills = portfolio.table("project_skills", {
  projectId: integer("project_id").references(() => projects.id, { onDelete: "cascade" }).notNull(),
  skillId: integer("skill_id").references(() => skills.id, { onDelete: "cascade" }).notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
}, (table) => [primaryKey({ columns: [table.projectId, table.skillId] })]);

export const experiences = portfolio.table("experiences", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 140 }).notNull(),
  kicker: varchar("kicker", { length: 80 }).notNull(),
  summary: text("summary").notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
});

export const experienceSkills = portfolio.table("experience_skills", {
  experienceId: integer("experience_id").references(() => experiences.id, { onDelete: "cascade" }).notNull(),
  skillId: integer("skill_id").references(() => skills.id, { onDelete: "cascade" }).notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
}, (table) => [primaryKey({ columns: [table.experienceId, table.skillId] })]);

export const posts = portfolio.table("posts", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 140 }).notNull(),
  title: varchar("title", { length: 180 }).notNull(),
  excerpt: text("excerpt").notNull(),
  body: text("body").notNull(),
  status: varchar("status", { length: 20 }).default("draft").notNull(),
  featured: boolean("featured").default(false).notNull(),
  readingMinutes: integer("reading_minutes").default(1).notNull(),
  publishedAt: timestamp("published_at", { withTimezone: true }).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => [uniqueIndex("posts_slug_unique").on(table.slug)]);


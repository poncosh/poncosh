CREATE SCHEMA IF NOT EXISTS "portfolio";
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "portfolio"."profiles" (
  "id" serial PRIMARY KEY NOT NULL,
  "full_name" varchar(120) NOT NULL,
  "eyebrow" varchar(120) NOT NULL,
  "tagline" varchar(180) NOT NULL,
  "description" varchar(400) NOT NULL,
  "portrait_path" varchar(255) NOT NULL,
  "location" varchar(120) NOT NULL,
  "availability" varchar(160) NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "portfolio"."social_links" (
  "id" serial PRIMARY KEY NOT NULL,
  "profile_id" integer NOT NULL,
  "platform" varchar(32) NOT NULL,
  "label" varchar(80) NOT NULL,
  "url" varchar(255) NOT NULL,
  "sort_order" integer DEFAULT 0 NOT NULL,
  CONSTRAINT "social_links_profile_id_profiles_id_fk"
    FOREIGN KEY ("profile_id") REFERENCES "portfolio"."profiles"("id") ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "portfolio"."photos" (
  "id" serial PRIMARY KEY NOT NULL,
  "src" varchar(255) NOT NULL,
  "alt" varchar(180) NOT NULL,
  "caption" varchar(180) NOT NULL,
  "width" integer NOT NULL,
  "height" integer NOT NULL,
  "sort_order" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "portfolio"."skills" (
  "id" serial PRIMARY KEY NOT NULL,
  "name" varchar(100) NOT NULL,
  "slug" varchar(100) NOT NULL,
  "category" varchar(50) NOT NULL,
  "icon_key" varchar(50) NOT NULL,
  "accent" varchar(20) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "skills_slug_unique" ON "portfolio"."skills" ("slug");
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "portfolio"."projects" (
  "id" serial PRIMARY KEY NOT NULL,
  "title" varchar(140) NOT NULL,
  "slug" varchar(120) NOT NULL,
  "kicker" varchar(80) NOT NULL,
  "summary" text NOT NULL,
  "url" varchar(255),
  "sort_order" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "projects_slug_unique" ON "portfolio"."projects" ("slug");
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "portfolio"."project_skills" (
  "project_id" integer NOT NULL,
  "skill_id" integer NOT NULL,
  "sort_order" integer DEFAULT 0 NOT NULL,
  CONSTRAINT "project_skills_project_id_skill_id_pk" PRIMARY KEY ("project_id", "skill_id"),
  CONSTRAINT "project_skills_project_id_projects_id_fk"
    FOREIGN KEY ("project_id") REFERENCES "portfolio"."projects"("id") ON DELETE cascade,
  CONSTRAINT "project_skills_skill_id_skills_id_fk"
    FOREIGN KEY ("skill_id") REFERENCES "portfolio"."skills"("id") ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "portfolio"."experiences" (
  "id" serial PRIMARY KEY NOT NULL,
  "title" varchar(140) NOT NULL,
  "kicker" varchar(80) NOT NULL,
  "summary" text NOT NULL,
  "sort_order" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "portfolio"."experience_skills" (
  "experience_id" integer NOT NULL,
  "skill_id" integer NOT NULL,
  "sort_order" integer DEFAULT 0 NOT NULL,
  CONSTRAINT "experience_skills_experience_id_skill_id_pk" PRIMARY KEY ("experience_id", "skill_id"),
  CONSTRAINT "experience_skills_experience_id_experiences_id_fk"
    FOREIGN KEY ("experience_id") REFERENCES "portfolio"."experiences"("id") ON DELETE cascade,
  CONSTRAINT "experience_skills_skill_id_skills_id_fk"
    FOREIGN KEY ("skill_id") REFERENCES "portfolio"."skills"("id") ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "portfolio"."posts" (
  "id" serial PRIMARY KEY NOT NULL,
  "slug" varchar(140) NOT NULL,
  "title" varchar(180) NOT NULL,
  "excerpt" text NOT NULL,
  "body" text NOT NULL,
  "status" varchar(20) DEFAULT 'draft' NOT NULL,
  "featured" boolean DEFAULT false NOT NULL,
  "reading_minutes" integer DEFAULT 1 NOT NULL,
  "published_at" timestamp with time zone NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL,
  CONSTRAINT "posts_status_check" CHECK ("status" IN ('draft', 'published'))
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "posts_slug_unique" ON "portfolio"."posts" ("slug");


import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import pg from "pg";

const { Client } = pg;
const connectionString = process.env.DATABASE_URL;

if (!connectionString) throw new Error("DATABASE_URL is required");

const client = new Client({
  connectionString,
  ssl: process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: false } : false,
});

const seedPath = resolve(process.cwd(), "drizzle/seed.sql");
const seed = await readFile(seedPath, "utf8");

await client.connect();
try {
  await client.query(seed);
  console.info("Portfolio seed data is up to date.");
} finally {
  await client.end();
}


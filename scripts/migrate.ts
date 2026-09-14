import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import pg from "pg";

const { Client } = pg;
const connectionString = process.env.DATABASE_URL;

if (!connectionString) throw new Error("DATABASE_URL is required");

const client = new Client({
  connectionString,
  ssl: process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: true } : false,
});

const migrationPath = resolve(process.cwd(), "drizzle/0000_portfolio.sql");
const migration = await readFile(migrationPath, "utf8");

await client.connect();
try {
  await client.query("BEGIN");
  for (const statement of migration.split("--> statement-breakpoint").map((part) => part.trim()).filter(Boolean)) {
    await client.query(statement);
  }
  await client.query("COMMIT");
  console.info("Portfolio schema is up to date.");
} catch (error) {
  await client.query("ROLLBACK");
  throw error;
} finally {
  await client.end();
}

import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const globalForDb = globalThis as unknown as { portfolioPool?: Pool };

function createPool() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is not configured");
  }

  return new Pool({
    connectionString,
    connectionTimeoutMillis: 4_000,
    idleTimeoutMillis: 20_000,
    max: process.env.NODE_ENV === "production" ? 1 : 10,
    ssl: process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: false } : false,
  });
}

export function getDb() {
  const pool = globalForDb.portfolioPool ?? createPool();
  globalForDb.portfolioPool = pool;

  return drizzle(pool);
}

import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const globalForDb = globalThis as unknown as { portfolioPool?: Pool };

function positiveInteger(name: string, fallback: number) {
  const rawValue = process.env[name];

  if (!rawValue) return fallback;

  const value = Number(rawValue);

  if (!Number.isInteger(value) || value <= 0) {
    throw new Error(`${name} must be a positive integer`);
  }

  return value;
}

function createPool() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is not configured");
  }

  return new Pool({
    application_name: "portfolio-vercel",
    connectionString,
    connectionTimeoutMillis: positiveInteger("DATABASE_CONNECTION_TIMEOUT_MS", 5_000),
    idleTimeoutMillis: positiveInteger("DATABASE_IDLE_TIMEOUT_MS", 30_000),
    keepAlive: true,
    keepAliveInitialDelayMillis: 10_000,
    max: positiveInteger("DATABASE_POOL_MAX", 15),
    maxLifetimeSeconds: positiveInteger("DATABASE_MAX_LIFETIME_SECONDS", 300),
    query_timeout: positiveInteger("DATABASE_QUERY_TIMEOUT_MS", 15_000),
    ssl: process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: true } : false,
  });
}

export function getDb() {
  const pool = globalForDb.portfolioPool ?? createPool();
  globalForDb.portfolioPool = pool;

  return drizzle(pool);
}

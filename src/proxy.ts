import { NextRequest, NextResponse } from "next/server";

const RATE_LIMIT = 50;
const WINDOW_MS = 1_000;
const CLEANUP_INTERVAL_MS = 60_000;
const MAX_TRACKED_CLIENTS = 10_000;
const HSTS_VALUE = "max-age=31536000; includeSubDomains";

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

type RateLimitStore = {
  entries: Map<string, RateLimitEntry>;
  lastCleanupAt: number;
};

const globalForRateLimit = globalThis as typeof globalThis & {
  portfolioRateLimit?: RateLimitStore;
};

const store = globalForRateLimit.portfolioRateLimit ?? {
  entries: new Map<string, RateLimitEntry>(),
  lastCleanupAt: Date.now(),
};

globalForRateLimit.portfolioRateLimit = store;

function getClientIp(request: NextRequest) {
  const forwardedFor =
    request.headers.get("x-vercel-forwarded-for") ??
    request.headers.get("x-forwarded-for") ??
    request.headers.get("x-real-ip");

  return forwardedFor?.split(",")[0]?.trim() || "unknown";
}

function cleanupExpiredEntries(now: number) {
  if (
    now - store.lastCleanupAt < CLEANUP_INTERVAL_MS &&
    store.entries.size <= MAX_TRACKED_CLIENTS
  ) {
    return;
  }

  for (const [key, entry] of store.entries) {
    if (entry.resetAt <= now) store.entries.delete(key);
  }

  while (store.entries.size > MAX_TRACKED_CLIENTS) {
    const oldestKey = store.entries.keys().next().value;
    if (oldestKey === undefined) break;
    store.entries.delete(oldestKey);
  }

  store.lastCleanupAt = now;
}

function finalizeResponse(response: NextResponse, remaining: number, resetAt: number) {
  response.headers.set("Strict-Transport-Security", HSTS_VALUE);
  response.headers.delete("X-Powered-By");
  response.headers.set("X-RateLimit-Limit", RATE_LIMIT.toString());
  response.headers.set("X-RateLimit-Remaining", Math.max(0, remaining).toString());
  response.headers.set("X-RateLimit-Reset", Math.ceil(resetAt / 1_000).toString());

  return response;
}

export function proxy(request: NextRequest) {
  const now = Date.now();
  const clientIp = getClientIp(request);
  const current = store.entries.get(clientIp);
  const entry = !current || current.resetAt <= now
    ? { count: 1, resetAt: now + WINDOW_MS }
    : { ...current, count: current.count + 1 };

  store.entries.set(clientIp, entry);
  cleanupExpiredEntries(now);

  if (entry.count > RATE_LIMIT) {
    const retryAfter = Math.max(1, Math.ceil((entry.resetAt - now) / 1_000));
    const response = NextResponse.json(
      { error: "Terlalu banyak permintaan. Silakan coba lagi sesaat lagi." },
      { status: 429 },
    );
    response.headers.set("Cache-Control", "private, no-store");
    response.headers.set("Retry-After", retryAfter.toString());

    return finalizeResponse(response, 0, entry.resetAt);
  }

  return finalizeResponse(
    NextResponse.next(),
    RATE_LIMIT - entry.count,
    entry.resetAt,
  );
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.svg).*)"],
};

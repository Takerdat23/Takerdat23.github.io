import { env } from "cloudflare:workers";
import { headers } from "next/headers";

type AnalyticsEnv = {
  DB?: D1Database;
  ANALYTICS_ADMIN_EMAIL?: string;
};

export type AnalyticsRow = {
  day: string;
  country_code: string;
  route: string;
  views: number;
};

const createTableSql = `
  CREATE TABLE IF NOT EXISTS page_views (
    day TEXT NOT NULL,
    country_code TEXT NOT NULL,
    route TEXT NOT NULL,
    views INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY (day, country_code, route)
  )
`;

let schemaReady: Promise<void> | null = null;

function runtimeEnv(): AnalyticsEnv {
  return env as unknown as AnalyticsEnv;
}

async function ensureAnalyticsSchema(database: D1Database): Promise<void> {
  schemaReady ??= database
    .prepare(createTableSql)
    .run()
    .then(() => undefined)
    .catch((error) => {
      schemaReady = null;
      throw error;
    });
  return schemaReady;
}

function isAutomatedVisitor(userAgent: string): boolean {
  return /bot|crawler|spider|preview|slurp|facebookexternalhit|whatsapp|telegram/i.test(
    userAgent,
  );
}

export async function recordPageView(route: "/" | "/fun"): Promise<void> {
  const database = runtimeEnv().DB;
  if (!database) return;

  const requestHeaders = await headers();
  if (
    requestHeaders.get("dnt") === "1" ||
    requestHeaders.get("sec-gpc") === "1" ||
    isAutomatedVisitor(requestHeaders.get("user-agent") ?? "")
  ) {
    return;
  }

  const countryHeader = requestHeaders.get("cf-ipcountry")?.toUpperCase();
  const country = countryHeader?.match(/^[A-Z]{2}$/) ? countryHeader : "UN";
  const day = new Date().toISOString().slice(0, 10);

  try {
    await ensureAnalyticsSchema(database);
    await database
      .prepare(
        `INSERT INTO page_views (day, country_code, route, views)
         VALUES (?, ?, ?, 1)
         ON CONFLICT(day, country_code, route)
         DO UPDATE SET views = views + 1`,
      )
      .bind(day, country, route)
      .run();
  } catch (error) {
    console.error("Aggregate analytics write failed", error);
  }
}

export async function getAnalyticsRows(days = 30): Promise<AnalyticsRow[]> {
  const database = runtimeEnv().DB;
  if (!database) return [];

  await ensureAnalyticsSchema(database);
  const start = new Date();
  start.setUTCDate(start.getUTCDate() - Math.max(1, days - 1));
  const startDay = start.toISOString().slice(0, 10);
  const result = await database
    .prepare(
      `SELECT day, country_code, route, views
       FROM page_views
       WHERE day >= ?
       ORDER BY day DESC, views DESC`,
    )
    .bind(startDay)
    .all<AnalyticsRow>();

  return result.results ?? [];
}

export function getAnalyticsAdminEmail(): string | null {
  const configured = (
    runtimeEnv().ANALYTICS_ADMIN_EMAIL ?? process.env.ANALYTICS_ADMIN_EMAIL
  )
    ?.trim()
    .toLowerCase();
  return configured || null;
}

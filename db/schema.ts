import { integer, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const pageViews = sqliteTable(
  "page_views",
  {
    day: text("day").notNull(),
    countryCode: text("country_code").notNull(),
    route: text("route").notNull(),
    views: integer("views").notNull().default(0),
  },
  (table) => [
    primaryKey({ columns: [table.day, table.countryCode, table.route] }),
  ],
);

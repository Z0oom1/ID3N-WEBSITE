import { defineConfig } from "drizzle-kit";
import path from "path";

// Use SQLite for local development
const dbPath = path.resolve(process.cwd(), "dev.db");

export default defineConfig({
  schema: "./drizzle/schema.ts",
  out: "./drizzle",
  dialect: "sqlite",
  dbCredentials: {
    url: `file:${dbPath}`,
  },
});

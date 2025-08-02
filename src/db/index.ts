import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

// Create database connection only if DATABASE_URL is provided
let db: ReturnType<typeof drizzle> | null = null;

if (process.env.DATABASE_URL) {
  try {
    const sql = neon(process.env.DATABASE_URL);
    db = drizzle({ client: sql, schema });
  } catch (error) {
    console.error('Failed to connect to database:', error);
    db = null;
  }
} else {
  console.warn('DATABASE_URL not provided. Using static data fallback.');
}

export { db };
export * from './schema';

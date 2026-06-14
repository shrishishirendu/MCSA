import { env } from "@/lib/env";

export function getDatabaseUrl() {
  if (!env.databaseUrl) {
    throw new Error("DATABASE_URL is not configured.");
  }

  return env.databaseUrl;
}

export type QueryOptions = {
  transactionId?: string;
};

// Add a PostgreSQL client here in the database implementation phase.

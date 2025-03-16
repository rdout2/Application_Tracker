import "dotenv/config";

/** @type {import('drizzle-kit').Config} */
export default {
  schema: "./src/lib/schema.js",
  out: "./drizzle",
  dialect: "postgresql", // <-- IMPORTANT
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  },
};

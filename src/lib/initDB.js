import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

// Fonction d'initialisation
export async function initializeDatabase() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL
      );
    `;
    console.log('✅ Table "users" ready.');
  } catch (error) {
    console.error('❌ Error initializing DB:', error);
  }
}

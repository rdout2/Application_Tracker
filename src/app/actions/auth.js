'use server';

import { neon } from '@neondatabase/serverless';

// Connexion SQL avec ton DATABASE_URL (bien défini dans .env)
const sql = neon(process.env.DATABASE_URL);

export async function signup(prevState, formData) {
  const name = formData.get('name');
  const email = formData.get('email');
  const password = formData.get('password');

  const errors = {};

  if (!name) errors.name = 'Name is required';
  if (!email || !email.includes('@')) errors.email = 'Valid email required';
  if (!password || password.length < 6) errors.password = ['Password too short'];

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  try {
    // Création utilisateur dans Neon DB
    await sql`
      INSERT INTO users (name, email, password)
      VALUES (${name}, ${email}, ${password});
    `;

    return { success: true };
  } catch (error) {
    console.error('Error inserting user:', error);
    return { error: 'Failed to create user' };
  }
}

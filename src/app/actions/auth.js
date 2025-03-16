'use server';

import { neon } from '@neondatabase/serverless';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';

const sql = neon(process.env.DATABASE_URL);

// Signup déjà existant ici...

// LOGIN FUNCTION 👇
export async function login(prevState, formData) {
  const email = formData.get('email');
  const password = formData.get('password');

  const errors = {};

  if (!email || !email.includes('@')) errors.email = 'Valid email required';
  if (!password) errors.password = 'Password required';

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  try {
    // 1️⃣ Récupérer l'utilisateur depuis DB
    const result = await sql`SELECT * FROM users WHERE email = ${email} LIMIT 1`;
    const user = result[0];

    if (!user) {
      return { error: 'Invalid email or password' };
    }

    // 2️⃣ Comparer le password hashé
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return { error: 'Invalid email or password' };
    }

    // 3️⃣ Créer un token simple (à améliorer en production)
    const sessionToken = `session-${Date.now()}-${user.id}`;

    cookies().set('session', sessionToken, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 semaine
    });

    return { success: true };
  } catch (error) {
    console.error('Error during login:', error);
    return { error: 'Failed to login' };
  }
}

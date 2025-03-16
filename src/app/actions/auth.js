'use server';

import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

const sql = neon(process.env.DATABASE_URL);

export async function signup(prevState, formData) {
  const name = formData.get('name')?.trim();
  const email = formData.get('email')?.trim();
  const password = formData.get('password')?.trim();

  const errors = {};
  if (!name) errors.name = 'Name is required';
  if (!email || !email.includes('@')) errors.email = 'Valid email required';
  if (!password || password.length < 6) errors.password = ['Password too short'];

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await sql`
    INSERT INTO users (name, email, password)
    VALUES (${name}, ${email}, ${hashedPassword});
  `;

  const sessionToken = `session-${Date.now()}`;
  cookies().set('session', sessionToken, {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  return { success: true };
}

export async function login(prevState, formData) {
  const email = formData.get('email')?.trim();
  const password = formData.get('password')?.trim();

  const result = await sql`SELECT * FROM users WHERE email = ${email} LIMIT 1`;
  const user = result.rows[0];

  if (!user) {
    return { error: 'Invalid email or password' };
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return { error: 'Invalid email or password' };
  }

  const sessionToken = `session-${Date.now()}-${user.id}`;
  cookies().set('session', sessionToken, {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  return { success: true };
}

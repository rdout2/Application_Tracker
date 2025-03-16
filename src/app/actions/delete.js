'use server';

import { neon } from '@neondatabase/serverless';
const sql = neon(process.env.DATABASE_URL);

export async function deleteApplication(_, formData) {
  const id = formData.get('id');

  if (!id) {
    return { error: 'ID invalide' };
  }

  await sql`DELETE FROM applications WHERE id = ${id}`;
  return { success: true };
}

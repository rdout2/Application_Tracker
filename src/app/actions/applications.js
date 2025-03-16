'use server';

import { neon } from '@neondatabase/serverless';
const sql = neon(process.env.DATABASE_URL);

// Fonction pour ajouter une candidature
export async function addApplication(data) {
  const title = data.title?.trim();
  const company = data.company?.trim();
  const position = data.position?.trim();
  const jobBoard = data.jobBoard?.trim();
  const location = data.location?.trim();
  const applicationDate = data.applicationDate;
  const status = data.status;
  const notes = data.notes?.trim();
  const remarques = data.remarques?.trim();

  await sql`
    INSERT INTO applications (title, company, position, job_board, location, application_date, status, notes, remarques)
    VALUES (${title}, ${company}, ${position}, ${jobBoard}, ${location}, ${applicationDate}, ${status}, ${notes}, ${remarques});
  `;

  return { success: true };
}

// Fonction pour récupérer toutes les candidatures
export async function getApplications() {
  const rows = await sql`
    SELECT id, title, company, position, job_board, location, application_date, status, notes, remarques 
    FROM applications
    ORDER BY id DESC;
  `;
  return rows;
}

// Fonction pour supprimer une candidature
export async function deleteApplication(data) {
  const { id } = data; // Utilise l'ID passé en JSON

  if (!id) {
    return { error: 'ID invalide' };
  }

  await sql`DELETE FROM applications WHERE id = ${id}`;
  return { success: true };
}

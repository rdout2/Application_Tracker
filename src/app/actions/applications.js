'use server';

import { neon } from '@neondatabase/serverless';
const sql = neon(process.env.DATABASE_URL);

// Fonction pour ajouter une candidature
export async function addApplication(state, data) {
  console.log("my data",state, data);  // Affiche les données reçues dans les logs
  const title = data.get("title")?.trim();
  const company = data.get("company")?.trim();
  const position = data.get("position")?.trim();
  const jobBoard = data.get("jobBoard")?.trim();
  const location = data.get("location")?.trim();
  const applicationDate = data.get("applicationDate")?.trim();
  const status = data.get("status")?.trim();
  const notes = data.get("notes")?.trim();
  const remarques = data.get("remarques")?.trim();
  console.log("my data",title, company, position, jobBoard, location, applicationDate, status, notes, remarques);  // Affiche les données reçues dans les logs

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

import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export async function POST(request, { params }) {
  const id = params.id;

  if (!id) {
    return new Response("ID manquant", { status: 400 });
  }

  try {
    await sql`DELETE FROM applications WHERE id = ${id}`;
    return new Response("Deleted", { status: 200 });
  } catch (error) {
    return new Response("Erreur suppression", { status: 500 });
  }
}

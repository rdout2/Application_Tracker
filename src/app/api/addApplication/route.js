import { addApplication } from '@/app/actions/applications';

export async function POST(request) {
  try {
    const data = await request.json();  // Récupère les données JSON envoyées depuis le frontend
    await addApplication(data);         // Appelle la fonction pour ajouter la candidature
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to add application' }), { status: 500 });
  }
}

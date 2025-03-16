import { deleteApplication } from '@/app/actions/applications';

export async function POST(request) {
  const data = await request.json(); // Utilise .json() pour parser le JSON
  return deleteApplication(data); // Passe l'objet JSON à la fonction deleteApplication
}

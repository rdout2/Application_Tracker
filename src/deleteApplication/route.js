import { deleteApplication } from '@/app/actions/applications';

export async function POST(request) {
  const formData = new URLSearchParams(await request.text());
  return deleteApplication(formData);
}

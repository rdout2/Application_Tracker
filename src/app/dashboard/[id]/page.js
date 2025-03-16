import { getApplications } from '@/app/actions/applications';
import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function ApplicationDetail({ params }) {
  const applications = await getApplications();
  const app = applications.find(a => a.id === parseInt(params.id, 10));

  if (!app) {
    return <div className="container mx-auto p-6">Application not found.</div>;
  }

  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <Card className="rounded-2xl shadow-xl p-6">
        <h1 className="text-3xl font-extrabold mb-6">Application Details</h1>
        <CardContent className="space-y-3 text-gray-800">
          <p><strong>Title:</strong> {app.title}</p>
          <p><strong>Company:</strong> {app.company}</p>
          <p><strong>Position:</strong> {app.position}</p>
          <p><strong>Job Board:</strong> {app.job_board}</p>
          <p><strong>Location:</strong> {app.location}</p>
          <p><strong>Application Date:</strong> {new Date(app.application_date).toLocaleDateString()}</p>
          <p><strong>Status:</strong> {app.status}</p>
          <p><strong>Notes:</strong> {app.notes}</p>
          <p><strong>Remarques:</strong> {app.remarques}</p>
        </CardContent>
        <Button asChild className="mt-6">
          <Link href="/dashboard">Back to Dashboard</Link>
        </Button>
      </Card>
    </div>
  );
}

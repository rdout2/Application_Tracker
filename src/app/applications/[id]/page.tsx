'use client';
    import { useState, useEffect } from 'react';
    import { useParams, useRouter } from 'next/navigation';
    import Link from 'next/link';

    interface Application {
      id: number;
      title: string;
      company: string;
      link: string;
      applicationDate: string;
      status: string;
      interviewDate: string | null;
      notes: string;
      remarques: string;
    }

    const ApplicationDetail = () => {
      const { id } = useParams<{ id: string }>();
      const [application, setApplication] = useState<Application | null>(null);
      const router = useRouter();

      useEffect(() => {
        const storedApplications = localStorage.getItem('applications');
        if (storedApplications) {
          const applications: Application[] = JSON.parse(storedApplications);
          const foundApplication = applications.find(app => app.id === parseInt(id, 10));
          setApplication(foundApplication || null);
        }
      }, [id]);

      if (!application) {
        return <div className="container mx-auto p-4">Application not found.</div>;
      }

      return (
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Application Details</h1>
          <div className="mb-4">
            <p><b>Title:</b> {application.title}</p>
            <p><b>Company:</b> {application.company}</p>
            <p><b>Link:</b> <a href={application.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">{application.link}</a></p>
            <p><b>Application Date:</b> {application.applicationDate}</p>
            <p><b>Status:</b> {application.status}</p>
            {application.interviewDate && <p><b>Interview Date:</b> {application.interviewDate}</p>}
            <p><b>Notes:</b> {application.notes}</p>
            <p><b>Remarques:</b> {application.remarques}</p>
          </div>
          <Link href="/dashboard" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Back to Dashboard
          </Link>
        </div>
      );
    };

    export default ApplicationDetail;

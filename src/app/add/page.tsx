'use client';
    import { useState } from 'react';
    import { useRouter } from 'next/navigation';

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

    const AddApplication = () => {
      const [newApplication, setNewApplication] = useState<Omit<Application, 'id'>>({
        title: '',
        company: '',
        link: '',
        applicationDate: '',
        status: 'Non répondu',
        interviewDate: null,
        notes: '',
        remarques: '',
      });
      const router = useRouter();

      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewApplication(prev => ({ ...prev, [name]: value }));
      };

      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const storedApplications = localStorage.getItem('applications');
        let applications: Application[] = storedApplications ? JSON.parse(storedApplications) : [];
        const newId = applications.length > 0 ? Math.max(...applications.map(app => app.id)) + 1 : 1;

        const applicationToAdd: Application = {
          id: newId,
          ...newApplication,
        };

        applications.push(applicationToAdd);
        localStorage.setItem('applications', JSON.stringify(applications));
        router.push('/dashboard');
      };

      return (
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Add New Application</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={newApplication.title}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                Company
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={newApplication.company}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="link" className="block text-sm font-medium text-gray-700">
                Link
              </label>
              <input
                type="url"
                id="link"
                name="link"
                value={newApplication.link}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="applicationDate" className="block text-sm font-medium text-gray-700">
                Application Date
              </label>
              <input
                type="date"
                id="applicationDate"
                name="applicationDate"
                value={newApplication.applicationDate}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={newApplication.status}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option>Accepté</option>
                <option>Refusé</option>
                <option>Non répondu</option>
                <option>En cours de processus</option>
              </select>
            </div>
            <div>
              <label htmlFor="interviewDate" className="block text-sm font-medium text-gray-700">
                Interview Date (Optional)
              </label>
              <input
                type="date"
                id="interviewDate"
                name="interviewDate"
                value={newApplication.interviewDate || ''}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                value={newApplication.notes}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="remarques" className="block text-sm font-medium text-gray-700">
                Remarques
              </label>
              <textarea
                id="remarques"
                name="remarques"
                value={newApplication.remarques}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Add Application
            </button>
          </form>
        </div>
      );
    };

    export default AddApplication;

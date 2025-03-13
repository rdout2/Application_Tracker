'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Application {
  id: number;
  title: string;
  company: string;
  position: string;
  location: string;
  applicationDate: string;
  status: 'En cours' | 'Sans réponse' | 'Entretien' | 'Refusé';
  interviewDate: string | null;
  notes: string;
  remarques: string;
}

const AddApplication = () => {
  const [newApplication, setNewApplication] = useState<Omit<Application, 'id'>>({
    title: '',
    company: '',
    position: '',
    location: '',
    applicationDate: '',
    status: 'Sans réponse',
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
    <div className="container mx-auto p-6 max-w-lg bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">Ajouter une candidature</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Titre du poste</label>
          <input
            type="text"
            name="title"
            value={newApplication.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Entreprise</label>
          <input
            type="text"
            name="company"
            value={newApplication.company}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Poste</label>
          <input
            type="text"
            name="position"
            value={newApplication.position}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">JobBoard</label>
          <input
            type="text"
            name="position"
            value={newApplication.position}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Localisation</label>
          <input
            type="text"
            name="location"
            value={newApplication.location}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Date de candidature</label>
          <input
            type="date"
            name="applicationDate"
            value={newApplication.applicationDate}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Statut</label>
          <select
            name="status"
            value={newApplication.status}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 p-2"
          >
            <option>En cours</option>
            <option>Sans réponse</option>
            <option>Entretien</option>
            <option>Refusé</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Notes</label>
          <textarea
            name="notes"
            value={newApplication.notes}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 p-2"
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium">Remarques</label>
          <textarea
            name="remarques"
            value={newApplication.remarques}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 p-2"
          ></textarea>
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => router.push('/dashboard')}
            className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded"
          >
            Retour
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            Ajouter
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddApplication;

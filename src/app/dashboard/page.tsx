'use client';
import { useState, useEffect } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { arrayMove } from '@dnd-kit/sortable';
import Link from 'next/link';

interface Application {
  id: number;
  title: string;
  company: string;
  applicationDate: string;
  status: 'En cours' | 'Sans réponse' | 'Entretien' | 'Refusé';
}

const Dashboard = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState<keyof Application | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    const storedApplications = localStorage.getItem('applications');
    if (storedApplications) {
      setApplications(JSON.parse(storedApplications));
    } else {
      fetch('/data.json')
        .then(response => response.json())
        .then(data => {
          setApplications(data);
          localStorage.setItem('applications', JSON.stringify(data));
        });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('applications', JSON.stringify(applications));
  }, [applications]);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over) return;

    setApplications(prevApps => {
      const oldIndex = prevApps.findIndex(app => app.id === active.id);
      const newIndex = prevApps.findIndex(app => app.id === over.id);
      return arrayMove(prevApps, oldIndex, newIndex);
    });
  };

  const updateStatus = (id: number, newStatus: 'En cours' | 'Sans réponse' | 'Entretien' | 'Refusé') => {
    setApplications(prevApps =>
      prevApps.map(app =>
        app.id === id ? { ...app, status: newStatus } : app
      )
    );
  };

  const filteredApplications = applications.filter(app =>
    Object.values(app).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Job Application Dashboard</h1>
      <div className="mb-4 flex items-center space-x-4">
        <input
          type="text"
          placeholder="Rechercher..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="border p-2 w-full"
        />
        <Link href="/add" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Add Application
        </Link>
      </div>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-4 gap-4">
          {['En cours', 'Sans réponse', 'Entretien', 'Refusé'].map(category => (
            <div key={category} className="p-4 bg-gray-100 rounded shadow-md">
              <h2 className="font-bold text-lg mb-2">{category}</h2>
              <SortableContext items={filteredApplications} strategy={verticalListSortingStrategy}>
                {filteredApplications
                  .filter(app => app.status === category)
                  .map(app => (
                    <div
                      key={app.id}
                      className="bg-white p-2 mb-2 shadow-md cursor-pointer border rounded"
                    >
                      <p className="font-bold">{app.title}</p>
                      <p>{app.company}</p>
                      <p className="text-sm text-gray-500">{app.applicationDate}</p>
                      <button
                        onClick={() =>
                          updateStatus(
                            app.id,
                            category === 'En cours'
                              ? 'Sans réponse'
                              : category === 'Sans réponse'
                              ? 'Entretien'
                              : category === 'Entretien'
                              ? 'Refusé'
                              : 'En cours'
                          )
                        }
                        className="bg-blue-500 text-white px-2 py-1 mt-2 rounded"
                      >
                        Changer Status
                      </button>
                    </div>
                  ))}
              </SortableContext>
            </div>
          ))}
        </div>
      </DndContext>
    </div>
  );
};

export default Dashboard;

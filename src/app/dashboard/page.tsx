'use client';
    import { useState, useEffect } from 'react';
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

      const handleStatusChange = (id: number, newStatus: string) => {
        setApplications(prevApplications =>
          prevApplications.map(app =>
            app.id === id ? { ...app, status: newStatus } : app
          )
        );
      };

      const filteredApplications = applications.filter(app =>
        Object.values(app).some(value =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );

      const sortedApplications = [...filteredApplications].sort((a, b) => {
        if (!sortColumn) return 0;
        const valueA = String(a[sortColumn]).toLowerCase();
        const valueB = String(b[sortColumn]).toLowerCase();

        if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
        if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });

      return (
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Job Application Dashboard</h1>

          <div className="mb-4 flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <Link href="/add" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Add Application
            </Link>
          </div>

          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 cursor-pointer" onClick={() => { setSortColumn('title'); setSortDirection(sortColumn === 'title' ? (sortDirection === 'asc' ? 'desc' : 'asc') : 'asc'); }}>
                  Title
                </th>
                <th className="px-4 py-2 cursor-pointer" onClick={() => { setSortColumn('company'); setSortDirection(sortColumn === 'company' ? (sortDirection === 'asc' ? 'desc' : 'asc') : 'asc'); }}>
                  Company
                </th>
                <th className="px-4 py-2">Application Date</th>
                <th className="px-4 py-2 cursor-pointer" onClick={() => { setSortColumn('status'); setSortDirection(sortColumn === 'status' ? (sortDirection === 'asc' ? 'desc' : 'asc') : 'asc'); }}>
                  Status
                </th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedApplications.map(app => (
                <tr key={app.id}>
                  <td className="border px-4 py-2">
                    <Link href={`/applications/${app.id}`} className="text-blue-500 hover:text-blue-700">
                      {app.title}
                    </Link>
                  </td>
                  <td className="border px-4 py-2">{app.company}</td>
                  <td className="border px-4 py-2">{app.applicationDate}</td>
                  <td className="border px-4 py-2">
                    <select
                      value={app.status}
                      onChange={e => handleStatusChange(app.id, e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option>Accepté</option>
                      <option>Refusé</option>
                      <option>Non répondu</option>
                      <option>En cours de processus</option>
                    </select>
                  </td>
                  <td className="border px-4 py-2">
                    <Link href={`/applications/${app.id}`} className="text-blue-500 hover:text-blue-700">
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    };

    export default Dashboard;

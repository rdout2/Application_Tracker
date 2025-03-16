import { getApplications } from '@/app/actions/applications';
import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from 'lucide-react';

export default async function Dashboard({ searchParams }) {
  const { company = '', position = '' } = searchParams || {};
  let applications = await getApplications();

  if (company) {
    applications = applications.filter(app =>
      app.company.toLowerCase().includes(company.toLowerCase())
    );
  }

  if (position) {
    applications = applications.filter(app =>
      app.position.toLowerCase().includes(position.toLowerCase())
    );
  }

  const categories = [
    { label: 'Wishlist', value: 'Wishlist', color: 'bg-yellow-100', border: 'border-yellow-400', text: 'text-yellow-700' },
    { label: 'Applied', value: 'Applied', color: 'bg-blue-100', border: 'border-blue-400', text: 'text-blue-700' },
    { label: 'Interview', value: 'Interview', color: 'bg-green-100', border: 'border-green-400', text: 'text-green-700' },
    { label: 'Offer', value: 'Offer', color: 'bg-purple-100', border: 'border-purple-400', text: 'text-purple-700' },
    { label: 'Rejected', value: 'Rejected', color: 'bg-red-100', border: 'border-red-400', text: 'text-red-700' },
  ];

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-10">📊 Dashboard</h1>

      <form method="GET" className="mb-10 grid grid-cols-3 gap-4">
        <input 
          name="company" 
          placeholder="🔍 Filter by Company" 
          defaultValue={company} 
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-purple-600" 
        />
        <input 
          name="position" 
          placeholder="🔍 Filter by Position" 
          defaultValue={position} 
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-purple-600" 
        />
        <Button type="submit" className="col-span-3 bg-purple-600 text-white hover:bg-purple-700">
          Apply Filters
        </Button>
      </form>

      <div className="grid grid-cols-5 gap-6">
        {categories.map(category => (
          <Card key={category.value} className={`rounded-lg p-4 shadow-md border ${category.border} ${category.color} hover:shadow-lg transition`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className={`font-semibold text-lg ${category.text}`}>{category.label}</h2>
              <span className={`bg-${category.text.replace('text-', 'bg-')} text-white text-xs px-3 py-1 rounded-full`}>
                {applications.filter(app => app.status === category.value).length} Jobs
              </span>
            </div>

            <div className="space-y-4">
              {applications
                .filter(app => app.status === category.value)
                .map(app => (
                  <div key={app.id} className="relative group">
                    {/* Delete Icon */}
                    <form action={`/dashboard/delete/${app.id}`} method="POST" className="absolute top-3 right-3 z-10">
                      <button type="submit" className="text-gray-300 hover:text-red-500 transition">
                        <Trash2 size={16} />
                      </button>
                    </form>

                    {/* Card Content */}
                    <Link href={`/dashboard/${app.id}`}>
                      <CardContent className="bg-white rounded-lg p-4 shadow-md border hover:shadow-xl transition cursor-pointer">
                        {/* Title & Company */}
                        <div className="flex flex-col space-y-2 mb-3">
                          <p className="font-bold text-lg text-gray-800">{app.title}</p>
                          <p className={`text-${category.text.replace('text-', '')} font-semibold text-sm`}>{app.company}</p>
                        </div>
                        
                        <div className="flex justify-end mt-3">
                          <span className="text-xs text-gray-400">
                            {new Date(app.application_date).toLocaleDateString()}
                          </span>
                        </div>
                      </CardContent>
                    </Link>
                  </div>
                ))}
            </div>

            {/* Add Button */}
            <Link
              href={`/add?status=${category.value}`}
              className={`mt-6 block text-center w-full border-dashed border-2 ${category.text.replace('text-', 'border-')} py-2 text-${category.text.replace('text-', '')} rounded-lg hover:bg-${category.text.replace('text-', 'bg-')}100 transition`}
            >
              + Add Application
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}

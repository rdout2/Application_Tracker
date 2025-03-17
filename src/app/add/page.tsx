'use client';

import { useActionState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { addApplication } from '@/app/actions/applications';
import { title } from 'process';

export default function AddApplication() {
  const [state, formAction, pending] = useActionState(addApplication, undefined);
  const router = useRouter();
  const searchParams = useSearchParams();
  const prefilledStatus = searchParams.get('status') || 'Wishlist';

  // Redirection automatique après succès
  useEffect(() => {
    if (state?.success) {
      const timer = setTimeout(() => {
        router.push('/dashboard?success=true'); // redirige avec param success
      }, 1000); // 1 seconde délai
      return () => clearTimeout(timer);
    }
  }, [state, router]);
  async function createInvoice(formData: FormData) {
    // 'use server'
 
    const rawFormData = {
      title: formData.get('title'),
      company: formData.get('company'),
      position: formData.get('position'),
      jobBoard: formData.get('jobBoard'),
      location: formData.get('location'),
      applicationDate: formData.get('applicationDate'),
      status: formData.get('status'),
      notes: formData.get('notes'),
      remarques: formData.get('remarques'),
    }
 
    console.log({ rawFormData })
    // mutate data
    // revalidate cache
  }
 
  return (
    <div className="container mx-auto p-8 max-w-3xl bg-white shadow-lg rounded-2xl">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">📥 Add New Application</h1>

      <form action={(data) => {
        console.log({data});
// formAction(data)
createInvoice(data)

formAction(data)
      }} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label htmlFor='title' className="block text-sm font-medium mb-1 text-gray-700">Title</label>
            <input 
              name="title" 
              required 
              maxLength={17}
              placeholder="Job Title"
              className="block w-full rounded-lg border-gray-300 p-3 text-base focus:outline-purple-500"
            />
            <p className="text-xs text-gray-400 mt-1">Max 17 characters</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Company</label>
            <input 
              name="company" 
              required 
              maxLength={17}
              placeholder="Company Name"
              className="block w-full rounded-lg border-gray-300 p-3 text-base focus:outline-purple-500"
            />
            <p className="text-xs text-gray-400 mt-1">Max 17 characters</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Position</label>
            <input 
              name="position" 
              required 
              placeholder="Position"
              className="block w-full rounded-lg border-gray-300 p-3 text-base focus:outline-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Job Board</label>
            <input 
              name="jobBoard" 
              required 
              placeholder="LinkedIn, Indeed..."
              className="block w-full rounded-lg border-gray-300 p-3 text-base focus:outline-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Location</label>
            <input 
              name="location" 
              required 
              placeholder="City, Country"
              className="block w-full rounded-lg border-gray-300 p-3 text-base focus:outline-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Application Date</label>
            <input 
              type="date" 
              name="applicationDate" 
              required 
              className="block w-full rounded-lg border-gray-300 p-3 text-base focus:outline-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Status</label>
            <select 
              name="status" 
              defaultValue={prefilledStatus}
              className="block w-full rounded-lg border-gray-300 p-3 text-base focus:outline-purple-500"
            >
              <option>Wishlist</option>
              <option>Applied</option>
              <option>Interview</option>
              <option>Offer</option>
              <option>Rejected</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Notes</label>
          <textarea 
            name="notes" 
            rows={3}
            placeholder="Additional info..."
            className="block w-full rounded-lg border-gray-300 p-3 text-base focus:outline-purple-500"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Remarques</label>
          <textarea 
            name="remarques" 
            rows={3}
            placeholder="Personal remarks..."
            className="block w-full rounded-lg border-gray-300 p-3 text-base focus:outline-purple-500"
          ></textarea>
        </div>

        <div className="flex justify-between mt-8">
          <button 
            type="button" 
            onClick={() => router.push('/dashboard')} 
            className="bg-gray-500 hover:bg-gray-700 text-white py-3 px-6 rounded-lg text-base transition"
          >
            Back
          </button>
          <button 
            type="submit" 
            disabled={pending} 
            className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg text-base transition"
          >
            {pending ? 'Adding...' : 'Add Application'}
          </button>
        </div>
      </form>

      {state?.success && (
        <p className="text-green-600 mt-6 text-center text-base">✅ Application added! Redirecting...</p>
      )}
    </div>
  );
}

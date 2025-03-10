import Link from 'next/link';

    export default function Home() {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-2">
          <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
            <h1 className="text-4xl font-bold mb-8">
              Welcome to Job Application Tracker
            </h1>
            <p className="text-xl mb-8">
              Manage your job applications with ease.
            </p>
            <Link href="/dashboard" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Go to Dashboard
            </Link>
          </main>
        </div>
      );
    }

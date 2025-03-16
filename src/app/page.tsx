import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 bg-white shadow-md">
        <div className="text-2xl font-bold text-blue-600">JobTracker</div>
        <div className="space-x-4">
          <Link href="/dashboard" className="text-gray-700 hover:text-blue-600">
            Dashboard
          </Link>
          <Link href="/login" className="text-gray-700 hover:text-blue-600">
            Login
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center flex-1 px-8 text-center space-y-8 mb-12">
        <h1 className="text-5xl font-extrabold mb-6 text-gray-800">
          Welcome to <span className="text-blue-600">Job Application Tracker</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-xl">
          Easily manage, track, and organize all your job applications in one place.
        </p>
        <div className="flex space-x-4 mb-8">
          {/* Go to Dashboard → Middleware vérifie session */}
          <Link href="/dashboard">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all transform hover:scale-105">
              Go to Dashboard
            </button>
          </Link>

          {/* Sign Up */}
          <Link href="/signup">
            <button className="bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 px-6 rounded-lg shadow-lg transition-all transform hover:scale-105">
              Sign Up
            </button>
          </Link>
        </div>

        {/* Image of the software */}
        <div className="mb-8">
          <img
            src="/1234.png"  // Assure-toi que l'image est dans le dossier public
            alt="Job Tracker Software"
            className="max-w-full h-auto rounded-lg shadow-xl transition-all"
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 bg-white text-center text-gray-500">
        © 2025 JobTracker. All rights reserved.
      </footer>
    </div>
  );
}

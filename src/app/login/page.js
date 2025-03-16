import LoginForm from './LoginForm';

export const metadata = {
  title: 'Login - JobTracker',
  description: 'Login to your account',
};

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <h1 className="text-3xl font-bold mb-6">Welcome Back</h1>
      <LoginForm /> {/* ← c’est ici que l’erreur venait probablement */}
    </div>
  );
}

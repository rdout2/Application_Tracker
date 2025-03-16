import LoginForm from './LoginForm';

export const metadata = {
  title: 'Login - Job Application Tracker',
  description: 'Login to access your dashboard',
};

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <h1 className="text-3xl font-bold mb-6">Welcome Back</h1>
      <LoginForm />
    </div>
  );
}

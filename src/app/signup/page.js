import SignupForm from './SignupForm'

export default function SignupPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <h1 className="text-3xl font-bold mb-6">Create Your Account</h1>
      <SignupForm />
    </div>
  )
}

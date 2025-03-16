'use client'

import { signup } from '@/app/actions/auth'
import { useActionState } from 'react'

export default function SignupForm() {
  const [state, action, pending] = useActionState(signup, undefined)

  return (
    <form action={action} className="flex flex-col gap-4 bg-white p-8 rounded shadow-md w-full max-w-md">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
        <input
          id="name"
          name="name"
          placeholder="Name"
          className="w-full border border-gray-300 p-2 rounded"
        />
        {state?.errors?.name && <p className="text-red-500 text-sm mt-1">{state.errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
        <input
          id="email"
          name="email"
          placeholder="Email"
          className="w-full border border-gray-300 p-2 rounded"
        />
        {state?.errors?.email && <p className="text-red-500 text-sm mt-1">{state.errors.email}</p>}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          className="w-full border border-gray-300 p-2 rounded"
        />
        {state?.errors?.password && (
          <div className="text-red-500 text-sm mt-1">
            <p>Password must:</p>
            <ul className="list-disc list-inside">
              {state.errors.password.map((error) => (
                <li key={error}>- {error}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <button
        disabled={pending}
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {pending ? 'Signing up...' : 'Sign Up'}
      </button>
    </form>
  )
}

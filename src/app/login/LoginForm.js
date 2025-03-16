'use client';

import { useActionState } from 'react';
import { login } from '@/app/actions/auth';

export default function LoginForm() {
  const [state, formAction] = useActionState(login, undefined);

  return (
    <form action={formAction} className="flex flex-col gap-4 bg-white p-8 rounded shadow-md w-full max-w-md">
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" className="w-full border p-2 rounded" />
        {state?.errors?.email && <p className="text-red-500 text-sm mt-1">{state.errors.email}</p>}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" className="w-full border p-2 rounded" />
        {state?.errors?.password && <p className="text-red-500 text-sm mt-1">{state.errors.password}</p>}
      </div>

      {state?.error && <p className="text-red-500">{state.error}</p>}
      {state?.success && <p className="text-green-500">Logged in!</p>}

      <button type="submit" className="bg-blue-600 text-white py-2 rounded">
        Log In
      </button>
    </form>
  );
}

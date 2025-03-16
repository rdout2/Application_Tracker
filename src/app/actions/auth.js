'use server'

import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'
import { users } from '@/lib/schema'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function signup(prevState, formData) {
  const name = formData.get('name')
  const email = formData.get('email')
  const password = formData.get('password')

  const errors = {}
  if (!name) errors.name = 'Name is required'
  if (!email || !email.includes('@')) errors.email = 'Valid email required'
  if (!password || password.length < 6) errors.password = ['Password too short']

  if (Object.keys(errors).length > 0) {
    return { errors }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await db.insert(users).values({
    name,
    email,
    password: hashedPassword,
  })

  // Simple session example
  const sessionToken = `session-${Date.now()}`
  cookies().set('session', sessionToken, {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })

  redirect('/dashboard')
}

'use server';

import { cookies } from 'next/headers';

const attempts = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const SESSION_DURATION = 24 * 60 * 60; // 24 hours in seconds

export async function validateAdminPasskey(passkey: string, clientKey: string = 'default') {
  const now = Date.now();
  const record = attempts.get(clientKey);

  if (record) {
    if (now < record.resetAt && record.count >= MAX_ATTEMPTS) {
      return { success: false, error: 'Too many attempts. Please try again later.' };
    }
    if (now >= record.resetAt) {
      attempts.delete(clientKey);
    }
  }

  const isValid = passkey === process.env.NEXT_PRIVATE_ADMIN_PASSKEY;

  if (!isValid) {
    const current = attempts.get(clientKey) ?? { count: 0, resetAt: now + WINDOW_MS };
    attempts.set(clientKey, { count: current.count + 1, resetAt: current.resetAt });
    return { success: false, error: 'Invalid passkey, please try again.' };
  }

  attempts.delete(clientKey);

  const cookieStore = await cookies();
  cookieStore.set('admin_session', 'authenticated', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: SESSION_DURATION,
    path: '/admin',
  });

  return { success: true };
}

export async function checkAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get('admin_session')?.value === 'authenticated';
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
}

'use client';
import useSWR from 'swr';
import React from 'react';

export type Session = { userId: string; email: string; name: string } | null;
const fetcher = (url: string) => fetch(url).then(r => r.json());
export const AuthContext = React.createContext<{ session: Session; loading: boolean; refresh: () => void }>({ session: null, loading: true, refresh: () => {} });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data, isLoading, mutate } = useSWR('/api/auth/me', fetcher);
  return <AuthContext.Provider value={{ session: data?.user ?? null, loading: isLoading, refresh: () => mutate() }}>{children}</AuthContext.Provider>;
}

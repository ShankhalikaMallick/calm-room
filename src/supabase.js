// Mock Supabase client for local development
// Replace with actual Supabase setup when ready
const mockSupabase = {
  auth: {
    getSession: () => Promise.resolve({ data: { session: null } }),
    signInAnonymously: () => Promise.resolve({ data: { user: { id: 'mock-user-id' } } }),
    getUser: () => Promise.resolve({ data: { user: { id: 'mock-user-id' } } })
  },
  from: () => ({
    select: () => Promise.resolve({ data: null }),
    eq: () => ({
      single: () => Promise.resolve({ data: null })
    }),
    upsert: () => Promise.resolve()
  })
}

export const supabase = mockSupabase

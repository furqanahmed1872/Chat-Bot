import type { Session, SupabaseClient, User } from '@supabase/supabase-js';

declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      supabase: SupabaseClient;
      safeGetSession: () => Promise<{
        session: Session | null;
        user: User | null;
      }>;
      session: Session | null;
      user: User | null;
    }
    interface PageData {
      session: Session | null;
    }
    // interface PageState {}
    // interface Platform {}
  }
}

declare module '$env/static/private' {
  export const MY_PRIVATE_API_KEY: string;
  // export const ANOTHER_PRIVATE_VARIABLE: string;
  // Add other environment variables as needed
}

export {};

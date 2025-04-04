
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          name: string
          email: string
          profile_image: string | null
          role: 'admin' | 'super_admin' | 'motoboy' | 'client'
          phone: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name: string
          email: string
          profile_image?: string | null
          role?: 'admin' | 'super_admin' | 'motoboy' | 'client'
          phone?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          profile_image?: string | null
          role?: 'admin' | 'super_admin' | 'motoboy' | 'client'
          phone?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      cooperatives: {
        Row: {
          id: string
          name: string
          phone: string
          address: string
          logo: string | null
          plan: 'Free' | 'Starter' | 'Pro' | 'Enterprise'
          plan_started_at: string
          plan_expires_at: string | null
          whatsapp_integration: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          phone: string
          address: string
          logo?: string | null
          plan?: 'Free' | 'Starter' | 'Pro' | 'Enterprise'
          plan_started_at?: string
          plan_expires_at?: string | null
          whatsapp_integration?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          phone?: string
          address?: string
          logo?: string | null
          plan?: 'Free' | 'Starter' | 'Pro' | 'Enterprise'
          plan_started_at?: string
          plan_expires_at?: string | null
          whatsapp_integration?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      cooperative_users: {
        Row: {
          cooperative_id: string
          user_id: string
          role: 'administrador' | 'gerente' | 'funcionario'
          created_at: string
          updated_at: string
        }
        Insert: {
          cooperative_id: string
          user_id: string
          role?: 'administrador' | 'gerente' | 'funcionario'
          created_at?: string
          updated_at?: string
        }
        Update: {
          cooperative_id?: string
          user_id?: string
          role?: 'administrador' | 'gerente' | 'funcionario'
          created_at?: string
          updated_at?: string
        }
      }
    }
    Functions: {
      get_cooperative_plan_limits: {
        Args: { cooperative_id: string }
        Returns: Json
      }
      user_belongs_to_cooperative: {
        Args: { cooperative_id: string }
        Returns: boolean
      }
      get_user_cooperative_role: {
        Args: { cooperative_id: string }
        Returns: string
      }
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
// Remove the Enums export since it doesn't exist in our Database type

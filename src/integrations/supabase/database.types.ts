
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
          billing_method: 'asaas' | 'pix' | null
          billing_day: number | null
          billing_period: 'weekly' | 'biweekly' | 'monthly' | null
          motoboy_rate: number | null
          client_rate: number | null
          whatsapp_key: string | null
          whatsapp_number: string | null
          whatsapp_endpoint: string | null
          automatic_payment_confirmation: boolean
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
          billing_method?: 'asaas' | 'pix' | null
          billing_day?: number | null
          billing_period?: 'weekly' | 'biweekly' | 'monthly' | null
          motoboy_rate?: number | null
          client_rate?: number | null
          whatsapp_key?: string | null
          whatsapp_number?: string | null
          whatsapp_endpoint?: string | null
          automatic_payment_confirmation?: boolean
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
          billing_method?: 'asaas' | 'pix' | null
          billing_day?: number | null
          billing_period?: 'weekly' | 'biweekly' | 'monthly' | null
          motoboy_rate?: number | null
          client_rate?: number | null
          whatsapp_key?: string | null
          whatsapp_number?: string | null
          whatsapp_endpoint?: string | null
          automatic_payment_confirmation?: boolean
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
      clients: {
        Row: {
          id: string
          user_id: string
          cooperative_id: string
          company_name: string
          contact_name: string
          phone: string
          address: string
          min_motoboys: number
          max_motoboys: number
          business_hours: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          cooperative_id: string
          company_name: string
          contact_name: string
          phone: string
          address: string
          min_motoboys?: number
          max_motoboys?: number
          business_hours?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          cooperative_id?: string
          company_name?: string
          contact_name?: string
          phone?: string
          address?: string
          min_motoboys?: number
          max_motoboys?: number
          business_hours?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      motoboys: {
        Row: {
          id: string
          user_id: string
          cooperative_id: string
          license_number: string
          vehicle_type: string
          vehicle_plate: string
          available: boolean
          rating: number
          license_expiry: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          cooperative_id: string
          license_number: string
          vehicle_type: string
          vehicle_plate: string
          available?: boolean
          rating?: number
          license_expiry?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          cooperative_id?: string
          license_number?: string
          vehicle_type?: string
          vehicle_plate?: string
          available?: boolean
          rating?: number
          license_expiry?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      documents: {
        Row: {
          id: string
          motoboy_id: string
          document_type: string
          file_path: string
          status: 'pending' | 'approved' | 'rejected'
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          motoboy_id: string
          document_type: string
          file_path: string
          status?: 'pending' | 'approved' | 'rejected'
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          motoboy_id?: string
          document_type?: string
          file_path?: string
          status?: 'pending' | 'approved' | 'rejected'
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      client_motoboy_assignments: {
        Row: {
          id: string
          client_id: string
          motoboy_id: string
          cooperative_id: string
          is_fixed: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          client_id: string
          motoboy_id: string
          cooperative_id: string
          is_fixed?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          client_id?: string
          motoboy_id?: string
          cooperative_id?: string
          is_fixed?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      schedules: {
        Row: {
          id: string
          cooperative_id: string
          motoboy_id: string
          client_id: string
          start_time: string
          end_time: string | null
          status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
          notes: string | null
          is_reserve: boolean
          is_confirmed: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          cooperative_id: string
          motoboy_id: string
          client_id: string
          start_time: string
          end_time?: string | null
          status?: 'pending' | 'confirmed' | 'completed' | 'cancelled'
          notes?: string | null
          is_reserve?: boolean
          is_confirmed?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          cooperative_id?: string
          motoboy_id?: string
          client_id?: string
          start_time?: string
          end_time?: string | null
          status?: 'pending' | 'confirmed' | 'completed' | 'cancelled'
          notes?: string | null
          is_reserve?: boolean
          is_confirmed?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      payments: {
        Row: {
          id: string
          cooperative_id: string
          motoboy_id: string | null
          client_id: string | null
          amount: number
          status: 'pending' | 'paid' | 'overdue' | 'cancelled'
          due_date: string
          payment_date: string | null
          payment_method: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          cooperative_id: string
          motoboy_id?: string | null
          client_id?: string | null
          amount: number
          status?: 'pending' | 'paid' | 'overdue' | 'cancelled'
          due_date: string
          payment_date?: string | null
          payment_method?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          cooperative_id?: string
          motoboy_id?: string | null
          client_id?: string | null
          amount?: number
          status?: 'pending' | 'paid' | 'overdue' | 'cancelled'
          due_date?: string
          payment_date?: string | null
          payment_method?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          cooperative_id: string
          user_id: string
          title: string
          content: string
          whatsapp_message_id: string | null
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          cooperative_id: string
          user_id: string
          title: string
          content: string
          whatsapp_message_id?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          cooperative_id?: string
          user_id?: string
          title?: string
          content?: string
          whatsapp_message_id?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      invites: {
        Row: {
          id: string
          email: string
          cooperative_id: string
          role: 'administrador' | 'gerente' | 'funcionario'
          token: string
          status: 'pending' | 'accepted' | 'expired'
          created_by: string
          expires_at: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          cooperative_id: string
          role: 'administrador' | 'gerente' | 'funcionario'
          token: string
          status?: 'pending' | 'accepted' | 'expired'
          created_by: string
          expires_at: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          cooperative_id?: string
          role?: 'administrador' | 'gerente' | 'funcionario'
          token?: string
          status?: 'pending' | 'accepted' | 'expired'
          created_by?: string
          expires_at?: string
          created_at?: string
          updated_at?: string
        }
      }
      complaints: {
        Row: {
          id: string
          cooperative_id: string
          reporter_id: string
          reported_user_id: string
          title: string
          description: string
          impact_points: number
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          cooperative_id: string
          reporter_id: string
          reported_user_id: string
          title: string
          description: string
          impact_points: number
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          cooperative_id?: string
          reporter_id?: string
          reported_user_id?: string
          title?: string
          description?: string
          impact_points?: number
          status?: string
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
      check_motoboy_limit: {
        Args: { cooperative_id: string }
        Returns: boolean
      }
      check_client_limit: {
        Args: { cooperative_id: string }
        Returns: boolean
      }
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
// Remove the Enums export since it doesn't exist in our Database type

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
      clients: {
        Row: {
          address: string
          business_hours: Json | null
          company_name: string
          contact_name: string
          cooperative_id: string
          created_at: string
          id: string
          phone: string
          updated_at: string
          user_id: string
        }
        Insert: {
          address: string
          business_hours?: Json | null
          company_name: string
          contact_name: string
          cooperative_id: string
          created_at?: string
          id?: string
          phone: string
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string
          business_hours?: Json | null
          company_name?: string
          contact_name?: string
          cooperative_id?: string
          created_at?: string
          id?: string
          phone?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "clients_cooperative_id_fkey"
            columns: ["cooperative_id"]
            isOneToOne: false
            referencedRelation: "cooperatives"
            referencedColumns: ["id"]
          },
        ]
      }
      complaints: {
        Row: {
          cooperative_id: string
          created_at: string
          description: string
          id: string
          impact_points: number
          reported_user_id: string
          reporter_id: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          cooperative_id: string
          created_at?: string
          description: string
          id?: string
          impact_points: number
          reported_user_id: string
          reporter_id: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          cooperative_id?: string
          created_at?: string
          description?: string
          id?: string
          impact_points?: number
          reported_user_id?: string
          reporter_id?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "complaints_cooperative_id_fkey"
            columns: ["cooperative_id"]
            isOneToOne: false
            referencedRelation: "cooperatives"
            referencedColumns: ["id"]
          },
        ]
      }
      cooperative_users: {
        Row: {
          cooperative_id: string
          created_at: string
          role: Database["public"]["Enums"]["cooperative_role"]
          updated_at: string
          user_id: string
        }
        Insert: {
          cooperative_id: string
          created_at?: string
          role?: Database["public"]["Enums"]["cooperative_role"]
          updated_at?: string
          user_id: string
        }
        Update: {
          cooperative_id?: string
          created_at?: string
          role?: Database["public"]["Enums"]["cooperative_role"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cooperative_users_cooperative_id_fkey"
            columns: ["cooperative_id"]
            isOneToOne: false
            referencedRelation: "cooperatives"
            referencedColumns: ["id"]
          },
        ]
      }
      cooperatives: {
        Row: {
          address: string
          created_at: string
          id: string
          logo: string | null
          name: string
          phone: string
          plan: Database["public"]["Enums"]["plan_type"]
          plan_expires_at: string | null
          plan_started_at: string
          updated_at: string
          whatsapp_integration: Json | null
        }
        Insert: {
          address: string
          created_at?: string
          id?: string
          logo?: string | null
          name: string
          phone: string
          plan?: Database["public"]["Enums"]["plan_type"]
          plan_expires_at?: string | null
          plan_started_at?: string
          updated_at?: string
          whatsapp_integration?: Json | null
        }
        Update: {
          address?: string
          created_at?: string
          id?: string
          logo?: string | null
          name?: string
          phone?: string
          plan?: Database["public"]["Enums"]["plan_type"]
          plan_expires_at?: string | null
          plan_started_at?: string
          updated_at?: string
          whatsapp_integration?: Json | null
        }
        Relationships: []
      }
      invites: {
        Row: {
          cooperative_id: string
          created_at: string
          created_by: string
          email: string
          expires_at: string
          id: string
          role: Database["public"]["Enums"]["cooperative_role"]
          status: Database["public"]["Enums"]["invite_status"]
          token: string
          updated_at: string
        }
        Insert: {
          cooperative_id: string
          created_at?: string
          created_by: string
          email: string
          expires_at: string
          id?: string
          role: Database["public"]["Enums"]["cooperative_role"]
          status?: Database["public"]["Enums"]["invite_status"]
          token: string
          updated_at?: string
        }
        Update: {
          cooperative_id?: string
          created_at?: string
          created_by?: string
          email?: string
          expires_at?: string
          id?: string
          role?: Database["public"]["Enums"]["cooperative_role"]
          status?: Database["public"]["Enums"]["invite_status"]
          token?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "invites_cooperative_id_fkey"
            columns: ["cooperative_id"]
            isOneToOne: false
            referencedRelation: "cooperatives"
            referencedColumns: ["id"]
          },
        ]
      }
      motoboys: {
        Row: {
          available: boolean
          cooperative_id: string
          created_at: string
          documents: Json | null
          id: string
          license_expiry: string
          license_number: string
          rating: number | null
          updated_at: string
          user_id: string
          vehicle_plate: string
          vehicle_type: string
        }
        Insert: {
          available?: boolean
          cooperative_id: string
          created_at?: string
          documents?: Json | null
          id?: string
          license_expiry: string
          license_number: string
          rating?: number | null
          updated_at?: string
          user_id: string
          vehicle_plate: string
          vehicle_type: string
        }
        Update: {
          available?: boolean
          cooperative_id?: string
          created_at?: string
          documents?: Json | null
          id?: string
          license_expiry?: string
          license_number?: string
          rating?: number | null
          updated_at?: string
          user_id?: string
          vehicle_plate?: string
          vehicle_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "motoboys_cooperative_id_fkey"
            columns: ["cooperative_id"]
            isOneToOne: false
            referencedRelation: "cooperatives"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          content: string
          cooperative_id: string
          created_at: string
          id: string
          status: Database["public"]["Enums"]["notification_status"]
          title: string
          updated_at: string
          user_id: string
          whatsapp_message_id: string | null
        }
        Insert: {
          content: string
          cooperative_id: string
          created_at?: string
          id?: string
          status?: Database["public"]["Enums"]["notification_status"]
          title: string
          updated_at?: string
          user_id: string
          whatsapp_message_id?: string | null
        }
        Update: {
          content?: string
          cooperative_id?: string
          created_at?: string
          id?: string
          status?: Database["public"]["Enums"]["notification_status"]
          title?: string
          updated_at?: string
          user_id?: string
          whatsapp_message_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_cooperative_id_fkey"
            columns: ["cooperative_id"]
            isOneToOne: false
            referencedRelation: "cooperatives"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          cooperative_id: string
          created_at: string
          due_date: string
          id: string
          motoboy_id: string
          notes: string | null
          payment_date: string | null
          payment_method: string | null
          status: Database["public"]["Enums"]["payment_status"]
          updated_at: string
        }
        Insert: {
          amount: number
          cooperative_id: string
          created_at?: string
          due_date: string
          id?: string
          motoboy_id: string
          notes?: string | null
          payment_date?: string | null
          payment_method?: string | null
          status?: Database["public"]["Enums"]["payment_status"]
          updated_at?: string
        }
        Update: {
          amount?: number
          cooperative_id?: string
          created_at?: string
          due_date?: string
          id?: string
          motoboy_id?: string
          notes?: string | null
          payment_date?: string | null
          payment_method?: string | null
          status?: Database["public"]["Enums"]["payment_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_cooperative_id_fkey"
            columns: ["cooperative_id"]
            isOneToOne: false
            referencedRelation: "cooperatives"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_motoboy_id_fkey"
            columns: ["motoboy_id"]
            isOneToOne: false
            referencedRelation: "motoboys"
            referencedColumns: ["id"]
          },
        ]
      }
      plans: {
        Row: {
          created_at: string
          features: Json
          id: string
          max_clients: number
          max_motoboys: number
          max_schedules: number
          name: Database["public"]["Enums"]["plan_type"]
          price: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          features?: Json
          id?: string
          max_clients: number
          max_motoboys: number
          max_schedules: number
          name: Database["public"]["Enums"]["plan_type"]
          price: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          features?: Json
          id?: string
          max_clients?: number
          max_motoboys?: number
          max_schedules?: number
          name?: Database["public"]["Enums"]["plan_type"]
          price?: number
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string
          phone: string | null
          profile_image: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id: string
          name: string
          phone?: string | null
          profile_image?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
          phone?: string | null
          profile_image?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Relationships: []
      }
      schedules: {
        Row: {
          client_id: string
          cooperative_id: string
          created_at: string
          end_time: string | null
          id: string
          motoboy_id: string
          notes: string | null
          start_time: string
          status: Database["public"]["Enums"]["schedule_status"]
          updated_at: string
        }
        Insert: {
          client_id: string
          cooperative_id: string
          created_at?: string
          end_time?: string | null
          id?: string
          motoboy_id: string
          notes?: string | null
          start_time: string
          status?: Database["public"]["Enums"]["schedule_status"]
          updated_at?: string
        }
        Update: {
          client_id?: string
          cooperative_id?: string
          created_at?: string
          end_time?: string | null
          id?: string
          motoboy_id?: string
          notes?: string | null
          start_time?: string
          status?: Database["public"]["Enums"]["schedule_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "schedules_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "schedules_cooperative_id_fkey"
            columns: ["cooperative_id"]
            isOneToOne: false
            referencedRelation: "cooperatives"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "schedules_motoboy_id_fkey"
            columns: ["motoboy_id"]
            isOneToOne: false
            referencedRelation: "motoboys"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_cooperative_limit: {
        Args: {
          cooperative_id: string
          limit_type: string
        }
        Returns: boolean
      }
      get_cooperative_plan_limits: {
        Args: {
          cooperative_id: string
        }
        Returns: Json
      }
      get_user_cooperative_role: {
        Args: {
          cooperative_id: string
        }
        Returns: string
      }
      user_belongs_to_cooperative: {
        Args: {
          cooperative_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      cooperative_role: "administrador" | "gerente" | "funcionario"
      invite_status: "pending" | "accepted" | "expired"
      notification_status: "sent" | "delivered" | "read" | "failed"
      payment_status: "pending" | "paid" | "overdue" | "cancelled"
      plan_type: "Free" | "Starter" | "Pro" | "Enterprise"
      schedule_status: "pending" | "confirmed" | "completed" | "cancelled"
      user_role: "admin" | "super_admin" | "motoboy" | "client"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never


export type UserRole = 'admin' | 'super_admin' | 'motoboy' | 'client';
export type CooperativeRole = 'administrador' | 'gerente' | 'funcionario';
export type PlanType = 'Free' | 'Starter' | 'Pro' | 'Enterprise';
export type ScheduleStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';
export type PaymentMethodType = 'asaas' | 'pix';
export type BillingPeriod = 'weekly' | 'biweekly' | 'monthly';
export type DocumentStatus = 'pending' | 'approved' | 'rejected';
export type PaymentStatus = 'pending' | 'paid' | 'overdue' | 'cancelled';
export type InviteStatus = 'pending' | 'accepted' | 'expired';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  profile_image?: string;
  created_at: string;
}

export interface Cooperative {
  id: string;
  name: string;
  phone: string;
  address: string;
  logo?: string;
  plan: PlanType;
  plan_started_at: string;
  plan_expires_at?: string;
  billing_method?: PaymentMethodType;
  billing_day?: number;
  billing_period?: BillingPeriod;
  motoboy_rate?: number;
  client_rate?: number;
  whatsapp_key?: string;
  whatsapp_number?: string;
  whatsapp_endpoint?: string;
  automatic_payment_confirmation: boolean;
  created_at: string;
  updated_at: string;
}

export interface CooperativeUser {
  cooperative_id: string;
  user_id: string;
  role: CooperativeRole;
  created_at: string;
}

export interface Plan {
  id: string;
  name: PlanType;
  max_schedules: number;
  max_motoboys: number;
  max_clients: number;
  features: string[];
  price: number;
}

export interface Motoboy {
  id: string;
  user_id: string;
  cooperative_id: string;
  license_number: string;
  vehicle_type: string;
  available: boolean;
  rating: number;
  license_expiry?: string;
  created_at: string;
}

export interface Document {
  id: string;
  motoboy_id: string;
  document_type: string;
  file_path: string;
  status: DocumentStatus;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Client {
  id: string;
  user_id: string;
  cooperative_id: string;
  company_name: string;
  contact_name: string;
  phone: string;
  address: string;
  min_motoboys: number;
  max_motoboys: number;
  business_hours?: any;
  created_at: string;
}

export interface ClientMotoboyAssignment {
  id: string;
  client_id: string;
  motoboy_id: string;
  cooperative_id: string;
  is_fixed: boolean;
  created_at: string;
  updated_at: string;
}

export interface Schedule {
  id: string;
  cooperative_id: string;
  motoboy_id: string;
  client_id: string;
  start_time: string;
  end_time?: string;
  status: ScheduleStatus;
  notes?: string;
  is_reserve: boolean;
  is_confirmed: boolean;
  created_at: string;
}

export interface Payment {
  id: string;
  cooperative_id: string;
  motoboy_id?: string;
  client_id?: string;
  amount: number;
  status: PaymentStatus;
  due_date: string;
  payment_date?: string;
  payment_method?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Notification {
  id: string;
  cooperative_id: string;
  user_id: string;
  title: string;
  content: string;
  whatsapp_message_id?: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface Invite {
  id: string;
  email: string;
  cooperative_id: string;
  role: CooperativeRole;
  token: string;
  status: InviteStatus;
  created_by: string;
  expires_at: string;
  created_at: string;
  updated_at: string;
}

export interface Complaint {
  id: string;
  cooperative_id: string;
  reporter_id: string;
  reported_user_id: string;
  title: string;
  description: string;
  impact_points: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface PlanLimits {
  schedules: {
    used: number;
    total: number;
  };
  motoboys: {
    used: number;
    total: number;
  };
  clients: {
    used: number;
    total: number;
  };
}

export interface CooperativeContextType {
  currentCooperative: Cooperative | null;
  cooperatives: Cooperative[];
  userRole: CooperativeRole | null;
  planLimits: PlanLimits | null;
  loading: boolean;
  setCurrentCooperative: (cooperative: Cooperative) => void;
  refreshCooperatives: () => Promise<void>;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
}

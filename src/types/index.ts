
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  profile_image?: string;
  role?: UserRole;
  created_at: string;
  updated_at?: string;
}

export type UserRole = 'admin' | 'super_admin' | 'motoboy' | 'client';

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
}

export interface Cooperative {
  id: string;
  name: string;
  phone?: string;
  address?: string;
  logo?: string;
  plan: 'Free' | 'Starter' | 'Pro' | 'Enterprise';
  plan_started_at?: string;
  plan_expires_at?: string;
  billing_method?: 'asaas' | 'pix';
  billing_day?: number;
  billing_period?: 'weekly' | 'biweekly' | 'monthly';
  motoboy_rate?: number;
  client_rate?: number;
  whatsapp_key?: string;
  whatsapp_number?: string;
  whatsapp_endpoint?: string;
  automatic_payment_confirmation?: boolean;
  created_at: string;
  updated_at?: string;
}

export interface Client {
  id: string;
  user_id: string;
  cooperative_id: string;
  company_name: string;
  contact_name: string;
  phone: string;
  address: string;
  min_motoboys?: number;
  max_motoboys?: number;
  business_hours?: any;
  created_at: string;
  updated_at?: string;
}

export type ScheduleStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface Schedule {
  id: string;
  cooperative_id: string;
  motoboy_id: string;
  client_id: string;
  start_time: string;
  end_time?: string;
  status: ScheduleStatus;
  is_reserve: boolean;
  is_confirmed: boolean;
  notes?: string;
  created_at: string;
  updated_at?: string;
}

export interface Motoboy {
  id: string;
  user_id: string;
  cooperative_id: string;
  name: string;
  phone: string;
  address: string;
  document?: string;
  license_number?: string;
  license_expiry?: string;
  available?: boolean;
  rating?: number;
  vehicle_type?: 'moto' | 'carro' | 'bicicleta';
  vehicle_plate?: string;
  pix_key?: string;
  account_type?: 'conta_corrente' | 'conta_poupanca' | 'conta_salario';
  account_number?: string;
  account_digit?: string;
  account_agency?: string;
  bank_code?: string;
  status?: 'active' | 'inactive';
  created_at: string;
  updated_at?: string;
}

export interface Document {
  id: string;
  motoboy_id: string;
  document_type: string;
  file_path: string;
  status: 'pending' | 'approved' | 'rejected';
  notes?: string;
  created_at: string;
  updated_at?: string;
}

export interface Payment {
  id: string;
  cooperative_id: string;
  motoboy_id?: string;
  client_id?: string;
  amount: number;
  status: 'pending' | 'paid' | 'overdue' | 'cancelled';
  due_date: string;
  payment_date?: string;
  payment_method?: string;
  notes?: string;
  created_at: string;
  updated_at?: string;
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
  updated_at?: string;
}

export interface Invite {
  id: string;
  email: string;
  cooperative_id: string;
  role: 'administrador' | 'gerente' | 'funcionario';
  token: string;
  status: 'pending' | 'accepted' | 'expired';
  created_by: string;
  expires_at: string;
  created_at: string;
  updated_at?: string;
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
  updated_at?: string;
}

export interface PlanLimits {
  motoboys: {
    used: number;
    total: number;
  };
  clients: {
    used: number;
    total: number;
  };
  schedules: {
    used: number;
    total: number;
  };
}

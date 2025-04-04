export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  profile_image?: string;
  created_at: string;
  updated_at?: string;
}

export interface Cooperative {
  id: string;
  name: string;
  phone?: string;
  address?: string;
  logo?: string;
  plan: 'free' | 'starter' | 'pro' | 'enterprise';
  plan_started_at?: string;
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

export interface Schedule {
  id: string;
  cooperative_id: string;
  motoboy_id: string;
  client_id: string;
  start_time: string;
  end_time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
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

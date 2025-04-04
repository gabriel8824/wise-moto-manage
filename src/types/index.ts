
export type UserRole = 'admin' | 'super_admin' | 'motoboy' | 'client';
export type CooperativeRole = 'administrador' | 'gerente' | 'funcionario';
export type PlanType = 'Free' | 'Starter' | 'Pro' | 'Enterprise';
export type ScheduleStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

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
  created_at: string;
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
  created_at: string;
}

export interface Client {
  id: string;
  user_id: string;
  cooperative_id: string;
  company_name: string;
  contact_name: string;
  phone: string;
  address: string;
  created_at: string;
}

export interface Schedule {
  id: string;
  cooperative_id: string;
  motoboy_id: string;
  client_id: string;
  start_time: string;
  end_time: string;
  status: ScheduleStatus;
  notes?: string;
  created_at: string;
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

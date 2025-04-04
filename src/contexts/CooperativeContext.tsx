
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { Cooperative, CooperativeContextType, CooperativeRole, PlanLimits } from '../types';
import { useToast } from "@/components/ui/use-toast";

const CooperativeContext = createContext<CooperativeContextType | undefined>(undefined);

export const CooperativeProvider = ({ children }: { children: ReactNode }) => {
  const [currentCooperative, setCurrentCooperative] = useState<Cooperative | null>(null);
  const [cooperatives, setCooperatives] = useState<Cooperative[]>([]);
  const [userRole, setUserRole] = useState<CooperativeRole | null>(null);
  const [planLimits, setPlanLimits] = useState<PlanLimits | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();
  
  const fetchCooperatives = async () => {
    if (!user) return;
    
    try {
      // Here we would fetch from Supabase
      // For now, we'll use mock data
      const mockCooperatives: Cooperative[] = [
        {
          id: '1',
          name: 'Cooperativa Expressa',
          phone: '(11) 9999-8888',
          address: 'Rua das Entregas, 123',
          plan: 'Free',
          created_at: new Date().toISOString(),
        },
        {
          id: '2',
          name: 'LogiRapid',
          phone: '(11) 7777-6666',
          address: 'Av. das Entregas, 456',
          plan: 'Pro',
          created_at: new Date().toISOString(),
        },
        {
          id: '3',
          name: 'Fast Delivery',
          phone: '(11) 5555-4444',
          address: 'Alameda das Entregas, 789',
          plan: 'Starter',
          created_at: new Date().toISOString(),
        }
      ];
      
      setCooperatives(mockCooperatives);
      
      // Check if there's a stored cooperative
      const storedCooperative = localStorage.getItem('currentCooperative');
      if (storedCooperative) {
        const parsedCooperative = JSON.parse(storedCooperative);
        setCurrentCooperative(parsedCooperative);
        fetchPlanLimits(parsedCooperative.id);
        setUserRole('administrador'); // Mock role for now
      }
    } catch (error) {
      console.error('Error fetching cooperatives:', error);
      toast({
        title: "Erro ao carregar cooperativas",
        description: "Ocorreu um problema ao buscar suas cooperativas.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const fetchPlanLimits = async (cooperativeId: string) => {
    try {
      // Here we would fetch from Supabase
      // For now, we'll use mock data based on the plan
      const cooperative = cooperatives.find(coop => coop.id === cooperativeId);
      
      if (!cooperative) return;
      
      let mockLimits: PlanLimits;
      
      switch (cooperative.plan) {
        case 'Free':
          mockLimits = {
            schedules: { used: 3, total: 10 },
            motoboys: { used: 2, total: 5 },
            clients: { used: 1, total: 3 }
          };
          break;
        case 'Starter':
          mockLimits = {
            schedules: { used: 20, total: 50 },
            motoboys: { used: 8, total: 20 },
            clients: { used: 4, total: 10 }
          };
          break;
        case 'Pro':
          mockLimits = {
            schedules: { used: 80, total: 200 },
            motoboys: { used: 40, total: 100 },
            clients: { used: 20, total: 50 }
          };
          break;
        default:
          mockLimits = {
            schedules: { used: 200, total: 1000 },
            motoboys: { used: 50, total: 500 },
            clients: { used: 30, total: 300 }
          };
      }
      
      setPlanLimits(mockLimits);
    } catch (error) {
      console.error('Error fetching plan limits:', error);
    }
  };
  
  const handleSetCurrentCooperative = (cooperative: Cooperative) => {
    setCurrentCooperative(cooperative);
    localStorage.setItem('currentCooperative', JSON.stringify(cooperative));
    fetchPlanLimits(cooperative.id);
    
    // Mock user role for now - would be fetched from Supabase
    setUserRole('administrador');
  };
  
  useEffect(() => {
    if (user) {
      fetchCooperatives();
    } else {
      setCooperatives([]);
      setCurrentCooperative(null);
      setUserRole(null);
      setPlanLimits(null);
    }
  }, [user]);
  
  const refreshCooperatives = async () => {
    setLoading(true);
    await fetchCooperatives();
    setLoading(false);
  };
  
  return (
    <CooperativeContext.Provider 
      value={{ 
        currentCooperative, 
        cooperatives, 
        userRole, 
        planLimits, 
        loading,
        setCurrentCooperative: handleSetCurrentCooperative,
        refreshCooperatives
      }}
    >
      {children}
    </CooperativeContext.Provider>
  );
};

export const useCooperative = () => {
  const context = useContext(CooperativeContext);
  if (context === undefined) {
    throw new Error('useCooperative must be used within a CooperativeProvider');
  }
  return context;
};

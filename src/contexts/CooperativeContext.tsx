
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { Cooperative, CooperativeContextType, CooperativeRole, PlanLimits } from '../types';
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

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
    if (!user) {
      setCooperatives([]);
      setCurrentCooperative(null);
      setLoading(false);
      return;
    }
    
    try {
      // Fetch cooperatives the user is a member of
      const { data: userCooperatives, error: userCooperativesError } = await supabase
        .from('cooperative_users')
        .select('cooperative_id, role')
        .eq('user_id', user.id);
      
      if (userCooperativesError) throw userCooperativesError;
      
      if (!userCooperatives || userCooperatives.length === 0) {
        setCooperatives([]);
        setCurrentCooperative(null);
        setLoading(false);
        return;
      }
      
      // Get the actual cooperative details
      const { data: cooperativesData, error: cooperativesError } = await supabase
        .from('cooperatives')
        .select('*')
        .in('id', userCooperatives.map(uc => uc.cooperative_id));
      
      if (cooperativesError) throw cooperativesError;
      
      if (!cooperativesData) {
        setCooperatives([]);
        return;
      }
      
      const cooperativesList = cooperativesData.map(coop => ({
        id: coop.id,
        name: coop.name,
        phone: coop.phone,
        address: coop.address,
        logo: coop.logo || undefined,
        plan: coop.plan,
        created_at: coop.created_at
      }));
      
      setCooperatives(cooperativesList);
      
      // Check if there's a stored cooperative
      const storedCooperative = localStorage.getItem('currentCooperative');
      if (storedCooperative) {
        const parsedCooperative = JSON.parse(storedCooperative);
        const foundCooperative = cooperativesList.find(c => c.id === parsedCooperative.id);
        
        if (foundCooperative) {
          setCurrentCooperative(foundCooperative);
          
          // Set user role in cooperative
          const userCooperative = userCooperatives.find(uc => uc.cooperative_id === foundCooperative.id);
          if (userCooperative) {
            setUserRole(userCooperative.role as CooperativeRole);
          }
          
          // Fetch plan limits
          await fetchPlanLimits(foundCooperative.id);
        }
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
      // Call the Supabase function to get cooperative plan limits
      const { data, error } = await supabase.rpc(
        'get_cooperative_plan_limits',
        { cooperative_id: cooperativeId }
      );
      
      if (error) {
        throw error;
      }
      
      setPlanLimits(data as PlanLimits);
    } catch (error) {
      console.error('Error fetching plan limits:', error);
      toast({
        title: "Erro ao carregar limites do plano",
        description: "Não foi possível obter informações sobre o plano da cooperativa.",
        variant: "destructive",
      });
    }
  };
  
  const handleSetCurrentCooperative = async (cooperative: Cooperative) => {
    setCurrentCooperative(cooperative);
    localStorage.setItem('currentCooperative', JSON.stringify(cooperative));
    
    if (user) {
      // Get user role in the cooperative
      const { data: userCooperative, error } = await supabase
        .from('cooperative_users')
        .select('role')
        .eq('cooperative_id', cooperative.id)
        .eq('user_id', user.id)
        .single();
      
      if (userCooperative) {
        setUserRole(userCooperative.role as CooperativeRole);
      } else {
        setUserRole(null);
      }
      
      // Fetch plan limits
      await fetchPlanLimits(cooperative.id);
    }
  };
  
  useEffect(() => {
    fetchCooperatives();
  }, [user]);
  
  const refreshCooperatives = async () => {
    setLoading(true);
    await fetchCooperatives();
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

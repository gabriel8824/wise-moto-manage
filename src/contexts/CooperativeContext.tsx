
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';
import type { Cooperative, User } from '@/types';

type CooperativeRole = 'administrador' | 'gerente' | 'funcionario';

type CooperativeContextType = {
  cooperatives: Cooperative[];
  currentCooperative: Cooperative | null;
  setCurrentCooperative: (cooperative: Cooperative) => void;
  loading: boolean;
  userRole: CooperativeRole | null;
  isAdmin: boolean;
  refreshCooperatives: () => Promise<void>;
};

const CooperativeContext = createContext<CooperativeContextType>({
  cooperatives: [],
  currentCooperative: null,
  setCurrentCooperative: () => {},
  loading: true,
  userRole: null,
  isAdmin: false,
  refreshCooperatives: async () => {},
});

export const useCooperative = () => useContext(CooperativeContext);

export const CooperativeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cooperatives, setCooperatives] = useState<Cooperative[]>([]);
  const [currentCooperative, setCurrentCooperative] = useState<Cooperative | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<CooperativeRole | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Function to fetch cooperatives associated with the user
  const fetchCooperatives = async () => {
    if (!user) {
      setCooperatives([]);
      setCurrentCooperative(null);
      setLoading(false);
      return;
    }
    
    try {
      const { data, error } = await supabase
        .from('cooperative_users')
        .select(`
          cooperative:cooperatives (
            id, name, phone, address, logo, plan, 
            plan_started_at, plan_expires_at, billing_method, billing_day, 
            billing_period, motoboy_rate, client_rate,
            whatsapp_key, whatsapp_number, whatsapp_endpoint,
            automatic_payment_confirmation, created_at, updated_at
          ),
          role
        `)
        .eq('user_id', user.id);
        
      if (error) throw error;
      
      if (data && data.length > 0) {
        const userCooperatives = data.map(item => item.cooperative as Cooperative);
        setCooperatives(userCooperatives);
        
        // Try to load saved cooperative from localStorage
        const savedCooperativeId = localStorage.getItem('currentCooperativeId');
        if (savedCooperativeId) {
          const saved = userCooperatives.find(coop => coop.id === savedCooperativeId);
          if (saved) {
            setCurrentCooperative(saved);
            // Get the user role for this cooperative
            const userCoopData = data.find(item => item.cooperative.id === saved.id);
            if (userCoopData) {
              setUserRole(userCoopData.role as CooperativeRole);
            }
          }
        }
      }
    } catch (error) {
      console.error('Error fetching cooperatives:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Expose the refresh function to be called from other components
  const refreshCooperatives = async () => {
    setLoading(true);
    await fetchCooperatives();
  };
  
  // Fetch cooperatives associated with the user
  useEffect(() => {
    fetchCooperatives();
  }, [user]);
  
  // Update localStorage when currentCooperative changes
  useEffect(() => {
    if (currentCooperative) {
      localStorage.setItem('currentCooperativeId', currentCooperative.id);
      
      // Get the user role for this cooperative
      const getUserRole = async () => {
        if (!user) return;
        
        try {
          const { data, error } = await supabase
            .from('cooperative_users')
            .select('role')
            .eq('user_id', user.id)
            .eq('cooperative_id', currentCooperative.id)
            .single();
            
          if (error) throw error;
          
          if (data) {
            setUserRole(data.role as CooperativeRole);
          }
        } catch (error) {
          console.error('Error fetching user role:', error);
        }
      };
      
      getUserRole();
    } else {
      localStorage.removeItem('currentCooperativeId');
      setUserRole(null);
    }
  }, [currentCooperative, user]);
  
  const isAdmin = userRole === 'administrador';
  
  return (
    <CooperativeContext.Provider
      value={{
        cooperatives,
        currentCooperative,
        setCurrentCooperative,
        loading,
        userRole,
        isAdmin,
        refreshCooperatives,
      }}
    >
      {children}
    </CooperativeContext.Provider>
  );
};

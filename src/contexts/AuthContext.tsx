import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Session } from '@supabase/supabase-js';

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        
        if (session?.user) {
          // Get the profile data with user role
          const { data: profileData, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
            
          if (profileData) {
            setUser({
              id: session.user.id,
              email: session.user.email || '',
              name: profileData.name,
              role: profileData.role,
              profile_image: profileData.profile_image,
              created_at: profileData.created_at
            });
          } else {
            console.error('Profile fetch error:', error);
            setUser(null);
          }
        } else {
          setUser(null);
        }
      }
    );

    // Then check for existing session
    const checkUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          setSession(session);
          
          // Get the profile data
          const { data: profileData, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
            
          if (profileData) {
            setUser({
              id: session.user.id,
              email: session.user.email || '',
              name: profileData.name,
              role: profileData.role,
              profile_image: profileData.profile_image,
              created_at: profileData.created_at
            });
          } else {
            console.error('Profile fetch error:', error);
            setUser(null);
          }
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkUser();
    
    return () => {
      subscription?.unsubscribe();
    };
  }, []);
  
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      toast({
        title: "Login realizado com sucesso",
        description: "Bem-vindo de volta!",
      });
    } catch (error: any) {
      console.error('Error during login:', error);
      toast({
        title: "Erro ao realizar login",
        description: error.message || "Verifique suas credenciais e tente novamente.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  const register = async (email: string, password: string, name: string) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name
          }
        }
      });
      
      if (error) throw error;
      
      toast({
        title: "Cadastro realizado com sucesso",
        description: "Bem-vindo ao CoopeWise!",
      });
    } catch (error: any) {
      console.error('Error during registration:', error);
      toast({
        title: "Erro ao realizar cadastro",
        description: error.message || "Verifique suas informações e tente novamente.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      setUser(null);
      localStorage.removeItem('currentCooperative');
      toast({
        title: "Logout realizado com sucesso",
        description: "Até logo!",
      });
    } catch (error: any) {
      console.error('Error during logout:', error);
      toast({
        title: "Erro ao realizar logout",
        description: error.message || "Por favor, tente novamente.",
        variant: "destructive",
      });
      throw error;
    }
  };
  
  return (
    <AuthContext.Provider value={{ user, session, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

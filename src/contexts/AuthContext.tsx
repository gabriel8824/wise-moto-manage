
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType } from '../types';
import { useToast } from "@/components/ui/use-toast";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  // Mock authentication for now - will connect to Supabase later
  useEffect(() => {
    const checkUser = async () => {
      try {
        // Here we would check if the user is authenticated with Supabase
        const storedUser = localStorage.getItem('coopeWiseUser');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkUser();
  }, []);
  
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Here we would authenticate with Supabase
      // For now, we'll mock a successful login
      const mockUser: User = {
        id: '1',
        email,
        name: 'User Example',
        role: 'admin',
        created_at: new Date().toISOString(),
      };
      
      setUser(mockUser);
      localStorage.setItem('coopeWiseUser', JSON.stringify(mockUser));
      toast({
        title: "Login realizado com sucesso",
        description: "Bem-vindo de volta!",
      });
    } catch (error) {
      console.error('Error during login:', error);
      toast({
        title: "Erro ao realizar login",
        description: "Verifique suas credenciais e tente novamente.",
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
      // Here we would register with Supabase
      // For now, we'll mock a successful registration
      const mockUser: User = {
        id: '1',
        email,
        name,
        role: 'admin',
        created_at: new Date().toISOString(),
      };
      
      setUser(mockUser);
      localStorage.setItem('coopeWiseUser', JSON.stringify(mockUser));
      toast({
        title: "Cadastro realizado com sucesso",
        description: "Bem-vindo ao CoopeWise!",
      });
    } catch (error) {
      console.error('Error during registration:', error);
      toast({
        title: "Erro ao realizar cadastro",
        description: "Verifique suas informações e tente novamente.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  const logout = async () => {
    try {
      // Here we would sign out with Supabase
      setUser(null);
      localStorage.removeItem('coopeWiseUser');
      localStorage.removeItem('currentCooperative');
      toast({
        title: "Logout realizado com sucesso",
        description: "Até logo!",
      });
    } catch (error) {
      console.error('Error during logout:', error);
      toast({
        title: "Erro ao realizar logout",
        description: "Por favor, tente novamente.",
        variant: "destructive",
      });
      throw error;
    }
  };
  
  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
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

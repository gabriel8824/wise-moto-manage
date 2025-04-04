
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCooperative } from '@/contexts/CooperativeContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Cooperative } from '@/types';
import { Plus } from 'lucide-react';

const SelectCooperative = () => {
  const { user, loading: authLoading } = useAuth();
  const { cooperatives, loading: cooperativesLoading, setCurrentCooperative } = useCooperative();
  const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState(false);
  
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);
  
  const handleSelectCooperative = (cooperative: Cooperative) => {
    setCurrentCooperative(cooperative);
    navigate('/dashboard');
  };
  
  const handleCreateCooperative = () => {
    setIsCreating(true);
    // For now, we'll just navigate to dashboard
    // In a real implementation, we'd show a form to create a new cooperative
    navigate('/dashboard');
  };
  
  if (authLoading || cooperativesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Selecione uma Cooperativa</h1>
          <p className="text-muted-foreground">
            Escolha uma cooperativa para continuar ou crie uma nova.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cooperatives.map(cooperative => (
            <Card 
              key={cooperative.id}
              className="p-4 cursor-pointer hover:border-primary transition-all border border-border"
              onClick={() => handleSelectCooperative(cooperative)}
            >
              <div className="flex flex-col items-center p-4">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                  {cooperative.logo ? (
                    <img 
                      src={cooperative.logo} 
                      alt={cooperative.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <span className="text-2xl font-bold text-muted-foreground">
                      {cooperative.name.charAt(0)}
                    </span>
                  )}
                </div>
                <h3 className="font-semibold text-lg mb-1">{cooperative.name}</h3>
                <p className="text-sm text-muted-foreground text-center">{cooperative.address}</p>
              </div>
            </Card>
          ))}
          
          {/* Card for creating a new cooperative */}
          <Card 
            className="p-4 cursor-pointer hover:border-primary transition-all border border-dashed border-border"
            onClick={handleCreateCooperative}
          >
            <div className="flex flex-col items-center justify-center h-full p-8">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <Plus className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-lg">Criar Nova Cooperativa</h3>
              <p className="text-sm text-muted-foreground text-center mt-1">
                Adicione uma nova cooperativa ao sistema
              </p>
            </div>
          </Card>
        </div>
        
        {cooperatives.length === 0 && !isCreating && (
          <div className="text-center mt-8">
            <p className="text-muted-foreground mb-4">
              Você ainda não está associado a nenhuma cooperativa.
            </p>
            <Button onClick={handleCreateCooperative}>
              <Plus className="mr-2 h-4 w-4" />
              Criar Nova Cooperativa
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectCooperative;


import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useCooperative } from "../contexts/CooperativeContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Plus } from "lucide-react";
import { CooperativeCard } from "@/components/cooperatives/CooperativeCard";

const SelectCooperative = () => {
  const { user, loading: authLoading } = useAuth();
  const { 
    cooperatives, 
    loading: cooperativeLoading, 
    setCurrentCooperative 
  } = useCooperative();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);
  
  const handleSelectCooperative = (cooperativeId: string) => {
    const selectedCooperative = cooperatives.find(coop => coop.id === cooperativeId);
    if (selectedCooperative) {
      setCurrentCooperative(selectedCooperative);
      navigate("/dashboard");
    }
  };
  
  if (authLoading || cooperativeLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-coopewise-600" />
          <p className="mt-2 text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-4xl animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold logo-text">CoopeWise</h1>
          <p className="mt-2 text-muted-foreground">
            Gestão de cooperativas de motoboys
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Selecione uma cooperativa</CardTitle>
            <CardDescription>
              Escolha uma cooperativa para acessar o sistema
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {cooperatives.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {cooperatives.map((cooperative) => (
                  <CooperativeCard
                    key={cooperative.id}
                    cooperative={cooperative}
                    onSelect={() => handleSelectCooperative(cooperative.id)}
                  />
                ))}
                
                <Card className="flex flex-col items-center justify-center h-full min-h-[200px] border-dashed border-2 hover:border-coopewise-500 transition-colors cursor-pointer">
                  <CardContent className="flex flex-col items-center justify-center h-full text-center p-6">
                    <div className="rounded-full bg-secondary p-3 mb-4">
                      <Plus className="h-6 w-6 text-coopewise-600" />
                    </div>
                    <h3 className="text-lg font-medium mb-1">Nova Cooperativa</h3>
                    <p className="text-sm text-muted-foreground">
                      Criar uma nova cooperativa
                    </p>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">
                  Você ainda não está associado a nenhuma cooperativa
                </p>
                <Button className="bg-coopewise-600 hover:bg-coopewise-700">
                  <Plus className="h-4 w-4 mr-2" /> Nova Cooperativa
                </Button>
              </div>
            )}
          </CardContent>
          
          <CardFooter className="flex justify-center border-t pt-4">
            <Button 
              variant="outline" 
              onClick={() => navigate("/login")}
            >
              Voltar para o login
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SelectCooperative;

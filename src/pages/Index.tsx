
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold logo-text">CoopeWise</h1>
        <p className="mt-2 text-muted-foreground">
          Redirecionando...
        </p>
      </div>
    </div>
  );
};

export default Index;


import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Cooperative } from "@/types";
import { ArrowRight, Building2 } from "lucide-react";

interface CooperativeCardProps {
  cooperative: Cooperative;
  onSelect: () => void;
}

export const CooperativeCard = ({ cooperative, onSelect }: CooperativeCardProps) => {
  // Function to get the badge variant based on plan
  const getPlanBadgeVariant = (plan: string) => {
    switch (plan) {
      case 'Free':
        return 'outline';
      case 'Starter':
        return 'secondary';
      case 'Pro':
        return 'default';
      case 'Enterprise':
        return undefined; // Will use the primary color
      default:
        return 'outline';
    }
  };
  
  return (
    <Card className="flex flex-col overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-2">
          {cooperative.logo ? (
            <img
              src={cooperative.logo}
              alt={cooperative.name}
              className="h-8 w-8 rounded object-cover"
            />
          ) : (
            <div className="h-8 w-8 rounded bg-secondary flex items-center justify-center">
              <Building2 className="h-4 w-4 text-coopewise-600" />
            </div>
          )}
          <div>
            <h3 className="font-medium text-base">{cooperative.name}</h3>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2 text-sm text-muted-foreground">
        <p className="truncate">Telefone: {cooperative.phone}</p>
        <p className="truncate">Endereço: {cooperative.address}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center mt-auto pt-4 border-t">
        <Badge variant={getPlanBadgeVariant(cooperative.plan)}>
          Plano {cooperative.plan}
        </Badge>
        <Button onClick={onSelect} size="sm" className="bg-coopewise-600 hover:bg-coopewise-700">
          Acessar <ArrowRight className="ml-1 h-3 w-3" />
        </Button>
      </CardFooter>
    </Card>
  );
};

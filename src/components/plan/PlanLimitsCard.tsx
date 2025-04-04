
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PlanLimits } from "@/types";

interface PlanLimitsCardProps {
  planLimits: PlanLimits;
}

export const PlanLimitsCard = ({ planLimits }: PlanLimitsCardProps) => {
  const formatProgressLabel = (used: number, total: number) => {
    return `${used} de ${total === -1 ? '∞' : total}`;
  };
  
  const calculatePercentage = (used: number, total: number) => {
    if (total === -1) return 0; // Unlimited
    return Math.min(100, (used / total) * 100);
  };
  
  const getProgressColor = (percentage: number) => {
    if (percentage > 90) return "bg-destructive";
    if (percentage > 70) return "bg-amber-500";
    return "bg-coopewise-600";
  };
  
  return (
    <Card>
      <CardContent className="p-3 space-y-3">
        <div>
          <div className="flex justify-between text-sm">
            <span>Motoboys</span>
            <span className="text-muted-foreground text-xs">
              {formatProgressLabel(planLimits.motoboys.used, planLimits.motoboys.total)}
            </span>
          </div>
          <Progress 
            className="h-2 mt-1" 
            value={calculatePercentage(planLimits.motoboys.used, planLimits.motoboys.total)} 
            indicatorClassName={getProgressColor(calculatePercentage(planLimits.motoboys.used, planLimits.motoboys.total))}
          />
        </div>
        
        <div>
          <div className="flex justify-between text-sm">
            <span>Clientes</span>
            <span className="text-muted-foreground text-xs">
              {formatProgressLabel(planLimits.clients.used, planLimits.clients.total)}
            </span>
          </div>
          <Progress 
            className="h-2 mt-1" 
            value={calculatePercentage(planLimits.clients.used, planLimits.clients.total)}
            indicatorClassName={getProgressColor(calculatePercentage(planLimits.clients.used, planLimits.clients.total))}
          />
        </div>
        
        <div>
          <div className="flex justify-between text-sm">
            <span>Escalas</span>
            <span className="text-muted-foreground text-xs">
              {formatProgressLabel(planLimits.schedules.used, planLimits.schedules.total)}
            </span>
          </div>
          <Progress 
            className="h-2 mt-1" 
            value={calculatePercentage(planLimits.schedules.used, planLimits.schedules.total)}
            indicatorClassName={getProgressColor(calculatePercentage(planLimits.schedules.used, planLimits.schedules.total))}
          />
        </div>
      </CardContent>
    </Card>
  );
};

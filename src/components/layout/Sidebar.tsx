
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useCooperative } from "@/contexts/CooperativeContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Users,
  Truck,
  Building2,
  CalendarDays,
  CreditCard,
  Settings,
  ChevronLeft,
  ChevronRight,
  Home,
  UserCog,
  Bell,
} from "lucide-react";
import { PlanLimitsCard } from "../plan/PlanLimitsCard";

interface SidebarLinkProps {
  to: string;
  icon: React.ElementType;
  label: string;
  collapsed: boolean;
}

const SidebarLink = ({ to, icon: Icon, label, collapsed }: SidebarLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
        isActive
          ? "bg-coopewise-600 text-white"
          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
      )}
    >
      <Icon size={20} />
      {!collapsed && <span>{label}</span>}
    </Link>
  );
};

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useAuth();
  const { currentCooperative, userRole, planLimits } = useCooperative();
  
  const toggleSidebar = () => setCollapsed(!collapsed);
  
  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-card border-r transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4">
        {!collapsed && (
          <Link to="/dashboard" className="flex items-center">
            <span className="text-xl font-bold logo-text">CoopeWise</span>
          </Link>
        )}
        <Button
          variant="outline"
          size="icon"
          onClick={toggleSidebar}
          className="ml-auto"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>
      
      <Separator />
      
      <div className="flex-1 overflow-auto py-2 px-3">
        <nav className="grid gap-1">
          <SidebarLink
            to="/dashboard"
            icon={Home}
            label="Dashboard"
            collapsed={collapsed}
          />
          <SidebarLink
            to="/motoboys"
            icon={Truck}
            label="Motoboys"
            collapsed={collapsed}
          />
          <SidebarLink
            to="/clients"
            icon={Building2}
            label="Clientes"
            collapsed={collapsed}
          />
          <SidebarLink
            to="/schedules"
            icon={CalendarDays}
            label="Escalas"
            collapsed={collapsed}
          />
          <SidebarLink
            to="/payments"
            icon={CreditCard}
            label="Pagamentos"
            collapsed={collapsed}
          />
          <SidebarLink
            to="/notifications"
            icon={Bell}
            label="Notificações"
            collapsed={collapsed}
          />
        </nav>
        
        {userRole === 'administrador' && (
          <>
            <Separator className="my-4" />
            <div className="text-xs font-semibold text-muted-foreground mb-2 pl-3">
              {!collapsed && "Administrativo"}
            </div>
            <nav className="grid gap-1">
              <SidebarLink
                to="/users"
                icon={Users}
                label="Usuários"
                collapsed={collapsed}
              />
              <SidebarLink
                to="/cooperative"
                icon={UserCog}
                label="Cooperativa"
                collapsed={collapsed}
              />
              <SidebarLink
                to="/settings"
                icon={Settings}
                label="Configurações"
                collapsed={collapsed}
              />
            </nav>
          </>
        )}
        
        {!collapsed && planLimits && (
          <div className="mt-6">
            <PlanLimitsCard planLimits={planLimits} />
          </div>
        )}
      </div>
      
      <div className="p-3">
        {!collapsed ? (
          <div className="flex items-center gap-3 rounded-md py-2">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8 rounded-full bg-coopewise-100 flex items-center justify-center">
                <span className="font-medium text-sm text-coopewise-700">
                  {user?.name.charAt(0)}
                </span>
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm truncate font-medium">
                  {user?.name}
                </span>
                <span className="text-xs text-muted-foreground truncate">
                  {currentCooperative?.name}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-8 h-8 rounded-full bg-coopewise-100 flex items-center justify-center">
              <span className="font-medium text-sm text-coopewise-700">
                {user?.name.charAt(0)}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

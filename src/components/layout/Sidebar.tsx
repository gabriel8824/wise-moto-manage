
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useCooperative } from "@/contexts/CooperativeContext";
import { cn } from "@/lib/utils";
import { useMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  BarChart3, 
  CalendarDays,
  Users,
  Truck,
  Building2,
  CreditCard,
  Settings,
  BellRing,
  MailPlus,
  LogOut,
  ChevronLeft,
  ChevronRight,
  UserCog,
} from "lucide-react";

export const Sidebar = () => {
  const { user, logout } = useAuth();
  const { currentCooperative, userRole } = useCooperative();
  const location = useLocation();
  const { isMobile, isSidebarOpen, toggleSidebar } = useMobile();
  
  const isAdminOrManager = userRole === 'administrador' || userRole === 'gerente';
  
  const mainLinks = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <BarChart3 className="size-4" />,
      active: location.pathname === "/dashboard",
    },
    {
      name: "Escalas",
      href: "/schedules",
      icon: <CalendarDays className="size-4" />,
      active: location.pathname.startsWith("/schedules"),
    },
    {
      name: "Motoboys",
      href: "/motoboys",
      icon: <Truck className="size-4" />,
      active: location.pathname.startsWith("/motoboys"),
    },
    {
      name: "Clientes",
      href: "/clients",
      icon: <Building2 className="size-4" />,
      active: location.pathname.startsWith("/clients"),
    },
  ];
  
  const adminLinks = [
    {
      name: "Usuários",
      href: "/users",
      icon: <Users className="size-4" />,
      active: location.pathname.startsWith("/users"),
      adminOnly: true,
    },
    {
      name: "Pagamentos",
      href: "/payments",
      icon: <CreditCard className="size-4" />,
      active: location.pathname.startsWith("/payments"),
      adminOnly: true,
    },
    {
      name: "Configurações",
      href: "/cooperative-settings",
      icon: <Settings className="size-4" />,
      active: location.pathname.startsWith("/cooperative-settings"),
      adminOnly: true,
    },
    {
      name: "Notificações",
      href: "/notifications",
      icon: <BellRing className="size-4" />,
      active: location.pathname.startsWith("/notifications"),
      adminOnly: true,
    },
    {
      name: "Convites",
      href: "/invites",
      icon: <MailPlus className="size-4" />,
      active: location.pathname.startsWith("/invites"),
      adminOnly: true,
    },
  ];
  
  const handleLogout = async () => {
    await logout();
    // No need to navigate, the AuthContext will handle redirect
  };
  
  if (isMobile && !isSidebarOpen) {
    return (
      <div className="fixed top-4 left-4 z-50">
        <Button 
          variant="outline" 
          size="icon" 
          className="bg-background" 
          onClick={toggleSidebar}
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>
    );
  }
  
  return (
    <div 
      className={cn(
        "relative flex flex-col h-screen border-r bg-background z-30",
        isMobile ? "fixed inset-0 w-64" : "w-64 shrink-0"
      )}
    >
      {isMobile && (
        <Button 
          variant="outline" 
          size="icon" 
          className="absolute right-4 top-4" 
          onClick={toggleSidebar}
        >
          <ChevronLeft className="size-4" />
        </Button>
      )}
      
      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
            <span className="text-primary-foreground font-semibold">CW</span>
          </div>
          <h1 className="font-bold text-xl">CoopeWise</h1>
        </div>
        
        {currentCooperative && (
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">Cooperativa:</p>
            <p className="font-medium truncate">{currentCooperative.name}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Plano: {currentCooperative.plan}
            </p>
          </div>
        )}
        
        <nav className="space-y-1">
          {mainLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                link.active
                  ? "bg-accent text-accent-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              )}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          ))}
        </nav>
        
        {isAdminOrManager && (
          <>
            <Separator className="my-4" />
            
            <p className="px-3 text-xs font-medium text-muted-foreground mb-2">
              Administração
            </p>
            
            <nav className="space-y-1">
              {adminLinks
                .filter(link => !link.adminOnly || userRole === 'administrador')
                .map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                      link.active
                        ? "bg-accent text-accent-foreground font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                    )}
                  >
                    {link.icon}
                    <span>{link.name}</span>
                  </Link>
              ))}
            </nav>
          </>
        )}
      </div>
      
      <div className="mt-auto p-4 border-t">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center">
            {user?.profile_image ? (
              <img
                src={user.profile_image}
                alt={user.name}
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <span className="text-xs font-medium">
                {user?.name?.charAt(0)}
              </span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user?.name}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full" 
            asChild
          >
            <Link to="/profile">
              <UserCog className="mr-2 h-4 w-4" />
              Perfil
            </Link>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full" 
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

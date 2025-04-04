
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useCooperative } from "@/contexts/CooperativeContext";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { 
  Bell, 
  ChevronDown, 
  LogOut, 
  Search, 
  Settings, 
  User, 
  X,
  Building
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const Header = ({ title }: { title: string }) => {
  const { user, logout } = useAuth();
  const { currentCooperative } = useCooperative();
  const navigate = useNavigate();
  const [searchActive, setSearchActive] = useState(false);
  
  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };
  
  const handleSwitchCooperative = () => {
    navigate("/select-cooperative");
  };
  
  return (
    <header className="h-16 border-b flex items-center justify-between px-4">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold">{title}</h1>
      </div>
      
      <div className="flex items-center gap-3">
        {searchActive ? (
          <div className="relative">
            <Input
              type="search"
              placeholder="Buscar..."
              className="w-64 pr-8"
              autoFocus
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0"
              onClick={() => setSearchActive(false)}
            >
              <X size={18} />
            </Button>
          </div>
        ) : (
          <Button
            variant="outline"
            size="icon"
            onClick={() => setSearchActive(true)}
          >
            <Search size={18} />
          </Button>
        )}
        
        <Button variant="outline" size="icon" className="relative">
          <Bell size={18} />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-coopewise-600">
            3
          </Badge>
        </Button>
        
        {currentCooperative && (
          <Button
            variant="outline"
            className="text-sm gap-2"
            onClick={handleSwitchCooperative}
          >
            <Building size={16} />
            <span className="max-w-32 truncate">{currentCooperative.name}</span>
            <ChevronDown size={14} />
          </Button>
        )}
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
              <div className="rounded-full bg-coopewise-100 h-9 w-9 flex items-center justify-center">
                <span className="font-medium text-coopewise-700">
                  {user?.name.charAt(0)}
                </span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.name}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => navigate("/profile")}>
                <User className="mr-2 h-4 w-4" />
                <span>Perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/settings")}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Configurações</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

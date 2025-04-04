import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Schedule, ScheduleStatus } from "@/types";
import { 
  Download, 
  MoreHorizontal, 
  Pencil, 
  Plus, 
  Search, 
  Trash2, 
  Calendar, 
  CheckCircle, 
  MessageSquare 
} from "lucide-react";

interface ScheduleTableProps {
  schedules: Schedule[];
}

// Helper functions to get status and badge variant
const getStatusTranslation = (status: ScheduleStatus): string => {
  const translations = {
    pending: "Pendente",
    confirmed: "Confirmada",
    completed: "Concluída",
    cancelled: "Cancelada"
  };
  
  return translations[status];
};

type BadgeVariantInfo = {
  variant: "outline" | "default" | "secondary" | "destructive";
  className?: string;
};

const getStatusBadgeVariant = (status: ScheduleStatus): BadgeVariantInfo => {
  switch (status) {
    case 'pending':
      return {
        variant: 'outline',
        className: ''
      };
    case 'confirmed':
      return {
        variant: 'outline',
        className: 'border-amber-500 text-amber-500'
      };
    case 'completed':
      return {
        variant: 'outline',
        className: 'border-green-500 text-green-500'
      };
    case 'cancelled':
      return {
        variant: 'outline',
        className: 'border-destructive text-destructive'
      };
    default:
      return {
        variant: 'outline',
        className: ''
      };
  }
};

export const ScheduleTable = ({ schedules }: ScheduleTableProps) => {
  // ... keep existing code (searchQuery state and filtering functionality)
  const [searchQuery, setSearchQuery] = useState("");
  
  // This would be properly joined with user data in a real implementation
  const getMockSchedulesWithDetails = (schedules: Schedule[]) => {
    return schedules.map(schedule => ({
      ...schedule,
      motoboyName: `Motoboy ${Math.floor(Math.random() * 100) + 1}`,
      clientName: `Cliente ${Math.floor(Math.random() * 50) + 1}`,
    }));
  };
  
  const schedulesWithDetails = getMockSchedulesWithDetails(schedules);
  
  const filteredSchedules = searchQuery
    ? schedulesWithDetails.filter(
        (schedule) =>
          schedule.motoboyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          schedule.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          schedule.notes?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : schedulesWithDetails;
    
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar escalas..."
            className="pl-8 w-[300px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Button size="sm" className="bg-coopewise-600 hover:bg-coopewise-700">
            <Plus className="mr-2 h-4 w-4" />
            Nova Escala
          </Button>
        </div>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Horário</TableHead>
              <TableHead>Motoboy</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Observações</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSchedules.length > 0 ? (
              filteredSchedules.map((schedule) => {
                const statusBadge = getStatusBadgeVariant(schedule.status);
                const startDate = new Date(schedule.start_time);
                const endDate = new Date(schedule.end_time);
                
                return (
                  <TableRow key={schedule.id}>
                    <TableCell>
                      {startDate.toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {`${startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{schedule.motoboyName}</div>
                    </TableCell>
                    <TableCell>{schedule.clientName}</TableCell>
                    <TableCell>
                      <Badge
                        variant={statusBadge.variant}
                        className={statusBadge.className}
                      >
                        {getStatusTranslation(schedule.status)}
                      </Badge>
                    </TableCell>
                    <TableCell className="truncate max-w-xs">
                      {schedule.notes || "-"}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Abrir menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Pencil className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Alterar Status
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Enviar Notificação
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Cancelar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6">
                  Nenhuma escala encontrada.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

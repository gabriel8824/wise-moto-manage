
import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScheduleTable } from "@/components/schedules/ScheduleTable";
import { MotoboyTable } from "@/components/motoboys/MotoboyTable";
import { ClientTable } from "@/components/clients/ClientTable";
import { Schedule, Motoboy, Client } from "@/types";
import { CalendarDays, Truck, Building2, CreditCard, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCooperative } from "@/contexts/CooperativeContext";

const Dashboard = () => {
  // Mock data for demonstration
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [motoboys, setMotoboys] = useState<Motoboy[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const { currentCooperative } = useCooperative();
  
  useEffect(() => {
    // This would be real API calls in production
    const fetchDashboardData = () => {
      // Mock schedules
      const mockSchedules: Schedule[] = Array.from({ length: 10 }).map((_, index) => ({
        id: `schedule-${index + 1}`,
        cooperative_id: currentCooperative?.id || "",
        motoboy_id: `motoboy-${Math.floor(Math.random() * 5) + 1}`,
        client_id: `client-${Math.floor(Math.random() * 3) + 1}`,
        start_time: new Date(Date.now() + 1000 * 60 * 60 * (index + 1)).toISOString(),
        end_time: new Date(Date.now() + 1000 * 60 * 60 * (index + 2)).toISOString(),
        status: ["pending", "confirmed", "completed", "cancelled"][Math.floor(Math.random() * 4)] as any,
        notes: index % 3 === 0 ? "Observação de exemplo para esta escala" : undefined,
        created_at: new Date().toISOString(),
      }));
      
      // Mock motoboys
      const mockMotoboys: Motoboy[] = Array.from({ length: 5 }).map((_, index) => ({
        id: `motoboy-${index + 1}`,
        user_id: `user-moto-${index + 1}`,
        cooperative_id: currentCooperative?.id || "",
        license_number: `ABC-${1000 + index}`,
        vehicle_type: ["Moto CG 150", "Moto Fan 125", "Moto Biz"][index % 3],
        available: index % 2 === 0,
        rating: (3 + Math.random() * 2),
        created_at: new Date().toISOString(),
      }));
      
      // Mock clients
      const mockClients: Client[] = Array.from({ length: 3 }).map((_, index) => ({
        id: `client-${index + 1}`,
        user_id: `user-client-${index + 1}`,
        cooperative_id: currentCooperative?.id || "",
        company_name: `Empresa ${index + 1}`,
        contact_name: `Contato ${index + 1}`,
        phone: `(11) 9${Math.floor(Math.random() * 9000) + 1000}-${Math.floor(Math.random() * 9000) + 1000}`,
        address: `Rua dos Clientes, ${index + 1}00`,
        created_at: new Date().toISOString(),
      }));
      
      setSchedules(mockSchedules);
      setMotoboys(mockMotoboys);
      setClients(mockClients);
    };
    
    fetchDashboardData();
  }, [currentCooperative]);
  
  return (
    <DashboardLayout title="Dashboard">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Motoboys"
            value={`${motoboys.length}`}
            icon={Truck}
            description="Total de motoboys"
            trend={{ value: 10, isPositive: true }}
          />
          <StatsCard
            title="Clientes"
            value={`${clients.length}`}
            icon={Building2}
            description="Total de clientes"
            trend={{ value: 5, isPositive: true }}
          />
          <StatsCard
            title="Escalas"
            value={`${schedules.filter(s => s.status === 'completed').length}`}
            icon={CalendarDays}
            description="Escalas concluídas hoje"
          />
          <StatsCard
            title="Faturamento"
            value="R$ 750,00"
            icon={CreditCard}
            description="Faturamento do mês"
            trend={{ value: 12, isPositive: true }}
          />
        </div>
        
        {/* Recent Activity */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Atividades recentes</CardTitle>
            <CardDescription>
              Escalas e atividades das últimas 24 horas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="schedules">
              <TabsList className="mb-4">
                <TabsTrigger value="schedules">Escalas</TabsTrigger>
                <TabsTrigger value="motoboys">Motoboys</TabsTrigger>
                <TabsTrigger value="clients">Clientes</TabsTrigger>
              </TabsList>
              <TabsContent value="schedules">
                <div className="relative w-full overflow-auto">
                  <ScheduleTable schedules={schedules.slice(0, 5)} />
                  <div className="flex justify-end mt-4">
                    <Button variant="outline" size="sm">
                      Ver todas as escalas <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="motoboys">
                <div className="relative w-full overflow-auto">
                  <MotoboyTable motoboys={motoboys} />
                  <div className="flex justify-end mt-4">
                    <Button variant="outline" size="sm">
                      Ver todos os motoboys <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="clients">
                <div className="relative w-full overflow-auto">
                  <ClientTable clients={clients} />
                  <div className="flex justify-end mt-4">
                    <Button variant="outline" size="sm">
                      Ver todos os clientes <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;

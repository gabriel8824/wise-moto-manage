
import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { ScheduleTable } from '@/components/schedules/ScheduleTable';
import { MotoboyTable } from '@/components/motoboys/MotoboyTable';
import { ClientTable } from '@/components/clients/ClientTable';
import { supabase } from '@/integrations/supabase/client';
import { useCooperative } from '@/contexts/CooperativeContext';
import { Schedule, Client } from '@/types';
import { CalendarDays, Users, Building2 } from 'lucide-react';

const Dashboard = () => {
  const [recentSchedules, setRecentSchedules] = useState<Schedule[]>([]);
  const [motoboysCount, setMotoboysCount] = useState(0);
  const [clientsCount, setClientsCount] = useState(0);
  const [recentClients, setRecentClients] = useState<Client[]>([]);
  const { currentCooperative } = useCooperative();
  
  useEffect(() => {
    if (!currentCooperative) return;
    
    const fetchDashboardData = async () => {
      // Fetch recent schedules
      const { data: schedules, error: scheduleError } = await supabase
        .from('schedules')
        .select('*')
        .eq('cooperative_id', currentCooperative.id)
        .order('created_at', { ascending: false })
        .limit(5);
        
      if (!scheduleError && schedules) {
        setRecentSchedules(schedules.map(schedule => ({
          ...schedule,
          is_reserve: schedule.is_reserve || false,
          is_confirmed: schedule.is_confirmed || false
        })) as Schedule[]);
      }
      
      // Count motoboys
      const { count: motoboysCount, error: motoboysError } = await supabase
        .from('motoboys')
        .select('*', { count: 'exact', head: true })
        .eq('cooperative_id', currentCooperative.id);
        
      if (!motoboysError) {
        setMotoboysCount(motoboysCount || 0);
      }
      
      // Count clients
      const { count: clientsCount, error: clientsError } = await supabase
        .from('clients')
        .select('*', { count: 'exact', head: true })
        .eq('cooperative_id', currentCooperative.id);
        
      if (!clientsError) {
        setClientsCount(clientsCount || 0);
      }
      
      // Fetch recent clients
      const { data: clients, error: recentClientsError } = await supabase
        .from('clients')
        .select('*')
        .eq('cooperative_id', currentCooperative.id)
        .order('created_at', { ascending: false })
        .limit(5);
        
      if (!recentClientsError && clients) {
        setRecentClients(clients.map(client => ({
          ...client,
          min_motoboys: client.min_motoboys || 1,
          max_motoboys: client.max_motoboys || 1
        })) as Client[]);
      }
    };
    
    fetchDashboardData();
  }, [currentCooperative]);
  
  return (
    <DashboardLayout title="Dashboard">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatsCard 
          title="Escalas" 
          value={recentSchedules.length.toString()} 
          description="escalas para hoje"
          icon={CalendarDays} 
        />
        <StatsCard 
          title="Motoboys" 
          value={motoboysCount.toString()} 
          description="motoboys ativos"
          icon={Users} 
        />
        <StatsCard 
          title="Clientes" 
          value={clientsCount.toString()} 
          description="clientes cadastrados"
          icon={Building2} 
        />
      </div>
      
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Escalas Recentes</h2>
        <ScheduleTable schedules={recentSchedules} />
      </div>
      
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Clientes Recentes</h2>
        <ClientTable clients={recentClients} />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;

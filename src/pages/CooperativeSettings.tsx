
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { useCooperative } from "@/contexts/CooperativeContext";
import { Cooperative } from "@/types";
import { supabase } from "@/integrations/supabase/client";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const CooperativeSettings = () => {
  const { currentCooperative, refreshCooperatives } = useCooperative();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  // Create state for all cooperative fields
  const [formData, setFormData] = useState<Partial<Cooperative>>({
    name: currentCooperative?.name || "",
    phone: currentCooperative?.phone || "",
    address: currentCooperative?.address || "",
    billing_method: currentCooperative?.billing_method || null,
    billing_day: currentCooperative?.billing_day || null,
    billing_period: currentCooperative?.billing_period || null,
    motoboy_rate: currentCooperative?.motoboy_rate || null,
    client_rate: currentCooperative?.client_rate || null,
    whatsapp_key: currentCooperative?.whatsapp_key || "",
    whatsapp_number: currentCooperative?.whatsapp_number || "",
    whatsapp_endpoint: currentCooperative?.whatsapp_endpoint || "",
    automatic_payment_confirmation: currentCooperative?.automatic_payment_confirmation || false,
  });

  // Handler for form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? (value ? Number(value) : null) : value,
    }));
  };

  // Handle select changes (for dropdowns)
  const handleSelectChange = (name: string, value: string | null) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handler for switch changes
  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentCooperative) {
      toast({
        title: "Erro",
        description: "Nenhuma cooperativa selecionada",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("cooperatives")
        .update(formData)
        .eq("id", currentCooperative.id);

      if (error) throw error;

      toast({
        title: "Configurações atualizadas",
        description: "As configurações da cooperativa foram atualizadas com sucesso",
      });
      
      // Refresh the cooperatives data
      await refreshCooperatives();
      
    } catch (error: any) {
      console.error("Error updating cooperative settings:", error);
      toast({
        title: "Erro ao atualizar configurações",
        description: error.message || "Ocorreu um erro ao atualizar as configurações",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout title="Configurações da Cooperativa">
      <div className="container mx-auto py-6 space-y-6">
        <Tabs defaultValue="general">
          <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-2 md:grid-cols-4 mb-6">
            <TabsTrigger value="general">Geral</TabsTrigger>
            <TabsTrigger value="billing">Faturamento</TabsTrigger>
            <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
            <TabsTrigger value="plans">Planos</TabsTrigger>
          </TabsList>
          
          <form onSubmit={handleSubmit}>
            <TabsContent value="general" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informações Básicas</CardTitle>
                  <CardDescription>
                    Configure as informações básicas da sua cooperativa
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome da Cooperativa</Label>
                      <Input 
                        id="name" 
                        name="name" 
                        value={formData.name || ""} 
                        onChange={handleChange} 
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input 
                        id="phone" 
                        name="phone" 
                        value={formData.phone || ""} 
                        onChange={handleChange} 
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Endereço</Label>
                    <Input 
                      id="address" 
                      name="address" 
                      value={formData.address || ""} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Logo da Cooperativa</Label>
                    <div className="border border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer hover:bg-gray-50">
                      <p className="text-sm text-gray-500">
                        {currentCooperative?.logo 
                          ? "Clique para alterar a logo" 
                          : "Clique para adicionar uma logo"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="billing" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações de Faturamento</CardTitle>
                  <CardDescription>
                    Configure os parâmetros de faturamento e cobrança
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Rateios</h3>
                    <Separator />
                    
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="motoboy_rate">Taxa para Motoboys (%)</Label>
                        <Input 
                          id="motoboy_rate" 
                          name="motoboy_rate" 
                          type="number" 
                          min="0" 
                          step="0.01" 
                          value={formData.motoboy_rate || ""} 
                          onChange={handleChange} 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="client_rate">Taxa para Clientes (%)</Label>
                        <Input 
                          id="client_rate" 
                          name="client_rate" 
                          type="number" 
                          min="0" 
                          step="0.01" 
                          value={formData.client_rate || ""} 
                          onChange={handleChange} 
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Periodicidade da Cobrança</h3>
                    <Separator />
                    
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="billing_period">Periodicidade</Label>
                        <Select 
                          value={formData.billing_period || ""}
                          onValueChange={(value) => handleSelectChange("billing_period", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a periodicidade" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="weekly">Semanal</SelectItem>
                            <SelectItem value="biweekly">Quinzenal</SelectItem>
                            <SelectItem value="monthly">Mensal</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="billing_day">Dia de Cobrança</Label>
                        <Input 
                          id="billing_day" 
                          name="billing_day" 
                          type="number" 
                          min="1" 
                          max="31" 
                          value={formData.billing_day || ""} 
                          onChange={handleChange} 
                        />
                        <p className="text-xs text-gray-500">
                          {formData.billing_period === "weekly" || formData.billing_period === "biweekly"
                            ? "Dia da semana (1-7, onde 1 é segunda-feira)" 
                            : "Dia do mês (1-31)"}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Método de Cobrança</h3>
                    <Separator />
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="billing_method">Método de Cobrança</Label>
                        <Select 
                          value={formData.billing_method || ""}
                          onValueChange={(value) => handleSelectChange("billing_method", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o método de cobrança" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="asaas">Asaas</SelectItem>
                            <SelectItem value="pix">PIX</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      {formData.billing_method === "asaas" && (
                        <div className="flex items-center space-x-2">
                          <Switch 
                            id="automatic_payment_confirmation"
                            checked={formData.automatic_payment_confirmation}
                            onCheckedChange={(checked) => 
                              handleSwitchChange("automatic_payment_confirmation", checked)
                            }
                          />
                          <Label htmlFor="automatic_payment_confirmation">
                            Confirmação automática de pagamento
                          </Label>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="whatsapp" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Integração com WhatsApp (z-api.io)</CardTitle>
                  <CardDescription>
                    Configure os parâmetros para envio de notificações via WhatsApp
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="whatsapp_key">Chave da API</Label>
                    <Input 
                      id="whatsapp_key" 
                      name="whatsapp_key" 
                      value={formData.whatsapp_key || ""} 
                      onChange={handleChange} 
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="whatsapp_number">Número do WhatsApp</Label>
                      <Input 
                        id="whatsapp_number" 
                        name="whatsapp_number" 
                        value={formData.whatsapp_number || ""} 
                        onChange={handleChange} 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="whatsapp_endpoint">Endpoint</Label>
                      <Input 
                        id="whatsapp_endpoint" 
                        name="whatsapp_endpoint" 
                        value={formData.whatsapp_endpoint || ""} 
                        onChange={handleChange} 
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="plans" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Plano Atual</CardTitle>
                  <CardDescription>
                    Informações sobre o plano atual da cooperativa
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between border p-4 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {currentCooperative?.plan || "Free"}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Iniciado em: {currentCooperative?.plan_started_at
                          ? new Date(currentCooperative.plan_started_at).toLocaleDateString()
                          : "N/A"}
                      </p>
                      {currentCooperative?.plan_expires_at && (
                        <p className="text-sm text-gray-500">
                          Expira em: {new Date(currentCooperative.plan_expires_at).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    <Button variant="outline">Gerenciar Assinatura</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <div className="flex justify-end mt-6">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Salvando..." : "Salvar Configurações"}
              </Button>
            </div>
          </form>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default CooperativeSettings;

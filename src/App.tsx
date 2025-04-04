
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "@/contexts/AuthContext";
import { CooperativeProvider } from "@/contexts/CooperativeContext";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SelectCooperative from "./pages/SelectCooperative";
import Dashboard from "./pages/Dashboard";
import CooperativeSettings from "./pages/CooperativeSettings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CooperativeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/select-cooperative" element={<SelectCooperative />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/cooperative-settings" element={<CooperativeSettings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CooperativeProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

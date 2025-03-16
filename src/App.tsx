
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import RetentionCalculator from "./components/RetentionCalculator";
import ExpansionCalculator from "./components/ExpansionCalculator";
import QuotaCalculator from "./components/QuotaCalculator";
import CommissionCalculator from "./components/CommissionCalculator";
import Features from "./pages/Features";
import HowItWorks from "./pages/HowItWorks";
import Privacy from "./pages/Privacy";
import FAQ from "./pages/FAQ";
import ManagerMode from "./pages/ManagerMode";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/retention-calculator" element={<RetentionCalculator />} />
          <Route path="/expansion-calculator" element={<ExpansionCalculator />} />
          <Route path="/quota-configuration" element={<QuotaCalculator />} />
          <Route path="/commission-calculator" element={<CommissionCalculator />} />
          <Route path="/features" element={<Features />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/manager-mode" element={<ManagerMode />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;


import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
// Import both contexts - we'll use ApiProvider for API integration
import { AppProvider } from "./context/AppContext";
import { ApiProvider } from "./context/ApiContext";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import InventoryApi from "./pages/InventoryApi";
import Billing from "./pages/Billing";
import BillingApi from "./pages/BillingApi";
import Invoices from "./pages/Invoices";
import InvoicesApi from "./pages/InvoicesApi";
import Scanner from "./pages/Scanner";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";
import TestApi from "./pages/TestApi";
import TestPdf from "./pages/TestPdf";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        {/* We're wrapping AppProvider with ApiProvider to gradually migrate */}
        <ApiProvider>
          <AppProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Dashboard />} />
                {/* Use the API version of the Inventory page */}
                <Route path="inventory" element={<InventoryApi />} />
                <Route path="billing" element={<BillingApi />} />
                <Route path="invoices" element={<InvoicesApi />} />
                <Route path="scanner" element={<Scanner />} />
                <Route path="reports" element={<Reports />} />
                <Route path="test-api" element={<TestApi />} />
                <Route path="test-pdf" element={<TestPdf />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </AppProvider>
        </ApiProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

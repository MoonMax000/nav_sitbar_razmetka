import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Pricing from "./pages/Pricing";
import Profile from "./pages/Profile";
import ProfileNew from "./pages/ProfileNew";
import Billing from "./pages/Billing";
import NotFound from "./pages/NotFound";
import { ClientLayout } from "./components/ClientLayout/ClientLayout";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 6000, refetchOnWindowFocus: false } },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Standard pages with ClientLayout */}
            <Route
              path="*"
              element={
                <ClientLayout>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/social/home" element={<Index />} />
                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/profile" element={<ProfileNew />} />
                    <Route path="/profile-old" element={<Profile />} />
                    <Route path="/billing" element={<Billing />} />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </ClientLayout>
              }
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </Provider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);

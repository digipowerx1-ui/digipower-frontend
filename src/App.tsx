import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

// Pages
import Index from "@/pages/Index";
import AboutUs from "@/pages/AboutUs";
import Facilities from "@/pages/Facilities";
import InvestorRelations from "@/pages/InvestorRelations";
import Technology from "@/pages/Technology";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <HelmetProvider>
            <BrowserRouter>
              <Toaster />
              <Sonner />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/projects" element={<Facilities />} />
                <Route path="/investor-relations" element={<InvestorRelations />} />
                <Route path="/technology" element={<Technology />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </HelmetProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;

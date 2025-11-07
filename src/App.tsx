import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import LoadingSpinner from "./components/LoadingSpinner";

// ---------- LAZY LOADED PAGE IMPORTS ----------
const Index = lazy(() => import("./pages/Index"));
const PressRelease = lazy(() => import("./pages/Press-Release"));
const PresentationsEvents = lazy(() => import("./pages/Presentations-Events"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const LeadershipCommittees = lazy(() => import("./pages/LeadershipCommittees"));
const InvestorRelations = lazy(() => import("./pages/Investor"));
const Projects = lazy(() => import("./pages/Project"));
const Sec = lazy(() => import("./pages/Sec"));
const DocumentsAndCharters = lazy(() => import("./pages/Document"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              {/* ----------- MAIN ROUTES ----------- */}
              <Route path="/" element={<Index />} />
              <Route path="/press-release" element={<PressRelease />} />
              <Route path="/presentations-events" element={<PresentationsEvents />} />

              {/* ----------- NEW PAGES ----------- */}
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/leadership-committees" element={<LeadershipCommittees />} />
              <Route path="/investor-relations" element={<InvestorRelations />} />
              <Route path="/projects" element={<Projects />} />
      <Route path="/sec" element={<Sec />} />



              {/* ✅ NEW Documents & Charters Page */}
              <Route path="/document" element={<DocumentsAndCharters />} />

              {/* 404 Page */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;

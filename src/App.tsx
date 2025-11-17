import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import LoadingSpinner from "./components/LoadingSpinner";
import ScrollToTop from "./components/ScrollToTop";

// ---------- LAZY LOADED PAGE IMPORTS ----------
const Index = lazy(() => import("./pages/Index"));
const PressRelease = lazy(() => import("./pages/Press-Release"));
const PressReleaseDetail = lazy(() => import("./pages/PressReleaseDetail"));
const PresentationsEvents = lazy(() => import("./pages/Presentations-Events"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const LeadershipCommittees = lazy(() => import("./pages/LeadershipCommittees"));
const InvestorRelations = lazy(() => import("./pages/Investor"));
const Projects = lazy(() => import("./pages/Project"));
const ARMS = lazy(() => import("./pages/ARMS"));
const Sec = lazy(() => import("./pages/Sec"));
const DocumentsAndCharters = lazy(() => import("./pages/Document"));
const Career = lazy(() => import("./pages/Career"));
const EmailAlerts = lazy(() => import("./pages/EmailAlerts"));   // ✅ NEW EMAIL ALERTS PAGE
const StockInformation = lazy(() => import("./pages/StockInformation"));
const TermsOfUse = lazy(() => import("./pages/TermsOfUse"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));

const Partnerpage = lazy(() => import("./pages/Partnerpage"));   // ✅ NEW PARTNER PAGE

const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              {/* ----------- MAIN ROUTES ----------- */}
              <Route path="/" element={<Index />} />
              <Route path="/press-release" element={<PressRelease />} />
              <Route path="/press-release/:id" element={<PressReleaseDetail />} />
              <Route path="/presentations-events" element={<PresentationsEvents />} />

              {/* ----------- NEW PAGES ----------- */}
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/leadership-committees" element={<LeadershipCommittees />} />
              <Route path="/investor-relations" element={<InvestorRelations />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/arms" element={<ARMS />} />
              <Route path="/sec" element={<Sec />} />

              {/* ✅ Career & Partner Pages */}
              <Route path="/career" element={<Career />} />
              <Route path="/partner" element={<Partnerpage />} />      {/* ✅ Added */}

              {/* ✅ Documents & Charters Page */}
              <Route path="/document" element={<DocumentsAndCharters />} />
        <Route path="/email-alerts" element={<EmailAlerts />} />
             <Route path="/stock-information" element={<StockInformation />} />
             <Route path="/terms-of-use" element={<TermsOfUse />} />
             <Route path="/privacy-policy" element={<PrivacyPolicy />} />

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

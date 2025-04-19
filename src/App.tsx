import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { SCEProvider } from "@/contexts/SCEContext";

// Страницы
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/AuthPages/Login";
import Register from "./pages/AuthPages/Register";
import VerifyEmail from "./pages/AuthPages/VerifyEmail";
import AdminPanel from "./pages/AdminPanel";
import ObjectsPage from "./pages/Objects/ObjectsPage";
import PostsPage from "./pages/Posts/PostsPage";
import About from "./pages/About";
import Privacy from "./pages/Privacy";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <SCEProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/verify" element={<VerifyEmail />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/objects" element={<ObjectsPage />} />
              <Route path="/posts" element={<PostsPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </SCEProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
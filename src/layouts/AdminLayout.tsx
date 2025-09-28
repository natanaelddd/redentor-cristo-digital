import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/AdminSidebar";
import { Button } from "@/components/ui/button";
import { LogOut, Church } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const navigate = useNavigate();

  // Verificar se o usuário está logado e é admin
  const { data: session, isLoading } = useQuery({
    queryKey: ["auth-session"],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      return session;
    },
  });

  const { data: profile, isLoading: profileLoading, error: profileError } = useQuery({
    queryKey: ["admin-profile", session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) return null;
      
      console.log('Checking admin profile for user:', session.user.id);
      
      const { data, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single();
      
      console.log('Profile query result:', { data, error });
      
      if (error) {
        // If no profile exists, return null instead of throwing
        if (error.code === 'PGRST116') {
          console.log('No profile found for user');
          return null;
        }
        throw error;
      }
      return data;
    },
    enabled: !!session?.user?.id,
    retry: false, // Don't retry on profile errors
  });

  useEffect(() => {
    if (!isLoading && !session) {
      console.log('No session found, redirecting to auth');
      navigate("/auth");
      return;
    }

    // Wait for profile loading to complete
    if (session && !profileLoading) {
      if (profileError || !profile) {
        console.log('No admin profile found or error:', profileError);
        toast.error("Acesso negado. Você precisa ser administrador.");
        navigate("/");
        return;
      }

      if (profile.role !== "admin") {
        console.log('User is not admin:', profile.role);
        toast.error("Acesso negado. Você precisa ser administrador.");
        navigate("/");
        return;
      }
      
      console.log('Admin access granted');
    }
  }, [session, profile, profileError, isLoading, profileLoading, navigate]);

  const handleLogout = async () => {
    try {
      // Clean up auth state
      localStorage.removeItem('admin_authenticated');
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
          localStorage.removeItem(key);
        }
      });
      
      // Sign out from Supabase
      await supabase.auth.signOut({ scope: 'global' });
      toast.success("Logout realizado com sucesso");
      
      // Force page reload for clean state
      window.location.href = "/auth";
    } catch (error) {
      console.error("Logout error:", error);
      // Force logout anyway
      window.location.href = "/auth";
    }
  };

  // Show loading while checking authentication
  if (isLoading || profileLoading || !session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Don't render if user is not admin (will be redirected by useEffect)
  if (!profile || profile.role !== "admin") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 h-16 bg-background border-b z-50 flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <div className="flex items-center gap-2">
              <Church className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold text-primary">Admin Igreja</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {session.user.email}
            </span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Sair
            </Button>
          </div>
        </header>

        <div className="flex w-full pt-16">
          <AdminSidebar />
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
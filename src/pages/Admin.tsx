
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AdminPanel } from '@/components/AdminPanel';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Lock } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const ADMIN_PASSWORD = 'admin123'; // Em produção, isso deve vir do banco de dados

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar se já está autenticado
    const adminAuth = localStorage.getItem('admin_authenticated');
    if (adminAuth === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('admin_authenticated', 'true');
      toast({
        title: "Sucesso",
        description: "Login administrativo realizado com sucesso",
      });
    } else {
      toast({
        title: "Erro",
        description: "Senha incorreta",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_authenticated');
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Header logoUrl="/lovable-uploads/db19ffc6-8337-43da-a20a-e0340ed44a7f.png" />
        <main className="flex-grow flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Header logoUrl="/lovable-uploads/db19ffc6-8337-43da-a20a-e0340ed44a7f.png" />
        <main className="flex-grow flex items-center justify-center p-8">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-gray-100 rounded-full w-fit">
                <Lock className="h-8 w-8 text-gray-600" />
              </div>
              <CardTitle className="text-2xl">Acesso Administrativo</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Senha de Administrador
                  </label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Digite a senha de admin"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Entrar
                </Button>
              </form>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header 
        logoUrl="/lovable-uploads/db19ffc6-8337-43da-a20a-e0340ed44a7f.png"
        showAdminActions={true}
        onLogout={handleLogout}
      />
      <main className="flex-grow">
        <AdminPanel />
      </main>
      <Footer />
    </div>
  );
};

export default Admin;

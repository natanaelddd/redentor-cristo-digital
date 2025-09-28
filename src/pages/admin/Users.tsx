import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, UserCheck, Shield } from "lucide-react";
import { toast } from "sonner";

interface Profile {
  id: string;
  email?: string;
  display_name?: string;
  role: string;
  admin_permission_level?: 'viewer' | 'editor' | 'full_access';
  created_at: string;
  updated_at: string;
}

export default function UsersAdmin() {
  const queryClient = useQueryClient();

  const { data: users, isLoading } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data as Profile[];
    },
  });

  const updateRoleMutation = useMutation({
    mutationFn: async ({ userId, newRole }: { userId: string; newRole: string }) => {
      const { data, error } = await supabase.rpc('update_user_role', {
        target_user_id: userId,
        new_role: newRole
      });
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      toast.success("Role do usuário atualizada com sucesso!");
    },
    onError: (error) => {
      toast.error("Erro ao atualizar role: " + error.message);
    },
  });

  const updatePermissionMutation = useMutation({
    mutationFn: async ({ userId, newPermissionLevel }: { 
      userId: string; 
      newPermissionLevel: 'viewer' | 'editor' | 'full_access'
    }) => {
      const { data, error } = await supabase.rpc('update_admin_permission_level', {
        target_admin_id: userId,
        new_permission_level: newPermissionLevel
      });
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      toast.success("Nível de permissão atualizado com sucesso!");
    },
    onError: (error) => {
      toast.error("Erro ao atualizar permissão: " + error.message);
    },
  });

  const handleRoleChange = (userId: string, newRole: string) => {
    updateRoleMutation.mutate({ userId, newRole });
  };

  const handlePermissionChange = (userId: string, newPermissionLevel: 'viewer' | 'editor' | 'full_access') => {
    updatePermissionMutation.mutate({ userId, newPermissionLevel });
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <Badge variant="default" className="bg-red-500"><Shield className="h-3 w-3 mr-1" />Admin</Badge>;
      case "user":
        return <Badge variant="secondary"><UserCheck className="h-3 w-3 mr-1" />Usuário</Badge>;
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };

  const getPermissionBadge = (permissionLevel?: string) => {
    switch (permissionLevel) {
      case "full_access":
        return <Badge className="bg-red-500 text-white">Acesso Total</Badge>;
      case "editor":
        return <Badge className="bg-yellow-500 text-white">Editor</Badge>;
      case "viewer":
        return <Badge variant="secondary">Visualizador</Badge>;
      default:
        return <Badge variant="outline">N/A</Badge>;
    }
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="space-y-6">
      <Alert>
        <Shield className="h-4 w-4" />
        <AlertDescription>
          Sistema de segurança aprimorado ativo. Administradores têm diferentes níveis de acesso aos dados sensíveis.
        </AlertDescription>
      </Alert>
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Usuários</h1>
          <p className="text-muted-foreground">
            Gerencie os usuários e suas permissões de segurança
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users?.length || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Administradores</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users?.filter(u => u.role === 'admin').length || 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuários Comuns</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users?.filter(u => u.role === 'user').length || 0}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4">
        {users?.map((user) => (
          <Card key={user.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {user.display_name || user.email || "Usuário sem nome"}
                    {getRoleBadge(user.role)}
                    {user.role === 'admin' && getPermissionBadge(user.admin_permission_level)}
                  </CardTitle>
                  <CardDescription>
                    {user.email}
                  </CardDescription>
                </div>
                
                <div className="flex gap-4 items-center">
                  <div className="flex gap-2 items-center">
                    <span className="text-sm text-muted-foreground">Role:</span>
                    <Select
                      value={user.role}
                      onValueChange={(newRole) => handleRoleChange(user.id, newRole)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">Usuário</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {user.role === 'admin' && (
                    <div className="flex gap-2 items-center">
                      <span className="text-sm text-muted-foreground">Nível:</span>
                      <Select
                        value={user.admin_permission_level || 'viewer'}
                        onValueChange={(newLevel: 'viewer' | 'editor' | 'full_access') => handlePermissionChange(user.id, newLevel)}
                      >
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="viewer">Visualizador</SelectItem>
                          <SelectItem value="editor">Editor</SelectItem>
                          <SelectItem value="full_access">Acesso Total</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <span>Criado em: {new Date(user.created_at).toLocaleDateString('pt-BR')}</span>
                <span>Atualizado em: {new Date(user.updated_at).toLocaleDateString('pt-BR')}</span>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {(!users || users.length === 0) && (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">
                Nenhum usuário encontrado.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Eye, Edit, Lock, AlertTriangle, CheckCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface SecurityStatusProps {
  userPermissionLevel?: 'viewer' | 'editor' | 'full_access';
}

export function SecurityStatus({ userPermissionLevel = 'viewer' }: SecurityStatusProps) {
  const getPermissionDescription = (level: string) => {
    switch (level) {
      case 'full_access':
        return {
          title: 'Acesso Total',
          description: 'Acesso completo a todos os dados sensíveis, incluindo informações pessoais dos usuários',
          icon: <Lock className="h-4 w-4" />,
          color: 'bg-red-500',
          features: [
            'Visualizar dados pessoais completos',
            'Editar e excluir registros',
            'Gerenciar permissões de outros admins',
            'Acessar logs de auditoria completos'
          ]
        };
      case 'editor':
        return {
          title: 'Editor',
          description: 'Acesso limitado com dados pessoais mascarados para proteção de privacidade',
          icon: <Edit className="h-4 w-4" />,
          color: 'bg-yellow-500',
          features: [
            'Visualizar dados mascarados (ex: jo***@email.com)',
            'Editar registros não sensíveis',
            'Acessar relatórios básicos',
            'Sem acesso a permissões de outros usuários'
          ]
        };
      case 'viewer':
        return {
          title: 'Visualizador',
          description: 'Acesso apenas a dados resumidos sem informações pessoais identificáveis',
          icon: <Eye className="h-4 w-4" />,
          color: 'bg-blue-500',
          features: [
            'Visualizar apenas resumos e estatísticas',
            'Não pode ver dados pessoais',
            'Acesso somente leitura',
            'Relatórios agregados sem detalhes sensíveis'
          ]
        };
      default:
        return {
          title: 'Não Definido',
          description: 'Nível de permissão não reconhecido',
          icon: <AlertTriangle className="h-4 w-4" />,
          color: 'bg-gray-500',
          features: []
        };
    }
  };

  const permission = getPermissionDescription(userPermissionLevel);

  return (
    <div className="space-y-4">
      <Alert>
        <Shield className="h-4 w-4" />
        <AlertDescription>
          <strong>Sistema de Segurança Ativo:</strong> Este sistema implementa controles avançados de acesso para proteger dados pessoais dos usuários conforme LGPD/GDPR.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Status de Segurança
          </CardTitle>
          <CardDescription>
            Informações sobre seu nível de acesso e capacidades de segurança
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge className={`${permission.color} text-white`}>
                {permission.icon}
                <span className="ml-1">{permission.title}</span>
              </Badge>
            </div>
            <CheckCircle className="h-5 w-5 text-green-500" />
          </div>

          <p className="text-sm text-muted-foreground">
            {permission.description}
          </p>

          <div className="space-y-2">
            <h4 className="text-sm font-medium">Suas permissões incluem:</h4>
            <ul className="text-sm space-y-1">
              {permission.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 border-t">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Proteções Ativas:</span>
              <div className="flex gap-2">
                <Badge variant="outline" className="text-green-600">
                  <Lock className="h-3 w-3 mr-1" />
                  Criptografia
                </Badge>
                <Badge variant="outline" className="text-blue-600">
                  <Eye className="h-3 w-3 mr-1" />
                  Mascaramento
                </Badge>
                <Badge variant="outline" className="text-purple-600">
                  <Shield className="h-3 w-3 mr-1" />
                  Auditoria
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
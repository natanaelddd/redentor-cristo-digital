
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";

const AdminDashboardPage = () => {
    const { user } = useAuth();
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Painel de Administração</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Bem-vindo!</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Bem-vindo ao painel de administração, {user?.email}.</p>
                    <p className="mt-4 text-muted-foreground">Use o menu à esquerda para gerenciar o conteúdo do seu site.</p>
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminDashboardPage;

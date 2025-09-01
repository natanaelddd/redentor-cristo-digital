import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { 
  Image, 
  Calendar, 
  FileText, 
  Users, 
  BarChart3,
  Eye,
  Activity,
  TrendingUp
} from "lucide-react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  // Estatísticas gerais
  const { data: stats } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const [
        { count: slidesCount },
        { count: eventsCount },
        { count: contentCount },
        { count: usersCount }
      ] = await Promise.all([
        supabase.from("hero_slides").select("*", { count: "exact", head: true }),
        supabase.from("events").select("*", { count: "exact", head: true }),
        supabase.from("site_content").select("*", { count: "exact", head: true }),
        supabase.from("profiles").select("*", { count: "exact", head: true })
      ]);

      return {
        slides: slidesCount || 0,
        events: eventsCount || 0,
        content: contentCount || 0,
        users: usersCount || 0
      };
    },
  });

  // Slides ativos
  const { data: activeSlides } = useQuery({
    queryKey: ["active-slides"],
    queryFn: async () => {
      const { data } = await supabase
        .from("hero_slides")
        .select("*")
        .eq("is_active", true)
        .order("order");
      return data || [];
    },
  });

  // Eventos próximos
  const { data: upcomingEvents } = useQuery({
    queryKey: ["upcoming-events"],
    queryFn: async () => {
      const { data } = await supabase
        .from("events")
        .select("*")
        .eq("is_active", true)
        .order("order")
        .limit(5);
      return data || [];
    },
  });

  const quickActions = [
    {
      title: "Adicionar Slide",
      description: "Criar novo slide para o banner principal",
      icon: Image,
      href: "/admin/slides",
      color: "bg-blue-500"
    },
    {
      title: "Novo Evento",
      description: "Adicionar evento à agenda da igreja",
      icon: Calendar,
      href: "/admin/events",
      color: "bg-green-500"
    },
    {
      title: "Editar Conteúdo",
      description: "Atualizar textos e informações do site",
      icon: FileText,
      href: "/admin/content",
      color: "bg-purple-500"
    },
    {
      title: "Gerenciar Usuários",
      description: "Administrar membros e permissões",
      icon: Users,
      href: "/admin/users",
      color: "bg-orange-500"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Painel administrativo da Igreja Missionária Cristo Redentor
        </p>
      </div>

      {/* Estatísticas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hero Slides</CardTitle>
            <Image className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.slides || 0}</div>
            <p className="text-xs text-muted-foreground">
              Slides do banner principal
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Eventos</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.events || 0}</div>
            <p className="text-xs text-muted-foreground">
              Eventos cadastrados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conteúdos</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.content || 0}</div>
            <p className="text-xs text-muted-foreground">
              Seções de conteúdo
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuários</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.users || 0}</div>
            <p className="text-xs text-muted-foreground">
              Usuários registrados
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Ações Rápidas */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
          <CardDescription>
            Acesso rápido às principais funcionalidades administrativas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((action) => (
              <Link key={action.href} to={action.href}>
                <Card className="transition-colors hover:bg-muted/50 cursor-pointer">
                  <CardHeader className="space-y-2">
                    <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center`}>
                      <action.icon className="h-5 w-5 text-white" />
                    </div>
                    <CardTitle className="text-sm">{action.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-xs text-muted-foreground">
                      {action.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Slides Ativos */}
        <Card>
          <CardHeader>
            <CardTitle>Slides Ativos</CardTitle>
            <CardDescription>
              Slides atualmente exibidos no banner principal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activeSlides?.map((slide) => (
                <div key={slide.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{slide.title}</p>
                    <p className="text-xs text-muted-foreground">{slide.category}</p>
                  </div>
                  <Badge variant="secondary">Ativo</Badge>
                </div>
              ))}
              {(!activeSlides || activeSlides.length === 0) && (
                <p className="text-sm text-muted-foreground">Nenhum slide ativo</p>
              )}
            </div>
            <div className="mt-4">
              <Button asChild size="sm" className="w-full">
                <Link to="/admin/slides">Gerenciar Slides</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Eventos Próximos */}
        <Card>
          <CardHeader>
            <CardTitle>Eventos</CardTitle>
            <CardDescription>
              Próximos eventos da igreja
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingEvents?.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{event.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {event.day_of_week} - {event.time}
                    </p>
                  </div>
                  <Badge variant="outline">
                    {event.is_active ? "Ativo" : "Inativo"}
                  </Badge>
                </div>
              ))}
              {(!upcomingEvents || upcomingEvents.length === 0) && (
                <p className="text-sm text-muted-foreground">Nenhum evento cadastrado</p>
              )}
            </div>
            <div className="mt-4">
              <Button asChild size="sm" className="w-full">
                <Link to="/admin/events">Gerenciar Eventos</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
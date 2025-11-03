import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Users, MapPin, Mail, Phone, User, CheckCircle, Calendar, Briefcase } from "lucide-react";
import { z } from "zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const inscriptionSchema = z.object({
  full_name: z.string().trim().nonempty({ message: "Nome é obrigatório" }).max(100, { message: "Nome deve ter menos de 100 caracteres" }),
  address: z.string().trim().nonempty({ message: "Endereço é obrigatório" }).max(200, { message: "Endereço deve ter menos de 200 caracteres" }),
  email: z.string().trim().email({ message: "Email inválido" }).max(255, { message: "Email deve ter menos de 255 caracteres" }),
  phone: z.string().trim().nonempty({ message: "Telefone é obrigatório" }).max(20, { message: "Telefone deve ter menos de 20 caracteres" }),
  participant_type: z.enum(["encontrista", "trabalhador"], { message: "Selecione o tipo de participação" })
});

type InscriptionData = z.infer<typeof inscriptionSchema>;

// Helper function to format site content
const formatSiteContent = (content: any[] | null) => {
  if (!content) return {};
  return content.reduce((acc, item) => {
    acc[item.section_key] = item.content_value;
    return acc;
  }, {} as Record<string, string>);
};

export default function InscricaoEncontro() {
  const { toast } = useToast();
  
  // Fetch site data to maintain consistency with the main site
  const { data: siteData } = useQuery({
    queryKey: ["site-data"],
    queryFn: async () => {
      const [
        { data: heroSlides },
        { data: siteContent },
        { data: navLinks },
        { data: events }
      ] = await Promise.all([
        supabase.from("church_hero_slides").select("*").eq("is_active", true).order("order"),
        supabase.from("site_content").select("*"),
        supabase.from("navigation_links").select("*").order("order_index"),
        supabase.from("events").select("*").eq("is_active", true).order("order")
      ]);

      return {
        siteContent: formatSiteContent(siteContent),
        navLinks: navLinks || []
      };
    },
  });

  const siteContent = siteData?.siteContent || {};
  const navLinks = siteData?.navLinks || [];
  const [formData, setFormData] = useState<InscriptionData>({
    full_name: "",
    address: "",
    email: "",
    phone: "",
    participant_type: "encontrista"
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const inscriptionMutation = useMutation({
    mutationFn: async (data: InscriptionData) => {
      const validatedData = inscriptionSchema.parse(data);
      
      const { error } = await supabase
        .from("event_inscriptions")
        .insert([{
          full_name: validatedData.full_name,
          address: validatedData.address,
          email: validatedData.email,
          phone: validatedData.phone,
          participant_type: validatedData.participant_type
        }]);

      if (error) throw error;
    },
    onSuccess: () => {
      setIsSuccess(true);
      toast({
        title: "Inscrição realizada com sucesso!",
        description: "Sua inscrição para o Encontro com Deus foi confirmada.",
      });
      setFormData({
        full_name: "",
        address: "",
        email: "",
        phone: "",
        participant_type: "encontrista"
      });
    },
    onError: (error) => {
      console.error("Erro ao realizar inscrição:", error);
      toast({
        title: "Erro ao realizar inscrição",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    },
  });

  const handleInputChange = (field: keyof InscriptionData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validatedData = inscriptionSchema.parse(formData);
      inscriptionMutation.mutate(validatedData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const firstError = error.errors[0];
        toast({
          title: "Erro de validação",
          description: firstError.message,
          variant: "destructive",
        });
      }
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
      <Header 
        navLinks={navLinks.length > 0 ? navLinks : [
          { title: 'INÍCIO', href: '/' },
          { title: 'SOBRE', href: '/#sobre' },
          { title: 'EVENTOS', href: '/#eventos' },
          { title: 'CONTATO', href: '/#contato' }
        ]}
        logoUrl={siteContent.logo_url}
      />
        
        <main className="flex-grow flex items-center justify-center p-8">
          <Card className="w-full max-w-md text-center">
            <CardHeader>
              <div className="mx-auto mb-4">
                <CheckCircle className="h-16 w-16 text-green-500" />
              </div>
              <CardTitle className="text-2xl text-green-600">Inscrição Confirmada!</CardTitle>
              <CardDescription className="text-lg">
                Sua inscrição para o Encontro com Deus foi realizada com sucesso.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-muted-foreground mb-6">
                <p>📅 <strong>Data:</strong> 08 e 09 de Novembro</p>
                <p>🙏 Aguardamos você para este momento especial!</p>
              </div>
              <Button asChild className="w-full">
                <a href="/">Voltar ao Início</a>
              </Button>
            </CardContent>
          </Card>
        </main>
        
        <Footer 
          navLinks={navLinks.length > 0 ? navLinks : [
            { title: 'INÍCIO', href: '/' },
            { title: 'SOBRE', href: '/#sobre' },
            { title: 'EVENTOS', href: '/#eventos' },
            { title: 'CONTATO', href: '/#contato' }
          ]}
          siteContent={siteContent}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header 
        navLinks={navLinks.length > 0 ? navLinks : [
          { title: 'INÍCIO', href: '/' },
          { title: 'SOBRE', href: '/#sobre' },
          { title: 'EVENTOS', href: '/#eventos' },
          { title: 'CONTATO', href: '/#contato' }
        ]}
        logoUrl={siteContent.logo_url}
      />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-primary/10 p-4 rounded-full">
                <Users className="h-12 w-12 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Encontro com Deus
            </h1>
            <div className="flex items-center justify-center gap-2 text-lg text-muted-foreground mb-4">
              <Calendar className="h-5 w-5" />
              <span>08 e 09 de Novembro de 2025</span>
            </div>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              Participe conosco deste momento especial de comunhão, adoração e crescimento espiritual.
            </p>
          </div>

          {/* Form Section */}
          <Card>
            <CardHeader>
              <CardTitle>Formulário de Inscrição</CardTitle>
              <CardDescription>
                Preencha seus dados para confirmar sua participação
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="full_name" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Nome Completo
                  </Label>
                  <Input
                    id="full_name"
                    type="text"
                    placeholder="Digite seu nome completo"
                    value={formData.full_name}
                    onChange={(e) => handleInputChange("full_name", e.target.value)}
                    required
                    maxLength={100}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Endereço
                  </Label>
                  <Textarea
                    id="address"
                    placeholder="Digite seu endereço completo"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    required
                    maxLength={200}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    E-mail
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Digite seu e-mail"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                    maxLength={255}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Telefone
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Digite seu telefone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    required
                    maxLength={20}
                  />
                </div>

                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    Tipo de Participação
                  </Label>
                  <RadioGroup
                    value={formData.participant_type}
                    onValueChange={(value) => handleInputChange("participant_type", value as "encontrista" | "trabalhador")}
                    className="flex flex-col space-y-2"
                  >
                    <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-accent/50 cursor-pointer">
                      <RadioGroupItem value="encontrista" id="encontrista" />
                      <Label htmlFor="encontrista" className="flex-1 cursor-pointer font-normal">
                        <div className="font-medium">Encontrista</div>
                        <div className="text-sm text-muted-foreground">Participante do encontro</div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-accent/50 cursor-pointer">
                      <RadioGroupItem value="trabalhador" id="trabalhador" />
                      <Label htmlFor="trabalhador" className="flex-1 cursor-pointer font-normal">
                        <div className="font-medium">Trabalhador</div>
                        <div className="text-sm text-muted-foreground">Ajudar na organização do encontro</div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <Button
                  type="submit"
                  className="w-full text-lg py-6"
                  disabled={inscriptionMutation.isPending}
                >
                  {inscriptionMutation.isPending ? "Enviando..." : "Confirmar Inscrição"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer 
        navLinks={navLinks.length > 0 ? navLinks : [
          { title: 'INÍCIO', href: '/' },
          { title: 'SOBRE', href: '/#sobre' },
          { title: 'EVENTOS', href: '/#eventos' },
          { title: 'CONTATO', href: '/#contato' }
        ]}
        siteContent={siteContent}
      />
    </div>
  );
}
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const Agendamento = () => {
  const navigate = useNavigate();
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);
  const [totalAppointments, setTotalAppointments] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: ''
  });

  // Data fixa do evento - 13 de setembro de 2025 (sábado)
  const eventDate = new Date(2025, 8, 13);

  // Load navigation links for header
  const { data: navData } = useQuery({
    queryKey: ["nav_data"],
    queryFn: async () => {
      const [
        { data: navLinks, error: navLinksError },
        { data: siteContent, error: siteContentError },
      ] = await Promise.all([
        supabase.from("navigation_links").select("*").order("order").eq('is_active', true),
        supabase.from("site_content").select("*"),
      ]);

      if (navLinksError) throw new Error(navLinksError.message);
      if (siteContentError) throw new Error(siteContentError.message);

      // Links de navegação padrão
      const staticNavLinks = [
        { title: 'INÍCIO', href: '/' },
        { title: 'SOBRE', href: '/#sobre' },
        { title: 'EVENTOS', href: '/#eventos' },
        { title: 'CONTATO', href: '/#contato' }
      ];

      // Helper para formatar o conteúdo do site
      const formatSiteContent = (content: any[] | null) => {
        if (!content) return {};
        return content.reduce((acc, item) => {
          acc[item.section_key] = item.content_value;
          return acc;
        }, {} as { [key: string]: string });
      };

      return {
        navLinks: (navLinks && navLinks.length > 0) ? navLinks : staticNavLinks,
        siteContent: formatSiteContent(siteContent),
      };
    },
  });

  // Generate time slots from 9:00 to 16:00 every 10 minutes
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour < 16; hour++) {
      for (let minute = 0; minute < 60; minute += 10) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(time);
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  // Load booked times and total appointments for the event date
  useEffect(() => {
    loadBookedTimes();
    
    // Set up real-time updates for appointments
    const channel = supabase
      .channel('appointment-updates')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'event_appointments',
          filter: `appointment_date=eq.${format(eventDate, 'yyyy-MM-dd')}`
        },
        () => {
          loadBookedTimes();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadBookedTimes = async () => {
    const { data, error } = await supabase
      .from('event_appointments')
      .select('appointment_time')
      .eq('appointment_date', format(eventDate, 'yyyy-MM-dd'));

    if (error) {
      console.error('Error loading booked times:', error);
      return;
    }

    const times = data.map(item => item.appointment_time);
    setBookedTimes(times);
    setTotalAppointments(data.length);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedTime) {
      toast({
        title: "Erro",
        description: "Por favor, selecione um horário.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.fullName || !formData.email || !formData.phone || !formData.address) {
      toast({
        title: "Erro",
        description: "Todos os campos são obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    if (totalAppointments >= 70) {
      toast({
        title: "Vagas esgotadas",
        description: "Todas as 70 vagas para o evento já foram preenchidas.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from('event_appointments')
        .insert({
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          appointment_date: format(eventDate, 'yyyy-MM-dd'),
          appointment_time: selectedTime
        });

      if (error) {
        if (error.code === '23505') {
          toast({
            title: "Horário indisponível",
            description: "Este horário já foi reservado. Por favor, escolha outro.",
            variant: "destructive"
          });
          loadBookedTimes(); // Refresh booked times
          return;
        }
        throw error;
      }

      toast({
        title: "Agendamento confirmado!",
        description: `Seu agendamento foi realizado para ${format(eventDate, 'dd/MM/yyyy')} às ${selectedTime}.`
      });

      // Reset form
      setFormData({ fullName: '', email: '', phone: '', address: '' });
      setSelectedTime('');
      loadBookedTimes();

    } catch (error) {
      console.error('Error creating appointment:', error);
      toast({
        title: "Erro",
        description: "Erro ao realizar agendamento. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const remainingSlots = 70 - totalAppointments;

  return (
    <div className="min-h-screen bg-background">
      <Header 
        logoUrl="/lovable-uploads/db19ffc6-8337-43da-a20a-e0340ed44a7f.png" 
        navLinks={navData?.navLinks}
      />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-8">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-primary">
                Dia da Saúde Ocular
              </CardTitle>
              <CardDescription className="text-lg">
                Exames de Vista GRATUITOS + Armações e Lentes com SUPER DESCONTO!
              </CardDescription>
              <div className="flex justify-center items-center gap-4 mt-4">
                <div className="bg-primary text-primary-foreground px-4 py-2 rounded-lg">
                  <span className="font-bold text-xl">13/09</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>📍 Av Pedro Abrahão Além Neto, 520</p>
                  <p>🕘 9h às 16h</p>
                  <p className="font-semibold text-primary">📊 {remainingSlots} vagas restantes de 70</p>
                </div>
              </div>
            </CardHeader>
          </Card>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Selecione o Horário</CardTitle>
                <CardDescription>
                  Escolha a data e horário para seu atendimento
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Data do Evento (Fixa)</Label>
                  <div className="mt-2 p-3 bg-muted rounded-md">
                    <p className="font-semibold text-center">
                      {format(eventDate, 'EEEE, dd/MM/yyyy', { locale: ptBR })}
                    </p>
                  </div>
                </div>

                <div>
                  <Label>Horários Disponíveis</Label>
                  <div className="grid grid-cols-4 gap-2 mt-2">
                    {timeSlots.map((time) => {
                      const isBooked = bookedTimes.includes(time);
                      const isSelected = selectedTime === time;
                      const isDisabled = isBooked || totalAppointments >= 70;
                      
                      return (
                        <Button
                          key={time}
                          type="button"
                          variant={isBooked ? "destructive" : (isSelected ? "default" : "outline")}
                          size="sm"
                          disabled={isDisabled}
                          onClick={() => !isBooked ? setSelectedTime(time) : null}
                          className={`text-xs ${
                            isBooked 
                              ? 'bg-red-600 text-white hover:bg-red-600 border-red-600 cursor-not-allowed opacity-90 font-medium' 
                              : isSelected
                              ? 'bg-primary text-primary-foreground'
                              : 'hover:bg-accent hover:text-accent-foreground'
                          }`}
                        >
                          {time}
                        </Button>
                      );
                    })}
                  </div>
                  
                  {/* Legenda */}
                  <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                    <h4 className="text-sm font-semibold mb-2">Legenda:</h4>
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-background border border-input rounded"></div>
                        <span>Horários disponíveis</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-destructive rounded"></div>
                        <span>Horários ocupados</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-primary rounded"></div>
                        <span>Horário selecionado</span>
                      </div>
                    </div>
                  </div>
                  
                  {totalAppointments >= 70 && (
                    <p className="text-xs text-destructive mt-2 font-semibold">
                      ⚠️ Todas as vagas foram preenchidas
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Seus Dados</CardTitle>
                <CardDescription>
                  Preencha suas informações para o agendamento
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="fullName">Nome Completo *</Label>
                    <Input
                      id="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Telefone *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="address">Endereço Completo *</Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      required
                      rows={3}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={loading || !selectedTime || totalAppointments >= 70}
                  >
                    {loading ? 'Agendando...' : 'Confirmar Agendamento'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer navLinks={navData?.navLinks} siteContent={navData?.siteContent} />
    </div>
  );
};

export default Agendamento;
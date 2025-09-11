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
  const eventDate = new Date(2025, 8, 13); // Mês 8 = setembro (0-indexado)

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
        { title: 'AGENDAMENTO', href: '/agendamento' },
      ];

      // Helper para formatar o conteúdo do site em um objeto chave-valor
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

  // Generate time slots from 9:00 to 18:00 every 10 minutes
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour < 18; hour++) {
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
          console.log('New appointment added - refreshing slots');
          loadBookedTimes();
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'event_appointments',
          filter: `appointment_date=eq.${format(eventDate, 'yyyy-MM-dd')}`
        },
        () => {
          console.log('Appointment deleted - refreshing slots');
          loadBookedTimes();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadBookedTimes = async () => {
    try {
      // Use the secure function to get total appointment count
      const { data: countData, error: countError } = await supabase.rpc(
        'get_appointment_count_for_date', 
        { check_date: format(eventDate, 'yyyy-MM-dd') }
      );

      if (countError) {
        console.error('Error loading appointment count:', countError);
        return;
      }

      setTotalAppointments(countData || 0);

      // Check each time slot availability
      const availabilityPromises = timeSlots.map(async (time) => {
        const { data: isAvailable, error } = await supabase.rpc(
          'check_appointment_slot_availability', 
          { 
            check_date: format(eventDate, 'yyyy-MM-dd'),
            check_time: time
          }
        );
        
        if (error) {
          console.error('Error checking slot availability:', error);
          return { time, isBooked: false };
        }
        
        return { time, isBooked: !isAvailable };
      });

      const availabilityResults = await Promise.all(availabilityPromises);
      const bookedTimesList = availabilityResults
        .filter(result => result.isBooked)
        .map(result => result.time);

      console.log('Booked times:', bookedTimesList);
      console.log('Total appointments:', countData);
      
      setBookedTimes(bookedTimesList);
    } catch (error) {
      console.error('Error in loadBookedTimes:', error);
    }
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

    if (totalAppointments >= 54) {
      toast({
        title: "Vagas esgotadas",
        description: "Todas as 54 vagas para o evento já foram preenchidas.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      // Check if time slot is still available before inserting
      const { data: isAvailable, error: availabilityError } = await supabase.rpc(
        'check_appointment_slot_availability', 
        { 
          check_date: format(eventDate, 'yyyy-MM-dd'),
          check_time: selectedTime
        }
      );

      if (availabilityError) {
        console.error('Error checking availability:', availabilityError);
        toast({
          title: "Erro",
          description: "Erro ao verificar disponibilidade. Tente novamente.",
          variant: "destructive"
        });
        return;
      }

      if (!isAvailable) {
        toast({
          title: "Horário indisponível",
          description: "Este horário já foi reservado. Por favor, escolha outro.",
          variant: "destructive"
        });
        loadBookedTimes(); // Refresh booked times
        return;
      }

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

      if (error) throw error;

      toast({
        title: "Agendamento realizado!",
        description: `Seu horário ${selectedTime} foi confirmado para ${format(eventDate, 'dd/MM/yyyy')}.`
      });

      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        address: ''
      });
      setSelectedTime('');
      
      // Reload booked times
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

  const remainingSlots = 54 - totalAppointments;

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
                  <p>🕘 9h às 18h</p>
                  <p className="font-semibold text-primary">📊 {remainingSlots} vagas restantes de 54</p>
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
                      const isDisabled = isBooked || totalAppointments >= 54;
                      
                      return (
                        <Button
                          key={time}
                          type="button"
                          variant={isBooked ? "destructive" : (isSelected ? "default" : "outline")}
                          size="sm"
                          disabled={isDisabled}
                          onClick={() => !isDisabled ? setSelectedTime(time) : null}
                          className={`text-xs transition-all duration-200 ${
                            isBooked 
                              ? 'bg-red-600 text-white hover:bg-red-600 border-red-600 cursor-not-allowed opacity-75 font-medium relative' 
                              : isSelected
                              ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                              : 'hover:bg-accent hover:text-accent-foreground'
                          }`}
                        >
                          {isBooked && (
                            <span className="absolute inset-0 flex items-center justify-center">
                              <span className="text-[10px] font-bold">OCUPADO</span>
                            </span>
                          )}
                          <span className={isBooked ? 'opacity-0' : ''}>{time}</span>
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
                        <div className="w-4 h-4 bg-red-600 rounded opacity-75 flex items-center justify-center">
                          <span className="text-[6px] text-white font-bold">X</span>
                        </div>
                        <span>Horários ocupados (indisponíveis)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-primary rounded"></div>
                        <span>Horário selecionado</span>
                      </div>
                    </div>
                  </div>
                  
                  {totalAppointments >= 54 && (
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
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      placeholder="Digite seu nome completo"
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
                      placeholder="seu@email.com"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Telefone/WhatsApp *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="(00) 00000-0000"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="address">Endereço Completo *</Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      placeholder="Rua, número, bairro, cidade - CEP"
                      required
                      rows={3}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={loading || !selectedTime || totalAppointments >= 54}
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
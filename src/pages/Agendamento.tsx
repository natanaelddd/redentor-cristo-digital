import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: ''
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

  // Load booked times for selected date
  useEffect(() => {
    if (selectedDate) {
      loadBookedTimes();
    }
  }, [selectedDate]);

  const loadBookedTimes = async () => {
    if (!selectedDate) return;

    const { data, error } = await supabase
      .from('event_appointments')
      .select('appointment_time')
      .eq('appointment_date', format(selectedDate, 'yyyy-MM-dd'));

    if (error) {
      console.error('Error loading booked times:', error);
      return;
    }

    const times = data.map(item => item.appointment_time);
    setBookedTimes(times);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Erro",
        description: "Por favor, selecione uma data e horário.",
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

    setLoading(true);

    try {
      const { error } = await supabase
        .from('event_appointments')
        .insert({
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          appointment_date: format(selectedDate, 'yyyy-MM-dd'),
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
        description: `Seu agendamento foi realizado para ${format(selectedDate, 'dd/MM/yyyy')} às ${selectedTime}.`
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

  // Set default date to September 13, 2024
  useEffect(() => {
    const eventDate = new Date(2024, 8, 13); // September 13, 2024
    setSelectedDate(eventDate);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header logoUrl="/lovable-uploads/db19ffc6-8337-43da-a20a-e0340ed44a7f.png" />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-8">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-primary">
                Dia da Saúde Ocular
              </CardTitle>
              <CardDescription className="text-lg">
                Exames de Vista, Armações & Lentes - GRÁTIS!
              </CardDescription>
              <div className="flex justify-center items-center gap-4 mt-4">
                <div className="bg-primary text-primary-foreground px-4 py-2 rounded-lg">
                  <span className="font-bold text-xl">13/09</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>📍 Av Pedro Abrahão Além Neto, 520</p>
                  <p>🕘 9h às 16h</p>
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
                  <Label>Data do Evento</Label>
                  <div className="mt-2">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => {
                        const eventDate = new Date(2024, 8, 13);
                        return date.getTime() !== eventDate.getTime();
                      }}
                      locale={ptBR}
                      className="rounded-md border"
                    />
                  </div>
                </div>

                {selectedDate && (
                  <div>
                    <Label>Horários Disponíveis</Label>
                    <div className="grid grid-cols-4 gap-2 mt-2">
                      {timeSlots.map((time) => (
                        <Button
                          key={time}
                          type="button"
                          variant={selectedTime === time ? "default" : "outline"}
                          size="sm"
                          disabled={bookedTimes.includes(time)}
                          onClick={() => setSelectedTime(time)}
                          className="text-xs"
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                    {bookedTimes.length > 0 && (
                      <p className="text-xs text-muted-foreground mt-2">
                        Horários em cinza já estão ocupados
                      </p>
                    )}
                  </div>
                )}
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
                    disabled={loading || !selectedDate || !selectedTime}
                  >
                    {loading ? 'Agendando...' : 'Confirmar Agendamento'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Agendamento;
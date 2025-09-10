-- Create table for event appointments
CREATE TABLE public.event_appointments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.event_appointments ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Admins can manage all appointments" 
ON public.event_appointments 
FOR ALL 
USING (is_admin(auth.uid()));

CREATE POLICY "Allow appointment creation for everyone" 
ON public.event_appointments 
FOR INSERT 
WITH CHECK (true);

-- Create unique constraint to prevent double booking
CREATE UNIQUE INDEX event_appointments_datetime_unique 
ON public.event_appointments (appointment_date, appointment_time);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_event_appointments_updated_at
BEFORE UPDATE ON public.event_appointments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
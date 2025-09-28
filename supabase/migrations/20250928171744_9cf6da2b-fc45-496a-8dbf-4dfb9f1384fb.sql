-- Create enum for field types
CREATE TYPE field_type AS ENUM (
  'text', 'email', 'phone', 'number', 'textarea', 'select', 'checkbox', 
  'radio', 'date', 'file', 'address', 'cpf', 'rg'
);

-- Create enum for registration status
CREATE TYPE registration_status AS ENUM ('pending', 'confirmed', 'cancelled');

-- Create event_forms table
CREATE TABLE public.event_forms (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  slug TEXT NOT NULL UNIQUE,
  is_active BOOLEAN DEFAULT false,
  max_registrations INTEGER,
  registration_count INTEGER DEFAULT 0,
  banner_title TEXT,
  banner_description TEXT,
  banner_button_text TEXT DEFAULT 'Inscrever-se',
  page_title TEXT,
  page_description TEXT,
  confirmation_email_subject TEXT,
  confirmation_email_body TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE public.event_forms ENABLE ROW LEVEL SECURITY;

-- Create policies for event_forms
CREATE POLICY "Admins can manage event forms" 
ON public.event_forms 
FOR ALL 
USING (is_admin(auth.uid()));

CREATE POLICY "Everyone can view active event forms" 
ON public.event_forms 
FOR SELECT 
USING (is_active = true);

-- Create event_form_fields table
CREATE TABLE public.event_form_fields (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  form_id UUID NOT NULL REFERENCES public.event_forms(id) ON DELETE CASCADE,
  field_type field_type NOT NULL,
  field_name TEXT NOT NULL,
  label TEXT NOT NULL,
  placeholder TEXT,
  is_required BOOLEAN DEFAULT false,
  options JSONB DEFAULT '[]'::jsonb,
  validation_rules JSONB DEFAULT '{}'::jsonb,
  order_position INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.event_form_fields ENABLE ROW LEVEL SECURITY;

-- Create policies for event_form_fields
CREATE POLICY "Admins can manage form fields" 
ON public.event_form_fields 
FOR ALL 
USING (is_admin(auth.uid()));

CREATE POLICY "Everyone can view fields of active forms" 
ON public.event_form_fields 
FOR SELECT 
USING (
  is_active = true AND 
  EXISTS (
    SELECT 1 FROM public.event_forms 
    WHERE id = form_id AND is_active = true
  )
);

-- Create event_registrations table
CREATE TABLE public.event_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  form_id UUID NOT NULL REFERENCES public.event_forms(id) ON DELETE CASCADE,
  registration_data JSONB NOT NULL DEFAULT '{}'::jsonb,
  status registration_status DEFAULT 'pending',
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;

-- Create policies for event_registrations
CREATE POLICY "Admins can manage all registrations" 
ON public.event_registrations 
FOR ALL 
USING (is_admin(auth.uid()));

CREATE POLICY "Allow public registration creation" 
ON public.event_registrations 
FOR INSERT 
WITH CHECK (true);

-- Create function to update registration count
CREATE OR REPLACE FUNCTION update_registration_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.event_forms 
    SET registration_count = registration_count + 1 
    WHERE id = NEW.form_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.event_forms 
    SET registration_count = registration_count - 1 
    WHERE id = OLD.form_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for registration count
CREATE TRIGGER update_registration_count_trigger
  AFTER INSERT OR DELETE ON public.event_registrations
  FOR EACH ROW
  EXECUTE FUNCTION update_registration_count();

-- Create function to update timestamps
CREATE TRIGGER update_event_forms_updated_at
  BEFORE UPDATE ON public.event_forms
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_event_form_fields_updated_at
  BEFORE UPDATE ON public.event_form_fields
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_event_registrations_updated_at
  BEFORE UPDATE ON public.event_registrations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
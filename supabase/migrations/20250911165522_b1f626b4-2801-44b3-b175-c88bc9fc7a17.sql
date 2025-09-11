-- Create table for event announcements/banners
CREATE TABLE public.event_announcements (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    message text NOT NULL,
    type text NOT NULL DEFAULT 'info', -- info, warning, success, error
    link_url text,
    link_text text,
    background_color text DEFAULT '#3b82f6',
    text_color text DEFAULT '#ffffff',
    is_active boolean DEFAULT true,
    start_date timestamp with time zone,
    end_date timestamp with time zone,
    order_position integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.event_announcements ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Admins can manage announcements" 
ON public.event_announcements 
FOR ALL 
USING (is_admin(auth.uid()));

CREATE POLICY "Everyone can view active announcements" 
ON public.event_announcements 
FOR SELECT 
USING (is_active = true AND (start_date IS NULL OR start_date <= now()) AND (end_date IS NULL OR end_date >= now()));

-- Add link_url column to reading plans for external links
ALTER TABLE public.reading_plan_details 
ADD COLUMN IF NOT EXISTS link_url text,
ADD COLUMN IF NOT EXISTS external_link_text text DEFAULT 'Ver Plano';

-- Create trigger for updating timestamps
CREATE TRIGGER update_event_announcements_updated_at
    BEFORE UPDATE ON public.event_announcements
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();
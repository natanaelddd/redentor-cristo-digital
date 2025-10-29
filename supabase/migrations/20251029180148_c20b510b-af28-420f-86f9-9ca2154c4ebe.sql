-- Fix appointment data exposure by adding user_id column and proper RLS policies

-- Add user_id column to event_appointments
ALTER TABLE public.event_appointments 
ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL;

-- Drop the vulnerable email-based policies
DROP POLICY IF EXISTS "Users can view their own appointments" ON public.event_appointments;
DROP POLICY IF EXISTS "Users can view their own appointments by user_id" ON public.event_appointments;
DROP POLICY IF EXISTS "Allow authenticated booking only" ON public.event_appointments;

-- Create secure user_id-based policies
CREATE POLICY "Users can view their own appointments"
ON public.event_appointments
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own appointments"
ON public.event_appointments
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = user_id
  AND full_name IS NOT NULL 
  AND email IS NOT NULL 
  AND phone IS NOT NULL 
  AND appointment_date IS NOT NULL 
  AND appointment_time IS NOT NULL 
  AND address IS NOT NULL 
  AND appointment_date >= CURRENT_DATE
);

-- Admin policies remain unchanged
-- Admin read, update, delete policies are already in place

-- Update existing appointments to link with users where possible (based on auth.users email)
UPDATE public.event_appointments ea
SET user_id = au.id
FROM auth.users au
WHERE ea.email = au.email
AND ea.user_id IS NULL;
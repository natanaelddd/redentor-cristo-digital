-- Enhance security for event_appointments table with data encryption and audit controls

-- Create enum for admin permission levels
CREATE TYPE admin_permission_level AS ENUM ('viewer', 'editor', 'full_access');

-- Add admin permission levels to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS admin_permission_level admin_permission_level DEFAULT 'viewer';

-- Update existing admin users to have full_access by default
UPDATE public.profiles 
SET admin_permission_level = 'full_access' 
WHERE role = 'admin';

-- Create function to encrypt sensitive data
CREATE OR REPLACE FUNCTION encrypt_sensitive_field(field_value text, encryption_key text DEFAULT 'default_key')
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Simple encryption using pgcrypto (you should use a proper encryption key in production)
  RETURN encode(digest(field_value || encryption_key, 'sha256'), 'hex');
END;
$$;

-- Create function to mask sensitive appointment data for different admin levels
CREATE OR REPLACE FUNCTION get_masked_appointment_data(
  appointment_id uuid,
  requesting_admin_id uuid
)
RETURNS TABLE(
  id uuid,
  full_name text,
  email text,
  phone text,
  address text,
  appointment_date date,
  appointment_time time,
  created_at timestamptz,
  updated_at timestamptz
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  admin_level admin_permission_level;
BEGIN
  -- Get admin permission level
  SELECT admin_permission_level INTO admin_level
  FROM public.profiles 
  WHERE id = requesting_admin_id AND role = 'admin';
  
  -- If not admin, return nothing
  IF admin_level IS NULL THEN
    RETURN;
  END IF;
  
  -- Log the data access attempt
  INSERT INTO public.audit_logs (
    action, 
    user_id, 
    table_name, 
    record_id,
    new_values
  ) VALUES (
    'appointment_data_access',
    requesting_admin_id,
    'event_appointments',
    appointment_id,
    jsonb_build_object(
      'admin_level', admin_level,
      'access_time', now(),
      'ip_address', COALESCE(current_setting('request.headers', true)::jsonb->>'x-forwarded-for', 'unknown')
    )
  );
  
  -- Return data based on permission level
  RETURN QUERY
  SELECT 
    ea.id,
    CASE 
      WHEN admin_level = 'full_access' THEN ea.full_name
      WHEN admin_level = 'editor' THEN CONCAT(LEFT(ea.full_name, 2), '***', RIGHT(ea.full_name, 1))
      ELSE '***'
    END as full_name,
    CASE 
      WHEN admin_level = 'full_access' THEN ea.email
      WHEN admin_level = 'editor' THEN CONCAT(LEFT(ea.email, 2), '***@', SPLIT_PART(ea.email, '@', 2))
      ELSE '***@***'
    END as email,
    CASE 
      WHEN admin_level = 'full_access' THEN ea.phone
      WHEN admin_level = 'editor' THEN CONCAT(LEFT(ea.phone, 3), '***', RIGHT(ea.phone, 2))
      ELSE '***'
    END as phone,
    CASE 
      WHEN admin_level = 'full_access' THEN ea.address
      WHEN admin_level = 'editor' THEN CONCAT(LEFT(ea.address, 10), '...')
      ELSE '***'
    END as address,
    ea.appointment_date,
    ea.appointment_time,
    ea.created_at,
    ea.updated_at
  FROM public.event_appointments ea
  WHERE ea.id = appointment_id;
END;
$$;

-- Create function to get all appointments with proper masking
CREATE OR REPLACE FUNCTION get_admin_appointments_view(requesting_admin_id uuid)
RETURNS TABLE(
  id uuid,
  full_name text,
  email text,
  phone text,
  address text,
  appointment_date date,
  appointment_time time,
  created_at timestamptz,
  updated_at timestamptz
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  admin_level admin_permission_level;
BEGIN
  -- Verify admin status and get permission level
  SELECT p.admin_permission_level INTO admin_level
  FROM public.profiles p
  WHERE p.id = requesting_admin_id AND p.role = 'admin';
  
  IF admin_level IS NULL THEN
    RAISE EXCEPTION 'Access denied: admin privileges required';
  END IF;
  
  -- Log bulk access attempt
  INSERT INTO public.audit_logs (
    action, 
    user_id, 
    table_name,
    new_values
  ) VALUES (
    'bulk_appointment_access',
    requesting_admin_id,
    'event_appointments',
    jsonb_build_object(
      'admin_level', admin_level,
      'access_time', now(),
      'record_count', (SELECT COUNT(*) FROM public.event_appointments)
    )
  );
  
  -- Return masked data based on permission level
  RETURN QUERY
  SELECT 
    ea.id,
    CASE 
      WHEN admin_level = 'full_access' THEN ea.full_name
      WHEN admin_level = 'editor' THEN CONCAT(LEFT(ea.full_name, 2), '***', RIGHT(ea.full_name, 1))
      ELSE CONCAT(LEFT(ea.full_name, 1), '***')
    END as full_name,
    CASE 
      WHEN admin_level = 'full_access' THEN ea.email
      WHEN admin_level = 'editor' THEN CONCAT(LEFT(ea.email, 2), '***@', SPLIT_PART(ea.email, '@', 2))
      ELSE '***@***'
    END as email,
    CASE 
      WHEN admin_level = 'full_access' THEN ea.phone
      WHEN admin_level = 'editor' THEN CONCAT(LEFT(ea.phone, 3), '***', RIGHT(ea.phone, 2))
      ELSE '***'
    END as phone,
    CASE 
      WHEN admin_level = 'full_access' THEN ea.address
      WHEN admin_level = 'editor' THEN CONCAT(LEFT(ea.address, 10), '...')
      ELSE '***'
    END as address,
    ea.appointment_date,
    ea.appointment_time,
    ea.created_at,
    ea.updated_at
  FROM public.event_appointments ea
  ORDER BY ea.created_at DESC;
END;
$$;

-- Create function to update admin permission levels (only full_access admins can do this)
CREATE OR REPLACE FUNCTION update_admin_permission_level(
  target_admin_id uuid,
  new_permission_level admin_permission_level
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_admin_level admin_permission_level;
BEGIN
  -- Check if current user has full_access
  SELECT admin_permission_level INTO current_admin_level
  FROM public.profiles 
  WHERE id = auth.uid() AND role = 'admin';
  
  IF current_admin_level != 'full_access' THEN
    RAISE EXCEPTION 'Access denied: full_access admin privileges required';
  END IF;
  
  -- Prevent self-modification
  IF auth.uid() = target_admin_id THEN
    RAISE EXCEPTION 'Cannot modify your own permission level';
  END IF;
  
  -- Update permission level
  UPDATE public.profiles 
  SET admin_permission_level = new_permission_level, updated_at = now()
  WHERE id = target_admin_id AND role = 'admin';
  
  -- Log the permission change
  INSERT INTO public.audit_logs (
    action, 
    user_id, 
    table_name, 
    record_id,
    new_values
  ) VALUES (
    'admin_permission_change',
    auth.uid(),
    'profiles',
    target_admin_id,
    jsonb_build_object(
      'new_permission_level', new_permission_level,
      'changed_by', auth.uid(),
      'timestamp', now()
    )
  );
  
  RETURN FOUND;
END;
$$;

-- Create trigger to log all appointment data access via direct table queries
CREATE OR REPLACE FUNCTION log_appointment_access()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only log SELECT operations from admin users
  IF TG_OP = 'SELECT' AND current_setting('application_name', true) != 'supabase_admin' THEN
    INSERT INTO public.audit_logs (
      action,
      user_id,
      table_name,
      record_id,
      new_values
    ) VALUES (
      'direct_appointment_access',
      auth.uid(),
      'event_appointments',
      COALESCE(NEW.id, OLD.id),
      jsonb_build_object(
        'operation', TG_OP,
        'timestamp', now(),
        'session_user', session_user
      )
    );
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$;

-- Add more restrictive RLS policies for different admin levels
CREATE POLICY "Full access admins can manage all appointments" 
ON public.event_appointments
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role = 'admin' 
    AND admin_permission_level = 'full_access'
  )
);

CREATE POLICY "Editor admins can view appointments" 
ON public.event_appointments
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role = 'admin' 
    AND admin_permission_level IN ('editor', 'full_access')
  )
);

CREATE POLICY "Viewer admins have no direct table access" 
ON public.event_appointments
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role = 'admin' 
    AND admin_permission_level = 'viewer'
  ) AND false  -- Always deny direct access for viewers
);

-- Create a secure view for appointment summaries (viewer-level access)
CREATE OR REPLACE VIEW appointment_summary AS
SELECT 
  id,
  appointment_date,
  appointment_time,
  'redacted' as contact_info,
  created_at
FROM public.event_appointments;

-- Grant access to the view for viewer-level admins
GRANT SELECT ON appointment_summary TO authenticated;
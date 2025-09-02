-- Create a function to manually set the first admin user
-- This should be used only once to bootstrap the first admin account
CREATE OR REPLACE FUNCTION public.bootstrap_first_admin(admin_email text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  -- Check if there are any admin users already
  IF EXISTS (SELECT 1 FROM public.profiles WHERE role = 'admin') THEN
    RAISE EXCEPTION 'Admin users already exist. Cannot bootstrap first admin.';
  END IF;
  
  -- Find user by email and set as admin
  UPDATE public.profiles 
  SET role = 'admin', updated_at = now()
  WHERE email = admin_email;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'User with email % not found. Please create the account first through signup.', admin_email;
  END IF;
  
  -- Log the bootstrap action
  INSERT INTO public.audit_logs (action, user_id, table_name, record_id, new_values)
  SELECT 
    'bootstrap_admin',
    id,
    'profiles',
    id,
    jsonb_build_object('email', admin_email, 'role', 'admin')
  FROM public.profiles 
  WHERE email = admin_email;
  
  RETURN true;
END;
$$;

-- Add a comment explaining how to use this function
COMMENT ON FUNCTION public.bootstrap_first_admin(text) IS 
'Bootstrap function to create the first admin user. 
Usage: SELECT public.bootstrap_first_admin(''your-email@example.com'');
Note: The user must exist (signed up) before calling this function.';

-- Create a function to log admin access for security monitoring
CREATE OR REPLACE FUNCTION public.log_admin_access(
  admin_user_id uuid,
  action_type text,
  details text DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  INSERT INTO public.audit_logs (action, user_id, table_name, new_values)
  VALUES (
    action_type,
    admin_user_id,
    'admin_access',
    jsonb_build_object(
      'details', details,
      'timestamp', now(),
      'ip_address', current_setting('request.headers', true)::jsonb->>'x-forwarded-for'
    )
  );
END;
$$;
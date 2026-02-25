CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  org_name TEXT,
  delta_potential NUMERIC DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert on leads" ON public.leads
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated read on leads" ON public.leads
  FOR SELECT USING (auth.uid() IS NOT NULL);
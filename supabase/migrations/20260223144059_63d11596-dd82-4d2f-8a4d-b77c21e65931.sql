
-- Organizations table
CREATE TABLE public.organizations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  industry TEXT,
  size TEXT,
  created_by UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own organizations"
  ON public.organizations FOR SELECT
  USING (auth.uid() = created_by);

CREATE POLICY "Users can create organizations"
  ON public.organizations FOR INSERT
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their own organizations"
  ON public.organizations FOR UPDATE
  USING (auth.uid() = created_by);

CREATE POLICY "Users can delete their own organizations"
  ON public.organizations FOR DELETE
  USING (auth.uid() = created_by);

-- Diagnostics table
CREATE TABLE public.diagnostics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  org_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  h_hours NUMERIC NOT NULL DEFAULT 8,
  c_cost NUMERIC NOT NULL DEFAULT 250,
  p_probability NUMERIC NOT NULL DEFAULT 0.3,
  delta_potential NUMERIC NOT NULL DEFAULT 0,
  ai_risk_factor NUMERIC NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'draft',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.diagnostics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage diagnostics via org ownership"
  ON public.diagnostics FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.organizations
      WHERE organizations.id = diagnostics.org_id
      AND organizations.created_by = auth.uid()
    )
  );

-- Audit log table
CREATE TABLE public.audit_log (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  org_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  content TEXT NOT NULL,
  semantic_weight NUMERIC DEFAULT 0,
  source TEXT DEFAULT 'system',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view audit logs via org ownership"
  ON public.audit_log FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.organizations
      WHERE organizations.id = audit_log.org_id
      AND organizations.created_by = auth.uid()
    )
  );

CREATE POLICY "Users can insert audit logs via org ownership"
  ON public.audit_log FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.organizations
      WHERE organizations.id = audit_log.org_id
      AND organizations.created_by = auth.uid()
    )
  );

-- Tourniquets table
CREATE TABLE public.tourniquets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  org_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  priority INTEGER NOT NULL DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'pending',
  linked_insight_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.tourniquets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage tourniquets via org ownership"
  ON public.tourniquets FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.organizations
      WHERE organizations.id = tourniquets.org_id
      AND organizations.created_by = auth.uid()
    )
  );

-- Timestamp update function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Triggers for updated_at
CREATE TRIGGER update_organizations_updated_at
  BEFORE UPDATE ON public.organizations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_diagnostics_updated_at
  BEFORE UPDATE ON public.diagnostics
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_tourniquets_updated_at
  BEFORE UPDATE ON public.tourniquets
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


-- Add PERMISSIVE public SELECT policies for anonymous read access

CREATE POLICY "Public read access to organizations"
ON public.organizations FOR SELECT
USING (true);

CREATE POLICY "Public read access to diagnostics"
ON public.diagnostics FOR SELECT
USING (true);

CREATE POLICY "Public read access to audit_log"
ON public.audit_log FOR SELECT
USING (true);

CREATE POLICY "Public read access to tourniquets"
ON public.tourniquets FOR SELECT
USING (true);

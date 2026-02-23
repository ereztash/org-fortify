import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text, org_id } = await req.json();

    if (!text || !org_id) {
      return new Response(JSON.stringify({ error: 'text and org_id required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const apiKey = Deno.env.get('LOVABLE_API_KEY');
    if (!apiKey) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    const systemPrompt = `אתה מנתח ארגוני מומחה במתודולוגיית COR-SYS. תפקידך לבצע ניתוח סוקרטי כפול-עדשה:
1. עדשה ראשונה: זהה נורמליזציה של סטייה — מקומות שהארגון הפנים כשלים כ"נורמה"
2. עדשה שנייה: זהה סתירות לוגיות וכשלים מבניים

לכל תובנה, החזר:
- content: תיאור התובנה בעברית (משפט אחד עד שניים)
- weight: משקל סמנטי בין 0.0 ל-1.0 (0=מינורי, 1=קריטי)
- type: "normalization" | "contradiction" | "structural_failure"

החזר JSON בפורמט: { "insights": [{ "content": "...", "weight": 0.X, "type": "..." }] }
החזר 2-5 תובנות. היה חד, טכני, ומדויק. אל תנחם.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: text },
        ],
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`AI Gateway error: ${err}`);
    }

    const data = await response.json();
    const raw = data.choices?.[0]?.message?.content || '{}';
    
    // Parse JSON from response (handle markdown code blocks)
    let parsed;
    try {
      const cleaned = raw.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      parsed = JSON.parse(cleaned);
    } catch {
      parsed = { insights: [{ content: raw, weight: 0.3, type: "structural_failure" }] };
    }

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

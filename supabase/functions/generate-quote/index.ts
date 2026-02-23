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
    const { orgName, roiParams, deltaPotential, aiRiskFactor, healthScore, insights, tourniquets } = await req.json();

    const date = new Date().toLocaleDateString('he-IL');
    
    const insightRows = (insights || []).map((ins: any, i: number) => 
      `<tr><td style="padding:8px;border:1px solid #334155;">${i + 1}</td><td style="padding:8px;border:1px solid #334155;">${ins.content}</td><td style="padding:8px;border:1px solid #334155;text-align:center;">${(ins.weight * 100).toFixed(0)}%</td></tr>`
    ).join('');

    const tourniquetRows = (tourniquets || []).map((t: any, i: number) =>
      `<tr><td style="padding:8px;border:1px solid #334155;">${i + 1}</td><td style="padding:8px;border:1px solid #334155;">${t.title}</td><td style="padding:8px;border:1px solid #334155;text-align:center;">${t.priority}</td><td style="padding:8px;border:1px solid #334155;text-align:center;">${t.status}</td></tr>`
    ).join('');

    const sprintCost = Math.round(deltaPotential * 0.15);

    const html = `<!DOCTYPE html>
<html dir="rtl" lang="he">
<head><meta charset="UTF-8"><style>
  body { font-family: 'Segoe UI', sans-serif; background: #0f172a; color: #e2e8f0; padding: 40px; max-width: 800px; margin: 0 auto; }
  h1 { color: #34d399; font-size: 28px; border-bottom: 2px solid #1e293b; padding-bottom: 16px; }
  h2 { color: #94a3b8; font-size: 18px; margin-top: 32px; }
  .metric { display: inline-block; background: #1e293b; padding: 16px 24px; border-radius: 12px; margin: 8px; text-align: center; }
  .metric .value { font-size: 28px; font-weight: bold; color: #34d399; }
  .metric .label { font-size: 12px; color: #64748b; margin-top: 4px; }
  table { width: 100%; border-collapse: collapse; margin-top: 12px; }
  th { background: #1e293b; padding: 10px; border: 1px solid #334155; text-align: right; color: #94a3b8; font-size: 13px; }
  td { font-size: 13px; }
  .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #1e293b; font-size: 12px; color: #475569; text-align: center; }
  .quote-box { background: linear-gradient(135deg, #1e293b, #0f172a); border: 1px solid #34d399; border-radius: 16px; padding: 24px; margin-top: 24px; text-align: center; }
  .quote-box .price { font-size: 36px; font-weight: bold; color: #34d399; }
</style></head>
<body>
  <h1>COR-SYS v3.4 — הצעת ספרינט אבחוני</h1>
  <p style="color:#64748b;">תאריך: ${date} | ארגון: ${orgName || 'לא צוין'}</p>

  <h2>מדדי ROI</h2>
  <div>
    <div class="metric"><div class="value">${roiParams?.h || 8}</div><div class="label">שעות אבודות/שבוע</div></div>
    <div class="metric"><div class="value">₪${roiParams?.c || 250}</div><div class="label">עלות לשעה</div></div>
    <div class="metric"><div class="value">${((roiParams?.p || 0.3) * 100).toFixed(0)}%</div><div class="label">הסתברות</div></div>
    <div class="metric"><div class="value">${(aiRiskFactor || 0).toFixed(2)}</div><div class="label">AI Risk Factor</div></div>
  </div>

  <div class="metric" style="display:block;margin-top:16px;">
    <div class="label">ΔPotential — עלות אי-עשייה שנתית</div>
    <div class="value" style="font-size:36px;">₪${(deltaPotential || 0).toLocaleString()}</div>
    <div class="label">Health Score: ${(healthScore || 0).toFixed(0)}/100</div>
  </div>

  ${insightRows ? `<h2>ממצאי ASA</h2>
  <table><thead><tr><th>#</th><th>תובנה</th><th>משקל</th></tr></thead><tbody>${insightRows}</tbody></table>` : ''}

  ${tourniquetRows ? `<h2>Tourniquets</h2>
  <table><thead><tr><th>#</th><th>פעולה</th><th>עדיפות</th><th>סטטוס</th></tr></thead><tbody>${tourniquetRows}</tbody></table>` : ''}

  <div class="quote-box">
    <p style="color:#94a3b8;margin-bottom:8px;">הצעת מחיר לספרינט אבחוני (14 יום)</p>
    <div class="price">₪${sprintCost.toLocaleString()}</div>
    <p style="color:#64748b;font-size:12px;margin-top:8px;">15% מעלות אי-העשייה השנתית</p>
  </div>

  <div class="footer">
    <p>COR-SYS v3.4 — מערכת אבחון וחוסן ארגוני</p>
    <p>המערכת מסנכרנת חוסן. המסמך נוצר אוטומטית.</p>
  </div>
</body></html>`;

    return new Response(html, {
      headers: { ...corsHeaders, 'Content-Type': 'text/html; charset=utf-8' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

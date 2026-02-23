import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Mail, ArrowLeft, Loader2, Lock } from "lucide-react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"login" | "signup" | "magic">("login");
  const { signInWithMagicLink, signInWithPassword, signUp, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  if (user) {
    navigate("/dashboard");
    return null;
  }

  const handlePasswordAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);

    if (mode === "signup") {
      const { error } = await signUp(email, password);
      setLoading(false);
      if (error) {
        toast({ title: "שגיאה", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "נרשמת בהצלחה!", description: "מתחבר למערכת..." });
      }
    } else {
      const { error } = await signInWithPassword(email, password);
      setLoading(false);
      if (error) {
        toast({ title: "שגיאה", description: error.message, variant: "destructive" });
      }
    }
  };

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    const { error } = await signInWithMagicLink(email);
    setLoading(false);
    if (error) {
      toast({ title: "שגיאה", description: error.message, variant: "destructive" });
    } else {
      setSent(true);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>חזרה לדף הבית</span>
        </button>

        <Card className="glass border-border/50">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              {mode === "magic" ? <Mail className="w-6 h-6 text-primary" /> : <Lock className="w-6 h-6 text-primary" />}
            </div>
            <CardTitle className="text-xl">
              {mode === "signup" ? "הרשמה למערכת" : "כניסה למערכת"}
            </CardTitle>
            <CardDescription>
              {sent
                ? "בדוק את תיבת הדואר שלך"
                : mode === "magic"
                ? "הזן אימייל לקבלת קישור כניסה"
                : mode === "signup"
                ? "צור חשבון חדש"
                : "הזן אימייל וסיסמה"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {sent ? (
              <div className="text-center space-y-4">
                <p className="text-muted-foreground text-sm">
                  שלחנו קישור כניסה ל-<span className="text-foreground font-medium">{email}</span>
                </p>
                <Button variant="ghost" onClick={() => setSent(false)} className="text-sm">
                  שלח שוב
                </Button>
              </div>
            ) : mode === "magic" ? (
              <form onSubmit={handleMagicLink} className="space-y-4">
                <Input
                  type="email"
                  placeholder="email@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-left"
                  dir="ltr"
                  required
                />
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "שלח קישור כניסה"}
                </Button>
                <Button type="button" variant="ghost" className="w-full text-sm" onClick={() => setMode("login")}>
                  כניסה עם סיסמה
                </Button>
              </form>
            ) : (
              <form onSubmit={handlePasswordAuth} className="space-y-4">
                <Input
                  type="email"
                  placeholder="email@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-left"
                  dir="ltr"
                  required
                />
                <Input
                  type="password"
                  placeholder="סיסמה"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-left"
                  dir="ltr"
                  required
                  minLength={6}
                />
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : mode === "signup" ? "הרשמה" : "כניסה"}
                </Button>
                <div className="flex flex-col gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full text-sm"
                    onClick={() => setMode(mode === "signup" ? "login" : "signup")}
                  >
                    {mode === "signup" ? "יש לי חשבון — כניסה" : "אין לי חשבון — הרשמה"}
                  </Button>
                  <Button type="button" variant="ghost" className="w-full text-sm text-muted-foreground" onClick={() => setMode("magic")}>
                    כניסה עם קישור מייל
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-6">
          COR-SYS v3.4 — אבחון וחוסן ארגוני
        </p>
      </div>
    </div>
  );
};

export default Auth;

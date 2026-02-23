import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

const Dashboard = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 px-6 py-4">
        <div className="container max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-lg font-semibold text-foreground">
            COR-SYS <span className="text-primary">Command Center</span>
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user?.email}</span>
            <Button variant="ghost" size="sm" onClick={signOut}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container max-w-6xl mx-auto p-6">
        <div className="glass rounded-2xl p-8 text-center">
          <p className="text-muted-foreground">דאשבורד בפיתוח — שלב 4</p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

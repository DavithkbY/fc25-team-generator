import { useState, useEffect } from "react";
import TeamGenerator from "@/components/TeamGenerator";
import TeamHistory from "@/components/TeamHistory";
import { TeamConfig } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { getTeamHistory, saveTeamConfig } from "@/lib/localStorage";

export default function Home() {
  const { toast } = useToast();
  const [teamHistory, setTeamHistory] = useState<TeamConfig[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load team history from localStorage on component mount
  useEffect(() => {
    // Simulate a small delay to match the loading experience of the previous API
    const timer = setTimeout(() => {
      const history = getTeamHistory();
      setTeamHistory(history);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // Create a new team configuration in localStorage
  const createTeamConfig = (teams: { team1: string[], team2: string[], team1Club: string, team2Club: string }) => {
    try {
      setIsGenerating(true);
      
      // Save to localStorage
      const newConfig = saveTeamConfig(teams);
      
      // Update state
      setTeamHistory([newConfig, ...teamHistory]);
      
      // Show success message
      toast({
        title: "Teams generated!",
        description: "New teams have been created successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate teams. Please try again.",
        variant: "destructive",
      });
      console.error("Failed to create team configuration:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-10">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-neutral-800 mb-2">Team Generator</h1>
        <p className="text-neutral-600">Create balanced teams with your players</p>
      </header>

      <main>
        <TeamGenerator 
          onGenerateTeams={createTeamConfig} 
          isGenerating={isGenerating} 
          latestTeams={teamHistory.length > 0 ? teamHistory[0] : null}
        />
        
        <TeamHistory 
          history={teamHistory} 
          isLoading={isLoading}
        />
      </main>
    </div>
  );
}

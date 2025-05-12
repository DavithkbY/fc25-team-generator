import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import TeamCard from "./TeamCard";
import { TeamConfig } from "@shared/schema";

// The four people we'll generate teams from
const PEOPLE = ["Davit", "Jarne", "Michiel", "Koen"];

interface TeamGeneratorProps {
  onGenerateTeams: (teams: { team1: string[], team2: string[] }) => void;
  isGenerating: boolean;
  latestTeams: TeamConfig | null;
}

export default function TeamGenerator({ 
  onGenerateTeams, 
  isGenerating,
  latestTeams
}: TeamGeneratorProps) {
  const [teams, setTeams] = useState<{ team1: string[], team2: string[] }>({
    team1: [],
    team2: []
  });

  // Initialize with random teams or use the latest from history
  useEffect(() => {
    if (latestTeams) {
      setTeams({
        team1: latestTeams.team1,
        team2: latestTeams.team2
      });
    } else {
      generateRandomTeams();
    }
  }, [latestTeams]);

  // Function to generate random teams
  const generateRandomTeams = () => {
    // Clone the array to avoid modifying the original
    const shuffled = [...PEOPLE];
    
    // Fisher-Yates shuffle algorithm
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    // Split into two teams
    const team1 = shuffled.slice(0, 2);
    const team2 = shuffled.slice(2, 4);
    
    return { team1, team2 };
  };

  // Handle generate button click
  const handleGenerateTeams = () => {
    const newTeams = generateRandomTeams();
    setTeams(newTeams);
    onGenerateTeams(newTeams);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      {/* Team Display Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <TeamCard 
          teamNumber={1} 
          teamColor="blue" 
          members={teams.team1} 
        />
        <TeamCard 
          teamNumber={2} 
          teamColor="green" 
          members={teams.team2} 
        />
      </div>

      {/* Generate Button */}
      <div className="flex justify-center">
        <Button 
          size="lg" 
          onClick={handleGenerateTeams} 
          disabled={isGenerating}
          className="font-medium py-3 px-8 shadow-md"
        >
          <RefreshCw className="h-5 w-5 mr-2" />
          Generate Teams
        </Button>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, ShieldAlert } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import TeamCard from "./TeamCard";
import { TeamConfig, ClubRating } from "@shared/schema";
import { getTwoRandomClubs } from "@/lib/clubData";

// The four people we'll generate teams from
const PEOPLE = ["Davit", "Jarne", "Michiel", "Koen"];

interface TeamGeneratorProps {
  onGenerateTeams: (teams: { team1: string[], team2: string[], team1Club: string, team2Club: string }) => void;
  isGenerating: boolean;
  latestTeams: TeamConfig | null;
}

export default function TeamGenerator({ 
  onGenerateTeams, 
  isGenerating,
  latestTeams
}: TeamGeneratorProps) {
  const [teams, setTeams] = useState<{ 
    team1: string[], 
    team2: string[],
    team1Club: string,
    team2Club: string
  }>({
    team1: [],
    team2: [],
    team1Club: "",
    team2Club: ""
  });
  
  const [minRating, setMinRating] = useState<ClubRating>("4.5");

  // Initialize with random teams or use the latest from history
  useEffect(() => {
    if (latestTeams) {
      setTeams({
        team1: latestTeams.team1,
        team2: latestTeams.team2,
        team1Club: latestTeams.team1Club,
        team2Club: latestTeams.team2Club
      });
    } else {
      const newTeams = generateRandomTeams();
      setTeams(newTeams);
    }
  }, [latestTeams]);

  // Function to generate random teams with clubs
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
    
    // Get random clubs based on rating
    const [club1, club2] = getTwoRandomClubs(minRating);
    
    return { 
      team1, 
      team2,
      team1Club: club1.name,
      team2Club: club2.name
    };
  };

  // Handle generate button click
  const handleGenerateTeams = () => {
    const newTeams = generateRandomTeams();
    setTeams(newTeams);
    onGenerateTeams(newTeams);
  };

  // Handle club rating change
  const handleRatingChange = (value: string) => {
    setMinRating(value as ClubRating);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      {/* Club Rating Selection */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <ShieldAlert className="h-4 w-4 text-neutral-600" />
          <Label htmlFor="club-rating" className="text-sm font-medium">Football Club Rating</Label>
        </div>
        <Select value={minRating} onValueChange={handleRatingChange}>
          <SelectTrigger id="club-rating" className="w-full md:w-64">
            <SelectValue placeholder="Select minimum club rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="4.5">4.5 Stars (includes 5 star clubs)</SelectItem>
            <SelectItem value="5">5 Stars only</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-neutral-500 mt-1">
          Select minimum club rating to use for team generation
        </p>
      </div>

      {/* Team Display Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <TeamCard 
          teamNumber={1} 
          teamColor="blue" 
          members={teams.team1}
          clubName={teams.team1Club}
        />
        <TeamCard 
          teamNumber={2} 
          teamColor="green" 
          members={teams.team2}
          clubName={teams.team2Club}
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

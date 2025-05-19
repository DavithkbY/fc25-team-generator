import { TeamConfig } from "@shared/schema";

// Key for storing team configurations in localStorage
const TEAM_HISTORY_KEY = "team_generator_history";

// Get team history from localStorage
export function getTeamHistory(): TeamConfig[] {
  try {
    const historyJson = localStorage.getItem(TEAM_HISTORY_KEY);
    if (!historyJson) return [];
    
    const history = JSON.parse(historyJson);
    
    // Convert string dates back to Date objects
    return history.map((item: any) => ({
      ...item,
      createdAt: new Date(item.createdAt)
    }));
  } catch (error) {
    console.error("Failed to load team history:", error);
    return [];
  }
}

// Save a new team configuration to localStorage
export function saveTeamConfig(config: Omit<TeamConfig, "id" | "createdAt">): TeamConfig {
  try {
    const history = getTeamHistory();
    
    // Create a new team config object with id and createdAt
    const newConfig: TeamConfig = {
      ...config,
      id: Date.now(), // Use timestamp as ID
      createdAt: new Date()
    };
    
    // Add new config to the beginning of the array
    const updatedHistory = [newConfig, ...history];
    
    // Keep only the last 10 entries to prevent localStorage from getting too large
    const trimmedHistory = updatedHistory.slice(0, 10);
    
    // Save to localStorage
    localStorage.setItem(TEAM_HISTORY_KEY, JSON.stringify(trimmedHistory));
    
    return newConfig;
  } catch (error) {
    console.error("Failed to save team configuration:", error);
    throw error;
  }
}
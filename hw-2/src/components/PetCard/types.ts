export type Mood = "happy" | "neutral" | "sad";

export interface Pet {
  id: string;
  name: string;
  species: string;
  mood: Mood;
  energy: number;
  level: number;
  avatar: string;
}

export interface PetState {
  mood: Mood;
  energy: number;
  level: number;
}

export type PetAction =
  | { type: "FEED" }
  | { type: "LEVEL_UP" }
  | { type: "CHEER" }
  | { type: "RESET"; payload: PetState }
  | { type: "DECREASE_ENERGY" }
  | { type: "SET_MOOD"; payload: Mood };

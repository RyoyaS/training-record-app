export interface Set {
  id: string;
  reps: number;
  weight: number;
}

export interface Exercise {
  id: string;
  name: string;
  sets: Set[];
  date: string;
}

export interface WorkoutLog {
  id: string;
  date: string;
  exercises: Exercise[];
}

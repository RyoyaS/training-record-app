import type { Exercise, WorkoutLog, Set } from '@/app/types/workout';

const STORAGE_KEY = 'workout-logs';

export function saveWorkoutLog(log: WorkoutLog): void {
  const logs = getWorkoutLogs();
  const existingLogIndex = logs.findIndex((l) => l.date === log.date);

  if (existingLogIndex >= 0) {
    logs[existingLogIndex] = log;
  } else {
    logs.push(log);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
}

export function getWorkoutLogs(): WorkoutLog[] {
  const logsJson = localStorage.getItem(STORAGE_KEY);
  return logsJson ? JSON.parse(logsJson) : [];
}

export function deleteExercise(exerciseId: string): void {
  const logs = getWorkoutLogs();
  const updatedLogs = logs
    .map((log) => ({
      ...log,
      exercises: log.exercises.filter((ex) => ex.id !== exerciseId),
    }))
    .filter((log) => log.exercises.length > 0);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedLogs));
}

export function updateSet(
  exerciseId: string,
  setId: string,
  updatedSet: Omit<Set, 'id'>,
): void {
  const logs = getWorkoutLogs();
  const updatedLogs = logs.map((log) => ({
    ...log,
    exercises: log.exercises.map((exercise) => {
      if (exercise.id === exerciseId) {
        return {
          ...exercise,
          sets: exercise.sets.map((set) =>
            set.id === setId ? { ...updatedSet, id: set.id } : set,
          ),
        };
      }
      return exercise;
    }),
  }));

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedLogs));
}

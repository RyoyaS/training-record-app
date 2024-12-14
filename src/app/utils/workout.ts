import type { Exercise, Set } from '@/app/types/workout';
import { getTodayString } from './date';

export function createExercise(
  name: string,
  sets: Set[],
): Omit<Exercise, 'id'> {
  return {
    name,
    sets,
    date: getTodayString(),
  };
}

export function createSet(reps: number, weight: number): Omit<Set, 'id'> {
  return {
    reps,
    weight,
  };
}

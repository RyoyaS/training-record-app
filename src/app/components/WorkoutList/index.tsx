import React from 'react';
import { Trash2 } from 'lucide-react';
import type { Exercise, Set } from '@/app/types/workout';
import { SetList } from '@/app/components/SetList';
import { ExerciseItem } from '@/app/components/ExerciseItem';

interface WorkoutListProps {
  exercises: Exercise[];
  onDelete: (id: string) => void;
  onEditSet: (exerciseId: string, setId: string, updatedSet: Omit<Set, 'id'>) => void;
}

export function WorkoutList({ exercises, onDelete, onEditSet }: WorkoutListProps) {
  return (
    <div className="space-y-4">
      {exercises.map((exercise) => (
        <ExerciseItem
          key={exercise.id}
          exercise={exercise}
          onDelete={onDelete}
          onEditSet={onEditSet}
        />
      ))}
    </div>
  );
}
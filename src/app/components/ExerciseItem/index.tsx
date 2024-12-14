import React from 'react';
import { Trash2 } from 'lucide-react';
import type { Exercise, Set } from '@/app/types/workout';
import { SetList } from '@/app/components/SetList';

interface ExerciseItemProps {
  exercise: Exercise;
  onDelete: (id: string) => void;
  onEditSet: (exerciseId: string, setId: string, updatedSet: Omit<Set, 'id'>) => void;
}

export function ExerciseItem({ exercise, onDelete, onEditSet }: ExerciseItemProps) {
  const handleEditSet = (setId: string, updatedSet: Omit<Set, 'id'>) => {
    onEditSet(exercise.id, setId, updatedSet);
  };

  return (
    <div className="bg-[#2a2a2a] p-6 rounded-2xl shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-lg">{exercise.name}</h3>
        <button
          onClick={() => onDelete(exercise.id)}
          className="text-red-500 hover:text-red-400 p-2 rounded-full hover:bg-[#333]"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-2">
        <SetList
          sets={exercise.sets}
          onDelete={() => { }}
          onEdit={handleEditSet}
        />
      </div>
    </div>
  );
}
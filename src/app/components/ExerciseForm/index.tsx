import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import type { Exercise, Set } from '@/app/types/workout';
import { SetForm } from '@/app/components/SetForm';
import { SetList } from '@/app/components/SetList';

interface ExerciseFormProps {
  onSubmit: (exercise: Omit<Exercise, 'id' | 'date'>) => void;
}

export function ExerciseForm({ onSubmit }: ExerciseFormProps) {
  const [name, setName] = useState('');
  const [sets, setSets] = useState<Set[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (sets.length === 0) return;

    onSubmit({ name, sets });
    setName('');
    setSets([]);
  };

  const handleAddSet = (newSet: Omit<Set, 'id'>) => {
    setSets(prev => [...prev, { ...newSet, id: crypto.randomUUID() }]);
  };

  const handleDeleteSet = (setId: string) => {
    setSets(prev => prev.filter(set => set.id !== setId));
  };

  const handleEditSet = (setId: string, updatedSet: Omit<Set, 'id'>) => {
    setSets(prev => prev.map(set =>
      set.id === setId ? { ...updatedSet, id: set.id } : set
    ));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
          種目名
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block w-full rounded-xl bg-[#333] border border-[#444] text-white px-4 py-2 focus:outline-none focus:border-blue-500"
          required
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-300">セット記録</h3>
        <SetForm onAdd={handleAddSet} />
        {sets.length > 0 && (
          <SetList
            sets={sets}
            onDelete={handleDeleteSet}
            onEdit={handleEditSet}
          />
        )}
      </div>

      <button
        type="submit"
        disabled={sets.length === 0}
        className="w-full flex items-center justify-center px-4 py-3 rounded-xl text-sm font-medium bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <PlusCircle className="w-5 h-5 mr-2" />
        トレーニングを記録
      </button>
    </form>
  );
}
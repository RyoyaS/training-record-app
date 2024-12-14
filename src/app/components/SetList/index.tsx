import React, { useState } from 'react';
import { Pencil, Check, X } from 'lucide-react';
import type { Set } from '@/app/types/workout';

interface SetListProps {
  sets: Set[];
  onDelete: (setId: string) => void;
  onEdit: (setId: string, updatedSet: Omit<Set, 'id'>) => void;
}

export function SetList({ sets, onEdit }: SetListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingValues, setEditingValues] = useState<Omit<Set, 'id'>>({ reps: 0, weight: 0 });

  const handleEdit = (set: Set) => {
    setEditingId(set.id);
    setEditingValues({ reps: set.reps, weight: set.weight });
  };

  const handleSave = (setId: string) => {
    onEdit(setId, editingValues);
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  return (
    <div className="space-y-2">
      {sets.map((set, index) => (
        <div
          key={set.id}
          className="flex items-center space-x-4 p-3 bg-[#333] rounded-xl"
        >
          <span className="text-gray-400 w-8">#{index + 1}</span>

          {editingId === set.id ? (
            <>
              <div className="flex-1">
                <input
                  type="number"
                  value={editingValues.reps}
                  onChange={(e) => setEditingValues({ ...editingValues, reps: Number(e.target.value) })}
                  className="w-20 px-2 py-1 rounded bg-[#444] border border-[#555] text-white focus:outline-none focus:border-blue-500"
                  min="1"
                />
                <span className="ml-1 text-gray-400">回</span>
              </div>
              <div className="flex-1">
                <input
                  type="number"
                  value={editingValues.weight}
                  onChange={(e) => setEditingValues({ ...editingValues, weight: Number(e.target.value) })}
                  className="w-20 px-2 py-1 rounded bg-[#444] border border-[#555] text-white focus:outline-none focus:border-blue-500"
                  min="0"
                  step="0.5"
                />
                <span className="ml-1 text-gray-400">kg</span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleSave(set.id)}
                  className="text-green-500 hover:text-green-400 p-1 rounded-full hover:bg-[#444]"
                >
                  <Check className="w-4 h-4" />
                </button>
                <button
                  onClick={handleCancel}
                  className="text-gray-400 hover:text-gray-300 p-1 rounded-full hover:bg-[#444]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : (
            <>
              <span className="flex-1 text-gray-200">{set.reps}回</span>
              <span className="flex-1 text-gray-200">{set.weight}kg</span>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(set)}
                  className="text-blue-500 hover:text-blue-400 p-1 rounded-full hover:bg-[#444]"
                >
                  <Pencil className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
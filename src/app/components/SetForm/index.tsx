import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import type { Set } from '@/app/types/workout';

interface SetFormProps {
  onAdd: (set: Omit<Set, 'id'>) => void;
}

export function SetForm({ onAdd }: SetFormProps) {
  const [set, setSet] = useState({
    reps: 10,
    weight: 0,
  });

  const handleAdd = () => {
    onAdd(set);
    setSet({ reps: 10, weight: 0 });
  };

  return (
    <div className="flex items-end space-x-4">
      <div>
        <label htmlFor="reps" className="block text-sm font-medium text-gray-300 mb-1">
          回数
        </label>
        <input
          type="number"
          id="reps"
          value={set.reps}
          onChange={(e) => setSet({ ...set, reps: Number(e.target.value) })}
          className="block w-24 rounded-xl bg-[#333] border border-[#444] text-white px-3 py-2 focus:outline-none focus:border-blue-500"
          min="1"
          required
        />
      </div>

      <div>
        <label htmlFor="weight" className="block text-sm font-medium text-gray-300 mb-1">
          重量 (kg)
        </label>
        <input
          type="number"
          id="weight"
          value={set.weight}
          onChange={(e) => setSet({ ...set, weight: Number(e.target.value) })}
          className="block w-24 rounded-xl bg-[#333] border border-[#444] text-white px-3 py-2 focus:outline-none focus:border-blue-500"
          min="0"
          step="0.5"
          required
        />
      </div>

      <button
        type="button"
        onClick={handleAdd}
        className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <Plus className="w-4 h-4 mr-1" />
        セット追加
      </button>
    </div>
  );
}
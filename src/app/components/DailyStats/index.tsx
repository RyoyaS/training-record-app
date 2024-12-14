import React from 'react';
import { Flame, Dumbbell } from 'lucide-react';

interface DailyStatsProps {
  calories: number;
  exercises: number;
}

export function DailyStats({ calories, exercises }: DailyStatsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-gradient-to-br from-orange-500 to-red-600 p-4 rounded-2xl">
        <div className="flex items-center space-x-2 mb-2">
          <Flame className="w-5 h-5" />
          <span className="text-sm font-medium">消費カロリー</span>
        </div>
        <p className="text-2xl font-bold">{calories} kcal</p>
      </div>

      <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-2xl">
        <div className="flex items-center space-x-2 mb-2">
          <Dumbbell className="w-5 h-5" />
          <span className="text-sm font-medium">トレーニング数</span>
        </div>
        <p className="text-2xl font-bold">{exercises}</p>
      </div>
    </div>
  );
}
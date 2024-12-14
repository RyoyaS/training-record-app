'use client'

import React, { useState, useEffect } from 'react';
import { ExerciseForm } from '@/app/components/ExerciseForm';
import { WorkoutList } from '@/app/components/WorkoutList';
import { DailyStats } from '@/app/components/DailyStats';
import { saveWorkoutLog, getWorkoutLogs, deleteExercise, updateSet } from '@/app/utils/storage';
import { getTodayString, formatDate } from '@/app/utils/date';
import type { Exercise, WorkoutLog, Set } from '@/app/types/workout';

export default function Page() {
  const [exercises, setExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    const today = getTodayString();
    const logs = getWorkoutLogs();
    const todayLog = logs.find(log => log.date === today);
    if (todayLog) {
      setExercises(todayLog.exercises);
    }
  }, []);

  const handleAddExercise = (newExercise: Omit<Exercise, 'id' | 'date'>) => {
    const today = getTodayString();
    const exercise: Exercise = {
      ...newExercise,
      id: crypto.randomUUID(),
      date: today,
    };

    setExercises(prev => [...prev, exercise]);

    const workoutLog: WorkoutLog = {
      id: crypto.randomUUID(),
      date: today,
      exercises: [...exercises, exercise],
    };

    saveWorkoutLog(workoutLog);
  };

  const handleDeleteExercise = (id: string) => {
    setExercises(prev => prev.filter(ex => ex.id !== id));
    deleteExercise(id);
  };

  const handleEditSet = (exerciseId: string, setId: string, updatedSet: Omit<Set, 'id'>) => {
    setExercises(prev => prev.map(exercise => {
      if (exercise.id === exerciseId) {
        return {
          ...exercise,
          sets: exercise.sets.map(set =>
            set.id === setId ? { ...updatedSet, id: set.id } : set
          )
        };
      }
      return exercise;
    }));

    updateSet(exerciseId, setId, updatedSet);
  };

  const totalCalories = exercises.reduce((total, exercise) =>
    total + (exercise.sets.length * 15), 0);

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">{formatDate(getTodayString())}</h2>
          </div>

          <DailyStats calories={totalCalories} exercises={exercises.length} />

          <section className="bg-[#2a2a2a] p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4">トレーニングを記録</h2>
            <ExerciseForm onSubmit={handleAddExercise} />
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">今日のトレーニング</h2>
            {exercises.length > 0 ? (
              <WorkoutList
                exercises={exercises}
                onDelete={handleDeleteExercise}
                onEditSet={handleEditSet}
              />
            ) : (
              <div className="bg-[#2a2a2a] p-8 rounded-2xl text-center">
                <p className="text-gray-400">
                  まだトレーニングの記録がありません。新しい記録を追加してください。
                </p>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
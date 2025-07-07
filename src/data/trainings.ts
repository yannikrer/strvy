import type { Uebung } from './uebungen';

export interface Training {
  id: string;
  name: string;
  farbe: string;
  uebungen: Uebung[];
  createdAt: string;
}

const STORAGE_KEY = 'trainings';

export const getTrainings = (): Training[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const addTraining = (training: Omit<Training, 'id' | 'createdAt'>) => {
  const trainings = getTrainings();
  const newTraining: Training = {
    id: Date.now().toString(),
    createdAt: new Date().toISOString().split('T')[0],
    ...training,
  };
  trainings.push(newTraining);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(trainings));
};

export const deleteTraining = (id: string) => {
  const trainings = getTrainings().filter((t) => t.id !== id);
  localStorage.setItem('trainings', JSON.stringify(trainings));
};

export const updateTraining = (updated: Training) => {
  const trainings = getTrainings().map(t =>
    t.id === updated.id ? updated : t
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(trainings));
};

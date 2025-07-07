// src/data/uebungen.ts
export interface Uebung {
  id: string;
  name: string;
  gewicht: string;
  foto?: string;
  createdAt: string;
}

const STORAGE_KEY = 'uebungen';

export const getUebungen = (): Uebung[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const addUebung = (uebung: Omit<Uebung, 'id' | 'createdAt'>) => {
  const uebungen = getUebungen();
  const newUebung: Uebung = {
    id: Date.now().toString(),
    createdAt: new Date().toISOString().split('T')[0],
    ...uebung,
  };
  uebungen.push(newUebung);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(uebungen));
};

export const deleteUebung = (id: string) => {
  const uebungen = getUebungen().filter((u) => u.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(uebungen));
};

export const getUebungById = (id: string): Uebung | undefined => {
  const all = getUebungen();
  return all.find((u) => u.id === id);
};

export const updateUebung = (updated: Uebung) => {
  const all = getUebungen();
  const index = all.findIndex((u) => u.id === updated.id);
  if (index > -1) {
    all[index] = updated;
    localStorage.setItem('uebungen', JSON.stringify(all));
  }
};


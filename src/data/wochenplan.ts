// src/data/wochenplan.t
export interface WochenplanTag {
  tag: string; // "Mo", "Di", ...
  trainingId?: string;
}

export interface Wochenplan {
  kw: number; // Kalenderwoche
  tage: WochenplanTag[];
}

const STORAGE_KEY = 'wochenplaene';

export const getWochenplaene = (): Wochenplan[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const getAktuelleKW = (): number => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const days = Math.floor((now.getTime() - start.getTime()) / (24 * 60 * 60 * 1000));
  return Math.ceil((days + start.getDay() + 1) / 7);
};

export const getWochenplan = (kw: number): Wochenplan => {
  const plaene = getWochenplaene();
  const bestehend = plaene.find(p => p.kw === kw);
  if (bestehend) return bestehend;

  const neuer: Wochenplan = {
    kw,
    tage: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map(tag => ({ tag })),
  };

  plaene.push(neuer);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(plaene));
  return neuer;
};

export const saveWochenplan = (plan: Wochenplan) => {
  const plaene = getWochenplaene().filter(p => p.kw !== plan.kw);
  plaene.push(plan);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(plaene));
};

export interface KalorienEintrag {
  kw: number;
  tage: KalorienEintragDetails[][];
}

export interface KalorienEintragDetails {
  kcal: number;
  titel: string;
  datum: string;
}

const STORAGE_KEY = 'kalorienDaten';

const initialTage = (): KalorienEintragDetails[][] => Array.from({ length: 7 }, () => []);

export const getAktuelleKW = (): number => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const days = Math.floor((now.getTime() - start.getTime()) / (24 * 60 * 60 * 1000));
  return Math.ceil((days + start.getDay() + 1) / 7);
};

export const getAlleKalorienEintraege = (): KalorienEintrag[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  try {
    const parsed = JSON.parse(data || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const saveAlleKalorienEintraege = (daten: KalorienEintrag[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(daten));
};

export const getKalorienWoche = (kw: number): KalorienEintragDetails[][] => {
  const daten = getAlleKalorienEintraege();
  let eintrag = daten.find(e => e.kw === kw);
  if (!eintrag) {
    eintrag = { kw, tage: initialTage() };
    daten.push(eintrag);
    saveAlleKalorienEintraege(daten);
  }
  while (eintrag.tage.length < 7) {
    eintrag.tage.push([]);
  }
  return eintrag.tage;
};

export const addKalorienEintrag = (
  kw: number,
  tagIndex: number,
  kcal: number,
  titel: string
) => {
  const daten = getAlleKalorienEintraege();
  let eintrag = daten.find(e => e.kw === kw);
  if (!eintrag) {
    eintrag = { kw, tage: initialTage() };
    daten.push(eintrag);
  }
  eintrag.tage[tagIndex].push({
    kcal,
    titel,
    datum: new Date().toISOString()
  });
  saveAlleKalorienEintraege(daten);
};

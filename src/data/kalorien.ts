const STORAGE_KEY = 'kalorienDaten';

export interface KalorienEintrag {
  kw: number;
  tage: number[][]; // z.B. [[120, 150], [], [400], [], [], [], []]
}

const initialTage = (): number[][] => Array.from({ length: 7 }, () => []);

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

export const getKalorienWoche = (kw: number): number[] => {
  const daten = getAlleKalorienEintraege();
  let eintrag = daten.find(e => e.kw === kw);

  if (!eintrag) {
    eintrag = { kw, tage: initialTage() };
    daten.push(eintrag);
    saveAlleKalorienEintraege(daten);
  }

  // Rückwärtskompatibilität: Wenn tage = number[]
  if (
    Array.isArray(eintrag.tage) &&
    eintrag.tage.length > 0 &&
    eintrag.tage.every(t => typeof t === 'number')
  ) {
    const alteTage = eintrag.tage as unknown as number[];
    eintrag.tage = alteTage.map(kcal => [kcal]);
    saveAlleKalorienEintraege(daten);
  }

  // Sicherstellen, dass es 7 Tage sind
  while (eintrag.tage.length < 7) {
    eintrag.tage.push([]);
  }

  return eintrag.tage.map(tagEintraege =>
    Array.isArray(tagEintraege)
      ? tagEintraege.reduce((sum, kcal) => sum + kcal, 0)
      : 0
  );
};

export const addKalorienEintrag = (kw: number, tagIndex: number, kcal: number) => {
  const daten = getAlleKalorienEintraege();
  let eintrag = daten.find(e => e.kw === kw);

  if (!eintrag) {
    eintrag = { kw, tage: initialTage() };
    daten.push(eintrag);
  }

  // Sicherstellen, dass es ein Array ist
  if (!Array.isArray(eintrag.tage[tagIndex])) {
    eintrag.tage[tagIndex] = [];
  }

  eintrag.tage[tagIndex].push(kcal);
  saveAlleKalorienEintraege(daten);
};

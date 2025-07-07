const STORAGE_KEY = 'training-checks';

export interface CheckStatus {
  [trainingId: string]: boolean[];
}

export const getChecks = (): CheckStatus => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : {};
};

export const saveChecks = (checks: CheckStatus) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(checks));
};

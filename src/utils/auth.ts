// src/utils/auth.ts
import { USERS } from './users';

export const login = (email: string, password: string): boolean => {
  const user = USERS.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
  if (user) {
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('currentUser', JSON.stringify(user));
    return true;
  }
  return false;
};

export const isLoggedIn = (): boolean => {
  return localStorage.getItem('loggedIn') === 'true';
};

export const logout = () => {
  localStorage.removeItem('loggedIn');
  localStorage.removeItem('currentUser');
};

export const getCurrentUser = () => {
  const json = localStorage.getItem('currentUser');
  return json ? JSON.parse(json) : null;
};

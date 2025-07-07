// src/utils/auth.ts

import { USERS } from '../data/users';

export const login = (email: string, password: string): boolean => {
  const user = USERS.find(
    (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
  );
  if (user) {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    window.dispatchEvent(new Event('authChanged')); // neu
    return true;
  }
  return false;
};

export const logout = () => {
  localStorage.removeItem('loggedInUser');
  window.dispatchEvent(new Event('authChanged')); // neu
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('loggedInUser');
  return user ? JSON.parse(user) : null;
};

export const isLoggedIn = (): boolean => !!localStorage.getItem('loggedInUser');

import { store } from '../store';

export const getUsers = () => {
  const users = store.getUsers();
  return JSON.stringify(users);
};

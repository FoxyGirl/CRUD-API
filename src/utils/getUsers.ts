import http from 'http';

import { store } from '../store';

export const getUsers = (res: http.ServerResponse) => {
  const users = store.getUsers();
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(users));
  return;
};

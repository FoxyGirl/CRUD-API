import http from 'http';

import { store } from '../store';

export const getUserById = (id: string, res: http.ServerResponse) => {
  const user = store.getUser(id);

  if (!id) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Server error: user id is required' }));
    return;
  }

  if (user) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(user));
  } else {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Server error: user is not found' }));
  }
};

import http from 'http';

import { store } from '../store';
import { contentType } from '../constants';
import { Status } from '../types';

export const getUserById = (id: string, res: http.ServerResponse) => {
  const user = store.getUser(id);

  if (!id) {
    res.writeHead(Status.ERROR, contentType);
    res.end(JSON.stringify({ message: 'Server error: user id is required' }));
    return;
  }

  if (user) {
    res.writeHead(Status.OK, contentType);
    res.end(JSON.stringify(user));
  } else {
    res.writeHead(Status.ERROR, contentType);
    res.end(JSON.stringify({ message: 'Server error: user is not found' }));
  }
};

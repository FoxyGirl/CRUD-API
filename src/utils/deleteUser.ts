import http from 'http';

import { store } from '../store';
import { contentType } from '../constants';
import { Status } from '../types';

export const deleteUser = (id: string, res: http.ServerResponse) => {
  if (!id) {
    res.writeHead(Status.INVALID, contentType);
    res.end(JSON.stringify({ message: 'Server error: a proper user id is required' }));
    return;
  }

  const hasUser = store.hasUser(id);

  if (hasUser) {
    store.deleteUser(id);
    res.writeHead(Status.OK_DELETE, contentType);
    res.end(JSON.stringify({ message: 'User has been deleted' }));
  } else {
    res.writeHead(Status.NOT_FOUND, contentType);
    res.end(JSON.stringify({ message: 'Server error: user is not found' }));
  }
};

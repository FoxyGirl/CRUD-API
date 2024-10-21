import http from 'http';

import { store } from '../store';
import { contentType } from '../constants';
import { Status } from '../types';

export const getUsers = (res: http.ServerResponse) => {
  const users = store.getUsers();
  res.writeHead(Status.OK, contentType);
  res.end(JSON.stringify(users));
  return;
};

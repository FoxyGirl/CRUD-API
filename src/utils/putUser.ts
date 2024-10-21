import { IncomingMessage, ServerResponse } from 'http';

import { store } from '../store';
import { contentType } from '../constants';
import { Status, User, ErrorType } from '../types';
import { validateUser } from './validateUser';

export const putUser = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    let newUser = '';
    req.setEncoding('utf-8');

    req.on('error', (err) => err);
    req.on('data', (chunk) => {
      newUser += chunk;
    });
    req.on('end', () => {
      const parsedUser = JSON.parse(newUser);

      const { id } = parsedUser as User;
      const hasUser = store.hasUser(id);

      if (!hasUser) {
        res.writeHead(Status.NOT_FOUND, contentType);
        res.end(JSON.stringify({ message: `Server error: user is not found` }));
        return;
      }

      const { isValid, message } = validateUser(parsedUser);

      if (isValid) {
        store.updateUser(parsedUser);
        res.writeHead(Status.OK, contentType);
        res.end(JSON.stringify(parsedUser));
      } else {
        res.writeHead(Status.INVALID, contentType);
        res.end(JSON.stringify({ message: `Bad request: ${message}` }));
      }
    });
  } catch (err) {
    res.writeHead(Status.ERROR, contentType);
    res.end(JSON.stringify({ message: `Server error: ${(err as ErrorType).message}` }));
    return;
  }
};

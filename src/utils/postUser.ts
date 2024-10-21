import { IncomingMessage, ServerResponse } from 'http';

import { v4 as uuidv4 } from 'uuid';

import { store } from '../store';
import { contentType } from '../constants';
import { Status, User, ErrorType } from '../types';
import { validateUser } from './validateUser';

export const postUser = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    let newUser = '';
    req.setEncoding('utf-8');

    req.on('error', (err) => err);
    req.on('data', (chunk) => {
      newUser += chunk;
    });
    req.on('end', () => {
      const parsedUser = JSON.parse(newUser);

      const { isValid, message } = validateUser(parsedUser, false);

      if (isValid) {
        const normalizedUser: User = {
          ...parsedUser,
          id: uuidv4(),
        };

        store.addUser(normalizedUser);
        res.writeHead(Status.OK_POST, contentType);
        res.end(JSON.stringify(normalizedUser));
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

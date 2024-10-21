import { IncomingMessage, ServerResponse } from 'http';

import { v4 as uuidv4 } from 'uuid';

import { store } from '../store';
import { contentType } from '../constants';
import { Status, User, ErrorType } from '../types';
import { isString, isNumber, isArray } from './common';

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

      const { username, age, hobbies } = parsedUser as Omit<User, 'id'>;

      const isValidName = !!username && isString(username);
      const isValidAge = !!age && isNumber(age);
      const isValidHobbies = isArray(hobbies) && hobbies.every(isString);

      const isValidUser = isValidName && isValidAge && isValidHobbies;

      if (isValidUser) {
        const normalizedUser: User = {
          ...parsedUser,
          id: uuidv4(),
        };

        store.addUser(normalizedUser);
        res.writeHead(Status.OK_POST, contentType);
        res.end(JSON.stringify(normalizedUser));
      } else {
        res.writeHead(Status.INVALID, contentType);
        // TODO: refactor error message
        res.end(JSON.stringify({ message: 'Server error: wrong body' }));
      }
    });
  } catch (err) {
    res.writeHead(Status.ERROR, contentType);
    res.end(JSON.stringify({ message: `Server error: ${(err as ErrorType).message}` }));
    return;
  }
};

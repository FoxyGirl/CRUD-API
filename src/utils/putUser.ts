import { IncomingMessage, ServerResponse } from 'http';

import { validate } from 'uuid';

import { store } from '../store';
import { contentType } from '../constants';
import { Status, User, ErrorType } from '../types';
import { isString, isNumber, isArray } from './common';

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

      const { id, username, age, hobbies } = parsedUser as User;

      const isValidName = !!username && isString(username);
      const isValidAge = !!age && isNumber(age);
      const isValidHobbies = isArray(hobbies) && hobbies.every(isString);
      const isValidId = validate(id);

      const hasUser = store.hasUser(id);

      if (!hasUser) {
        res.writeHead(Status.NOT_FOUND, contentType);
        res.end(JSON.stringify({ message: `Server error: user is not found` }));
        return;
      }

      // TODO: refactor
      const getWrongBodyMessage = () => {
        let message = 'wrong body: ';
        if (!isValidId) {
          message += `id has to be an uuid`;
        }
        if (!isValidName) {
          message += `username has to be not an empty string; `;
        }
        if (!isValidAge) {
          message += 'age has to a be number; ';
        }
        if (!isValidHobbies) {
          message += `hobbies has to be an array of strings`;
        }
        return message;
      };

      const isValidUser = isValidName && isValidAge && isValidHobbies && isValidId;

      if (isValidUser) {
        store.updateUser(parsedUser);
        res.writeHead(Status.OK, contentType);
        res.end(JSON.stringify(parsedUser));
      } else {
        res.writeHead(Status.INVALID, contentType);
        res.end(JSON.stringify({ message: `Bad request: ${getWrongBodyMessage()}` }));
      }
    });
  } catch (err) {
    res.writeHead(Status.ERROR, contentType);
    res.end(JSON.stringify({ message: `Server error: ${(err as ErrorType).message}` }));
    return;
  }
};

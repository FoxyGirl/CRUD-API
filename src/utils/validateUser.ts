import { validate } from 'uuid';

import { User } from '../types';
import { isString, isNumber, isArray } from './common';

type CheckedUser = Omit<User, 'id'> & { id?: string };

export const validateUser = (checkedUser: CheckedUser, hasId = true) => {
  const { id = '', username, age, hobbies } = checkedUser;

  const isValidName = !!username && isString(username);
  const isValidAge = !!age && isNumber(age);
  const isValidHobbies = isArray(hobbies) && hobbies.every(isString);
  const isValidId = hasId ? validate(id) : true;

  const isValidUser = isValidName && isValidAge && isValidHobbies && isValidId;

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

  return { isValid: isValidUser, message: isValidUser ? '' : message };
};

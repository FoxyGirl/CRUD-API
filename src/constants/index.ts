import { User } from '../types';

export const basePath = 'api';

export const endpoint = 'users';

export const testUser: User = {
  id: '01',
  username: 'Jhon',
  age: 25,
  hobbies: ['nodej'],
};

export const contentType = { 'Content-Type': 'application/json' };

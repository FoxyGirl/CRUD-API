import { User } from '../types';
import { testUser } from '../constants';

class UsersStore {
  _users: User[];

  constructor() {
    this._users = [testUser];
  }

  getUsers() {
    return this._users;
  }
}

export const store = new UsersStore();

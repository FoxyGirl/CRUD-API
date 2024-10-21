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

  getUser(id: string) {
    const user = this._users.find((item) => item.id === id);
    return user;
  }
}

export const store = new UsersStore();

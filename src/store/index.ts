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

  deleteUser(id: string) {
    this._users = this._users.filter((item) => item.id !== id);
    return;
  }

  addUser(newUser: User) {
    this._users.push(newUser);
  }

  updateUser(updatedUser: User) {
    this._users = this._users.map((item) => (item.id === updatedUser.id ? updatedUser : item));
  }

  hasUser(id: string) {
    return this._users.some((item) => item.id === id);
  }
}

export const store = new UsersStore();

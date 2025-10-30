import { Injectable } from '@nestjs/common';

const USERS = [
  {
    id: 'user-admin-001',
    username: 'admin',
    fullName: 'Admin WMS',
    roles: ['admin'],
    email: 'admin@example.com',
    department: 'Manufacturing IT',
    language: 'TH',
  },
  {
    id: 'user-operator-001',
    username: 'operator',
    fullName: 'Warehouse Operator',
    roles: ['operator'],
    email: 'operator@example.com',
    department: 'Warehouse',
    language: 'EN',
  },
];

@Injectable()
export class UsersService {
  getUsers() {
    return USERS;
  }

  getProfile(username: string) {
    return USERS.find((user) => user.username === username) ?? USERS[0];
  }
}

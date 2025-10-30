import { Injectable, UnauthorizedException } from '@nestjs/common';
import { calculateRowHash } from '../../shared/utils/hash.util';
import { SAMPLE_PARTS } from '../../shared/data/sample-parts';

const USERS = [
  {
    id: 'user-admin-001',
    username: 'admin',
    password: 'Admin@123',
    fullName: 'Admin WMS',
    roles: ['admin'],
    permissions: ['inventory:read', 'inventory:write', 'alerts:manage'],
    language: 'TH',
  },
  {
    id: 'user-operator-001',
    username: 'operator',
    password: 'Operator@123',
    fullName: 'Warehouse Operator',
    roles: ['operator'],
    permissions: ['inventory:read', 'operations:execute'],
    language: 'EN',
  },
];

@Injectable()
export class AuthService {
  login(username: string, password: string) {
    const user = USERS.find((candidate) => candidate.username === username);

    if (!user || user.password !== password) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const tokenPayload = {
      sub: user.id,
      username: user.username,
      roles: user.roles,
      permissions: user.permissions,
    };

    return {
      accessToken: calculateRowHash([user.id, user.username, Date.now()]),
      user: {
        id: user.id,
        username: user.username,
        fullName: user.fullName,
        roles: user.roles,
        permissions: user.permissions,
        preferredLanguage: user.language,
      },
      session: {
        issuedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 8).toISOString(),
        checksum: calculateRowHash([
          tokenPayload.sub,
          tokenPayload.username,
          tokenPayload.roles.join(','),
          SAMPLE_PARTS.length,
        ]),
      },
    };
  }
}

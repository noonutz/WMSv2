import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  getWelcomeMessage() {
    return {
      name: 'WMS - Smart Factory API',
      version: this.configService.get('npm_package_version', '1.0.0'),
      environment: this.configService.get('NODE_ENV', 'development'),
      timestamp: new Date().toISOString(),
      modules: {
        auth: '/auth/login',
        users: '/users',
        layout: '/layout/overview',
        inventory: '/inventory/summary',
        imports: '/imports/logs',
        alerts: '/alerts',
        operations: '/operations/inbound',
      },
      documentation: '/api/docs',
    };
  }
}

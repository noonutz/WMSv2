import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './health.controller';
import { AuthModule } from '../modules/auth/auth.module';
import { UsersModule } from '../modules/users/users.module';
import { LayoutModule } from '../modules/layout/layout.module';
import { InventoryModule } from '../modules/inventory/inventory.module';
import { AlertsModule } from '../modules/alerts/alerts.module';
import { ImportsModule } from '../modules/imports/imports.module';
import { OperationsModule } from '../modules/operations/operations.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
    UsersModule,
    LayoutModule,
    InventoryModule,
    AlertsModule,
    ImportsModule,
    OperationsModule,
  ],
  controllers: [AppController, HealthController],
  providers: [
    AppService,
  ],
})
export class AppModule {}

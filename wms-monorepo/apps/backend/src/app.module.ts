import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { PrismaModule } from './common/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PartsModule } from './modules/parts/parts.module';
import { LayoutModule } from './modules/layout/layout.module';
import { ImportModule } from './modules/import/import.module';
import { AlertsModule } from './modules/alerts/alerts.module';
import { AuditModule } from './modules/audit/audit.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    PrismaModule,
    AuthModule,
    UsersModule,
    PartsModule,
    LayoutModule,
    ImportModule,
    AlertsModule,
    AuditModule
  ]
})
export class AppModule {}

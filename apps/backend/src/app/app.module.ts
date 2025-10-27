import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrismaModule } from '../shared/prisma/prisma.module';
import { AuthModule } from '../modules/auth/auth.module';
import { UserModule } from '../modules/user/user.module';
import { ZoneModule } from '../modules/zone/zone.module';
import { RackModule } from '../modules/rack/rack.module';
import { BinModule } from '../modules/bin/bin.module';
import { PartModule } from '../modules/part/part.module';
import { InventoryModule } from '../modules/inventory/inventory.module';
import { InboundModule } from '../modules/inbound/inbound.module';
import { OutboundModule } from '../modules/outbound/outbound.module';
import { ImportModule } from '../modules/import/import.module';
import { AlertModule } from '../modules/alert/alert.module';
import { AuditModule } from '../modules/audit/audit.module';
import { SharedModule } from '../shared/shared.module';
import { ScheduleModule } from '@nestjs/schedule';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { APP_FILTER, APP_INTERCEPTOR, APP_GUARD } from '@nestjs/core';
import { AllExceptionsFilter } from '../common/filters/exception.filter';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';
import { TimeoutInterceptor } from '../common/interceptors/timeout.interceptor';
import { AuthGuard } from '../common/guards/auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { ThrottlerModule } from '@nestjs/throttler';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisClientOptions } from 'ioredis';
import { redisStore } from 'cache-manager-ioredis-yet';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    CacheModule.register<RedisClientOptions>({
      isGlobal: true,
      store: redisStore,
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT) || 6379,
      password: process.env.REDIS_PASSWORD,
      ttl: parseInt(process.env.REDIS_TTL) || 300,
    }),
    ThrottlerModule.forRoot([{
      name: 'short',
      ttl: 60000,
      limit: 100,
    }]),
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
    PrismaModule,
    AuthModule,
    UserModule,
    ZoneModule,
    RackModule,
    BinModule,
    PartModule,
    InventoryModule,
    InboundModule,
    OutboundModule,
    ImportModule,
    AlertModule,
    AuditModule,
    SharedModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { AlertsController } from './alerts.controller';
import { PartsModule } from '../parts/parts.module';

@Module({
  imports: [PartsModule],
  providers: [AlertsService],
  controllers: [AlertsController]
})
export class AlertsModule {}

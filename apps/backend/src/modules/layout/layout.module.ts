import { Module } from '@nestjs/common';
import { LayoutController } from './layout.controller';
import { LayoutService } from './layout.service';
import { FactoryConfigService } from '../../shared/config/factory-config.service';

@Module({
  controllers: [LayoutController],
  providers: [LayoutService, FactoryConfigService],
})
export class LayoutModule {}

import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { LayoutService, ZoneViewModel } from './layout.service';

@ApiTags('layout')
@Controller('layout')
export class LayoutController {
  constructor(private readonly layoutService: LayoutService) {}

  @Get('overview')
  @ApiOperation({ summary: 'Overview of zone utilization and alert counts' })
  overview() {
    return this.layoutService.getOverview();
  }

  @Get('zone/:zoneId')
  @ApiOperation({ summary: 'Retrieve racks and bins for a zone' })
  @ApiParam({ name: 'zoneId', example: 'A' })
  @ApiOkResponse({ description: 'Zone detail with racks and bin status' })
  findZone(@Param('zoneId') zoneId: string): ZoneViewModel {
    return this.layoutService.getZone(zoneId);
  }
}

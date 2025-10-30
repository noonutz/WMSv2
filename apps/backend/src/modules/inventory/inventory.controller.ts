import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { InventoryService } from './inventory.service';

@ApiTags('inventory')
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get('summary')
  @ApiOperation({ summary: 'Retrieve high level inventory KPIs' })
  summary() {
    return this.inventoryService.getSummary();
  }

  @Get('parts')
  @ApiOperation({ summary: 'List parts with min/max thresholds and status' })
  parts() {
    return this.inventoryService.getParts();
  }
}

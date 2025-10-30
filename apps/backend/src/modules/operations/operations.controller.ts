import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { OperationsService } from './operations.service';
import { InboundDto } from './dto/inbound.dto';
import { OutboundDto } from './dto/outbound.dto';

@ApiTags('operations')
@Controller('operations')
export class OperationsController {
  constructor(private readonly operationsService: OperationsService) {}

  @Get('inbound')
  @ApiOperation({ summary: 'List recent inbound receipts' })
  inboundList() {
    return this.operationsService.listInbound();
  }

  @Get('outbound')
  @ApiOperation({ summary: 'List outbound shipments and allocations' })
  outboundList() {
    return this.operationsService.listOutbound();
  }

  @Post('inbound')
  @ApiOperation({ summary: 'Register inbound receipt with validation' })
  registerInbound(@Body() payload: InboundDto) {
    return this.operationsService.registerInbound(payload);
  }

  @Post('outbound')
  @ApiOperation({ summary: 'Register outbound allocation with stock check' })
  registerOutbound(@Body() payload: OutboundDto) {
    return this.operationsService.registerOutbound(payload);
  }
}

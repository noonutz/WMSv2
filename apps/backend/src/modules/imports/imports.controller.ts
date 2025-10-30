import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ImportsService } from './imports.service';
import { PreviewImportDto } from './dto/preview-import.dto';

@ApiTags('imports')
@Controller('imports')
export class ImportsController {
  constructor(private readonly importsService: ImportsService) {}

  @Get('logs')
  @ApiOperation({ summary: 'List historical import executions with row-hash checksum' })
  logs() {
    return this.importsService.getLogs();
  }

  @Post('preview')
  @ApiOperation({ summary: 'Validate payload and return deduplicated preview with checksum' })
  preview(@Body() payload: PreviewImportDto) {
    return this.importsService.previewImport(payload);
  }
}

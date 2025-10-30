import { Controller, Get } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';

@ApiTags('health')
@Controller('health')
export class HealthController {
  @Get()
  @ApiExcludeEndpoint()
  check() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      services: {
        database: 'mocked',
        redis: 'mocked',
        rabbitmq: 'mocked',
      },
    };
  }
}

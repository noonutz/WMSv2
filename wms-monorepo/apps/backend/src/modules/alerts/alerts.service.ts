import { Injectable } from '@nestjs/common';
import { PartsService } from '../parts/parts.service';
import { getThresholdStatus } from '@wms/shared';

export interface AlertDto {
  partId: string;
  message: string;
  severity: 'info' | 'warning' | 'critical';
  occurredAt: string;
}

@Injectable()
export class AlertsService {
  constructor(private readonly partsService: PartsService) {}

  listAlerts(): AlertDto[] {
    return this.partsService.findAll().flatMap((part) => {
      const status = getThresholdStatus(part.currentQty, {
        min: part.minQty,
        max: part.maxQty
      });
      if (status === 'ok') {
        return [];
      }
      return [
        {
          partId: part.id,
          message:
            status === 'low'
              ? `${part.description} below minimum threshold`
              : `${part.description} exceeds max capacity`,
          severity: status === 'low' ? 'critical' : 'warning',
          occurredAt: new Date().toISOString()
        }
      ];
    });
  }
}

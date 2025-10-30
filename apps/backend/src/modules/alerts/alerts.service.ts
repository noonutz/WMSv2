import { Injectable } from '@nestjs/common';
import { SAMPLE_PARTS } from '../../shared/data/sample-parts';

@Injectable()
export class AlertsService {
  getAlerts() {
    return SAMPLE_PARTS.flatMap((part) => {
      const alerts = [] as {
        id: string;
        type: 'MIN' | 'MAX';
        severity: 'CRITICAL' | 'WARNING';
        message: string;
        partNumber: string;
        currentStock: number;
        threshold: number;
        location: string;
        acknowledged: boolean;
      }[];

      if (part.currentStock < part.minStock) {
        alerts.push({
          id: `alert-min-${part.partNumber}`,
          type: 'MIN',
          severity: part.currentStock === 0 ? 'CRITICAL' : 'WARNING',
          message: `${part.partNumber} below minimum threshold`,
          partNumber: part.partNumber,
          currentStock: part.currentStock,
          threshold: part.minStock,
          location: `${part.location.zone}-${part.location.rack}-${part.location.bin}`,
          acknowledged: part.currentStock >= part.reorderPoint,
        });
      }

      if (part.currentStock > part.maxStock) {
        alerts.push({
          id: `alert-max-${part.partNumber}`,
          type: 'MAX',
          severity: 'WARNING',
          message: `${part.partNumber} above maximum threshold`,
          partNumber: part.partNumber,
          currentStock: part.currentStock,
          threshold: part.maxStock,
          location: `${part.location.zone}-${part.location.rack}-${part.location.bin}`,
          acknowledged: part.currentStock - part.maxStock < 25,
        });
      }

      return alerts;
    });
  }
}

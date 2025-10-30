import { Injectable } from '@nestjs/common';
import { FactoryConfigService } from '../../shared/config/factory-config.service';
import { SAMPLE_PARTS } from '../../shared/data/sample-parts';

interface BinViewModel {
  name: string;
  locationCode: string;
  barcode: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  status: 'BELOW_MIN' | 'NORMAL' | 'ABOVE_MAX';
}

interface RackViewModel {
  name: string;
  verticalRow: number;
  horizontalRow: number;
  capacity: number;
  currentStock: number;
  bins: BinViewModel[];
}

export interface ZoneViewModel {
  zone: string;
  capacity: number;
  currentStock: number;
  utilization: number;
  temperatureZone: string;
  racks: RackViewModel[];
}

@Injectable()
export class LayoutService {
  constructor(private readonly factoryConfigService: FactoryConfigService) {}

  getOverview() {
    const { warehouse } = this.factoryConfigService.getConfig();

    return warehouse.zones.map((zoneName) => {
      const partsForZone = SAMPLE_PARTS.filter((part) => part.location.zone === zoneName);
      const currentStock = partsForZone.reduce((sum, part) => sum + part.currentStock, 0);
      const capacity = partsForZone.reduce((sum, part) => sum + part.maxStock, 0) || warehouse.defaultMaxStock;

      return {
        zone: zoneName,
        racks: Math.min(warehouse.verticalRows, 8),
        bins: Math.min(warehouse.horizontalRows, 12),
        capacity,
        currentStock,
        utilization: capacity === 0 ? 0 : Math.round((currentStock / capacity) * 100),
        criticalAlerts: partsForZone.filter((part) => part.currentStock < part.minStock).length,
      };
    });
  }

  getZone(zone: string): ZoneViewModel {
    const normalized = zone.toUpperCase();
    const { warehouse } = this.factoryConfigService.getConfig();
    const maxVertical = Math.min(warehouse.verticalRows, 5);
    const maxHorizontal = Math.min(warehouse.horizontalRows, 6);

    const racks: RackViewModel[] = [];
    for (let v = 1; v <= maxVertical; v += 1) {
      for (let h = 1; h <= maxHorizontal; h += 1) {
        const rackName = `${normalized}-${String(v).padStart(2, '0')}`;
        const binName = `${rackName}-${String(h).padStart(2, '0')}`;
        const part = SAMPLE_PARTS.find((item) => item.location.zone === normalized && item.location.bin === binName);

        const bins: BinViewModel[] = [
          {
            name: binName,
            locationCode: binName,
            barcode: part?.barcode ?? `${binName}-NO-BARCODE`,
            currentStock: part?.currentStock ?? 0,
            minStock: part?.minStock ?? warehouse.defaultMinStock,
            maxStock: part?.maxStock ?? warehouse.defaultMaxStock,
            status: this.resolveStatus(part?.currentStock ?? 0, part?.minStock ?? warehouse.defaultMinStock, part?.maxStock ?? warehouse.defaultMaxStock),
          },
        ];

        racks.push({
          name: rackName,
          verticalRow: v,
          horizontalRow: h,
          capacity: bins.reduce((sum, bin) => sum + bin.maxStock, 0),
          currentStock: bins.reduce((sum, bin) => sum + bin.currentStock, 0),
          bins,
        });
      }
    }

    const currentStock = racks.reduce((sum, rack) => sum + rack.currentStock, 0);
    const capacity = racks.reduce((sum, rack) => sum + rack.capacity, 0);

    return {
      zone: normalized,
      capacity,
      currentStock,
      utilization: capacity === 0 ? 0 : Math.round((currentStock / capacity) * 100),
      temperatureZone: 'AMBIENT',
      racks,
    };
  }

  private resolveStatus(current: number, min: number, max: number): BinViewModel['status'] {
    if (current < min) {
      return 'BELOW_MIN';
    }
    if (current > max) {
      return 'ABOVE_MAX';
    }
    return 'NORMAL';
  }
}

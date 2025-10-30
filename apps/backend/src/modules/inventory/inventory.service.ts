import { Injectable } from '@nestjs/common';
import { SAMPLE_PARTS } from '../../shared/data/sample-parts';

@Injectable()
export class InventoryService {
  getSummary() {
    const totalParts = SAMPLE_PARTS.length;
    const totalStock = SAMPLE_PARTS.reduce((sum, part) => sum + part.currentStock, 0);
    const belowMin = SAMPLE_PARTS.filter((part) => part.currentStock < part.minStock).length;
    const aboveMax = SAMPLE_PARTS.filter((part) => part.currentStock > part.maxStock).length;

    return {
      totalParts,
      totalStock,
      belowMin,
      aboveMax,
      healthScore: Math.max(0, 100 - belowMin * 10 - aboveMax * 5),
    };
  }

  getParts() {
    return SAMPLE_PARTS.map((part) => ({
      partNumber: part.partNumber,
      description: part.description,
      unit: part.unit,
      category: part.category,
      minStock: part.minStock,
      maxStock: part.maxStock,
      currentStock: part.currentStock,
      reorderPoint: part.reorderPoint,
      status: this.resolveStatus(part.currentStock, part.minStock, part.maxStock),
      location: part.location,
      supplier: part.supplier,
    }));
  }

  private resolveStatus(current: number, min: number, max: number) {
    if (current < min) {
      return 'BELOW_MIN';
    }
    if (current > max) {
      return 'ABOVE_MAX';
    }
    return 'NORMAL';
  }
}

import { Injectable } from '@nestjs/common';
import { calculateRowHash } from '../../shared/utils/hash.util';
import { SAMPLE_IMPORT_LOGS } from '../../shared/data/sample-imports';
import { PreviewImportDto } from './dto/preview-import.dto';

@Injectable()
export class ImportsService {
  getLogs() {
    return SAMPLE_IMPORT_LOGS;
  }

  previewImport(payload: PreviewImportDto) {
    const duplicates = new Set<string>();
    const seen = new Set<string>();

    payload.records.forEach((record) => {
      const key = `${record.partNumber}`.toUpperCase();
      if (seen.has(key)) {
        duplicates.add(key);
      }
      seen.add(key);
    });

    const rows = payload.records.map((record, index) => {
      const rowHash = calculateRowHash([
        record.partNumber,
        record.description,
        record.category,
        record.minStock,
        record.maxStock,
        record.currentStock,
      ]);

      return {
        index,
        rowHash,
        duplicate: duplicates.has(record.partNumber.toUpperCase()),
        record,
      };
    });

    return {
      mapping: payload.mapping,
      totalRows: payload.records.length,
      duplicates: duplicates.size,
      previewRows: rows,
      checksum: calculateRowHash(rows.map((row) => row.rowHash)),
    };
  }
}

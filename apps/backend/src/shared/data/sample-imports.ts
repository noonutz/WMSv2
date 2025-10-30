import { createHash } from 'crypto';
import { SAMPLE_PARTS } from './sample-parts';

export interface ImportLogRecord {
  id: string;
  filename: string;
  totalRows: number;
  processedRows: number;
  duplicates: number;
  status: 'COMPLETED' | 'FAILED' | 'IN_PROGRESS';
  importedAt: string;
  initiatedBy: string;
  rowHash: string;
}

const computeRowHash = () => {
  const hash = createHash('sha256');
  SAMPLE_PARTS.forEach((part) => {
    hash.update(
      [
        part.partNumber,
        part.description,
        part.category,
        part.unit,
        part.minStock,
        part.maxStock,
        part.currentStock,
      ].join('|'),
    );
  });
  return hash.digest('hex');
};

export const SAMPLE_IMPORT_LOGS: ImportLogRecord[] = [
  {
    id: 'imp_001',
    filename: 'parts_master_2024-06-01.xlsx',
    totalRows: 250,
    processedRows: 248,
    duplicates: 2,
    status: 'COMPLETED',
    importedAt: '2024-06-01T08:15:00Z',
    initiatedBy: 'somsak.s',
    rowHash: computeRowHash(),
  },
  {
    id: 'imp_002',
    filename: 'safety_stock_adjustment.csv',
    totalRows: 80,
    processedRows: 80,
    duplicates: 0,
    status: 'COMPLETED',
    importedAt: '2024-06-10T13:45:00Z',
    initiatedBy: 'ananya.k',
    rowHash: computeRowHash(),
  },
];

export interface SamplePartRecord {
  partNumber: string;
  description: string;
  category: string;
  unit: string;
  minStock: number;
  maxStock: number;
  currentStock: number;
  reorderPoint: number;
  location: {
    zone: string;
    rack: string;
    bin: string;
  };
  barcode: string;
  supplier: string;
}

export const SAMPLE_PARTS: SamplePartRecord[] = [
  {
    partNumber: 'P001-MOTOR',
    description: 'Electric Motor 1.5HP',
    category: 'Electrical',
    unit: 'PCS',
    minStock: 50,
    maxStock: 200,
    currentStock: 120,
    reorderPoint: 80,
    location: { zone: 'A', rack: 'A-01', bin: 'A-01-01' },
    barcode: 'MOTOR15HP',
    supplier: 'ACME Motors',
  },
  {
    partNumber: 'P002-BEARING',
    description: 'Ball Bearing 6205',
    category: 'Mechanical',
    unit: 'PCS',
    minStock: 100,
    maxStock: 500,
    currentStock: 90,
    reorderPoint: 140,
    location: { zone: 'A', rack: 'A-01', bin: 'A-01-02' },
    barcode: 'BEARING6205',
    supplier: 'Precision Bearings Ltd.',
  },
  {
    partNumber: 'P003-CABLE',
    description: 'Power Cable 3x2.5mm',
    category: 'Electrical',
    unit: 'M',
    minStock: 200,
    maxStock: 1000,
    currentStock: 220,
    reorderPoint: 260,
    location: { zone: 'A', rack: 'A-02', bin: 'A-02-01' },
    barcode: 'CABLE3X25',
    supplier: 'Industrial Cabling Co.',
  },
  {
    partNumber: 'P004-SENSOR',
    description: 'Temperature Sensor PT100',
    category: 'Electronics',
    unit: 'PCS',
    minStock: 25,
    maxStock: 150,
    currentStock: 18,
    reorderPoint: 40,
    location: { zone: 'B', rack: 'B-03', bin: 'B-03-02' },
    barcode: 'TEMPPT100',
    supplier: 'Precision Sensors',
  },
  {
    partNumber: 'P005-FILTER',
    description: 'Hydraulic Filter HF-200',
    category: 'Hydraulics',
    unit: 'PCS',
    minStock: 60,
    maxStock: 240,
    currentStock: 300,
    reorderPoint: 120,
    location: { zone: 'C', rack: 'C-05', bin: 'C-05-01' },
    barcode: 'HF200FILTER',
    supplier: 'FluidTech Supplies',
  },
];

export interface InboundRecord {
  id: string;
  localKanbanId: string;
  storeAddress: string;
  customerPartNo: string;
  quantity: number;
  status: 'RECEIVED' | 'PENDING';
  receivedAt: string;
  receivedBy: string;
}

export interface OutboundRecord {
  id: string;
  localKanbanId: string;
  storeAddress: string;
  customerPartNo: string;
  quantity: number;
  status: 'SHIPPED' | 'ALLOCATED';
  shippedAt: string;
  shippedBy: string;
}

export const SAMPLE_INBOUND: InboundRecord[] = [
  {
    id: 'in_001',
    localKanbanId: 'KANBAN-001',
    storeAddress: 'A-01-01',
    customerPartNo: 'P001-MOTOR',
    quantity: 40,
    status: 'RECEIVED',
    receivedAt: '2024-06-12T02:30:00Z',
    receivedBy: 'narong.t',
  },
  {
    id: 'in_002',
    localKanbanId: 'KANBAN-002',
    storeAddress: 'B-03-02',
    customerPartNo: 'P004-SENSOR',
    quantity: 25,
    status: 'PENDING',
    receivedAt: '2024-06-12T04:45:00Z',
    receivedBy: 'narong.t',
  },
];

export const SAMPLE_OUTBOUND: OutboundRecord[] = [
  {
    id: 'out_001',
    localKanbanId: 'KANBAN-050',
    storeAddress: 'C-05-01',
    customerPartNo: 'P005-FILTER',
    quantity: 30,
    status: 'SHIPPED',
    shippedAt: '2024-06-11T23:45:00Z',
    shippedBy: 'kamol.p',
  },
  {
    id: 'out_002',
    localKanbanId: 'KANBAN-051',
    storeAddress: 'A-01-02',
    customerPartNo: 'P002-BEARING',
    quantity: 60,
    status: 'ALLOCATED',
    shippedAt: '2024-06-12T01:20:00Z',
    shippedBy: 'kamol.p',
  },
];

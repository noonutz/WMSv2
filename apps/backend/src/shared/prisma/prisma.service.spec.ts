import { PrismaService } from './prisma.service';

type DeleteMockKey =
  | 'auditLog'
  | 'session'
  | 'alert'
  | 'inventoryMovement'
  | 'inboundItem'
  | 'outboundItem'
  | 'inbound'
  | 'outbound'
  | 'inventoryItem'
  | 'importDetail'
  | 'importLog'
  | 'bin'
  | 'zoneBlockPart'
  | 'blockRack'
  | 'zoneBlock'
  | 'rack'
  | 'zone'
  | 'part'
  | 'permission'
  | 'role'
  | 'user';

type DeleteMockRecord = Record<DeleteMockKey, jest.Mock>;

describe('PrismaService.cleanDatabase', () => {
  let service: PrismaService;
  let deleteMocks: DeleteMockRecord;
  let callOrder: DeleteMockKey[];

  const createDeleteMock = (key: DeleteMockKey) => {
    const mock = jest.fn().mockImplementation(async () => {
      callOrder.push(key);
    });
    deleteMocks[key] = mock;
    return mock;
  };

  beforeEach(() => {
    deleteMocks = {} as DeleteMockRecord;
    callOrder = [];

    const transactionClient = {
      auditLog: { deleteMany: createDeleteMock('auditLog') },
      session: { deleteMany: createDeleteMock('session') },
      alert: { deleteMany: createDeleteMock('alert') },
      inventoryMovement: {
        deleteMany: createDeleteMock('inventoryMovement'),
      },
      inboundItem: { deleteMany: createDeleteMock('inboundItem') },
      outboundItem: { deleteMany: createDeleteMock('outboundItem') },
      inbound: { deleteMany: createDeleteMock('inbound') },
      outbound: { deleteMany: createDeleteMock('outbound') },
      inventoryItem: { deleteMany: createDeleteMock('inventoryItem') },
      importDetail: { deleteMany: createDeleteMock('importDetail') },
      importLog: { deleteMany: createDeleteMock('importLog') },
      bin: { deleteMany: createDeleteMock('bin') },
      zoneBlockPart: { deleteMany: createDeleteMock('zoneBlockPart') },
      blockRack: { deleteMany: createDeleteMock('blockRack') },
      zoneBlock: { deleteMany: createDeleteMock('zoneBlock') },
      rack: { deleteMany: createDeleteMock('rack') },
      zone: { deleteMany: createDeleteMock('zone') },
      part: { deleteMany: createDeleteMock('part') },
      permission: { deleteMany: createDeleteMock('permission') },
      role: { deleteMany: createDeleteMock('role') },
      user: { deleteMany: createDeleteMock('user') },
    };

    service = {
      $transaction: jest.fn(async (callback: (client: typeof transactionClient) => Promise<void>) => {
        await callback(transactionClient);
      }),
    } as unknown as PrismaService;
  });

  it('deletes data sequentially following foreign key order', async () => {
    await PrismaService.prototype.cleanDatabase.call(service);

    const transactionMock = service.$transaction as unknown as jest.Mock;
    expect(transactionMock).toHaveBeenCalledTimes(1);

    const expectedOrder: DeleteMockKey[] = [
      'auditLog',
      'session',
      'alert',
      'inventoryMovement',
      'inboundItem',
      'outboundItem',
      'inbound',
      'outbound',
      'inventoryItem',
      'importDetail',
      'importLog',
      'bin',
      'zoneBlockPart',
      'blockRack',
      'zoneBlock',
      'rack',
      'zone',
      'part',
      'permission',
      'role',
      'user',
    ];

    expect(callOrder).toEqual(expectedOrder);
    expectedOrder.forEach((key) => {
      expect(deleteMocks[key]).toHaveBeenCalledTimes(1);
    });
  });
});

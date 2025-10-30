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

type DeleteMockRecord = Partial<Record<DeleteMockKey, jest.Mock>>;

describe('PrismaService.cleanDatabase', () => {
  let service: PrismaService;
  let deleteMocks: DeleteMockRecord;

  const createDeleteMock = (key: DeleteMockKey) => {
    const mock = jest.fn().mockResolvedValue(undefined);
    deleteMocks[key] = mock;
    return mock;
  };

  beforeEach(() => {
    deleteMocks = {};
    service = {
      $transaction: jest
        .fn(async (operations: Promise<unknown>[]) => Promise.all(operations)),
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
    } as unknown as PrismaService;
  });

  it('deletes data following foreign key order', async () => {
    await PrismaService.prototype.cleanDatabase.call(service);

    const transactionMock = service.$transaction as unknown as jest.Mock;
    expect(transactionMock).toHaveBeenCalledTimes(1);
    const [operations] = transactionMock.mock.calls[0];
    expect(operations).toHaveLength(21);

    const order = (key: DeleteMockKey) =>
      deleteMocks[key]!.mock.invocationCallOrder[0];

    expect(order('auditLog')).toBeLessThan(order('session'));
    expect(order('zoneBlockPart')).toBeLessThan(order('blockRack'));
    expect(order('blockRack')).toBeLessThan(order('zoneBlock'));
    expect(order('zoneBlock')).toBeLessThan(order('rack'));
    expect(order('rack')).toBeLessThan(order('zone'));
    expect(order('zone')).toBeLessThan(order('part'));
  });
});

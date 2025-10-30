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
type DeleteMockEntry = { deleteMany: jest.Mock<Promise<void>, []> };
type TransactionClient = Record<DeleteMockKey, DeleteMockEntry>;
type TransactionCallback = (client: TransactionClient) => Promise<void>;

describe('PrismaService.cleanDatabase', () => {
  let service: PrismaService;
  let deleteMocks: DeleteMockRecord;
  let callOrder: DeleteMockKey[];
  let transactionMock: jest.Mock<Promise<void>, [TransactionCallback]>;

  const createDeleteMock = (key: DeleteMockKey): jest.Mock<Promise<void>, []> => {
    const mock = jest.fn<Promise<void>, []>(() => {
      callOrder.push(key);
      return Promise.resolve();
    });
    deleteMocks[key] = mock;
    return mock;
  };

  beforeEach(() => {
    deleteMocks = {} as DeleteMockRecord;
    callOrder = [];

    const transactionClient: TransactionClient = {
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

    transactionMock = jest.fn(async (callback: TransactionCallback) => {
      await callback(transactionClient);
    });

    service = {
      $transaction: transactionMock,
    } as unknown as PrismaService;

    Object.setPrototypeOf(service, PrismaService.prototype);
  });

  it('deletes data sequentially following foreign key order', async () => {
    await service.cleanDatabase();

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

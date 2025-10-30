import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async cleanDatabase() {
    // Clean up all tables in the correct order
    return this.$transaction(async (tx) => {
      await tx.auditLog.deleteMany();
      await tx.session.deleteMany();
      await tx.alert.deleteMany();
      await tx.inventoryMovement.deleteMany();
      await tx.inboundItem.deleteMany();
      await tx.outboundItem.deleteMany();
      await tx.inbound.deleteMany();
      await tx.outbound.deleteMany();
      await tx.inventoryItem.deleteMany();
      await tx.importDetail.deleteMany();
      await tx.importLog.deleteMany();
      await tx.bin.deleteMany();
      await tx.zoneBlockPart.deleteMany();
      await tx.blockRack.deleteMany();
      await tx.zoneBlock.deleteMany();
      await tx.rack.deleteMany();
      await tx.zone.deleteMany();
      await tx.part.deleteMany();
      await tx.permission.deleteMany();
      await tx.role.deleteMany();
      await tx.user.deleteMany();
    });
  }
}

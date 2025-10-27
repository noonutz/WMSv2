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
    return this.$transaction([
      this.auditLog.deleteMany(),
      this.session.deleteMany(),
      this.alert.deleteMany(),
      this.inventoryMovement.deleteMany(),
      this.inboundItem.deleteMany(),
      this.outboundItem.deleteMany(),
      this.inbound.deleteMany(),
      this.outbound.deleteMany(),
      this.inventoryItem.deleteMany(),
      this.importDetail.deleteMany(),
      this.importLog.deleteMany(),
      this.bin.deleteMany(),
      this.rack.deleteMany(),
      this.zone.deleteMany(),
      this.part.deleteMany(),
      this.permission.deleteMany(),
      this.role.deleteMany(),
      this.user.deleteMany(),
    ]);
  }
}

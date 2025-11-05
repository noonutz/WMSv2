"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let PrismaService = class PrismaService extends client_1.PrismaClient {
    async onModuleInit() {
        await this.$connect();
    }
    async onModuleDestroy() {
        await this.$disconnect();
    }
    async cleanDatabase() {
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
};
exports.PrismaService = PrismaService;
exports.PrismaService = PrismaService = __decorate([
    (0, common_1.Injectable)()
], PrismaService);
//# sourceMappingURL=prisma.service.js.map
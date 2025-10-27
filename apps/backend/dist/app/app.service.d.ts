import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../shared/prisma/prisma.service';
export declare class AppService {
    private readonly configService;
    private readonly prismaService;
    constructor(configService: ConfigService, prismaService: PrismaService);
    getHealth(): {
        status: string;
        timestamp: string;
        version: any;
        environment: any;
    };
    getProfile(user: any): Promise<any>;
}

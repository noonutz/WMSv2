import { ConfigService } from '@nestjs/config';
export declare class AppService {
    private readonly configService;
    constructor(configService: ConfigService);
    getWelcomeMessage(): {
        name: string;
        version: string;
        environment: string;
        timestamp: string;
        modules: {
            auth: string;
            users: string;
            layout: string;
            inventory: string;
            imports: string;
            alerts: string;
            operations: string;
        };
        documentation: string;
    };
}

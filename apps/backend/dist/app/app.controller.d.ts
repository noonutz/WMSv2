import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    index(): {
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

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app/app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const config_1 = require("@nestjs/config");
const common_2 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: process.env.FRONTEND_URL || 'http://localhost:3000',
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    const config = app.get(config_1.ConfigService);
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('WMS API')
        .setDescription('Warehouse Management System API Documentation')
        .setVersion('1.0.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    const configuredPort = config.get('PORT');
    const parsedPort = configuredPort ? Number.parseInt(configuredPort, 10) : 3000;
    const port = Number.isNaN(parsedPort) ? 3000 : parsedPort;
    await app.listen(port);
    common_2.Logger.log(`🚀 WMS Backend is running on: http://localhost:${port}`);
    common_2.Logger.log(`📖 API Documentation: http://localhost:${port}/api/docs`);
}
bootstrap().catch((error) => {
    common_2.Logger.error('Failed to start application', error);
    process.exit(1);
});
//# sourceMappingURL=main.js.map
import { Injectable, Logger } from '@nestjs/common';
import { readFileSync } from 'fs';
import { resolve } from 'path';

type WarehouseConfig = {
  zones: string[];
  verticalRows: number;
  horizontalRows: number;
  defaultMinStock: number;
  defaultMaxStock: number;
};

export interface FactoryConfig {
  warehouse: WarehouseConfig;
}

@Injectable()
export class FactoryConfigService {
  private readonly logger = new Logger(FactoryConfigService.name);
  private config: FactoryConfig | null = null;

  getConfig(): FactoryConfig {
    if (!this.config) {
      const configPath = process.env.FACTORY_CONFIG_PATH
        ? resolve(process.env.FACTORY_CONFIG_PATH)
        : resolve(process.cwd(), '..', '..', 'factory.config.json');

      try {
        const content = readFileSync(configPath, 'utf-8');
        this.config = JSON.parse(content) as FactoryConfig;
      } catch (error) {
        this.logger.error(`Failed to load factory config at ${configPath}`, error as Error);
        throw error;
      }
    }

    return this.config;
  }
}

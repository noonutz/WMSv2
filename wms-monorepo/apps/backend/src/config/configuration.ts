export default () => ({
  PORT: parseInt(process.env.PORT ?? '4000', 10),
  DATABASE_URL:
    process.env.DATABASE_URL ??
    'postgresql://postgres:postgres@postgres:5432/wms?schema=public',
  JWT_SECRET: process.env.JWT_SECRET ?? 'change-me',
  JWT_EXPIRY: process.env.JWT_EXPIRY ?? '1h',
  REDIS_URL: process.env.REDIS_URL ?? 'redis://redis:6379',
  RABBITMQ_URL: process.env.RABBITMQ_URL ?? 'amqp://rabbitmq:5672',
  MINIO: {
    ENDPOINT: process.env.MINIO_ENDPOINT ?? 'minio',
    PORT: parseInt(process.env.MINIO_PORT ?? '9000', 10),
    ACCESS_KEY: process.env.MINIO_ACCESS_KEY ?? 'minioadmin',
    SECRET_KEY: process.env.MINIO_SECRET_KEY ?? 'minioadmin',
    BUCKET: process.env.MINIO_BUCKET ?? 'wms-imports'
  }
});

-- Initialize database for WMSv2 application
-- Ensure commonly used extensions are available
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Set default timezone and search path as needed
ALTER DATABASE wms_db SET timezone TO 'UTC';
ALTER DATABASE wms_db SET search_path TO public;

-- Create application schema if ever referenced
CREATE SCHEMA IF NOT EXISTS public;
GRANT ALL ON SCHEMA public TO wms_user;

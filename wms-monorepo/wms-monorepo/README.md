# Smart Factory WMS — Full Lifecycle Platform

**ภาษาไทยอยู่ด้านล่าง**

## Overview
This repository contains a production-ready monorepo for a Smart Factory Warehouse Management System (WMS). The stack covers:

- **Backend** — NestJS + Prisma + PostgreSQL, Redis caching, RabbitMQ event bus, MinIO file storage
- **Frontend** — Next.js 14 app router with Tailwind + shadcn-inspired UI and bilingual EN/TH layout
- **Data** — XLSX/CSV import with row-hash dedupe, Zebra TC-21 integration stubs, min/max alerting
- **Ops** — Docker Compose, GitHub Actions CI, Grafana-ready metrics, maintenance checklist, backup strategy

## Quick start

```bash
npm install
npm run build
npm run dev
# or create a distributable ZIP
npm run package
```

### Publishing a release archive

Tagging the repository with a version that matches `v*` (for example `v1.0.0`) automatically
triggers the **Package release** GitHub Action. The workflow installs dependencies, builds the
workspace apps, runs `npm run package`, and uploads `wms-monorepo-final-ready.zip` to the
corresponding GitHub Release so the deliverable is ready for distribution.

### Docker Compose

```bash
+cd wms-monorepo
+docker compose up --build
```

Services:

- Backend API on http://localhost:4000/api
- Frontend web app on http://localhost:3000
- PostgreSQL, Redis, RabbitMQ, MinIO provisioned with sensible defaults

## Architecture

- `apps/backend` — NestJS modular API exposing Auth, Parts, Layout, Import, Alerts, Audit endpoints with Swagger (`/api/docs`)
- `apps/frontend` — Next.js dashboard featuring Dashboard, Layout Grid, Import XLSX, Alerts and RBAC screens
- `packages/shared` — TypeScript utilities and shared i18n primitives
- `factory.config.json` — declarative layout and import mapping source of truth
- `docs/` — deployment & maintenance collateral

### Key backend flows

1. **Auth & RBAC** — Local credentials (seed users) issuing JWT tokens, RBAC roles for operator/supervisor/admin, audit logging.
2. **Import** — Template descriptors referencing `factory.config.json`, MinIO storage, row-hash dedupe guidance, import history endpoint.
3. **Inventory Intelligence** — Layout zone ↔ rack ↔ bin representation, min/max status, alerts pipeline to Slack/email via RabbitMQ.
4. **Device Integration** — Zebra TC-21 DataWedge intents captured via inbound endpoints; sample payloads included.

### Frontend highlights

- Responsive split-pane layout with navigation for Dashboard, Layout, Import, Alerts, Settings
- Mock API routes (`app/api/mock/*`) simulating backend data for rapid prototyping
- Tailwind-powered components with bilingual-ready copy and KPI widgets

## CI/CD and Deployment

- `.github/workflows/ci.yml` runs lint + build + unit tests on every push
- Docker images for backend & frontend using Node 20 Alpine base
- Ready for Kubernetes via Helm (see `docs/deployment/helm-values.yaml`)
- Monitoring hooks for Prometheus/Grafana and alerting via Alertmanager → Slack/Email

## Maintenance & KPIs

- Daily health checks (<80% CPU/RAM, DB latency < 100ms)
- Automated backups using `pg_dump` + MinIO mirror (RPO < 15 minutes)
- KPI dashboard targets: Accuracy ≥ 99.8%, Throughput ≥ 5000 txn/min
- Security posture: JWT rotation every 7 days, TLS 1.3 enforced, quarterly RBAC review

---

## บทสรุปภาษาไทย
ที่เก็บโค้ดนี้เป็นโมโนรีโพสำหรับระบบบริหารจัดการคลังสินค้าอัจฉริยะ (Smart Factory WMS) พร้อมใช้งานจริง ประกอบด้วย

- **Backend** — NestJS + Prisma + PostgreSQL พร้อม Redis, RabbitMQ, MinIO
- **Frontend** — Next.js 14 + Tailwind UI รองรับสองภาษา ไทย/อังกฤษ
- **Data** — โมดูลนำเข้าไฟล์ XLSX/CSV, ตรวจซ้ำด้วย row-hash, รองรับ Zebra TC-21
- **Ops** — Docker Compose, GitHub Actions CI, เอกสาร Deployment & Maintenance ครบถ้วน

### วิธีเริ่มต้น

```bash
npm install
npm run build
npm run dev
```

หรือใช้ Docker Compose:

```bash
cd wms-monorepo
docker compose up --build
```

### โครงสร้างหลัก

- `apps/backend` — API สำหรับ Auth, Parts, Layout, Import, Alerts, Audit พร้อม Swagger (`/api/docs`)
- `apps/frontend` — หน้าจอ Dashboard, Layout Grid, นำเข้า XLSX, แจ้งเตือน, ตั้งค่าบทบาท
- `packages/shared` — Utility และคำแปลร่วม
- `factory.config.json` — ไฟล์คอนฟิกโครงสร้างคลังและ mapping
- `docs/` — คู่มือการดีพลอยและบำรุงรักษา

### การดูแลรักษา
- ตรวจสุขภาพระบบรายวัน, สำรองข้อมูลด้วย `pg_dump` + MinIO
- ค่า KPI หลัก: Accuracy ≥ 99.8%, Throughput ≥ 5000 txn/นาที
- ความปลอดภัย: หมุนเวียน JWT ทุก 7 วัน, TLS 1.3, ตรวจ RBAC รายไตรมาส

## Deliverables

- Swagger & Postman collection (packages/postman)
- Docker Compose stack + Helm values sample
- Smart Factory Maintenance Checklist (.xlsx) ในโฟลเดอร์ `docs/`
- Production Guide ภาษาไทย/อังกฤษ (`docs/production-guide.md`)

พร้อมให้ทีม DevOps นำไปติดตั้งในสภาพแวดล้อม Docker หรือ Kubernetes ทันที
 
EOF
)

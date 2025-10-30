# WMS - Smart Factory Full Lifecycle (General Edition)

A comprehensive Warehouse Management System for large industrial factories, featuring barcode scanning via Zebra TC-21, Min-Max alerts, Excel import/export, and real-time analytics.

## 🏭 Core Features

- **Import Part List**: Drag-to-map header UI with row-hash deduplication
- **Layout Management**: Zone-Rack-Block visualization (A-Z × vrow 01-99 × hrow 01-10)
- **Block-Based Zones**: Create custom blocks with part assignments and capacity management
- **Inbound/Outbound**: LocalKanbanID ↔ StoreAddress ↔ CustomerPartNo validation
- **Dashboard & Alerts**: Min/Max threshold notifications with import/export history
- **Multi-language**: Thai/English interface with i18n support
- **Enterprise Security**: JWT authentication, RBAC, audit logging

## 🛠️ Technology Stack

**Backend**: NestJS + TypeScript + PostgreSQL (Prisma ORM)  
**Frontend**: Next.js + Tailwind + shadcn/ui + i18n (EN/TH)  
**Cache**: Redis  
**Storage**: MinIO (file uploads and templates)  
**Message Bus**: RabbitMQ (Event-driven)  
**Deployment**: Docker Compose / Kubernetes

## 📁 Project Structure

```
wms-monorepo/
├─ apps/
│  ├─ backend/       # NestJS + Prisma API
│  └─ frontend/      # Next.js + Tailwind + shadcn/ui
├─ packages/
│  ├─ postman/       # API collections
│  └─ shared/        # utility / i18n / config
├─ docker-compose.yml
├─ factory.config.json
├─ .github/workflows/ci.yml
└─ README.md
```

## 🚀 Quick Start

1. **Clone and setup**:
   ```bash
   git clone <repository>
   cd wms-monorepo
   ```

2. **Start services**:
   ```bash
   docker-compose up -d
   ```

   The compose stack will boot PostgreSQL, Redis, MinIO, RabbitMQ, the NestJS API, the Next.js UI, and the monitoring toolset
   (Prometheus + Grafana).

3. **Install dependencies**:
   ```bash
   cd apps/backend && npm install
   cd ../frontend && npm install
   ```

4. **Run migrations**:
   ```bash
   cd apps/backend && npx prisma migrate deploy
   ```

5. **Start development**:
   ```bash
   # Backend
   cd apps/backend && npm run start:dev
   
   # Frontend
   cd apps/frontend && npm run dev
   ```

6. **Demo credentials**

   | Role     | Username | Password   |
   |----------|----------|------------|
   | Admin    | `admin`  | `Admin@123`|
   | Operator | `operator` | `Operator@123` |

   The sample credentials unlock the dashboard, layout grid, Min/Max alert center, import history, and RBAC overview pages.

## 📊 Dashboard Preview

- **Layout Grid**: Visual representation of warehouse zones A-Z
- **Real-time Inventory**: Live stock levels with Min/Max indicators
- **Import History**: Excel import logs with row-hash validation
- **Alerts Center**: Min/Max threshold notifications

## 🔄 System Flowchart

```mermaid
graph TB
    subgraph "🌐 Frontend (Next.js)"
        A[Login Page] --> B[Dashboard]
        B --> C[Layout Grid A-Z]
        B --> D[Import Excel/CSV]
        B --> E[Inventory Management]
        B --> F[Alerts Center]
        B --> G[Reports & Analytics]
    end

    subgraph "🔧 Backend (NestJS API)"
        H[Auth Module] 
        I[Zone-Rack-Bin Module]
        J[Part & Inventory Module]
        K[Import/Export Module]
        L[Inbound/Outbound Module]
        M[Alert & Notification Module]
        N[Audit & Logging Module]
    end

    subgraph "🗄️ Database (PostgreSQL)"
        O[User Management]
        P[Zone Configuration]
        Q[Part Master Data]
        R[Inventory Levels]
        S[Transaction Logs]
        T[Import History]
    end

    subgraph "📡 Integration"
        U[Zebra TC-21 Scanner]
        V[Excel/CSV Import]
        W[ERP/MES Systems]
        X[Email/Slack Alerts]
    end

    subgraph "☁️ Services"
        Y[Redis Cache]
        Z[MinIO Storage]
        AA[RabbitMQ Queue]
        BB[Prometheus Monitoring]
    end

    %% Frontend Workflows
    A --> H
    C --> I
    D --> V
    D --> K
    E --> J
    F --> M
    G --> L

    %% Backend Processing
    H --> O
    I --> P
    J --> Q
    J --> R
    K --> T
    L --> S
    M --> X

    %% Data Flow
    P --> Y
    Q --> Y
    R --> Y
    T --> Z
    S --> AA

    %% External Integration
    U --> K
    V --> K
    W --> L
    X --> BB

    %% Style definitions
    classDef frontend fill:#e1f5fe,stroke:#01579b,stroke-width:2px
    classDef backend fill:#f3e5f5,stroke:#4a148c,stroke-width:2px
    classDef database fill:#e8f5e8,stroke:#1b5e20,stroke-width:2px
    classDef integration fill:#fff3e0,stroke:#e65100,stroke-width:2px
    classDef services fill:#fce4ec,stroke:#880e4f,stroke-width:2px

    class A,B,C,D,E,F,G frontend
    class H,I,J,K,L,M,N backend
    class O,P,Q,R,S,T database
    class U,V,W,X integration
    class Y,Z,AA,BB services
```

## 🚀 Quick Start Workflow

1. **User Authentication**
   ```mermaid
   graph LR
       Login[Login Page] --> Auth[JWT Token]
       Auth --> Dashboard[Dashboard Access]
       Dashboard --> RoleCheck{Role Check}
       RoleCheck -->|Admin| AdminPanel[Admin Panel]
       RoleCheck -->|User| UserPanel[User Panel]
   ```

2. **Excel Import Process**
   ```mermaid
   graph LR
       Upload[Excel Upload] --> Validate[Header Validation]
       Validate --> Map[Drag-to-Map Headers]
       Map --> Hash[Row-Hash Calculation]
       Hash --> CheckDup[Duplicate Check]
       CheckDup --> Import[Database Import]
       Import --> Success[Import Success]
       Import --> Log[Import Log]
   ```

3. **Warehouse Operations**
   ```mermaid
   graph TB
       Inbound[Inbound Receiving] --> Scan[Barcode Scan]
       Scan --> Validate[LocalKanbanID Check]
       Validate --> Update[Inventory Update]
       Update --> Alert[Min/Max Alert Check]
       Alert --> Notify{Threshold Breach?}
       Notify -->|Yes| AlertUser[Send Alert]
       Notify -->|No| Complete[Operation Complete]
   ```

## 🏗️ Enhanced Layout Management

### **Block-Based Zone Design**

The WMS now supports advanced block-based zone management allowing you to create custom storage blocks within zones and assign specific parts to each block.

```
Zone A (STORAGE) ── Block A1 (STORAGE) ── Rack A-01-01 ── Bin A-01-01-01
         │               │                    └─ Bin A-01-01-02
         │               │                    └─ Bin A-01-01-03
         │               │
         │               └─ Block A2 (PICKING) ── Rack A-01-02 ── Bin A-01-02-01
         │                                        └─ Bin A-01-02-02
         │
         └─ Block A3 (QC) ── Rack A-02-01 ── Bin A-02-01-01
                              └─ Bin A-02-01-02

Zone B (RECEIVING) ── Block B1 (RECEIVING) ── Rack B-01-01 ── Bin B-01-01-01
         │                    └─ Bin B-01-01-02
         │
         └─ Block B2 (TEMPORARY) ── Rack B-01-02 ── Bin B-01-02-01
```

### **Zone Types & Block Types**

- **Zone Types**: STORAGE, RECEIVING, SHIPPING, PICKING, QC, DAMAGE, PACKING, RETURNS, MAINTENANCE
- **Block Types**: All zone types plus TEMPORARY, SEASONAL for flexible storage

### **Part Assignment Management**

Each block can be assigned specific parts with:
- **Assigned Quantity**: Current stock in the block
- **Min/Max Stock**: Thresholds for the block
- **Reorder Point**: When to trigger replenishment
- **Primary Location**: Designate main storage location

### **Advanced Layout Features**

- ✅ **Custom Zone Creation**: Create zones with naming patterns (A1, B2, etc.)
- ✅ **Block Capacity Management**: Set and monitor block capacities
- ✅ **Temperature Zones**: AMBIENT, COLD, FREEZE, CONTROLLED, HAZARDOUS
- ✅ **Climate Control**: Mark blocks as climate-controlled
- ✅ **Drag & Drop Layout**: Visual block arrangement in UI
- ✅ **Part-to-Block Assignment**: Assign specific parts to storage blocks
- ✅ **Capacity Alerts**: Notifications when blocks are full/empty

### **Layout Management Flowchart**

```mermaid
graph TB
    subgraph "🏗️ Layout Management"
        A[Create Zone] --> B[Define Zone Type]
        B --> C[Set Capacity & Temperature]
        C --> D[Create Blocks]
        D --> E[Assign Block Type]
        E --> F[Set Block Capacity]
        F --> G[Assign Racks to Block]
        G --> H[Assign Parts to Block]
        H --> I[Set Min/Max Stock Levels]
        I --> J[Monitor Block Utilization]
    end
    
    subgraph "📊 Block Operations"
        J --> K{Block Full?}
        K -->|Yes| L[Generate Alert]
        K -->|No| M{Block Empty?}
        M -->|Yes| N[Generate Alert]
        M -->|No| O[Normal Operation]
    end
    
    subgraph "🔄 Part Assignment"
        P[New Part] --> Q[Select Block]
        Q --> R[Set Assignment Parameters]
        R --> S[Update Block Capacity]
        S --> T[Monitor Stock Levels]
    end
    
    %% Styling
    classDef layout fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
    classDef operations fill:#fff3e0,stroke:#f57c00,stroke-width:2px
    classDef assignment fill:#e8f5e8,stroke:#388e3c,stroke-width:2px
    
    class A,B,C,D,E,F,G,H,I,J,K,L,M,N,O layout
    class P,Q,R,S,T assignment
```

## 📈 Data Flow Architecture

```mermaid
graph LR
    subgraph "📱 Client Devices"
        A[Zebra TC-21 Scanner]
        B[Web Browser]
        C[Mobile App]
    end

    subgraph "🌐 API Gateway"
        D[Load Balancer]
        E[Rate Limiter]
        F[Auth Middleware]
    end

    subgraph "🔧 Microservices"
        G[Auth Service]
        H[Inventory Service]
        I[Import Service]
        J[Alert Service]
    end

    subgraph "🗄️ Data Layer"
        K[PostgreSQL]
        L[Redis Cache]
        M[MinIO Storage]
    end

    subgraph "📡 External Systems"
        N[ERP System]
        O[Email Service]
        P[Slack API]
    end

    A --> D
    B --> D
    C --> D
    D --> E
    E --> F
    F --> G
    F --> H
    F --> I
    F --> J
    G --> K
    H --> K
    H --> L
    I --> K
    I --> M
    J --> O
    J --> P
    H --> N

    %% Styling
    classDef client fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
    classDef gateway fill:#fff3e0,stroke:#f57c00,stroke-width:2px
    classDef service fill:#e8f5e8,stroke:#388e3c,stroke-width:2px
    classDef data fill:#fce4ec,stroke:#c2185b,stroke-width:2px
    classDef external fill:#f1f8e9,stroke:#689f38,stroke-width:2px

    class A,B,C client
    class D,E,F gateway
    class G,H,I,J service
    class K,L,M data
    class N,O,P external
```

## 🔧 Maintenance

- **Health Monitoring**: CPU/RAM < 80%, DB latency < 100ms
- **Backup**: Daily pg_dump + MinIO sync (RPO < 15 minutes)
- **KPI**: Accuracy ≥ 99.8%, Throughput ≥ 5000 txn/min
- **Security**: JWT rotate every 7 days, TLS auto-renew

## 📞 Support

For enterprise support and customization, contact the development team.

---

*Production-ready WMS system for smart factories*

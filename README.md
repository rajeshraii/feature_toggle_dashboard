# 🚀 Feature Toggle Dashboard

A production-ready feature flag management system that lets teams control feature rollouts without redeploying code. Built with Spring Boot and React.

---

## 📌 What is this?

Feature Toggle Dashboard lets you:
- Turn features **ON/OFF** per environment (dev/staging/prod)
- Roll out features to a **percentage of users**
- Manage everything from a **clean dashboard UI**
- Secure everything with **JWT authentication**

---

## 🛠️ Tech Stack

### Backend
| Tech | Purpose |
|---|---|
| **Spring Boot 3.3** | REST API framework |
| **Spring Security + JWT** | Stateless authentication |
| **PostgreSQL (Supabase)** | Cloud hosted database |
| **Spring Data JPA** | ORM layer |
| **Lombok** | Boilerplate reduction |
| **Maven** | Build tool |

### Frontend *(in progress)*
| Tech | Purpose |
|---|---|
| **React + Vite** | Fast frontend framework |
| **Tailwind CSS** | Utility-first styling |
| **Axios** | HTTP client for API calls |

---

## 📁 Project Structure
```
feature_toggle_dashboard/
├── dashboard/                          ← Spring Boot Backend
│   └── src/main/java/com/featuretoggle/dashboard/
│       ├── config/                     ← CORS, Security
│       ├── controller/                 ← REST Endpoints
│       ├── service/                    ← Business Logic
│       ├── repository/                 ← DB Queries
│       ├── model/                      ← JPA Entities
│       ├── dto/                        ← Request/Response
│       ├── security/                   ← JWT Filter, Util
│       └── exception/                  ← Global Error Handler
└── dashboard-ui/                       ← React Frontend (coming soon)
```

---

## 🗄️ Database Schema
```sql
CREATE TABLE environments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE features (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    enabled BOOLEAN DEFAULT FALSE,
    rollout_percentage INT DEFAULT 100,
    environment_id UUID REFERENCES environments(id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'ROLE_USER',
    created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🚀 Getting Started

### 1. Clone the Repo
```bash
git clone https://github.com/rajeshraii/feature_toggle_dashboard.git
cd feature_toggle_dashboard/dashboard
```

### 2. Setup application.properties
Create `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://db.YOUR_REF.supabase.co:5432/postgres
spring.datasource.username=postgres
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.properties.hibernate.format_sql=true

server.port=8080

jwt.secret=your-64-character-random-string
jwt.expiration=86400000
```

### 3. Run Backend
```bash
./mvnw spring-boot:run
```
✅ Running at `http://localhost:8080`

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login and get JWT |

### Environments
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/environments` | Get all environments |
| POST | `/api/environments` | Create environment |
| DELETE | `/api/environments/{id}` | Delete environment |

### Features
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/features` | Get all features |
| GET | `/api/features/env/{envId}` | Get by environment |
| POST | `/api/features` | Create feature |
| PUT | `/api/features/{id}` | Update feature |
| PATCH | `/api/features/{id}/toggle` | Toggle ON/OFF |
| DELETE | `/api/features/{id}` | Delete feature |
| GET | `/api/features/{id}/check/{userId}` | Check rollout for user |

---

## 🔐 Authentication

All endpoints except `/api/auth/**` require JWT token:
```
Authorization: Bearer YOUR_TOKEN_HERE
```

---

## ✅ Roadmap

### Phase 1 — MVP
- [x] JWT Authentication
- [x] Environment Management
- [x] Feature Flag CRUD
- [x] Toggle ON/OFF per environment
- [x] Percentage Rollout
- [ ] React Dashboard UI

### Phase 2 — Advanced
- [ ] Role Based Access Control
- [ ] Audit Logs
- [ ] Feature Scheduling
- [ ] Email Notifications
- [ ] Deploy (Railway + Vercel)

---

## 🧪 Testing

**Register:**
```json
POST /api/auth/register
{
  "email": "test@gmail.com",
  "password": "test1234"
}
```

**Create Environment:**
```json
POST /api/environments
Authorization: Bearer TOKEN
{
  "name": "dev"
}
```

**Create Feature:**
```json
POST /api/features
Authorization: Bearer TOKEN
{
  "name": "dark-mode",
  "description": "Dark mode feature",
  "enabled": true,
  "rolloutPercentage": 50,
  "environmentId": "YOUR_ENV_ID"
}
```

---

## ⚠️ Common Issues

| Issue | Fix |
|---|---|
| `Java not found` | Install Java 21, set JAVA_HOME |
| `Port 8080 in use` | Change `server.port=8081` |
| `DB connection failed` | Check Supabase credentials |
| `BUILD FAILURE on stop` | Normal — app stopped manually |
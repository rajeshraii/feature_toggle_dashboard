# Feature Toggle Dashboard — Backend Setup Guide

---

## Prerequisites — Install These First

| Tool | Download | Why |
|---|---|---|
| **Java 21** | [adoptium.net](https://adoptium.net) | Run Spring Boot |
| **VS Code** | [code.visualstudio.com](https://code.visualstudio.com) | Code editor |
| **Postman** | [postman.com](https://postman.com) | API testing |
| **Git** | [git-scm.com](https://git-scm.com) | Version control |
| **Node.js 18+** | [nodejs.org](https://nodejs.org) | For frontend (React + Vite + Tailwind — coming soon) |

---

## VS Code Extensions
```
1. Extension Pack for Java
2. Spring Boot Extension Pack
3. Lombok Annotations Support
```

---

## Tech Stack

| Tech | Why |
|---|---|
| **Spring Boot 3.3** | Backend REST API framework |
| **Spring Security + JWT** | Stateless authentication |
| **PostgreSQL (Supabase)** | Cloud hosted database |
| **Spring Data JPA** | ORM — no raw SQL needed |
| **Lombok** | Removes boilerplate code |

> Frontend: React + Vite + Tailwind CSS (in progress)

---

## Step 1 — Clone Repo
```bash
git clone https://github.com/rajeshraii/feature_toggle_dashboard.git
cd feature_toggle_dashboard/dashboard
```

---

## Step 2 — Setup application.properties

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
> Ask team lead for Supabase credentials!

---

## Step 3 — Run Backend
```bash
./mvnw spring-boot:run
```

Look for:
```
Started DashboardApplication in X.XXX seconds
```
✅ Backend running at `http://localhost:8080`

---

## Step 4 — Test API (Postman)

**Register:**
```
POST http://localhost:8080/api/auth/register
Body: { "email": "your@email.com", "password": "yourpassword" }
```

**Login:**
```
POST http://localhost:8080/api/auth/login
Body: { "email": "your@email.com", "password": "yourpassword" }
```

Got token? ✅ Everything works!

---

## Common Issues

| Issue | Fix |
|---|---|
| `Java not found` | Install Java 21 and set JAVA_HOME |
| `Port 8080 in use` | Change `server.port=8081` in properties |
| `DB connection failed` | Check Supabase credentials |
| `BUILD FAILURE on stop` | Normal! App was stopped manually |
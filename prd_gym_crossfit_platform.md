# PRD — Plataforma de Gestión para Box de CrossFit (GymOS)

## 1. Información General del Producto

**Nombre del Producto:** GymOS  
**Tipo de Producto:** Aplicación Web (Responsive)  
**Idioma del Sistema:** Español (preparado para internacionalización futura)  
**Cliente Inicial:** Un solo gimnasio  
**Escalabilidad:** Diseñado para evolucionar a SaaS multi-gimnasio  

---

# 2. Visión del Producto

Crear una plataforma web que permita gestionar completamente las operaciones de un box de CrossFit o gimnasio funcional.

El sistema permitirá administrar:

- miembros
- pagos
- gastos
- asistencia
- entrenamientos (WOD)
- resultados y rankings
- contenido del gimnasio
- landing page pública
- blog de salud y fitness

El sistema iniciará como herramienta interna para un gimnasio y posteriormente evolucionará a **plataforma SaaS para múltiples gimnasios**.

---

# 3. Problema

Muchos gimnasios gestionan sus operaciones con:

- hojas de cálculo
- WhatsApp
- registros manuales
- múltiples aplicaciones separadas

Esto provoca:

- desorganización
- falta de control financiero
- mala experiencia para atletas
- pérdida de información

---

# 4. Solución

Crear una plataforma centralizada que permita:

- automatizar operaciones del gimnasio
- mejorar la experiencia del atleta
- tener control financiero
- publicar contenido del gimnasio
- escalar a SaaS para múltiples boxes

---

# 5. Objetivos del Producto

## Objetivos de Negocio

- Digitalizar operaciones del gimnasio
- Mejorar el control financiero
- Aumentar la retención de atletas
- Preparar la plataforma para SaaS

## Objetivos del Usuario

### Admin (Dueño / Head Coach)

- gestionar miembros
- registrar pagos
- registrar gastos
- publicar entrenamientos
- gestionar contenido
- ver reportes

### Coach

- ver entrenamientos
- revisar resultados de atletas
- ver asistencia

### Atleta

- ver entrenamientos
- registrar resultados
- hacer check-in
- ver progreso

---

# 6. Roles del Sistema

## Admin

Permisos completos.

Puede:

- gestionar sistema
- crear miembros
- registrar pagos
- registrar gastos
- publicar WOD
- publicar programación
- administrar blog
- editar landing page
- ver reportes

---

## Coach

Permisos limitados.

Puede:

- ver entrenamientos
- ver resultados
- ver asistencia

No puede:

- editar sistema
- modificar miembros
- registrar pagos

---

## Member (Atleta)

Puede:

- iniciar sesión
- escanear QR
- ver WOD
- registrar resultados
- ver leaderboard
- ver perfil
- ver historial

---

# 7. Funcionalidades del Sistema

## 7.1 Gestión de Miembros

El administrador puede:

- crear miembros
- editar información
- asignar membresía
- ver historial

Datos del miembro:

- nombre
- email
- teléfono
- fecha de nacimiento
- altura
- peso
- nivel
- lesiones
- contacto de emergencia

---

## 7.2 Sistema de Membresías

Tipos definidos:

- General
- Personal
- Programación

Cada membresía incluye:

- precio
- duración
- fecha de vencimiento
- estado

---

## 7.3 Sistema de Pagos

Métodos de pago:

- efectivo
- SINPE
- pasarela de pago

Datos registrados:

- miembro
- monto
- método
- fecha
- concepto

---

## 7.4 Registro de Gastos

El sistema permitirá registrar gastos del gimnasio.

Ejemplos:

- renta
- equipo
- servicios
- salarios

Campos:

- categoría
- monto
- fecha
- descripción

---

## 7.5 Sistema de Asistencia (QR Check-in)

En el gimnasio habrá un **código QR en la pared**.

Flujo:

1. atleta escanea QR  
2. sistema abre página de check-in  
3. se registra asistencia  

Reglas:

- membresía activa
- máximo 1 check-in por día

---

## 7.6 WOD (Workout of the Day)

Tipos:

- General
- Programming

Campos:

- fecha
- descripción
- movimientos
- pesos sugeridos
- escalas
- notas

---

## 7.7 Resultados del WOD

Los atletas podrán registrar:

- tiempo
- peso
- rounds
- reps

Categorías:

- RX
- Scaled
- Beginner

---

## 7.8 Leaderboard

Ranking automático de atletas por WOD.

Separado por:

- RX
- Scaled
- Beginner

---

## 7.9 Perfil del Atleta

Incluye:

- datos personales
- membresía
- historial de asistencia
- historial de entrenamientos
- historial de pagos

---

## 7.10 Landing Page Pública

La página pública del gimnasio incluirá:

- Hero
- About
- Coaches
- Horarios
- Membresías
- Blog
- Contacto

Todo el contenido será editable por el administrador.

---

## 7.11 Sistema de Blog

El administrador podrá publicar contenido sobre:

- nutrición
- salud
- entrenamiento
- fitness

Cada artículo incluye:

- título
- contenido
- imágenes
- autor
- fecha

---

# 8. Dashboard Administrativo

El dashboard mostrará métricas principales:

- miembros activos
- ingresos del mes
- asistencia del día
- nuevos miembros
- membresías por vencer

Gráficos:

- ingresos por día
- ingresos por mes
- asistencia
- ingresos vs gastos

---

# 9. Reportes

## Financieros

- ingresos por día
- ingresos por mes
- ingresos por membresía
- ingresos por método de pago
- gastos
- balance

## Miembros

- miembros activos
- nuevos miembros
- cancelaciones

## Asistencia

- asistencia diaria
- asistencia por atleta
- horas pico

---

# 10. Arquitectura Tecnológica

Frontend: Next.js  
Backend: NestJS  
Base de Datos: PostgreSQL  
ORM: Prisma  
Storage: Cloudflare R2  
Autenticación: JWT  
Emails: Resend  
Pagos (futuro SaaS): Stripe  

---

# 11. Infraestructura

Frontend → Cloudflare Pages  
Backend → Fly.io / Railway  
Base de datos → Neon PostgreSQL  
Storage → Cloudflare R2  
CDN → Cloudflare  

---

# 12. Arquitectura del Sistema

Usuario  
↓  
Frontend Next.js  
↓  
API NestJS  
↓  
PostgreSQL  
↓  
Cloudflare R2 (imágenes)

---

# 13. Base de Datos

## gyms

id  
name  
address  
email  
whatsapp  

## users

id  
gym_id  
name  
email  
password  
role  

## members

id  
gym_id  
user_id  
phone  
birth_date  
height  
weight  
level  

## memberships

id  
gym_id  
name  
price  
duration_days  

## payments

id  
gym_id  
member_id  
amount  
payment_method  
payment_date  

## expenses

id  
gym_id  
category  
amount  
date  

## attendance

id  
gym_id  
member_id  
checkin_date  
checkin_time  

## wod

id  
gym_id  
title  
description  
date  
type  

## wod_results

id  
gym_id  
wod_id  
member_id  
score  
category  

## blog_posts

id  
gym_id  
title  
slug  
content  
cover_image  
author_id  

---

# 14. API Endpoints

## Auth

POST /auth/login  
POST /auth/register  
GET /auth/profile  

## Members

GET /members  
POST /members  
PATCH /members/:id  

## Payments

GET /payments  
POST /payments  

## Expenses

GET /expenses  
POST /expenses  

## Attendance

POST /attendance/checkin  
GET /attendance  

## WOD

GET /wods  
POST /wods  

## Results

POST /results  
GET /results/wod/:id  

## Blog

GET /blog  
GET /blog/:slug  
POST /blog  

---

# 15. Estructura del Backend (NestJS)

backend/  
 └ src/  
   └ modules/  
     ├ auth/  
     ├ users/  
     ├ gyms/  
     ├ members/  
     ├ memberships/  
     ├ payments/  
     ├ expenses/  
     ├ attendance/  
     ├ wod/  
     ├ results/  
     ├ blog/  
     └ dashboard/  

---

# 16. Estructura del Frontend (Next.js)

frontend/  
 ├ app/  
 ├ dashboard/  
 │ ├ members/  
 │ ├ payments/  
 │ ├ expenses/  
 │ ├ attendance/  
 │ ├ wod/  
 │ ├ results/  
 │ └ blog/  
 ├ components/  
 ├ features/  
 ├ services/  
 ├ hooks/  
 └ utils/  

---

# 17. Roadmap de Desarrollo

## Sprint 1

- autenticación
- usuarios
- gimnasios
- miembros

## Sprint 2

- membresías
- pagos
- gastos
- dashboard

## Sprint 3

- WOD
- resultados
- leaderboard
- asistencia QR

## Sprint 4

- landing page
- blog
- SEO

---

# 18. Métricas de Éxito

KPIs del sistema:

- miembros activos
- ingresos mensuales
- asistencia promedio
- retención de atletas
- número de WOD registrados

---

# 19. Futuras Funcionalidades

- aplicación móvil
- PR tracking
- comunidad de atletas
- marketplace de gimnasios
- analytics avanzados
- sistema de retos

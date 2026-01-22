🦷 Sistema de Gestión de Clínica Dental – Backend

Sistema backend para la gestión de una clínica odontológica.
Permite administrar pacientes, tratamientos, turnos y pagos, exponiendo una API REST desarrollada con Java y Spring Boot.

El proyecto está orientado a simular un sistema real de gestión, aplicando buenas prácticas de arquitectura, separación de responsabilidades y lógica de negocio.

🚀 Tecnologías utilizadas

Java

Spring Boot

Spring Web

Spring Data JPA

Hibernate

SQLite

Maven

Git

📌 Funcionalidades principales

👤 Gestión de Pacientes

Alta, baja y modificación de pacientes

Búsqueda por cédula

Asociación de pacientes con tratamientos

🦷 Gestión de Tratamientos

Registro de tratamientos odontológicos

Control de costos totales y pagos realizados

Cálculo automático de deuda

📅 Turnos

Registro de turnos por paciente y tratamiento

Control de fechas y horarios

Consulta de turnos futuros

💰 Pagos

Registro de pagos parciales o totales

Actualización automática del estado del tratamiento

Listado de deudas pendientes

🧠 Lógica de negocio destacada

Cálculo dinámico del estado de pago:

Pagado

Pendiente

Validaciones de datos en la capa de servicios

Centralización de la lógica de negocio fuera de los controladores

Uso de DTOs para controlar la exposición de datos

🏗️ Arquitectura del sistema

El proyecto sigue una arquitectura en capas (Layered Architecture), separando responsabilidades para facilitar el mantenimiento, la escalabilidad y el testeo.

🔹 Capas principales

Controller

Expone los endpoints REST

Recibe y valida datos de entrada

Delegación total de lógica a la capa de servicios

Service

Contiene la lógica de negocio

Maneja cálculos de deuda y estado de pago

Coordina operaciones entre repositorios

Repository

Acceso a datos mediante Spring Data JPA

Abstracción completa de la base de datos

Entity

Modelo de dominio

Mapeo objeto–relacional con JPA / Hibernate

DTO (Data Transfer Objects)

Controla los datos expuestos por la API

Evita exponer entidades directamente

Mapper

Conversión entre entidades y DTOs

Mantiene desacopladas las capas

Config

Configuración general del sistema

Beans, CORS y propiedades de la aplicación

🔁 Flujo de una petición
Cliente HTTP
   ↓
Controller
   ↓
Service
   ↓
Repository
   ↓
Base de datos (SQLite)


La respuesta retorna por el mismo flujo, transformando entidades a DTOs antes de ser enviadas al cliente.

🔗 Endpoints principales

POST /api/cliente/registrar

GET /api/clientetratamiento/deudas/pendientes

PUT /api/cliente/clientetratamiento/{id}/pagar

🗂️ Estructura del proyecto
src/main/java
 └── com.example.dentista
      |- controller
      |- service
      |- repository
      |- dto
      |- mapper
      |- entity
      |- config

⚙️ Configuración y ejecución
1️- Clonar el repositorio
git clone https://github.com/GastonOnandi/Dentista.git
cd dental-clinic-backend

2️- Configurar la base de datos

Editar el archivo application.properties:

spring.datasource.url=jdbc:sqlite:C:/Users/Santiago/Desktop/ProyectoWilson/database/smilecare.db?date_string_format=yyyy-MM-dd

3️- Ejecutar el proyecto
mvn spring-boot:run


La API estará disponible en:

http://localhost:8080

🧪 Testing

Pruebas manuales utilizando Postman

Validación de endpoints y reglas de negocio

📚 Objetivo del proyecto

Practicar desarrollo backend con Java y Spring Boot

Aplicar lógica de negocio real

Simular un sistema de gestión profesional

Construir un proyecto sólido para portfolio IT

👤 Autor

Santiago Onandi
Estudiante de Ingeniería Informática

📧 Email: sonandi1503@gmail.com

🔗 GitHub: https://github.com/sonandi8053

🔗 LinkedIn: https://www.linkedin.com/in/santiago-onandi-8a3799340/

⭐ Posibles mejoras futuras

Documentación con Swagger / OpenAPI

Exportación de reportes en PDF

Migración de base de datos a PostgreSQL
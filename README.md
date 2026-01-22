🦷 Sistema de Gestion de Clinica Dental – Backend

Sistema backend para la gestión de una clínica odontológica.
Permite administrar pacientes, tratamientos, turnos y pagos, exponiendo una API REST desarrollada con Java y Spring Boot.


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

- Pagado

- Pendiente

Validaciones de datos en servicios

Separación por capas:

Controller

Service

Repository

Uso de DTOs para exposición de datos

🔗 Endpoints principales 
POST /api/cliente/registrar
GET /api/clientetratamiento/deudas/pendientes
PUT /api/cliente/clientetratamiento/{id}/pagar


🗂️ Estructura del proyecto
src/main/java
 └── com.example.dentista
      |--controller
      |--service
      |--repository
      |--dto
      |--mapper
      |--entity
      |--config

⚙️ Configuración y ejecución
1️⃣ Clonar el repositorio
git clone https://github.com/GastonOnandi/Dentista.git
cd dental-clinic-backend

2️⃣ Configurar base de datos

Editar application.properties:

spring.datasource.url=jdbc:sqlite:C:/Users/Santiago/Desktop/Proyecto Wilson/demo (1)/Dentista/ProyectoWilsonBack/database/smilecare.db?date_string_format=yyyy-MM-dd


3️⃣ Ejecutar el proyecto

La API estará disponible en:

http://localhost:8080

🧪 Testing

Pruebas manuales con Postman

Validación de endpoints y reglas de negocio

📚 Objetivo del proyecto

Practicar desarrollo backend con Java y Spring Boot

Aplicar lógica de negocio real

Simular un sistema de gestión profesional

Preparar un proyecto para portfolio IT

👤 Autor

Santiago Onandi
Estudiante de Ingeniería Informática
📧 sonandi1503@gmail.com

🔗 GitHub: https://github.com/sonandi8053

🔗 LinkedIn: https://www.linkedin.com/in/santiago-onandi-8a3799340/

⭐ Posibles mejoras futuras

Documentación con Swagger

Exportación de reportes en PDF

Migrar a PostgreSQL


#  GO NIC - Plataforma Turística de Nicaragua

> **Go Nic** es una plataforma web desarrollada para fomentar, explorar y conectar a los usuarios con los mejores destinos, hoteles y experiencias turísticas de Nicaragua, impulsando además el crecimiento de los emprendedores locales.

---

---

##  Características Principales

* **Sistema de Autenticación Completo:** Registro de usuarios con validación mediante código de 6 dígitos enviado por correo electrónico (usando PHPMailer y SMTP de Gmail), encriptación de contraseñas (`password_hash` con BCRYPT) e inicio de sesión seguro.
*  **Gestión de Perfil:** Panel de usuario personalizado que recupera dinámicamente la información y credenciales tras iniciar sesión.
*  **Catálogo de Hoteles:** Más de 40 alojamientos distribuidos y categorizados por regiones turísticas del país.
*  **Diseño Adaptativo y Modo Oscuro:** Interfaz moderna con soporte para cambio de tema (Claro/Oscuro) y multilenguaje (Español/Inglés).

---

##  Tecnologías Utilizadas

| Componente | Tecnología / Herramienta |
| :--- | :--- |
| **Frontend** | HTML5, CSS3, JavaScript (Vanilla con gestión de estado mediante `LocalStorage`) |
| **Backend** | PHP (Programación orientada a lógica de servidores y procesamiento de formularios) |
| **Base de Datos** | MySQL (Manejo de conexiones seguras mediante PDO) |
| **Librerías / UI** | PHPMailer (Correos de verificación), Google Fonts (Tipografía Poppins) |

---

##  Instalación y Configuración Local

1. **Clonar o colocar** este repositorio dentro de tu directorio local de servidores (por ejemplo, `htdocs` si utilizas **XAMPP**):
   ```text
   C:\xampp\htdocs\Go-NIC\

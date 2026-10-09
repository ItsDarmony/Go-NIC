
# GO NIC - Plataforma Turística de Nicaragua

"Go Nic" es una plataforma web desarrollada para fomentar, explorar y conectar a los usuarios con los mejores destinos, hoteles y experiencias turísticas de Nicaragua, impulsando así el crecimiento de los emprendedores locales.

---

##  Características Principales

* **Sistema de Autenticación Completo:** Registro de usuarios con validación mediante código de 6 dígitos enviado por correo electrónico (usando PHPMailer y SMTP de Gmail), encriptación de contraseñas (`password_hash`) e inicio de sesión seguro.
* **Gestión de Perfil:** Panel de usuario personalizado para recuperar dinámicamente la información y credenciales tras iniciar sesión.
* **Catálogo de Hoteles:** Más de 40 alojamientos distribuidos y categorizados por regiones turísticas del país.
* **Diseño Adaptativo y Modo Oscuro:** Interfaz moderna con soporte para cambio de tema (Claro/Oscuro) y multilingüe (Español/Inglés).

---

##  Tecnologías Utilizadas

| Componente | Tecnología / Herramienta |
| :--- | :--- |
| **Frontend** | HTML5, CSS3, JavaScript (gestión de estado mediante `localStorage`) |
| **Backend** | PHP (Programación orientada a lógica de servidores y procesamiento de formularios) |
| **Base de Datos** | MySQL (Manejo de conexiones seguras mediante PDO) |
| **Librerías / API** | PHPMailer (Correo de verificación), Google Fonts (Tipografía Poppins) |

---

##  Instalación y Configuración Local

1. **Clonar o descargar** este repositorio dentro de tu directorio local de servidores (por ejemplo, `htdocs` si utilizas XAMPP):
   ```bash
   C:\xampp\htdocs\GO-NIC
   ```
2. **Instalar dependencias** (PHPMailer) con Composer:
   ```bash
   composer install
   ```
3. **Configurar la base de datos** importando `gonic_db.sql` en tu MySQL/MariaDB local y ajustando `BACKEND/conexion.php`.
4. **Levantar el sitio** (opción rápida con el servidor embebido de PHP y el router incluido):
   ```bash
   php -S localhost:8000 router.php
   ```
5. Abrir `http://localhost:8000` en el navegador.

---

##  Arquitectura del Despliegue en Azure

El proyecto está diseñado para desplegarse en **Microsoft Azure App Service** (Web App PHP), con despliegue continuo mediante **GitHub Actions**: cada `push` a la rama `main` compila y publica automáticamente.

### Especificaciones del Entorno
* **IP Pública de VM (Alternativa):** `68.155.155.88`
* **Nombre de la App:** `Gonic`
* **Servicio (Hosting):** Azure App Service - Web App (`*.azurewebsites.net`)
* **URL en producción:** `https://68.155.155.88.sslip.io/`
* **Pipeline CI/CD:** GitHub Actions (`.github/workflows/main_gonic.yml`)
* **Base de datos:** Externa, alojada en **Railway** (conectada por red pública)
* **Correo transaccional:** SMTP de Gmail mediante PHPMailer

---

##  Estructura Relevante del Repositorio

```text
ROOT/
├── .github/workflows/main_gonic.yml  # Pipeline de CI/CD hacia Azure
├── index.php                         # Página principal (PHP)
├── router.php                        # Router para servidor embebido (Desarrollo)
├── composer.json / composer.lock     # Dependencias del proyecto
├── BACKEND/
│   ├── conexion.php                  # Conexión PDO a MySQL (Railway)
│   ├── login_backend.php             # Lógica de inicio de sesión
│   ├── registro_backend.php          # Lógica de registro de usuarios
│   ├── verificar_codigo.php          # Activación de cuenta por código
│   └── mailer.php                    # Configuración de envíos SMTP
├── FRONT/
│   └── assets / isologo/             # Estilos CSS, scripts e imágenes
└── gonic_db.sql                      # Esquema y respaldo de la base de datos
```

---

##  Pipeline de Despliegue (GitHub Actions)

El archivo `.github/workflows/main_gonic.yml` automatiza el flujo en dos etapas principales:

1. **Job "Build":**
   * Clona el repositorio (`actions/checkout@v4`).
   * Configura PHP 8.x (`shivammathur/setup-php@v2`).
   * Valida e instala dependencias con Composer (`composer install --prefer-dist --no-progress`).
   * Empaqueta y sube el artefacto (`actions/upload-artifact@v4`).

2. **Job "Deploy":**
   * Descarga el artefacto empaquetado.
   * Inicia sesión en Azure mediante **OpenID Connect (OIDC)** y credenciales federadas (`azure/webapps-deploy@v3`).
   * Publica el paquete en el App Service de producción (`Gonic`).

---

##  Configuración de Base de Datos (Railway)

La conexión PDO configurada en `BACKEND/conexion.php` utiliza los siguientes parámetros:

* **Host:** `mysql.railway.internal` (o dominio público provisto por Railway)
* **Puerto:** `3306`
* **Base de datos:** `railway`
* **Usuario:** `root`
* **Driver:** PDO MySQL (`charset=utf8mb4`)

### Tabla Principal (`usuarios`)
* `id` (INT, Primary Key)
* `nombre` (VARCHAR)
* `apellido` (VARCHAR)
* `correo` (VARCHAR, Unique)
* `password` (VARCHAR, Hashed)
* `codigo_verificacion` (VARCHAR)
* `estado` (ENUM: 'pendiente' / 'activo')
* `fecha_registro` (TIMESTAMP)

---

##  Notas de Seguridad Importantes

1. **Credenciales Sensibles:** Evita mantener contraseñas en texto plano (`hardcoded`) en archivos de producción como `conexion.php` o `mailer.php`.
2. **Variables de Entorno:** Se recomienda migrar las credenciales hacia **App Settings / Connection Strings** en el Portal de Azure o utilizar **Azure Key Vault**, leyéndolas en tiempo de ejecución con `getenv()`.
3. **Firewall:** Restringe las reglas de acceso en tu proveedor de base de datos externo (Railway) exclusivamente a las IPs de salida de tu App Service en Azure.

---

##  Cómo Desplegar (Flujo Normal)

1. Realiza tus cambios de código localmente:
   ```bash
   git add .
   git commit -m "Actualización de características"
   git push origin main
   ```
2. Monitorea el progreso en **GitHub -> Actions**, o bien ejecútalo manualmente haciendo clic en *"Run workflow"*.
3. Verifica la disponibilidad del sitio ingresando a la URL oficial de tu App Service en Azure.

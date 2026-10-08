GO NIC - Plataforma Turistica de Nicaragua
Go Nic es una plataforma web desarrollada para fomentar, explorar y conectar a los usuarios con los mejores destinos, hoteles y experiencias turisticas de Nicaragua.
Caracteristicas Principales
Sistema de Autenticacion Completo: Registro de usuarios con validacion mediante codigo de 6 digitos enviado por correo electronico (usando PHPMailer y SMTP de Gmail), encriptacion de contraseñas (password_hash con BCRYPT) e inicio de sesion seguro.
Gestion de Perfil: Panel de usuario personalizado que recupera dinamicamente el nombre y correo electronico tras iniciar sesion.
Catalogo de Hoteles: Mas de 40 alojamientos distribuidos y categorizados por regiones turisticas del pais.
Diseno Adaptativo y Modo Oscuro: Interfaz moderna de pantalla dividida con soporte para cambio de tema (Claro/Oscuro) y multilenguaje (Espanol/Ingles).
Tecnologias Utilizadas
Frontend: HTML5, CSS3, JavaScript (Vanilla con gestion de estado mediante LocalStorage).
Backend: PHP (Programacion orientada a logica de servidores y procesamiento de formularios).
Base de Datos: MySQL (Manejo de conexiones seguras mediante PDO).
Librerias / Herramientas:
PHPMailer (Envio de correos de verificacion).
Google Fonts (Tipografia Poppins).
Instalacion y Configuracion Local
Clona este repositorio o colocalo dentro de tu directorio local de servidores (por ejemplo, htdocs si utilizas XAMPP).
Configura tu base de datos en MySQL e importa el archivo SQL correspondiente.
Actualiza los parametros de conexion en el archivo de configuracion (BACKEND/conexion.php).
Configura tus credenciales de correo (SMTP y contraseña de aplicacion) para el funcionamiento del sistema de registro y codigos de verificacion.
Abre el proyecto en tu navegador a traves de tu servidor local (ej. http://localhost/Go-NIC/HTML/index.html).
Despliegue en Produccion (Ej. InfinityFree)
Exporta tu base de datos local desde phpMyAdmin en formato .sql.
Ingresa al panel de control de tu hosting gratuito, crea una base de datos MySQL y anota los datos de acceso (servidor, nombre de base de datos, usuario y contraseña).
Importa el archivo .sql en el phpMyAdmin del hosting.
Modifica las credenciales de conexion en el archivo BACKEND/conexion.php para apuntar al servidor remoto del hosting.
Sube todos los archivos del proyecto mediante un cliente FTP o el administrador de archivos dentro de la carpeta publica (htdocs).

Desarrollado como proyecto enfocado en la promocion del turismo y la gestion web moderna.

<?php
// Migración: agrega la columna `tipo_usuario` a `turistas` y crea la tabla `emprendedor`.
// Ejecutar por CLI:  php migracion_emprendedor.php
if (php_sapi_name() !== 'cli') {
    http_response_code(403);
    exit('Solo se puede ejecutar por línea de comandos.');
}

require_once __DIR__ . '/conexion.php';

try {
    // 1) Columna tipo_usuario en turistas
    $col = $pdo->query("SELECT COUNT(*) FROM information_schema.COLUMNS
                        WHERE TABLE_SCHEMA = DATABASE()
                          AND TABLE_NAME = 'turistas'
                          AND COLUMN_NAME = 'tipo_usuario'")->fetchColumn();

    if ((int)$col === 0) {
        $pdo->exec("ALTER TABLE `turistas`
                    ADD COLUMN `tipo_usuario` ENUM('turista','emprendedor')
                    NOT NULL DEFAULT 'turista' AFTER `estado`");
        echo "OK: columna `tipo_usuario` agregada a `turistas`.\n";
    } else {
        echo "INFO: la columna `tipo_usuario` ya existía.\n";
    }

    // 2) Tabla emprendedor
    $pdo->exec("CREATE TABLE IF NOT EXISTS `emprendedor` (
        `id` int(11) NOT NULL AUTO_INCREMENT,
        `turista_id` int(11) NOT NULL,
        `cedula` varchar(30) NOT NULL,
        `telefono` varchar(30) NOT NULL,
        `departamento` varchar(60) NOT NULL,
        `municipio` varchar(80) NOT NULL,
        `nombre_negocio` varchar(150) NOT NULL,
        `tipo_negocio` varchar(50) NOT NULL,
        `descripcion` text DEFAULT NULL,
        `direccion` varchar(200) DEFAULT NULL,
        `sitio_web` varchar(200) DEFAULT NULL,
        `estado` enum('pendiente','activo') NOT NULL DEFAULT 'pendiente',
        `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp(),
        PRIMARY KEY (`id`),
        UNIQUE KEY `cedula` (`cedula`),
        UNIQUE KEY `turista_id` (`turista_id`),
        CONSTRAINT `emprendedor_turista_fk`
            FOREIGN KEY (`turista_id`) REFERENCES `turistas` (`id`) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci");
    echo "OK: tabla `emprendedor` lista.\n";

    echo "Migración completada.\n";
} catch (PDOException $e) {
    echo "ERROR: " . $e->getMessage() . "\n";
}

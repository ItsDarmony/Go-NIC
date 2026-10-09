<?php
error_reporting(0);
header('Content-Type: application/json; charset=utf-8');

require_once 'conexion.php';
require_once 'mailer.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["status" => "error", "message" => "Método no permitido."]);
    exit;
}

$correo = trim($_POST['email'] ?? '');

if (empty($correo)) {
    echo json_encode(["status" => "error", "message" => "Falta el correo electrónico."]);
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT id, nombre, apellido, estado FROM turistas WHERE correo = ?");
    $stmt->execute([$correo]);
    $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$usuario) {
        echo json_encode(["status" => "error", "message" => "Ese correo no está registrado."]);
        exit;
    }

    if ($usuario['estado'] === 'activo') {
        echo json_encode(["status" => "error", "message" => "La cuenta ya está verificada. Puedes iniciar sesión."]);
        exit;
    }

    $codigo_verificacion = rand(100000, 999999);
    $update = $pdo->prepare("UPDATE turistas SET codigo_verificacion = ? WHERE id = ?");
    $update->execute([$codigo_verificacion, $usuario['id']]);

    enviarCodigoVerificacion($usuario['nombre'] . ' ' . $usuario['apellido'], $correo, $codigo_verificacion);

    echo json_encode(["status" => "success", "message" => "Te enviamos un nuevo código de verificación."]);
} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => "Error en el servidor o correo: " . $e->getMessage()]);
}

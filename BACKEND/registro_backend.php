<?php
error_reporting(0);
header('Content-Type: application/json; charset=utf-8');

require_once 'conexion.php';
require_once 'mailer.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["status" => "error", "message" => "Método no permitido."]);
    exit;
}

$nombre = trim($_POST['nombre'] ?? '');
$apellido = trim($_POST['apellido'] ?? '');
$correo = trim($_POST['email'] ?? '');
$password_raw = $_POST['password'] ?? '';

if (empty($nombre) || empty($apellido) || empty($correo) || empty($password_raw)) {
    echo json_encode(["status" => "error", "message" => "Todos los campos son obligatorios."]);
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT id, estado, nombre, apellido FROM turistas WHERE correo = ?");
    $stmt->execute([$correo]);
    $existente = $stmt->fetch(PDO::FETCH_ASSOC);

    // Cuenta ya activada: no se puede volver a registrar.
    if ($existente && $existente['estado'] === 'activo') {
        echo json_encode(["status" => "error", "message" => "El correo electrónico ya está registrado."]);
        exit;
    }

    $codigo_verificacion = rand(100000, 999999);

    if ($existente) {
        // Cuenta pendiente: se reenvía un código nuevo sin alterar la contraseña original.
        $stmt = $pdo->prepare("UPDATE turistas SET codigo_verificacion = ? WHERE id = ?");
        $stmt->execute([$codigo_verificacion, $existente['id']]);
        $nombre = $existente['nombre'];
        $apellido = $existente['apellido'];
        $reenvio = true;
    } else {
        $password_hash = password_hash($password_raw, PASSWORD_BCRYPT);
        $stmt = $pdo->prepare("INSERT INTO turistas (nombre, apellido, correo, password, codigo_verificacion, estado) VALUES (?, ?, ?, ?, ?, 'pendiente')");

        if (!$stmt->execute([$nombre, $apellido, $correo, $password_hash, $codigo_verificacion])) {
            echo json_encode(["status" => "error", "message" => "Error al registrar en la base de datos."]);
            exit;
        }
        $reenvio = false;
    }

    enviarCodigoVerificacion("$nombre $apellido", $correo, $codigo_verificacion);

    echo json_encode([
        "status" => "success",
        "message" => $reenvio
            ? "Ya tenías un registro pendiente. Te enviamos un nuevo código de verificación."
            : "Registro exitoso. Revisa tu correo para verificar tu cuenta."
    ]);
} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => "Error en el servidor o correo: " . $e->getMessage()]);
}

<?php
error_reporting(0);
header('Content-Type: application/json; charset=utf-8');
require_once 'conexion.php';

$email = trim($_POST['email'] ?? $_GET['email'] ?? '');

if ($email === '') {
    echo json_encode(["status" => "error", "message" => "Falta el correo electrónico."]);
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT id, nombre, apellido, correo, estado, tipo_usuario, fecha_registro
                           FROM turistas WHERE correo = ?");
    $stmt->execute([$email]);
    $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$usuario) {
        echo json_encode(["status" => "error", "message" => "Cuenta no encontrada."]);
        exit;
    }

    $emprendedor = null;
    if ($usuario['tipo_usuario'] === 'emprendedor') {
        $stmt2 = $pdo->prepare("SELECT cedula, telefono, departamento, municipio, nombre_negocio,
                                       tipo_negocio, descripcion, direccion, sitio_web, estado, fecha_registro
                                FROM emprendedor WHERE turista_id = ?");
        $stmt2->execute([$usuario['id']]);
        $emprendedor = $stmt2->fetch(PDO::FETCH_ASSOC) ?: null;
    }

    echo json_encode([
        "status"      => "success",
        "usuario"     => $usuario,
        "emprendedor" => $emprendedor
    ]);
} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => "Error en el servidor: " . $e->getMessage()]);
}

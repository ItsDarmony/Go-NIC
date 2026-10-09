<?php
error_reporting(0);
header('Content-Type: application/json; charset=utf-8');
require_once 'conexion.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["status" => "error", "message" => "Método no permitido."]);
    exit;
}

$email          = trim($_POST['email'] ?? '');
$cedula         = trim($_POST['cedula'] ?? '');
$telefono       = trim($_POST['telefono'] ?? '');
$departamento   = trim($_POST['departamento'] ?? '');
$municipio      = trim($_POST['municipio'] ?? '');
$nombre_negocio = trim($_POST['nombre_negocio'] ?? '');
$tipo_negocio   = trim($_POST['tipo_negocio'] ?? '');
$descripcion    = trim($_POST['descripcion'] ?? '');
$direccion      = trim($_POST['direccion'] ?? '');
$sitio_web      = trim($_POST['sitio_web'] ?? '');

// Campos obligatorios
$requeridos = [
    'email'          => $email,
    'cedula'         => $cedula,
    'telefono'       => $telefono,
    'departamento'   => $departamento,
    'municipio'      => $municipio,
    'nombre_negocio' => $nombre_negocio,
    'tipo_negocio'   => $tipo_negocio,
    'descripcion'    => $descripcion,
];
foreach ($requeridos as $campo => $valor) {
    if ($valor === '') {
        echo json_encode(["status" => "error", "message" => "Hay campos obligatorios sin completar."]);
        exit;
    }
}

// Validación básica de cédula (solo dígitos, guiones y espacios)
if (!preg_match('/^[0-9\- ]{10,20}$/', $cedula)) {
    echo json_encode(["status" => "error", "message" => "El número de cédula no es válido."]);
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT id, tipo_usuario FROM turistas WHERE correo = ?");
    $stmt->execute([$email]);
    $turista = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$turista) {
        echo json_encode(["status" => "error", "message" => "No se encontró tu cuenta. Vuelve a iniciar sesión."]);
        exit;
    }

    // ¿Ya tiene perfil de emprendedor?
    $check = $pdo->prepare("SELECT id FROM emprendedor WHERE turista_id = ?");
    $check->execute([$turista['id']]);
    if ($check->fetch()) {
        echo json_encode(["status" => "error", "message" => "Ya tienes un perfil de emprendedor registrado."]);
        exit;
    }

    // ¿La cédula ya está registrada por otro emprendedor?
    $checkCed = $pdo->prepare("SELECT id FROM emprendedor WHERE cedula = ?");
    $checkCed->execute([$cedula]);
    if ($checkCed->fetch()) {
        echo json_encode(["status" => "error", "message" => "Ese número de cédula ya está registrado."]);
        exit;
    }

    $pdo->beginTransaction();

    $insert = $pdo->prepare("INSERT INTO emprendedor
        (turista_id, cedula, telefono, departamento, municipio, nombre_negocio, tipo_negocio, descripcion, direccion, sitio_web)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $insert->execute([
        $turista['id'], $cedula, $telefono, $departamento, $municipio,
        $nombre_negocio, $tipo_negocio, $descripcion, $direccion, $sitio_web
    ]);

    $update = $pdo->prepare("UPDATE turistas SET tipo_usuario = 'emprendedor' WHERE id = ?");
    $update->execute([$turista['id']]);

    $pdo->commit();

    echo json_encode([
        "status"  => "success",
        "message" => "¡Felicidades! Ya eres emprendedor de GO NIC.",
        "emprendedor" => [
            "cedula"         => $cedula,
            "telefono"       => $telefono,
            "departamento"   => $departamento,
            "municipio"      => $municipio,
            "nombre_negocio" => $nombre_negocio,
            "tipo_negocio"   => $tipo_negocio,
            "descripcion"    => $descripcion,
            "direccion"      => $direccion,
            "sitio_web"      => $sitio_web
        ]
    ]);
} catch (Exception $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }
    echo json_encode(["status" => "error", "message" => "Error en el servidor: " . $e->getMessage()]);
}

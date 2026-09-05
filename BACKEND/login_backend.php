<?php
error_reporting(0);
header('Content-Type: application/json; charset=utf-8');
require_once 'conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';

    if (empty($email) || empty($password)) {
        echo json_encode(['status' => 'error', 'message' => 'Por favor completa todos los campos.']);
        exit;
    }

    try {
        $stmt = $pdo->prepare("SELECT * FROM turistas WHERE correo = :correo");
        $stmt->execute(['correo' => $email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$user) {
            echo json_encode(['status' => 'error', 'message' => 'El correo electrónico no está registrado.']);
            exit;
        }

        if ($user['estado'] !== 'activo') {
            echo json_encode(['status' => 'error', 'message' => 'Debes verificar tu cuenta mediante el código enviado a tu correo.']);
            exit;
        }

        if (password_verify($password, $user['password'])) {
            echo json_encode([
                'status' => 'success', 
                'message' => 'Bienvenido',
                'nombre' => $user['nombre'] . ' ' . $user['apellido'],
                'email' => $user['correo']
            ]);
            exit;
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Contraseña incorrecta. Inténtalo de nuevo.']);
        }

    } catch (Exception $e) {
        echo json_encode(['status' => 'error', 'message' => 'Error en el servidor: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Método no permitido.']);
}
?>
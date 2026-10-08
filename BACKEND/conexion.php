<?php
$host = 'reseau.proxy.rlwy.net';
$dbname = 'railway';
$username = 'root';
$password = 'WCbhEGtNRzZtWPhLLgGPrEVpsDRYitWh';
$port = '37101'; // Importante incluir el puerto personalizado de Railway

try {
    $pdo = new PDO("mysql:host=$host;port=$port;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(["status" => "error", "message" => "Error de conexión: " . $e->getMessage()]);
    exit;
}
?>
<?php
// Envío del correo con el código de verificación de GO NIC.
// Se usa desde registro_backend.php y reenviar_codigo.php.
require_once __DIR__ . '/../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

function enviarCodigoVerificacion($nombre, $correo, $codigo_verificacion) {
    $mail = new PHPMailer(true);

    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'calerocris31@gmail.com';
    $mail->Password   = 'dsmb sflc qwxr gbig';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    $mail->SMTPOptions = array(
        'ssl' => array(
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
        )
    );

    $mail->setFrom('calerocris31@gmail.com', 'GO NIC - Turismo Nicaragua');
    $mail->addAddress($correo, $nombre);

    $mail->isHTML(true);
    $mail->CharSet = 'UTF-8';
    $mail->Subject = ' ¡Bienvenido a GO NIC! Código de verificación';

    $mail->Body = '
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <style>
            body {
                background-color: #f4f7f6;
                font-family: "Poppins", Arial, sans-serif;
                margin: 0;
                padding: 0;
            }
            .email-wrapper {
                max-width: 600px;
                margin: 30px auto;
                background: #0D231C;
                border-radius: 16px;
                overflow: hidden;
                box-shadow: 0 8px 24px rgba(0,0,0,0.15);
                color: #E8F1EE;
            }
            .email-header {
                background-color: #081712;
                padding: 30px;
                text-align: center;
                border-bottom: 2px solid rgba(218, 231, 153, 0.2);
            }
            .email-header h1 {
                margin: 0;
                font-size: 28px;
                color: #FFFFFF;
                font-weight: 800;
                letter-spacing: 1px;
            }
            .email-header h1 span {
                color: #DAE799;
            }
            .email-body {
                padding: 40px 30px;
                text-align: center;
            }
            .email-body h2 {
                color: #DAE799;
                font-size: 22px;
                margin-top: 0;
            }
            .email-body p {
                font-size: 15px;
                color: rgba(232, 241, 238, 0.85);
                line-height: 1.6;
                margin-bottom: 25px;
            }
            .code-box {
                background-color: #0D3C30;
                border: 1px solid #DAE799;
                color: #DAE799;
                font-size: 36px;
                font-weight: 700;
                letter-spacing: 6px;
                padding: 15px 25px;
                display: inline-block;
                border-radius: 12px;
                margin: 15px 0 30px 0;
            }
            .email-footer {
                background-color: #081712;
                padding: 20px;
                text-align: center;
                font-size: 12px;
                color: rgba(232, 241, 238, 0.5);
                border-top: 1px solid rgba(255,255,255,0.05);
            }
        </style>
    </head>
    <body>
        <div class="email-wrapper">
            <div class="email-header">
                <h1>GO<span>NIC</span></h1>
            </div>
            <div class="email-body">
                <h2>¡Hola, ' . htmlspecialchars($nombre) . '!</h2>
                <p>Estás a un solo paso de descubrir la tierra de lagos y volcanes de una manera única. Utiliza el siguiente código de seguridad para verificar tu cuenta en GO NIC:</p>

                <div class="code-box">' . $codigo_verificacion . '</div>

                <p style="font-size: 13px; color: rgba(232, 241, 238, 0.6);">Si no solicitaste este registro, puedes ignorar este mensaje de manera segura.</p>
            </div>
            <div class="email-footer">
                <p>&copy; 2026 GO NIC Nicaragua. Todos los derechos reservados.</p>
                <p>Plataforma turística oficial - Hackathon & Feria STEM UNICIT</p>
            </div>
        </div>
    </body>
    </html>';

    $mail->send();
}

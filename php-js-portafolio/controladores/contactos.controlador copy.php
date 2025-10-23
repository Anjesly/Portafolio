<?php

declare(strict_types = 1);

class Contactos{

    // Función para sanitizar datos
    private function sanitizar($dato) {
        $dato = trim($dato);
        $dato = stripslashes($dato);
        $dato = htmlspecialchars($dato);
        return $dato;
    }


    //  Enviar email
    public function ctrSendEmail(string $nombre, string $email, string $asunto, string $mensaje){
        
        ini_set('max_execution_time', 0);

		require_once '../../extensiones/PHPMailer/PHPMailerAutoload.php';

        // Sanitizar los datos antes de enviar
        $nombre = $this->sanitizar($nombre);
        $email = $this->sanitizar($email);
        $asunto = $this->sanitizar($asunto);
        $mensaje = $this->sanitizar($mensaje);
        
        // Validar email
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            die("Email no válido");
        }

        $asunto = "Nuevo mensaje de contacto: " . $asunto;

        $mail_host = MAIL_HOST;
        $mail_port = MAIL_PORT;
        $mail_user = MAIL_USER;
        $mail_pass = MAIL_PASS;
        $mail_from_name = MAIL_FROM_NAME;
        $mail_to_name = MAIL_TO_NAME;
        $mail_to_email = MAIL_TO_EMAIL;

        $mail = new PHPMailer;
        $mail->isSMTP();
        $mail->Host = $mail_host;
        $mail->Port = $mail_port;
        $mail->SMTPAuth = true;
        $mail->SMTPKeepAlive = true; 
        $mail->SMTPSecure = 'tls';
        $mail->Username = $mail_user;
        $mail->Password = $mail_pass;
        $mail->setFrom($mail_user, $mail_from_name);    
        $mail->addAddress($mail_to_email, $mail_to_name);
        //$mail->addReplyTo($email, $nombre);
        $mail->Subject = $asunto;
        $mail->addReplyTo($mail_user, $mail_from_name);

        $cuerpo = $this->createBodyEmail($nombre, $email, $asunto, $mensaje);

        $mail->msgHTML($cuerpo);
        $mail->AltBody = 'This is a plain-text message body';
        $mail->addAttachment('images/phpmailer_mini.png');
        if ($mail->send()) {
			// Limpiamos los datos par próximos envíos
			$mail->clearAddresses();
			$mail->clearAttachments();
            $estado = 'success';
            $mensaje = "El mensaje se ha enviado correctamente";

            return array('estado' => $estado, 'mensaje' => $mensaje);
		} else{
			echo "Mailer Error:" . $mail->ErrorInfo . "<br />";
			$mail->clearAddresses();
			$mail->clearAttachments();
            
            return array(
                'estado' => 'error', 
                'mensaje' => "Error al enviar el mensaje. Por favor intenta nuevamente."
            );
		}
    }  

    private function createBodyEmail(string $nombre, string $email, string $asunto, string $mensaje){
        
        // Cabeceras para formato HTML
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        $headers .= "From: $nombre <$email>" . "\r\n";
        $headers .= "Reply-To: $email" . "\r\n";

        // Cuerpo del mensaje en HTML
        $cuerpo = "
        <!DOCTYPE html>
        <html lang='es'>
        <head>
            <meta charset='UTF-8'>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                }
                .header {
                    background-color: #2c3e50;
                    color: white;
                    padding: 20px;
                    text-align: center;
                    border-radius: 5px 5px 0 0;
                }
                .content {
                    background-color: #f9f9f9;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-top: none;
                    border-radius: 0 0 5px 5px;
                }
                .field {
                    margin-bottom: 15px;
                    padding: 10px;
                    background-color: white;
                    border-left: 4px solid #3498db;
                    border-radius: 3px;
                }
                .field-label {
                    font-weight: bold;
                    color: #2c3e50;
                    display: block;
                    margin-bottom: 5px;
                }
                .field-value {
                    color: #555;
                }
                .mensaje {
                    background-color: #e8f4fd;
                    border-left: 4px solid #3498db;
                    padding: 15px;
                    margin-top: 20px;
                    border-radius: 3px;
                }
                .footer {
                    text-align: center;
                    margin-top: 20px;
                    padding: 15px;
                    background-color: #ecf0f1;
                    border-radius: 5px;
                    font-size: 12px;
                    color: #7f8c8d;
                }
            </style>
        </head>
        <body>
            <div class='header'>
                <h1>Nuevo Mensaje de Contacto</h1>
            </div>
            
            <div class='content'>
                <div class='field'>
                    <span class='field-label'>Nombre:</span>
                    <span class='field-value'>$nombre</span>
                </div>
                
                <div class='field'>
                    <span class='field-label'>Email:</span>
                    <span class='field-value'>
                        <a href='mailto:$email' style='color: #3498db; text-decoration: none;'>$email</a>
                    </span>
                </div>
                
                <div class='field'>
                    <span class='field-label'>Asunto:</span>
                    <span class='field-value'>$asunto</span>
                </div>
                
                <div class='mensaje'>
                    <span class='field-label' style='color: #2980b9;'>Mensaje:</span>
                    <div class='field-value' style='margin-top: 10px; white-space: pre-line;'>$mensaje</div>
                </div>
            </div>
            
            <div class='footer'>
                <p>Este mensaje fue enviado desde el formulario de contacto de tu portafolio (Windows).</p>
                <p>Fecha: " . date('d/m/Y H:i:s') . "</p>
            </div>
        </body>
        </html>
        ";

        return $cuerpo;
    }
    
}

?>
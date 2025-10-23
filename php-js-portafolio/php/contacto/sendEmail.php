<?php

//require_once "../../config/db.php";
//require_once "../../config/conexion.php";

require_once "../../config/database.php";

//  CONTROLADORES
require_once "../../controladores/contactos.controlador.php";

ini_set('max_execution_time', 0);
date_default_timezone_set('America/Caracas');

if (empty($_POST['name']) || empty($_POST['email']) || empty($_POST['subject']) || empty($_POST['message'])) {
    $estado = "error";	
    $mensaje = "Datos vacíos, todos los campos son obligatorios";
}else{
    $nombre = $_POST['name'];
    $email = $_POST['email'];
    $asunto = $_POST['subject'];
    $mensaje = $_POST['message'];

    $contacto = new Contactos();
    $email = $contacto->ctrSendEmail($nombre, $email, $asunto, $mensaje);
    $estado = $email['estado'];
    $mensaje = $email['mensaje']; 
}


header('Content-Type: application/json');

$datos = array(
    'estado' => $estado,
    'mensaje' => $mensaje,   
);
//Devolvemos el array pasado a JSON como objeto
echo json_encode($datos, JSON_FORCE_OBJECT);

?>
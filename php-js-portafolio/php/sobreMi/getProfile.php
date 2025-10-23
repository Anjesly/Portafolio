<?php

//require_once "../../config/db.php";
//require_once "../../config/conexion.php";

require_once "../../config/database.php";

//  CONTROLADORES
require_once "../../controladores/sobremi.controlador.php";

// MODELOS
require_once "../../modelos/sobremi.modelo.php";

ini_set('max_execution_time', 0);
date_default_timezone_set('America/Caracas');

$id = 1;

$sobreMi = new SobreMI();
list($nombres, $edad, $direccion, $resumen, $email, $telefono, 
     $imagen, $curriculum, $freelance, $titulo, $website) = $sobreMi->ctrGetPerfil($id);

$freelance = $freelance == 1 ? 'Disponible' : 'No Disponible';

header('Content-Type: application/json');

$datos = array(
    'nombres' => $nombres,
    'edad' => $edad,   
    'direccion' => $direccion,
    'resumen' => $resumen,
    'email' => $email,
    'telefono' => $telefono,
    'imagen' => $imagen,
    'curriculum' => $curriculum,
    'freelance' => $freelance,
    'titulo' => $titulo,
    'website' => $website
);
//Devolvemos el array pasado a JSON como objeto
echo json_encode($datos, JSON_FORCE_OBJECT);

?>
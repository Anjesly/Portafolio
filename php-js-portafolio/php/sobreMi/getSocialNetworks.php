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

$estatus = '1';

$sobreMi = new SobreMI();
list($github, $linkedin, $instagram, $threads, $tiktok, $telegram) = $sobreMi->ctrGetSocialNetworks($estatus);

header('Content-Type: application/json');

$datos = array(
    'github' => $github,
    'linkedin' => $linkedin,
    'instagram' => $instagram,
    'threads' => $threads,
    'tiktok' => $tiktok,
    'telegram' => $telegram
);
//Devolvemos el array pasado a JSON como objeto
echo json_encode($datos, JSON_FORCE_OBJECT);

?>
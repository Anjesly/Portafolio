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
$experienceList = $sobreMi->ctrGetWorkExperience($estatus);

echo json_encode($experienceList);

?>
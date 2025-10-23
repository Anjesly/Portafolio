<?php

//require_once "../../config/db.php";
//require_once "../../config/conexion.php";

require_once "../../config/database.php";

//  CONTROLADORES
require_once "../../controladores/proyecto.controlador.php";

// MODELOS
require_once "../../modelos/proyecto.modelo.php";

ini_set('max_execution_time', 0);
date_default_timezone_set('America/Caracas');

$nombre = "";

$proyecto = new Proyectos();
$projectsList = $proyecto->ctrGetProjects($nombre);

echo json_encode($projectsList);

?>
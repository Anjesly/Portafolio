<?php

/// Evitar inclusiones múltiples
if (!defined('PORTFOLIO_LOADED')) {
    define('PORTFOLIO_LOADED', true);
    
    // Cargar configuración inicial
    require_once __DIR__ . "/config/database.php";
    
    // CONTROLADORES
    require_once "controladores/Plantilla.controlador.php";
    
    $plantilla = new ControladorPlantilla();
    $plantilla->ctrPlantilla();
}

?>
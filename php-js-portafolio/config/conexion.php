<?php

    // Verificar que las constantes están definidas
    if (!defined('DB_HOST') || !defined('DB_USER') || !defined('DB_PASS') || !defined('DB_NAME')) {
        die("Error: Constantes de base de datos no definidas correctamente.");
    }

    # Conectar a la base de datos
    $con = @mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);

    if(!$con){
        die("Imposible conectarse: " . mysqli_connect_error());
    }

    // Establecer el charset
    if (!mysqli_set_charset($con, DB_CHARSET)) {
        die("Error cargando el conjunto de caracteres: " . mysqli_error($con));
    }

    if (mysqli_connect_errno()) {
        die("Conexión falló: ".mysqli_connect_errno()." : ". mysqli_connect_error());
    }

	
?>

<?php

// Evitar que se cargue múltiples veces
if (defined('ENV_LOADED')) {
    return;
}
define('ENV_LOADED', true);

function cargarVariablesEntorno() {
    $envFile = __DIR__ . '/../.env';
    
    if (!file_exists($envFile)) {
        // Si no existe .env, usar valores por defecto
        return [
            'DB_HOST' => 'localhost',
            'DB_NAME' => 'portafolio', 
            'DB_USER' => 'root',
            'DB_PASS' => '',
            'DB_CHARSET' => 'utf8mb4',
        ];
    }
    
    $variables = [];
    $lineas = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    
    foreach ($lineas as $linea) {
        $linea = trim($linea);
        if (empty($linea) || strpos($linea, '#') === 0) {
            continue;
        }
        
        if (strpos($linea, '=') !== false) {
            list($nombre, $valor) = explode('=', $linea, 2);
            $nombre = trim($nombre);
            $valor = trim($valor);
            $valor = trim($valor, '"\'');
            
            $variables[$nombre] = $valor;
            putenv("$nombre=$valor");
            $_ENV[$nombre] = $valor;
        }
    }
    
    return $variables;
}

// Cargar variables
$envVars = cargarVariablesEntorno();

// Definir constantes directamente
define('DB_HOST', $envVars['DB_HOST'] ?? 'localhost');
define('DB_NAME', $envVars['DB_NAME'] ?? 'portafolio');
define('DB_USER', $envVars['DB_USER'] ?? 'root');
define('DB_PASS', $envVars['DB_PASS'] ?? '');
define('DB_CHARSET', $envVars['DB_CHARSET'] ?? 'utf8mb4');

?>
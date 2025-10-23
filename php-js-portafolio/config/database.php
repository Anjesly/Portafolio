<?php

// Evitar múltiples inclusiones
if (defined('DATABASE_LOADED')) {
    return;
}
define('DATABASE_LOADED', true);

// =============================================
// 1. CARGAR VARIABLES DE ENTORNO
// =============================================
function cargarEnv() {
    $envFile = __DIR__ . '/../.env';
    
    if (!file_exists($envFile)) {
        // Usar valores por defecto si .env no existe
        return [
            'DB_HOST' => 'localhost',
            'DB_NAME' => 'portafolio', 
            'DB_USER' => 'root',
            'DB_PASS' => '',
            'DB_CHARSET' => 'utf8mb4',
            'API_KEY_WEATHER' => '',
            'MAIL_HOST' => 'mail.carlospcssoluciones.com.ve',
            'MAIL_PORT' => '587',
            'MAIL_USER' => 'portafolio@carlospcssoluciones.com.ve',
            'MAIL_PASS' => '',
            'MAIL_FROM_NAME' => 'Portafolio Windows',
            'MAIL_TO_NAME' => 'Carlos Flores',
            'MAIL_TO_EMAIL' => 'cflores0608@gmail.com'
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
        }
    }
    
    return $variables;
}

// Cargar variables
$envVars = cargarEnv();

// =============================================
// 2. DEFINIR CONSTANTES DE BASE DE DATOS
// =============================================
define('DB_HOST', $envVars['DB_HOST'] ?? 'localhost');
define('DB_NAME', $envVars['DB_NAME'] ?? 'portafolio');
define('DB_USER', $envVars['DB_USER'] ?? 'root');
define('DB_PASS', $envVars['DB_PASS'] ?? '');
define('DB_CHARSET', $envVars['DB_CHARSET'] ?? 'utf8mb4');
define('API_KEY_WEATHER', $envVars['API_KEY_WEATHER'] ?? '');

// =============================================
// 3. DEFINIR CONSTANTES DE EMAIL
// =============================================
define('MAIL_HOST', $envVars['MAIL_HOST'] ?? 'mail.carlospcssoluciones.com.ve');
define('MAIL_PORT', $envVars['MAIL_PORT'] ?? 587);
define('MAIL_USER', $envVars['MAIL_USER'] ?? 'remitente@carlospcssoluciones.com.ve');
define('MAIL_PASS', $envVars['MAIL_PASS'] ?? '');
define('MAIL_FROM_NAME', $envVars['MAIL_FROM_NAME'] ?? 'Portafolio Windows');
define('MAIL_TO_NAME', $envVars['MAIL_TO_NAME'] ?? 'Carlos Flores');
define('MAIL_TO_EMAIL', $envVars['MAIL_TO_EMAIL'] ?? 'destinatario@email.com');

// =============================================
// 4. CREAR CONEXIÓN A BASE DE DATOS
// =============================================
$con = @mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if (!$con) {
    die("Error de conexión: " . mysqli_connect_error());
}

// Establecer charset
if (!mysqli_set_charset($con, DB_CHARSET)) {
    die("Error configurando charset: " . mysqli_error($con));
}

//echo "DEBUG: Conexión a BD exitosa<br>";

?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portafolio Interactivo</title>
    <meta name="description" content="Portafolio profesional con interfaces de Windows, iOS y Android">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Segoe+UI:wght@300;400;500;600&family=SF+Pro+Display:wght@300;400;500;600&family=Roboto:wght@300;400;500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="vistas/dist/assets/css/styles.css">
    <script type="module" src="./vistas/js/so.js"></script>
</head>
<body>
    <div class="app windows-theme" id="app">

        <!-- Vista Móvil -->
        <div class="mobile-view">
            <div class="status-bar">
                <div class="time">9:41</div>
                <div class="status-icons">
                    <i class="fas fa-signal"></i>
                    <i class="fas fa-wifi"></i>
                    <i class="fas fa-battery-three-quarters"></i>
                </div>
            </div>

            <div class="mobile-content">

                <!-- Estadísticas movil -->
                <?php //require_once "movil/widget-clima-movil.php"; ?>

                <!-- Estadísticas movil -->
                <?php require_once "movil/estadistica-movil.php"; ?>

                <!-- Accesos directos movil -->   
                <?php require_once "movil/accesos-directos-movil.php"; ?>

                <!-- Barra control movil -->
                <?php require_once "movil/barra-control-movil.php"; ?>

            </div>
        </div>

        <!-- Vista de Escritorio Windows 10 -->
        <div class="desktop-view">
            <!-- Fondo de pantalla -->
            <div class="wallpaper"></div>
            
            <!-- Accesos directos desktop -->   
            <?php require_once "desktop/accesos-directos-desktop.php"; ?>

            <!-- Widgets del escritorio -->
            <div class="desktop-widgets">
                
                <!-- Widget del tiempo Desktop -->
                <?php require_once "desktop/widget-clima-desktop.php"; ?>

                <!-- Widget Performance Desktop -->
                <?php require_once "desktop/widget-performance-desktop.php"; ?>

            </div>
            
            <!-- Barra de tareas Desktop -->
            <?php require_once "desktop/barra-tarea-desktop.php"; ?>

            <!-- Menú de inicio Desktop -->
            <?php require_once "desktop/menu-inicio-desktop.php"; ?>

            <!--  Ventana de Proyectos desktop -->
            <?php require_once "desktop/windows-proyectos-desktop.php"; ?>

            <!-- Ventana de contacto desktop -->
            <?php require_once "desktop/windows-resumen-desktop.php"; ?>

            <!-- Ventana de calendario desktop -->
            <?php require_once "desktop/windows-calendar-desktop.php"; ?>

            <!-- Ventana de Información Personal desktop -->
            <?php require_once "desktop/windows-personal-desktop.php"; ?>

        </div>
    </div>
    
    <script type="text/javascript" src="./vistas/js/script.js"></script>
    <script type="text/javascript" src="./vistas/js/clima.js"></script>
</body>
</html>
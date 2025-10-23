<?php

if (isset($_GET["ruta"])) {
    if (
        $_GET["ruta"] == "index" ||
        $_GET["ruta"] == "so"       
    ){
        //include "modulos-templates/layouts/head.php";
        //include "modulos-templates/header.php";
        include "modulos-templates/" . $_GET["ruta"] . ".php";
        //include "modulos-templates/footer.php";
    } else {
        include "modulos-templates/404.php";
    }
} else {
   
    include "modulos-templates/index.php";

}
        

//include "modulos-templates/layouts/footer.php"; 


?>
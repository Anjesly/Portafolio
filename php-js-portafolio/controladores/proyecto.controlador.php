<?php

declare(strict_types = 1);

class Proyectos{

    //  Obtener los proyectos 
    public function ctrGetProjects($nombre){
        $proyectos = new ProyectoModelo();
        return $proyectos->get_projects($nombre);
    }  
    
}

?>
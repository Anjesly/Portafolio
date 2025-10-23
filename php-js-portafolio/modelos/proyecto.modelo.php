<?php

class ProyectoModelo {    

    public function get_projects($nombre){
        $sWhere = "";
        $aColumnas = array("A.nombre", "A.resumen");    // Columna de Búsqueda
        $sTable = "gestionPortafolio_proyecto A"; // Tabla principal con alias
        
        // Establecemos la conexión 
        global $con;
        
        // Campos a seleccionar - incluyendo categorías y lenguajes
        $campos = "A.id, A.nombre, A.resumen, A.cliente, A.imagen, A.url, A.created,
                GROUP_CONCAT(DISTINCT C.nombre) as categorias,
                GROUP_CONCAT(DISTINCT L.nombre) as lenguajes";
        
        // Construir la cláusula WHERE dinámicamente
        $sWhere = "WHERE (";
        for ($i = 0; $i < count($aColumnas); $i++) {
            $sWhere .= $aColumnas[$i] . " LIKE '%" . $nombre . "%' OR ";
        }
        $sWhere = substr_replace($sWhere, "", -3);
        $sWhere .= ")";
        
        // JOINs para obtener categorías y lenguajes
        $joins = "LEFT JOIN gestionPortafolio_proyecto_categorias PC ON A.id = PC.proyecto_id
                LEFT JOIN gestionPortafolio_categoria C ON PC.categoria_id = C.id
                LEFT JOIN gestionPortafolio_proyecto_lenguajes PL ON A.id = PL.proyecto_id
                LEFT JOIN gestionPortafolio_lenguaje L ON PL.lenguaje_id = L.id";
        
        $sWhere .= " GROUP BY A.id ORDER BY A.created DESC";
        
        $sql = "SELECT $campos FROM $sTable $joins $sWhere";
        
        $stmt = $con->prepare($sql);
        $stmt->execute();
        
        // Almacena los resultados
        $result = $stmt->get_result();
        
        // Obtiene todos los datos como un array asociativo
        $data = $result->fetch_all(MYSQLI_ASSOC);
        
        // Cierra la declaración
        $stmt->close();
        
        // Retorna los datos
        return $data;
    }

}
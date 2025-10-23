<?php

class SobreModelo {    

    //  Obtener perfil
    public function get_perfil(int $id): array{

        global $con;
        $sql = "SELECT nombres, edad, direccion, resumen, email, telefono, imagen,
                       curriculum, freelance, titulo, website
                FROM gestionPortafolio_perfil
                WHERE id = ?";
		$sql = mb_convert_encoding($sql, 'UTF-8', 'UTF-8');
        $stmt = $con->prepare($sql); 
		$stmt->bind_param("i", $id);
        $stmt->execute();
        // Almacena los resultados
        $result = $stmt->get_result();
        // Obtiene todos los datos como un array asociativo
        $data = $result->fetch_all(MYSQLI_ASSOC);
        // Cierra la declaración
        $stmt->close();

        // Retornar los datos al controlador
        return [
            'success' => true,
            'message' => 'Consulta ejecutada correctamente',
            'data' => $data,
            'count' => count($data)
        ];    
    }

    //  Obtener experiecia laboral
    public function get_work_experience(string $estatus): array{

        global $con;
        $sql = "SELECT cargo, ano, temporada, empresa, funciones
                FROM gestionPortafolio_experiencia
                WHERE estatus = ?
                ORDER BY ano desc";
		$sql = mb_convert_encoding($sql, 'UTF-8', 'UTF-8');
        $stmt = $con->prepare($sql); 
		$stmt->bind_param("s", $estatus);
        $stmt->execute();
        // Almacena los resultados
        $result = $stmt->get_result();
        // Obtiene todos los datos como un array asociativo
        $data = $result->fetch_all(MYSQLI_ASSOC);
        // Cierra la declaración
        $stmt->close();

        return $data;
    }

    //  Obtener educacion
    public function get_education(string $estatus): array{

        global $con;
        $sql = "SELECT titulo, ano, instituto, descripcion
                FROM gestionPortafolio_educacion
                WHERE estatus = ?
                ORDER BY ano desc";
		$sql = mb_convert_encoding($sql, 'UTF-8', 'UTF-8');
        $stmt = $con->prepare($sql); 
		$stmt->bind_param("s", $estatus);
        $stmt->execute();
        // Almacena los resultados
        $result = $stmt->get_result();
        // Obtiene todos los datos como un array asociativo
        $data = $result->fetch_all(MYSQLI_ASSOC);
        // Cierra la declaración
        $stmt->close();

        return $data;
    }

    //  Obtener redes sociales
    public function get_social_networks(string $estatus): array{

        global $con;
        $sql = "SELECT nombre, link
                FROM gestionPortafolio_redessociales 
                WHERE estatus = ?";
		$sql = mb_convert_encoding($sql, 'UTF-8', 'UTF-8');
        $stmt = $con->prepare($sql); 
		$stmt->bind_param("s", $estatus);
        $stmt->execute();
        // Almacena los resultados
        $result = $stmt->get_result();
        // Obtiene todos los datos como un array asociativo
        $data = $result->fetch_all(MYSQLI_ASSOC);
        // Cierra la declaración
        $stmt->close();

        // Retornar los datos al controlador
        return [
            'success' => true,
            'message' => 'Consulta ejecutada correctamente',
            'data' => $data,
            'count' => count($data)
        ];    
    }

}
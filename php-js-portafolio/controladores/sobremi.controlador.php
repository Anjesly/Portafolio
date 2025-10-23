<?php

declare(strict_types = 1);


class SobreMI {

    //  Obtener los datos de mi perfil
    public function ctrGetPerfil(int $id): array{
        $sobre = new SobreModelo();
        $data = $sobre->get_perfil($id);
        if($data['success']){
            if($data['data']){
                $nombres = $data['data'][0]['nombres'];
                $edad = $data['data'][0]['edad'];
                $direccion = $data['data'][0]['direccion'];
                $resumen = $data['data'][0]['resumen'];
                $email = $data['data'][0]['email'];
                $telefono = $data['data'][0]['telefono'];
                $imagen = $data['data'][0]['imagen'];
                $curriculum = $data['data'][0]['curriculum'];
                $freelance = $data['data'][0]['freelance'];
                $titulo = $data['data'][0]['titulo'];
                $website = $data['data'][0]['website'];
            }
        }
        return array($nombres, $edad, $direccion, $resumen, $email, $telefono, 
                     $imagen, $curriculum, $freelance, $titulo, $website);
    } 

    //  Obtener experiencia laboral
    public function ctrGetWorkExperience(string $estatus): array{
        $sobre = new SobreModelo();
        return $sobre->get_work_experience($estatus);
    }

    //  Obtener educacion
    public function ctrGetEducation(string $estatus): array{
        $sobre = new SobreModelo();
        return $sobre->get_education($estatus);
    }

    //  Obtener las redes sociales
    public function ctrGetSocialNetworks(string $estatus): array{
        $sobre = new SobreModelo();
        $data = $sobre->get_social_networks($estatus);
        $instagram = '';
        $threads = '';
        $github = '';
        $linkedin = '';
        $tiktok = '';
        $telegram = '';
        if($data['success']){
            if($data['count']>0){
                foreach ($data['data'] as $key => $value) {
                    $nombre = $value['nombre'];
                    switch ($nombre) {
                        case 'instagram':
                            $instagram = $value['link'];
                            break;
                        case 'threads':
                            $threads = $value['link'];
                            break;
                        case 'github':
                            $github = $value['link'];
                            break;
                        case 'linkedin':
                            $linkedin = $value['link'];
                            break;
                        case 'tiktok':
                            $tiktok = $value['link'];
                            break;
                        case 'telegram':
                            $telegram = $value['link'];
                            break;
                    }

                }
            }
        }
        return array($github, $linkedin, $instagram, $threads, $tiktok, $telegram);
    }  
    
}

?>
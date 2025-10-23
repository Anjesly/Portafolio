<!-- Ventana de Información Personal -->
<div class="window" id="personalInfoWindow">
    <div class="window-header">
        <span class="window-title">Aprende más sobre mi</span>
        <div class="window-controls">
            <button class="window-minimize"><i class="fas fa-minus"></i></button>
            <button class="window-maximize"><i class="far fa-square"></i></button>
            <button class="window-close"><i class="fas fa-times"></i></button>
        </div>
    </div>

    <div class="window-content personal-info-content">
        <div class="personal-info-header">
            <div class="profile-image-container">
                <img src="./vistas/dist/assets/img/logos/avatar-yeye.png" alt="Profile Photo" class="profile-image">
            </div>
            <div class="personal-info-title">
                <h2 id="nombres"></h2>
                <p>Desarrolladora Full Stack</p>
            </div>
        </div>
                    
        <div class="personal-info-grid">
            <div class="personal-info-card">
                <h3><i class="fas fa-user"></i> Información Personal</h3>
                <ul class="info-list">
                    <li><strong>Edad:</strong> <span id="edad"></span></li>
                    <li><strong>Pais:</strong> <span id="direccion"></span></li>
                    <li><strong>Freelance:</strong> <span id="freelance"></span></li>
                </ul>
            </div>
                        
            <div class="personal-info-card">
                <h3><i class="fas fa-envelope"></i> Contacto</h3>
                <ul class="info-list">
                    <li><strong>Email:</strong> <span id="email-perfil"></span></li>
                    <li><strong>Telefono:</strong> <span id="telefono"></span></li>
                    <li><strong>Website:</strong> <span id="website"></span></li>
                </ul>
            </div>
                        
            <div class="personal-info-card">
                <h3><i class="fas fa-graduation-cap"></i> Educación</h3>
                <ul class="info-list">
                    <li><strong>Titulo:</strong> <span id="titulo"></span></li>
                    <li><strong>Campo:</strong> Informática</li>
                </ul>
            </div>
                        
            <div class="personal-info-card technologies-card">
                <h3><i class="fas fa-code"></i> Tecnologías</h3>
                <div class="technologies-grid">
                    <div class="tech-item">
                        <i class="fab fa-html5 html-color"></i>
                        <span>HTML5</span>
                    </div>
                    <div class="tech-item">
                        <i class="fab fa-css3-alt css-color"></i>
                        <span>CSS3</span>
                    </div>
                    <div class="tech-item">
                        <i class="fab fa-js js-color"></i>
                        <span>JavaScript</span>
                    </div>
                    <div class="tech-item">
                        <i class="fab fa-php css-color"></i>
                        <span>PHP</span>
                    </div>
                    <div class="tech-item">
                        <i class="fab fa-python python-color"></i>
                        <span>Python</span>
                    </div>
                    <div class="tech-item">
                        <i class="fab fa-react react-color"></i>
                        <span>React</span>
                    </div>
                    <!--<div class="tech-item">
                        <i class="fa-brands fa-flutter"></i>
                        <span>Flutter</span>
                    </div>-->
                    <div class="tech-item">
                        <i class="fab fa-node-js node-color"></i>
                        <span>Node.js</span>
                    </div>
                    <div class="tech-item">
                        <i class="fas fa-database db-color"></i>
                        <span>SQL</span>
                    </div>
                    <div class="tech-item">
                        <i class="fab fa-git-alt git-color"></i>
                        <span>Git</span>
                    </div>
                    <div class="tech-item">
                        <i class="fab fa-square-github github-color"></i>
                        <span>Github</span>
                    </div>
                    <div class="tech-item">
                        <i class="fab fa-windows python-color"></i>
                        <span>Windows</span>
                    </div>
                    <div class="tech-item">
                        <i class="fab fa-linux python-github-color"></i>
                        <span>Linux</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="personal-info-bio">
            <h3><i class="fas fa-quote-left"></i> Resumen profesional</h3>
            <p id="resumen"></p>
        </div>

        <!--    Experiencia Laboral -->
        <div class="personal-info-card experience-card">
            <h3><i class="fas fa-briefcase"></i> Experiencia Laboral</h3>
            <div class="experience-list" id="experienceContainer">
                <!-- Las experiencias se renderizarán aquí dinámicamente -->
            </div>
        </div>

        <!--    Educacion y cursos -->
        <div class="personal-info-card experience-card">
            <h3><i class="fas fa-graduation-cap"></i> Educacion y Cursos</h3>
            <div class="education-list" id="educationContainer">
                <!-- La educacion se renderizarán aquí dinámicamente -->
            </div>
        </div>        
        
    </div>
</div>
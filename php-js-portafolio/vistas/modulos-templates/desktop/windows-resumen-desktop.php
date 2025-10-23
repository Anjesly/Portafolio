<!-- Ventana de contacto -->
<div class="window" id="emailWindow">
    <div class="window-header">
        <span class="window-title">Contacto</span>
        <div class="window-controls">
            <button class="window-minimize"><i class="fas fa-minus"></i></button>
            <button class="window-maximize"><i class="far fa-square"></i></button>
            <button class="window-close"><i class="fas fa-times"></i></button>
        </div>
    </div>
    <div class="window-content">
        <div class="contact-layout">
            <div class="contact-sidebar">
                <div class="contact-card">
                    <div class="contact-header">
                        <i class="fas fa-user-circle"></i>
                        <!--<div class="profile-image-contact-container">
                            <img src="./vistas/dist/assets/img/logos/logo.jpeg" alt="Profile Photo" class="profile-image">
                        </div>-->
                        <h3 id="contactName"></h3>
                        <p>Full Stack Developer</p>
                    </div>
                    
                    <div class="contact-details">
                        <div class="contact-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <div>
                                <strong>Ubicación</strong>
                                <p id="contactLocation"></p>
                            </div>
                        </div>
                        
                        <div class="contact-item">
                            <i class="fas fa-envelope"></i>
                            <div>
                                <strong>Email</strong>
                                <p id="contactEmail"></p>
                            </div>
                        </div>
                        
                        <div class="contact-item">
                            <i class="fas fa-phone"></i>
                            <div>
                                <strong>Teléfono</strong>
                                <p id="contactPhone"></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="contact-form">
                <h3>Envíame un mensaje</h3>
                
                <form class="contact-form-fields">
                    <div class="form-group">
                        <label for="name">Tu Nombre</label>
                        <input type="text" id="name" placeholder="Ingresa tu nombre completo">
                    </div>
                    
                    <div class="form-group">
                        <label for="email">Tu Email</label>
                        <input type="email" id="email" placeholder="ejemplo@correo.com">
                    </div>
                    
                    <div class="form-group">
                        <label for="subject">Asunto</label>
                        <input type="text" id="subject" placeholder="Asunto del mensaje">
                    </div>
                    
                    <div class="form-group">
                        <label for="message">Mensaje</label>
                        <textarea id="message" rows="5" placeholder="Escribe tu mensaje aquí..."></textarea>
                    </div>
                    
                    <div class="form-actions">
                        <button type="button" class="btn-send-message" id="sendMessage">
                            <span class="btn-content">
                                <i class="fas fa-paper-plane"></i>
                                <span class="btn-text-contact">Enviar Mensaje</span>
                            </span>
                            <span class="btn-loading">
                                <i class="fas fa-spinner fa-spin"></i>
                                <span>Enviando...</span>
                            </span>
                            <span class="btn-success">
                                <i class="fas fa-check"></i>
                                <span>¡Enviado!</span>
                            </span>
                        </button>
                        
                        <div class="form-note">
                            <i class="fas fa-info-circle"></i>
                            <span>Responderé en un plazo máximo de 24 horas</span>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
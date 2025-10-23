<!-- Ventana de Calendario -->
<!-- Ventana de Calendario -->
<div class="window" id="calendarWindow">
    <div class="window-header">
        <span class="window-title">Calendario</span>
        <div class="window-controls">
            <button class="window-minimize"><i class="fas fa-minus"></i></button>
            <button class="window-maximize"><i class="far fa-square"></i></button>
            <button class="window-close"><i class="fas fa-times"></i></button>
        </div>
    </div>
    <div class="window-content">
        <div class="calendar-container">
            <!-- Header del Calendario -->
            <div class="calendar-header">
                <div class="calendar-navigation">
                    <button class="nav-btn prev-year" title="Año anterior">
                        <i class="fas fa-angle-double-left"></i>
                    </button>
                    <button class="nav-btn prev-month" title="Mes anterior">
                        <i class="fas fa-angle-left"></i>
                    </button>
                    
                    <div class="current-date">
                        <span class="month-year" id="currentMonthYear">Febrero 2024</span>
                        <span class="today-btn" id="goToToday">Hoy</span>
                    </div>
                    
                    <button class="nav-btn next-month" title="Mes siguiente">
                        <i class="fas fa-angle-right"></i>
                    </button>
                    <button class="nav-btn next-year" title="Año siguiente">
                        <i class="fas fa-angle-double-right"></i>
                    </button>
                </div>
                
                <div class="calendar-views">
                    <button class="view-btn active" data-view="month">Mes</button>
                    <button class="view-btn" data-view="week">Semana</button>
                    <button class="view-btn" data-view="day">Día</button>
                </div>
            </div>

            <!-- Vista Mensual -->
            <div class="calendar-view month-view active">
                <div class="weekdays-header">
                    <div class="weekday">Dom</div>
                    <div class="weekday">Lun</div>
                    <div class="weekday">Mar</div>
                    <div class="weekday">Mié</div>
                    <div class="weekday">Jue</div>
                    <div class="weekday">Vie</div>
                    <div class="weekday">Sáb</div>
                </div>
                
                <div class="days-grid" id="monthDaysGrid">
                    <!-- Los días se generan dinámicamente con JavaScript -->
                </div>
            </div>

            <!-- Panel Lateral de Eventos -->
            <div class="calendar-sidebar">
                <div class="sidebar-header">
                    <h3>Eventos de <span id="sidebarDate">Hoy</span></h3>
                    <button class="btn-add-event" id="addEventBtn">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
                
                <div class="events-list" id="eventsList">
                    <div class="no-events" id="noEventsMessage">
                        <i class="far fa-calendar-plus"></i>
                        <p>No hay eventos programados</p>
                        <button class="btn-text" id="addFirstEvent">Agregar evento</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Modal para Agregar/Editar Eventos -->
<div class="modal-overlay" id="eventModal">
    <div class="modal-content">
        <div class="modal-header">
            <h3 id="modalTitle">Nuevo Evento</h3>
            <button class="modal-close" id="closeModal">
                <i class="fas fa-times"></i>
            </button>
        </div>
        
        <form id="eventForm" class="modal-form">
            <input type="hidden" id="eventId">
            
            <div class="form-group">
                <label for="eventTitle">Título del Evento *</label>
                <input type="text" id="eventTitle" required placeholder="Reunión de equipo">
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="eventDate">Fecha *</label>
                    <input type="date" id="eventDate" required>
                </div>
                
                <div class="form-group">
                    <label for="eventTime">Hora *</label>
                    <input type="time" id="eventTime" required>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="eventDuration">Duración</label>
                    <select id="eventDuration">
                        <option value="30">30 minutos</option>
                        <option value="60" selected>1 hora</option>
                        <option value="90">1.5 horas</option>
                        <option value="120">2 horas</option>
                        <option value="180">3 horas</option>
                        <option value="240">4 horas</option>
                        <option value="0">Todo el día</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="eventColor">Color</label>
                    <div class="color-picker">
                        <input type="color" id="eventColor" value="#0078d4" list="colorPresets">
                        <datalist id="colorPresets">
                            <option value="#0078d4">Azul</option>
                            <option value="#107c10">Verde</option>
                            <option value="#d83b01">Naranja</option>
                            <option value="#e81123">Rojo</option>
                            <option value="#b4009e">Magenta</option>
                            <option value="#5c2d91">Púrpura</option>
                            <option value="#008272">Verde azulado</option>
                        </datalist>
                    </div>
                </div>
            </div>
            
            <div class="form-group">
                <label for="eventLocation">Ubicación</label>
                <input type="text" id="eventLocation" placeholder="Sala de conferencias, enlace, etc.">
            </div>
            
            <div class="form-group">
                <label for="eventDescription">Descripción</label>
                <textarea id="eventDescription" rows="3" placeholder="Detalles adicionales del evento..."></textarea>
            </div>
            
            <div class="form-actions">
                <button type="button" class="btn-cancel" id="cancelEvent">Cancelar</button>
                <button type="submit" class="btn-save" id="saveEvent">
                    <i class="fas fa-save"></i>
                    Guardar Evento
                </button>
            </div>
        </form>
    </div>
</div>
document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const app = document.getElementById('app');
    const mobileThemeSwitcher = document.getElementById('mobileThemeSwitcher');
    const desktopThemeSwitcher = document.getElementById('desktopThemeSwitcher');
    const startButton = document.getElementById('startButton');
    const startMenu = document.getElementById('startMenu');
    const projectsShortcut = document.getElementById('projectsShortcut');
    const projectsWindow = document.getElementById('projectsWindow');
    const calendarShortcut = document.getElementById('calendarShortcut');
    const calendarWindow = document.getElementById('calendarWindow');
    const personalShortcut = document.getElementById('personalInfoShortcut');
    const personalWindow = document.getElementById('personalInfoWindow');
    const emailShortcut = document.getElementById('emailShortcut');
    const emailWindow = document.getElementById('emailWindow');
    //const personalInfoShortcut = document.getElementById('personalInfoShortcut');
    //const personalInfoWindow = document.getElementById('personalInfoWindow');
    const refreshWeatherBtn = document.querySelector('.refresh-weather');
    
    // Estado de la aplicación
    let currentTheme = 'windows';
    let isStartMenuOpen = false;
    let activeWindow = null;
    const windows = [projectsWindow, emailWindow, calendarWindow, personalInfoWindow];
    
    // Función para mostrar notificación
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        let icon;
        switch(type) {
            case 'success':
                icon = '<i class="fas fa-check-circle"></i>';
                break;
            case 'error':
                icon = '<i class="fas fa-exclamation-circle"></i>';
                break;
            default:
                icon = '<i class="fas fa-info-circle"></i>';
        }
        
        notification.innerHTML = `${icon}<span>${message}</span>`;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    // Función para actualizar la hora
    function updateTime() {
        const now = new Date();
        const timeElements = document.querySelectorAll('.time');
        const dateElements = document.querySelectorAll('.date');
        
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const dateString = now.toLocaleDateString([], { month: '2-digit', day: '2-digit', year: 'numeric' });
        
        timeElements.forEach(el => el.textContent = timeString);
        dateElements.forEach(el => el.textContent = dateString);
    }
    
    // Función para cambiar entre temas móviles
    function toggleTheme() {
        if (currentTheme === 'windows') {
            // Cambiar a tema iOS
            app.classList.remove('windows-theme');
            app.classList.add('ios-theme');
            currentTheme = 'ios';
            mobileThemeSwitcher.innerHTML = '<i class="fab fa-android"></i><span>Android Mode</span>';
            showNotification('Switched to iOS theme', 'success');
        } else if (currentTheme === 'ios') {
            // Cambiar a tema Android
            app.classList.remove('ios-theme');
            app.classList.add('android-theme');
            currentTheme = 'android';
            mobileThemeSwitcher.innerHTML = '<i class="fab fa-windows"></i><span>Windows Mode</span>';
            showNotification('Switched to Android theme', 'success');
        } else {
            // Cambiar a tema Windows
            app.classList.remove('android-theme');
            app.classList.add('windows-theme');
            currentTheme = 'windows';
            mobileThemeSwitcher.innerHTML = '<i class="fab fa-apple"></i><span>iOS Mode</span>';
            showNotification('Switched to Windows theme', 'success');
        }
        
        checkViewport();
    }
    
    // Función para alternar tema oscuro/claro en Windows
    function toggleWindowsTheme(event) {
        event.stopPropagation(); // Esto evita que el evento llegue al document
        event.preventDefault();


        if (currentTheme === 'windows') {
            app.classList.toggle('windows-dark-theme');
            if (app.classList.contains('windows-dark-theme')) {
                desktopThemeSwitcher.innerHTML = '<i class="fas fa-sun"></i>';
                showNotification('Dark mode enabled', 'success');
            } else {
                desktopThemeSwitcher.innerHTML = '<i class="fas fa-moon"></i>';
                showNotification('Light mode enabled', 'success');
            }
        }
    }
    
    // Función para mostrar/ocultar el menú de inicio
    function toggleStartMenu(event) {
        event.stopPropagation();
        
        isStartMenuOpen = !isStartMenuOpen;
        if (isStartMenuOpen) {
            startMenu.classList.add('visible');
            startButton.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
        } else {
            startMenu.classList.remove('visible');
            startButton.style.backgroundColor = 'transparent';
        }
    }
    
    // Función para cerrar el menú de inicio al hacer clic fuera
    function closeStartMenu(event) {
        if (isStartMenuOpen && !startMenu.contains(event.target)) {
            if (!startButton.contains(event.target)) {
                isStartMenuOpen = false;
                startMenu.classList.remove('visible');
                startButton.style.backgroundColor = 'transparent';
            }
        }
    }
    
    // Función para abrir una ventana
    function openWindow(windowElement) {
        // Cerrar cualquier ventana abierta
        closeAllWindows();
        
        // Mostrar la nueva ventana
        windowElement.classList.add('visible');
        activeWindow = windowElement;
        
        // Traer al frente
        windowElement.style.zIndex = '200';
    }
    
    // Función para cerrar una ventana
    function closeWindow(windowElement) {
        windowElement.classList.remove('visible');
        if (activeWindow === windowElement) {
            activeWindow = null;
        }
    }
    
    // Función para cerrar todas las ventanas
    function closeAllWindows() {
        windows.forEach(window => {
            window.classList.remove('visible');
        });
        activeWindow = null;
    }
    
    // Función para actualizar el widget de rendimiento
    function updatePerformanceWidget() {
        const cpu = Math.min(100, Math.floor(Math.random() * 30) + 20);
        const memory = Math.min(100, Math.floor(Math.random() * 40) + 30);
        const disk = Math.min(100, Math.floor(Math.random() * 20) + 10);
        
        document.querySelector('.cpu .perf-progress').style.width = `${cpu}%`;
        document.querySelector('.cpu .perf-label span:last-child').textContent = `${cpu}%`;
        
        document.querySelector('.memory .perf-progress').style.width = `${memory}%`;
        document.querySelector('.memory .perf-label span:last-child').textContent = `${memory}%`;
        
        document.querySelector('.disk .perf-progress').style.width = `${disk}%`;
        document.querySelector('.disk .perf-label span:last-child').textContent = `${disk}%`;
    }
    
    // Simular datos del clima
    function simulateWeatherData() {
        const conditions = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Rainy', 'Thunderstorm'];
        const condition = conditions[Math.floor(Math.random() * conditions.length)];
        
        let baseTemp;
        switch(condition) {
            case 'Sunny':
                baseTemp = 30;
                break;
            case 'Partly Cloudy':
                baseTemp = 28;
                break;
            case 'Cloudy':
                baseTemp = 25;
                break;
            case 'Rainy':
                baseTemp = 22;
                break;
            case 'Thunderstorm':
                baseTemp = 20;
                break;
            default:
                baseTemp = 25;
        }
        
        const tempVariation = Math.floor(Math.random() * 5) - 2;
        const currentTemp = baseTemp + tempVariation;
        const highTemp = currentTemp + Math.floor(Math.random() * 3) + 1;
        const lowTemp = currentTemp - Math.floor(Math.random() * 3) - 1;
        
        return {
            location: 'Barquisimeto',
            condition: condition,
            currentTemp: currentTemp,
            highTemp: highTemp,
            lowTemp: lowTemp,
            forecast: [
                { day: 'Today', temp: currentTemp },
                { day: 'Tue', temp: currentTemp + Math.floor(Math.random() * 3) },
                { day: 'Wed', temp: currentTemp + Math.floor(Math.random() * 4) },
                { day: 'Thu', temp: currentTemp + Math.floor(Math.random() * 5) }
            ]
        };
    }
    
    // Actualizar widget del clima
    function updateWeatherWidget() {
        const weatherData = simulateWeatherData();
        
        // Actualizar vista móvil
        const mobileElements = {
            location: document.querySelector('.mobile-view .location'),
            condition: document.querySelector('.mobile-view .weather-condition'),
            temp: document.querySelector('.mobile-view .temperature'),
            high: document.querySelector('.mobile-view .high'),
            low: document.querySelector('.mobile-view .low'),
            forecast: document.querySelectorAll('.mobile-view .forecast-item')
        };
        
        if (mobileElements.location) {
            mobileElements.location.textContent = weatherData.location;
            mobileElements.condition.textContent = weatherData.condition;
            mobileElements.temp.textContent = `${weatherData.currentTemp}°`;
            mobileElements.high.textContent = `H ${weatherData.highTemp}°`;
            mobileElements.low.textContent = `L ${weatherData.lowTemp}°`;
            
            mobileElements.forecast.forEach((item, index) => {
                const dayData = weatherData.forecast[index];
                if (dayData) {
                    item.querySelector('.day').textContent = dayData.day;
                    item.querySelector('.temp').textContent = `${dayData.temp}°`;
                }
            });
        }
        
        // Actualizar vista escritorio
        const desktopElements = {
            location: document.querySelector('.desktop-view .weather-location h2'),
            condition: document.querySelector('.desktop-view .weather-location p'),
            temp: document.querySelector('.desktop-view .current-temp'),
            high: document.querySelector('.desktop-view .high'),
            low: document.querySelector('.desktop-view .low'),
            forecast: document.querySelectorAll('.desktop-view .forecast-day')
        };
        
        if (desktopElements.location) {
            desktopElements.location.textContent = weatherData.location;
            desktopElements.condition.textContent = weatherData.condition;
            desktopElements.temp.textContent = `${weatherData.currentTemp}°`;
            desktopElements.high.textContent = `H: ${weatherData.highTemp}°`;
            desktopElements.low.textContent = `L: ${weatherData.lowTemp}°`;
            
            desktopElements.forecast.forEach((item, index) => {
                const dayData = weatherData.forecast[index];
                if (dayData) {
                    item.querySelector('span:first-child').textContent = dayData.day;
                    item.querySelector('span:last-child').textContent = `${dayData.temp}°`;
                }
            });
        }
    }
    
    // Función para actualizar el clima con animación
    function refreshWeatherWithAnimation() {
        refreshWeatherBtn.classList.add('rotating');
        
        setTimeout(() => {
            updateWeatherWidget();
            refreshWeatherBtn.classList.remove('rotating');
            showNotification('Weather updated', 'success');
        }, 1000);
    }
    
    // Detectar el tamaño de la pantalla para cambiar entre vistas
    function checkViewport() {
        if (window.innerWidth >= 1024) {
            document.querySelector('.mobile-view').style.display = 'none';
            document.querySelector('.desktop-view').style.display = 'block';
        } else {
            document.querySelector('.mobile-view').style.display = 'flex';
            document.querySelector('.desktop-view').style.display = 'none';
        }
    }
    
    // Manejador de acciones
    function handleAction(action) {
        switch(action) {
            case 'about':
                openPersonalWindow();
            case 'projects':
                openWindow(projectsWindow);
                break;
            case 'resume':
                const ruta = 'https://asportafolio.carlospcssoluciones.com.ve/media/curriculum/curriculum_pEq8A4a.pdf';
                abrirPDF(ruta);
                openWindow(resumeWindow);
                break;
            case 'coffee':
                showNotification('Thank you for your support!', 'success');
                break;
            case 'settings':
                showNotification('Settings opened', 'info');
                break;
            case 'calendar':
                openWindow(calendarWindow);
                showNotification('Calendar opened', 'info');
                break;
            default:
                showNotification(`Action: ${action}`, 'info');
        }
        
        // Cerrar el menú de inicio si está abierto
        if (isStartMenuOpen) {
            toggleStartMenu({stopPropagation: () => {}});
        }
    }
    
    // Event listeners
    mobileThemeSwitcher.addEventListener('click', toggleTheme);
    desktopThemeSwitcher.addEventListener('click', toggleWindowsTheme);
    startButton.addEventListener('click', toggleStartMenu);
    document.addEventListener('click', closeStartMenu);
    
    // Accesos directos del escritorio
    projectsShortcut.addEventListener('click', () => openWindow(projectsWindow));
    emailShortcut.addEventListener('click', () => openWindow(emailWindow));
    calendarShortcut.addEventListener('click', () => openWindow(calendarWindow));

    //personalInfoShortcut.addEventListener('click', () => openWindow(personalInfoWindow));

    // Función para verificar y abrir el PDF
    function abrirPDF(ruta) {
        
        // Abrir directamente el PDF
        
        setTimeout(() => {
            window.open(ruta, '_blank');
            // Mostrar notificación de éxito
            showNotification('PDF abierto correctamente', 'success');
        }, 2000);
  
    }


    //  Descargar resumen curricular
    resumeShortcut.addEventListener('click', () => {
        const ruta = 'https://asportafolio.carlospcssoluciones.com.ve/media/curriculum/curriculum_pEq8A4a.pdf';
        abrirPDF(ruta);
        showNotification('Descargando PDF!', 'info');
    });


    /*document.getElementById('githubShortcut').addEventListener('click', () => window.open('https://github.com', '_blank'));
    document.getElementById('linkedinShortcut').addEventListener('click', () => window.open('https://linkedin.com', '_blank'));
    document.getElementById('instagramShortcut').addEventListener('click', () => window.open('https://instagram.com', '_blank'));
    document.getElementById('threadsShortcut').addEventListener('click', () => window.open('https://threads.com', '_blank'));
    document.getElementById('tiktokShortcut').addEventListener('click', () => window.open('https://www.tiktok.com/@dev.cflores', '_blank'));
    document.getElementById('tiktokShortcut').addEventListener('click', () => window.open('https://t.me/boost/devcflores', '_blank'));*/
    
    if (personalShortcut && personalWindow) {
        // Función para abrir la ventana
        function openPersonalWindow() {
            console.log('Intentando abrir ventana...');
            
            // Cerrar otras ventanas primero
            const allWindows = document.querySelectorAll('.window');
            allWindows.forEach(win => {
                win.classList.remove('visible');
            });
            
            // Abrir esta ventana
            personalWindow.classList.add('visible');
            personalWindow.style.zIndex = '200';
            console.log('Ventana abierta:', personalWindow.classList);
        }
        
        // Evento de clic
        personalShortcut.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            openPersonalWindow();
        });
        
        // Evento para cerrar
        const closeBtn = personalWindow.querySelector('.window-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                personalWindow.classList.remove('visible');
            });
        }
        
        console.log('Personal Info Window handler instalado');
    } else {
        console.error('No se encontraron los elementos requeridos para la ventana personal');
    }

    // Botones de ventana
    document.querySelectorAll('.window-close').forEach(btn => {
        btn.addEventListener('click', function() {
            closeWindow(this.closest('.window'));
        });
    });
    
    // Actualizar clima
    refreshWeatherBtn.addEventListener('click', refreshWeatherWithAnimation);
    
    // Manejadores de acciones genéricas
    document.querySelectorAll('[data-action]').forEach(element => {
        element.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            if (action) handleAction(action);
        });
    });
    
    // Cerrar ventanas al hacer clic fuera
    document.addEventListener('click', function(e) {
        // Lista de elementos que NO deben cerrar ventanas
        const excludedSelectors = [
            '#desktopThemeSwitcher',
            '#mobileThemeSwitcher',
            '.window',
            '.window-close',
            '.notification',
            // Elementos de paginación de proyectos
            '.pagination',
            '.pagination button',
            '.pagination .icon',
            // Elementos de filtros de proyectos
            '.category-btn',
            '.tech-checkbox',
            'input[type="checkbox"]',
            '#clearFilters',
            // Elementos del calendario
            '.calendar-container',
            '.calendar-header',
            '.calendar-nav',
            '.view-controls',
            '.view-btn',
            '.month-grid',
            '.day-cell',
            '.day-event',
            '.event-item',
            '.event-action-btn',
            '#addEventBtn',
            '#addFirstEvent',
            '#goToToday',
            // Modal de eventos del calendario
            '#eventModal',
            '#eventForm',
            '#eventTitle',
            '#eventDate',
            '#eventTime',
            '#eventDuration',
            '#eventColor',
            '#eventLocation',
            '#eventDescription',
            '#saveEvent',
            '#cancelEvent',
            '#closeModal'
        ];

        // Verificar si el clic fue en un elemento excluido
        const isExcluded = excludedSelectors.some(selector => {
            return e.target.closest(selector);
        });

        // Si es un elemento excluido, no hacer nada
        if (isExcluded) {
            return;
        }

        // Cerrar ventana activa solo si se hace clic fuera de ella
        if (activeWindow && !activeWindow.contains(e.target)) {
            const isWindowShortcut = e.target.closest(
                '[data-action="projects"], [data-action="resume"], [data-action="calendar"]'
            ) || e.target.closest(
                '#projectsShortcut, #emailShortcut, #calendarShortcut, #personalInfoShortcut, #resumeShortcut'
            );
            
            if (!isWindowShortcut) {
                closeWindow(activeWindow);
            }
        }
    });
    
    // Inicializar la aplicación
    updateTime();
    setInterval(updateTime, 60000);
    updateWeatherWidget();
    updatePerformanceWidget();
    setInterval(updatePerformanceWidget, 5000);
    
    window.addEventListener('resize', checkViewport);
    checkViewport();
    
    // Efectos de interacción
    document.querySelectorAll('.app-shortcut, .desktop-icon, .taskbar-icon, .tile, .app-item').forEach(element => {
        element.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        element.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});
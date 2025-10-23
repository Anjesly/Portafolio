document.addEventListener('DOMContentLoaded', function() {
    // Configuración de la API
    const WEATHER_API_KEY = 'a5628610e400a20b1ce5958716450a0f'; // Reemplaza con tu API key real
    const WEATHER_CITY = 'Caracas'; // Ciudad por defecto
    const WEATHER_UNITS = 'metric'; // Para grados Celsius

    // Cache para almacenar datos temporalmente
    const weatherCache = {
        data: null,
        timestamp: 0,
        isValid: () => (Date.now() - weatherCache.timestamp) < 300000 // 5 minutos de validez
    };

    // Elementos del DOM
    const weatherElements = {
        widget: document.querySelector('.weather-widget'),
        location: document.querySelector('.weather-widget .location'),
        condition: document.querySelector('.weather-widget .weather-condition'),
        temp: document.querySelector('.weather-widget .temperature'),
        high: document.querySelector('.weather-widget .high'),
        low: document.querySelector('.weather-widget .low'),
        icon: document.querySelector('.weather-widget #weatherIcon'),
        humidity: document.querySelector('.weather-widget .humidity'),
        wind: document.querySelector('.weather-widget .wind'),
        pressure: document.querySelector('.weather-widget .pressure'),
        forecast: document.querySelector('.weather-widget #weatherForecast'),
        lastUpdated: document.querySelector('.weather-widget .last-updated'),
        refreshBtn: document.querySelector('.weather-widget #refreshWeather')
    };

    // Mapeo de condiciones climáticas a íconos (Font Awesome)
    const weatherIcons = {
        '01d': 'fas fa-sun', '01n': 'fas fa-moon',
        '02d': 'fas fa-cloud-sun', '02n': 'fas fa-cloud-moon',
        '03d': 'fas fa-cloud', '03n': 'fas fa-cloud',
        '04d': 'fas fa-cloud', '04n': 'fas fa-cloud',
        '09d': 'fas fa-cloud-rain', '09n': 'fas fa-cloud-rain',
        '10d': 'fas fa-cloud-sun-rain', '10n': 'fas fa-cloud-moon-rain',
        '11d': 'fas fa-bolt', '11n': 'fas fa-bolt',
        '13d': 'fas fa-snowflake', '13n': 'fas fa-snowflake',
        '50d': 'fas fa-smog', '50n': 'fas fa-smog'
    };

    // Mapeo de condiciones climáticas a clases CSS
    const weatherClasses = {
        '01d': 'clear', '01n': 'clear',
        '02d': 'partly-cloudy', '02n': 'partly-cloudy',
        '03d': 'cloudy', '03n': 'cloudy',
        '04d': 'cloudy', '04n': 'cloudy',
        '09d': 'rain', '09n': 'rain',
        '10d': 'rain', '10n': 'rain',
        '11d': 'thunderstorm', '11n': 'thunderstorm',
        '13d': 'snow', '13n': 'snow',
        '50d': 'mist', '50n': 'mist'
    };

    // Función principal para obtener datos del clima
    async function fetchWeatherData() {
        try {
            // Mostrar estado de carga
            weatherElements.widget.classList.add('loading');
            weatherElements.refreshBtn.classList.add('rotating');
            
            // Verificar si hay datos en caché válidos
            if (weatherCache.isValid() && weatherCache.data) {
                updateWeatherUI(weatherCache.data.current, weatherCache.data.forecast);
                weatherElements.widget.classList.remove('loading');
                weatherElements.refreshBtn.classList.remove('rotating');
                return;
            }
            
            // Obtener datos actuales
            const currentResponse = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${WEATHER_CITY}&units=${WEATHER_UNITS}&appid=${WEATHER_API_KEY}`
            );
            
            if (!currentResponse.ok) {
                throw new Error(`Error HTTP: ${currentResponse.status}`);
            }
            
            const currentData = await currentResponse.json();
            
            // Obtener pronóstico
            let forecastData = null;
            try {
                const forecastResponse = await fetch(
                    `https://api.openweathermap.org/data/2.5/forecast?q=${WEATHER_CITY}&units=${WEATHER_UNITS}&appid=${WEATHER_API_KEY}&cnt=5`
                );
                forecastData = await forecastResponse.json();
            } catch (forecastError) {
                console.warn('Error obteniendo pronóstico:', forecastError);
            }
            
            // Actualizar caché
            weatherCache.data = { current: currentData, forecast: forecastData };
            weatherCache.timestamp = Date.now();
            
            // Actualizar UI
            updateWeatherUI(currentData, forecastData);
            
        } catch (error) {
            console.error('Error al obtener datos del clima:', error);
            showWeatherError(error.message || 'Error al cargar datos');
        } finally {
            weatherElements.widget.classList.remove('loading');
            weatherElements.refreshBtn.classList.remove('rotating');
        }
    }

    // Función para actualizar la interfaz con datos del clima
    function updateWeatherUI(currentData, forecastData = null) {
        // Validar datos recibidos
        if (!currentData || !currentData.main || !currentData.weather) {
            showWeatherError('Datos incompletos');
            return;
        }
        
        // Actualizar información principal
        weatherElements.location.textContent = `${currentData.name || WEATHER_CITY}${currentData.sys?.country ? `, ${currentData.sys.country}` : ''}`;
        weatherElements.condition.textContent = currentData.weather[0].description;
        weatherElements.temp.textContent = `${Math.round(currentData.main.temp)}°`;
        weatherElements.high.textContent = `H ${Math.round(currentData.main.temp_max)}°`;
        weatherElements.low.textContent = `L ${Math.round(currentData.main.temp_min)}°`;
        
        // Actualizar ícono del clima
        const iconCode = currentData.weather[0].icon;
        if (iconCode && weatherIcons[iconCode]) {
            weatherElements.icon.innerHTML = `<i class="${weatherIcons[iconCode]}"></i>`;
            weatherElements.icon.className = `weather-icon ${weatherClasses[iconCode] || ''}`;
        } else {
            weatherElements.icon.innerHTML = '<i class="fas fa-question"></i>';
        }
        
        // Actualizar detalles adicionales
        weatherElements.humidity.textContent = `${currentData.main.humidity || '--'}%`;
        weatherElements.wind.textContent = `${currentData.wind?.speed ? Math.round(currentData.wind.speed * 3.6) : '--'} km/h`;
        weatherElements.pressure.textContent = `${currentData.main.pressure || '--'} hPa`;
        
        // Actualizar pronóstico
        if (forecastData?.list) {
            updateForecastUI(forecastData);
        } else {
            weatherElements.forecast.innerHTML = '<div class="forecast-item">Pronóstico no disponible</div>';
        }
        
        // Actualizar marca de tiempo
        weatherElements.lastUpdated.textContent = `Actualizado: ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }

    // Función para mostrar el pronóstico
    function updateForecastUI(forecastData) {
        weatherElements.forecast.innerHTML = '';
        
        // Verificar datos válidos
        if (!forecastData?.list || forecastData.list.length === 0) {
            weatherElements.forecast.innerHTML = '<div class="forecast-item">Datos limitados</div>';
            return;
        }
        
        // Mostrar máximo 4 puntos de pronóstico
        const step = Math.max(1, Math.floor(forecastData.list.length / 4));
        
        for (let i = 0; i < Math.min(forecastData.list.length, 4 * step); i += step) {
            const forecast = forecastData.list[i];
            if (!forecast || !forecast.weather) continue;
            
            const date = new Date(forecast.dt * 1000);
            const dayName = date.toLocaleDateString('es-ES', { weekday: 'short' });
            const iconCode = forecast.weather[0].icon;
            
            const forecastItem = document.createElement('div');
            forecastItem.className = 'forecast-item';
            forecastItem.innerHTML = `
                <span class="day">${i === 0 ? 'Hoy' : dayName}</span>
                <div class="forecast-icon">
                    <i class="${iconCode ? weatherIcons[iconCode] : 'fas fa-question'}"></i>
                </div>
                <span class="temp">${Math.round(forecast.main?.temp) || '--'}°</span>
            `;
            
            weatherElements.forecast.appendChild(forecastItem);
        }
    }

    // Función para mostrar estado de error
    function showWeatherError(message = 'Error al cargar datos') {
        weatherElements.widget.classList.add('error');
        weatherElements.location.textContent = message;
        weatherElements.condition.textContent = '--';
        weatherElements.temp.textContent = '--°';
        weatherElements.high.textContent = 'H --°';
        weatherElements.low.textContent = 'L --°';
        weatherElements.icon.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
        weatherElements.humidity.textContent = '--%';
        weatherElements.wind.textContent = '-- km/h';
        weatherElements.pressure.textContent = '-- hPa';
        weatherElements.forecast.innerHTML = '<div class="forecast-item">Servicio no disponible</div>';
        weatherElements.lastUpdated.textContent = '--';
    }

    // Función para obtener clima por geolocalización
    async function getWeatherByGeolocation() {
        if (!navigator.geolocation) {
            return fetchWeatherData(); // Fallback a ciudad por defecto
        }
        
        try {
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject, {
                    timeout: 5000,
                    maximumAge: 600000 // 10 minutos
                });
            });
            
            const { latitude, longitude } = position.coords;
            
            // Obtener datos actuales por geolocalización
            const currentResponse = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${WEATHER_UNITS}&appid=${WEATHER_API_KEY}`
            );
            
            if (!currentResponse.ok) {
                throw new Error(`Error HTTP: ${currentResponse.status}`);
            }
            
            const currentData = await currentResponse.json();
            
            // Obtener pronóstico por geolocalización
            let forecastData = null;
            try {
                const forecastResponse = await fetch(
                    `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=${WEATHER_UNITS}&appid=${WEATHER_API_KEY}&cnt=5`
                );
                forecastData = await forecastResponse.json();
            } catch (forecastError) {
                console.warn('Error en pronóstico geolocalizado:', forecastError);
            }
            
            // Actualizar caché
            weatherCache.data = { current: currentData, forecast: forecastData };
            weatherCache.timestamp = Date.now();
            
            // Actualizar UI
            updateWeatherUI(currentData, forecastData);
            
        } catch (error) {
            console.log('Geolocalización fallida, usando ciudad por defecto...', error);
            await fetchWeatherData();
        }
    }

    // Evento para actualizar manualmente
    weatherElements.refreshBtn.addEventListener('click', fetchWeatherData);

    // Inicialización
    async function initWeatherWidget() {
        // Mostrar estado de carga inicial
        weatherElements.widget.classList.add('loading');
        
        try {
            // Intentar usar geolocalización primero
            await getWeatherByGeolocation();
        } catch (error) {
            // Fallback a ciudad por defecto
            await fetchWeatherData();
        }
        
        // Actualizar cada 30 minutos
        setInterval(fetchWeatherData, 1800000);
    }

    // Iniciar widget
    initWeatherWidget();
});
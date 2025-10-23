<!-- Widget del tiempo Desktop -->
<div class="weather-widget">
    <div class="weather-header">
        <h1 class="location">Cargando...</h1>
        <p class="weather-condition">--</p>
    </div>
    <div class="weather-main">
        <div class="current-weather">
            <div class="weather-icon" id="weatherIcon">
                <i class="fas fa-question"></i>
            </div>
            <span class="temperature">--°</span>
            <div class="temp-range">
                <span class="high">H --°</span>
                <span class="low">L --°</span>
            </div>
        </div>
        <div class="weather-details">
            <div class="detail-item">
                <i class="fas fa-tint"></i>
                <span class="humidity">--%</span>
            </div>
            <div class="detail-item">
                <i class="fas fa-wind"></i>
                <span class="wind">-- km/h</span>
            </div>
            <div class="detail-item">
                <i class="fas fa-compass"></i>
                <span class="pressure">-- hPa</span>
            </div>
        </div>
        <div class="weather-forecast" id="weatherForecast">
            <!-- Se llenará dinámicamente -->
        </div>
    </div>
    <div class="weather-footer">
        <small>Actualizado: <span class="last-updated">--</span></small>
        <button class="refresh-weather" id="refreshWeather">
            <i class="fas fa-sync-alt"></i> Actualizar
        </button>
    </div>
</div>
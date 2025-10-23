<!--  Ventana de Proyectos -->
<div class="window" id="projectsWindow">
    <div class="window-header">
        <span class="window-title">Mis Proyectos</span>
        <div class="window-controls">
            <button class="window-minimize"><i class="fas fa-minus"></i></button>
            <button class="window-maximize"><i class="far fa-square"></i></button>
            <button class="window-close"><i class="fas fa-times"></i></button>
        </div>
    </div>

    <div class="window-content projects-content">

         <!-- SECCIÓN DE FILTROS -->
        <div class="projects-filters" id="projectsFilters">
            <div class="filter-header">
                <h3><i class="fas fa-filter"></i> Filtros</h3>
                <button class="clear-filters" id="clearFilters">
                    <i class="fas fa-times"></i> Limpiar
                </button>
            </div>
            <div class="filter-categories">
                <div class="filter-group">
                    <label>Categorías:</label>
                    <div class="category-buttons" id="categoryButtons">
                        <!-- Los botones de categoría se generarán dinámicamente -->
                    </div>
                </div>
                <div class="filter-group">
                    <label>Tecnologías:</label>
                    <div class="tech-filters" id="techFilters">
                        <!-- Los filtros de tecnología se generarán dinámicamente -->
                    </div>
                </div>
            </div>
            <div class="filter-results">
                <span id="filterResultsText">Mostrando todos los proyectos</span>
            </div>
        </div>


        <div class="projects-grid" id="cards-container">
            <!-- Las cards se generarán dinámicamente con JavaScript -->
        </div>

        <div class="pagination-card" id="pagination">
                <!-- Los botones de paginación se generarán dinámicamente con JavaScript -->
        </div>
       
    </div>
</div>

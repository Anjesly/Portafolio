import './contacto.js';

document.addEventListener('DOMContentLoaded', async function () {
    await getSocialNetworks();
    await getProfile();
    await getWorkExperience();
    await getEducation();
    await getProjectsList();
});

//  INICIO DE MODULO SOBRE MI


//  Obtener mi perfil
const getProfile = async () => {
    try {
        const url = 'php/sobreMi/getProfile.php';
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            body: null,
        });
        
        if(!response.ok){
            throw new Error('Error al obtener los proyectos');
        }

        const data = await response.json();
        const {nombres, edad, direccion, freelance, email, telefono, website, titulo, resumen} = data;
        //  Perfil
        document.getElementById("nombres").innerHTML = nombres;
        document.getElementById("edad").innerHTML = edad;
        document.getElementById("direccion").innerHTML = direccion;
        document.getElementById("freelance").innerHTML = freelance;
        document.getElementById("email-perfil").innerHTML = email;
        document.getElementById("telefono").innerHTML = telefono;
        document.getElementById("website").innerHTML = website;
        document.getElementById("titulo").innerHTML = titulo;
        document.getElementById("resumen").innerHTML = resumen;
        //  Contacto
        document.getElementById("contactName").innerHTML = nombres;
        document.getElementById("contactLocation").innerHTML = direccion;
        document.getElementById("contactEmail").innerHTML = email;
        document.getElementById("contactPhone").innerHTML = telefono;
        //  Inicio
        document.getElementById("startName").innerHTML = nombres;

    } catch (error) {
        console.error('Error en la petición:', error);
        cardsContainer.innerHTML = '<p>Error al cargar mi perfil. Inténtalo de nuevo más tarde.</p>';
    }
}

//  Obtener redes sociales
const getSocialNetworks = async () => {
    try {
        const url = 'php/sobreMi/getSocialNetworks.php';
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            body: null,
        });
        
        if(!response.ok){
            throw new Error('Error al obtener los proyectos');
        }

        const data = await response.json();
        const {github, linkedin, instagram, threads, tiktok, telegram} = data;
        document.getElementById('githubShortcut').addEventListener('click', () => window.open(github, '_blank'));
        document.getElementById('linkedinShortcut').addEventListener('click', () => window.open(linkedin, '_blank'));
        document.getElementById('instagramShortcut').addEventListener('click', () => window.open(instagram, '_blank'));
        document.getElementById('threadsShortcut').addEventListener('click', () => window.open(threads, '_blank'));
        document.getElementById('tiktokShortcut').addEventListener('click', () => window.open(tiktok, '_blank'));
        document.getElementById('telegramShortcut').addEventListener('click', () => window.open(telegram, '_blank'));
    } catch (error) {
        console.error('Error en la petición:', error);
        cardsContainer.innerHTML = '<p>Error al cargar mi perfil. Inténtalo de nuevo más tarde.</p>';
    }
}


let experiencias = [];
const cardsExperience = document.getElementById('experienceContainer');

//  Obtener mi experiencia laboral
const getWorkExperience = async () => {
    try {
        const url = 'php/sobreMi/getWorkExperience.php';
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            body: null,
        });
        
        if(!response.ok){
            throw new Error('Error al obtener la experiencia laboral');
        }

        const data = await response.json();
        experiencias = data; 
        renderExperience();
        
    } catch (error) {
        console.error('Error en la petición:', error);
        cardsExperience.innerHTML = '<p>Error al cargar mi experiencia laboral. Inténtalo de nuevo más tarde.</p>';
    }
}

function renderExperience() {
    
    cardsExperience.innerHTML = '';
    
    experiencias.forEach(exp => {
        const empresa = exp.empresa;
        const temporada = exp.temporada;
        const cargo = exp.cargo;
        const funciones = exp.funciones;
        
        const experienceItem = document.createElement('div');
        experienceItem.className = 'experience-item';
        experienceItem.innerHTML = `
            <div class="experience-header">
                <h4>${empresa}</h4>
                <span class="experience-date">${temporada}</span>
            </div>
            <p class="experience-position">${cargo}</p>
            <ul class="experience-details">
                <li>${funciones}</li>
            </ul>
        `;
        cardsExperience.appendChild(experienceItem);
    });

}

let educacion = [];
const cardsEducation = document.getElementById('educationContainer');

//  Obtener mi experiencia laboral
const getEducation = async () => {
    try {
        const url = 'php/sobreMi/getEducation.php';
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            body: null,
        });
        
        if(!response.ok){
            throw new Error('Error al obtener la educacion');
        }

        const data = await response.json();
        educacion = data; 
        renderEducation();
        
    } catch (error) {
        console.error('Error en la petición:', error);
        cardsEducation.innerHTML = '<p>Error al cargar la educacion. Inténtalo de nuevo más tarde.</p>';
    }
}

function renderEducation() {
    
    cardsEducation.innerHTML = '';
    
    educacion.forEach(edu => {
        const titulo = edu.titulo;
        const ano = edu.ano;
        const instituto = edu.instituto;
        const descripcion = edu.descripcion == null ? '' : edu.descripcion;

        const educationItem = document.createElement('div');
        educationItem.className = 'experience-item';
        educationItem.innerHTML = `
            <div class="experience-header">
                <h4>${instituto}</h4>
                <span class="experience-date">${ano}</span>
            </div>
            <p class="experience-position">${titulo}</p>
            <ul class="experience-details">
                <li>${descripcion}</li>
            </ul>
        `;
        cardsEducation.appendChild(educationItem);
    });

}



//  FIN DE MODULO SOBRE MI

//  INICIO DE LISTADOS DE PROYECTOS //

let projects = [];
let filteredProjects = [];
const cardsContainer = document.getElementById('cards-container');
const pagination = document.getElementById('pagination');
const categoryButtons = document.getElementById('categoryButtons');
const techFilters = document.getElementById('techFilters');
const clearFilters = document.getElementById('clearFilters');
const filterResultsText = document.getElementById('filterResultsText');

const itemsPerPage = 6;
let currentPage = 1;
const maxVisiblePages = 5;

// Estado de filtros
let activeFilters = {
    category: 'all',
    technologies: []
};

const getProjectsList = async () => {
    try {
        const url = 'php/proyectos/getProjectsList.php';
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            body: null,
        });
        
        if(!response.ok){
            throw new Error('Error al obtener los proyectos');
        }

        const data = await response.json();
        projects = data; 
        filteredProjects = [...projects]; // Inicialmente mostrar todos
        
        // Renderizar filtros y proyectos
        renderFilters();
        renderCards(currentPage);
        renderPagination();
        
    } catch (error) {
        console.error('Error en la petición:', error);
        cardsContainer.innerHTML = '<p>Error al cargar los proyectos. Inténtalo de nuevo más tarde.</p>';
    }
}

// Función para renderizar los filtros
function renderFilters() {
    // Extraer categorías únicas de los proyectos
    const categories = [...new Set(projects.map(project => {
        // Si categorias es un string separado por comas, tomar la primera categoría
        if (project.categorias && typeof project.categorias === 'string') {
            return project.categorias.split(',')[0].trim();
        }
        return 'General';
    }))];
    
    // Botón "Todos"
    const allButton = document.createElement('button');
    allButton.className = 'category-btn active';
    allButton.textContent = 'Todos';
    allButton.setAttribute('data-category', 'all');
    allButton.addEventListener('click', () => handleCategoryFilter('all'));
    categoryButtons.appendChild(allButton);
    
    // Botones de categorías
    categories.forEach(category => {
        const button = document.createElement('button');
        button.className = 'category-btn';
        button.textContent = category;
        button.setAttribute('data-category', category);
        button.addEventListener('click', () => handleCategoryFilter(category));
        categoryButtons.appendChild(button);
    });
    
    // Extraer tecnologías únicas de los lenguajes
    const allTechnologies = projects.flatMap(project => {
        if (project.lenguajes && typeof project.lenguajes === 'string') {
            return project.lenguajes.split(',').map(tech => tech.trim());
        }
        return ['HTML5', 'CSS3', 'JavaScript'];
    });
    
    const uniqueTechnologies = [...new Set(allTechnologies)];
    
    // Filtros de tecnologías
    uniqueTechnologies.forEach(tech => {
        const label = document.createElement('label');
        label.className = 'tech-checkbox';
        label.innerHTML = `
            <input type="checkbox" value="${tech}">
            ${tech}
        `;
        label.addEventListener('click', (e) => {
            e.preventDefault();
            handleTechFilter(tech);
        });
        techFilters.appendChild(label);
    });
    
    // Event listener para limpiar filtros
    clearFilters.addEventListener('click', clearAllFilters);
}

// Manejar filtro por categoría
function handleCategoryFilter(category) {
    // Actualizar botones activos
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-category="${category}"]`).classList.add('active');
    
    activeFilters.category = category;
    applyFilters();
}

// Manejar filtro por tecnología
function handleTechFilter(tech) {
    const checkbox = document.querySelector(`input[value="${tech}"]`);
    const label = checkbox.parentElement;
    
    if (activeFilters.technologies.includes(tech)) {
        // Remover tecnología
        activeFilters.technologies = activeFilters.technologies.filter(t => t !== tech);
        label.classList.remove('active');
    } else {
        // Agregar tecnología
        activeFilters.technologies.push(tech);
        label.classList.add('active');
    }
    
    applyFilters();
}

// Aplicar todos los filtros
function applyFilters() {
    filteredProjects = projects.filter(project => {
        // Filtro por categoría
        let categoryMatch = false;
        if (activeFilters.category === 'all') {
            categoryMatch = true;
        } else {
            // Verificar si el proyecto tiene la categoría seleccionada
            if (project.categorias && typeof project.categorias === 'string') {
                const projectCategories = project.categorias.split(',').map(cat => cat.trim());
                categoryMatch = projectCategories.includes(activeFilters.category);
            } else {
                categoryMatch = false;
            }
        }
        
        // Filtro por tecnologías
        let techMatch = false;
        if (activeFilters.technologies.length === 0) {
            techMatch = true;
        } else {
            // Verificar si el proyecto tiene al menos una de las tecnologías seleccionadas
            if (project.lenguajes && typeof project.lenguajes === 'string') {
                const projectTechs = project.lenguajes.split(',').map(tech => tech.trim());
                techMatch = activeFilters.technologies.some(tech => 
                    projectTechs.includes(tech)
                );
            } else {
                techMatch = false;
            }
        }
        
        return categoryMatch && techMatch;
    });
    
    // Actualizar texto de resultados
    updateResultsText();
    
    // Resetear a página 1 y renderizar
    currentPage = 1;
    renderCards(currentPage);
    renderPagination();
}

// Limpiar todos los filtros
function clearAllFilters() {
    activeFilters = {
        category: 'all',
        technologies: []
    };
    
    // Resetear UI de filtros
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector('[data-category="all"]').classList.add('active');
    
    document.querySelectorAll('.tech-checkbox').forEach(checkbox => {
        checkbox.classList.remove('active');
    });
    
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });
    
    applyFilters();
}

// Actualizar texto de resultados
function updateResultsText() {
    const total = projects.length;
    const filtered = filteredProjects.length;
    
    if (filtered === total) {
        filterResultsText.textContent = `Mostrando todos los ${total} proyectos`;
    } else {
        filterResultsText.textContent = `Mostrando ${filtered} de ${total} proyectos`;
        
        // Mostrar filtros activos
        const activeFiltersText = [];
        if (activeFilters.category !== 'all') {
            activeFiltersText.push(`Categoría: ${activeFilters.category}`);
        }
        if (activeFilters.technologies.length > 0) {
            activeFiltersText.push(`Tecnologías: ${activeFilters.technologies.join(', ')}`);
        }
        
        if (activeFiltersText.length > 0) {
            filterResultsText.textContent += ` (Filtros: ${activeFiltersText.join(' | ')})`;
        }
    }
}

function renderCards(page) {
    
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedProjects = filteredProjects.slice(start, end);
    
    cardsContainer.innerHTML = '';

    if (paginatedProjects.length === 0) {
        cardsContainer.innerHTML = `
            <div class="no-projects">
                <i class="fas fa-search" style="font-size: 48px; color: #ccc; margin-bottom: 16px;"></i>
                <h3>No se encontraron proyectos</h3>
                <p>Intenta con otros criterios de búsqueda</p>
            </div>
        `;
        return;
    }
    
    paginatedProjects.forEach(project => {
        const nombre = project.nombre;
        const resumen = project.resumen;
        const cliente = project.cliente;
        const imagen = project.imagen;
        const url = project.url;
        const fecha = project.created;
        
        // Convertir strings concatenados en arrays
        const categorias = project.categorias ? project.categorias.split(',').map(cat => cat.trim()) : [];
        const lenguajes = project.lenguajes ? project.lenguajes.split(',').map(lang => lang.trim()) : [];
        
        // Función para generar tags de tecnologías
        const generateTechTags = (techArray) => {
            if (!techArray || techArray.length === 0) return '';
            
            return techArray.map(tech => {
                // Crear una clase CSS basada en el nombre de la tecnología
                const techClass = tech.toLowerCase().replace(/[^a-z0-9]/g, '-');
                return `<span class="tech-tag ${techClass}">${tech}</span>`;
            }).join('');
        };
        
        // Función para generar badges de categorías
        const generateCategoryBadges = (categoryArray) => {
            if (!categoryArray || categoryArray.length === 0) return '';
            
            return categoryArray.map(category => {
                return `<span class="category-badge">${category}</span>`;
            }).join('');
        };

        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <div class="project-image-container">
                <img src="https://portafolio.carlospcssoluciones.com.ve//media/${imagen}" alt="${nombre}" class="project-image">
                <div class="project-badges">
                    ${generateCategoryBadges(categorias)}
                </div>
            </div>
            <div class="project-details">
                <h3>${nombre}</h3>
                <div class="project-meta">
                    <span><i class="far fa-calendar"></i> ${new Date(fecha).toLocaleDateString()}</span>
                    <span><i class="fas fa-user-tie"></i> ${cliente || 'Sin cliente'}</span>
                </div>
                <p class="project-description">${resumen}</p>
                
                <div class="project-tech">
                    <h4><i class="fas fa-code"></i> Tecnologías</h4>
                    <div class="tech-tags">
                        ${generateTechTags(lenguajes)}
                    </div>
                </div>
                
                <div class="project-links">
                    ${url && url !== 'Private' ? `<a href="${url}" target="_blank" class="project-link"><i class="fas fa-external-link-alt"></i> Live Demo</a>` : ''}
                    <a href="#" class="project-link"><i class="fab fa-github"></i> GitHub</a>
                </div>
            </div>
        `;
        cardsContainer.appendChild(card);
    });
}

// Función para renderizar la paginación
function renderPagination() {
    // CORRECCIÓN: Usar filteredProjects en lugar de projects
    const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
    pagination.innerHTML = '';

    // Si no hay proyectos, mostrar mensaje
    if (filteredProjects.length === 0) {
        pagination.innerHTML = '<p>No hay proyectos para mostrar</p>';
        return;
    }
    
    // Si solo hay una página, no mostrar paginación
    if (totalPages <= 1) {
        return;
    }

    // Botón "Anterior"
    const prevButton = document.createElement('button');
    prevButton.innerHTML = '<i class="fas fa-chevron-left icon"></i>';
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderCards(currentPage);
            renderPagination();
        }
    });
    prevButton.disabled = currentPage === 1;
    pagination.appendChild(prevButton);

    // Calcular el rango de páginas visibles
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Ajustar el rango si se desborda
    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Botón para la primera página
    if (startPage > 1) {
        const firstPageButton = document.createElement('button');
        firstPageButton.innerText = '1';
        firstPageButton.addEventListener('click', () => {
            currentPage = 1;
            renderCards(currentPage);
            renderPagination();
        });
        pagination.appendChild(firstPageButton);

        if (startPage > 2) {
            const ellipsis = document.createElement('span');
            ellipsis.innerText = '...';
            pagination.appendChild(ellipsis);
        }
    }

    // Botones de páginas visibles
    for (let i = startPage; i <= endPage; i++) {
        const button = document.createElement('button');
        button.innerText = i;
        if (i === currentPage) {
            button.classList.add('active');
        }
        button.addEventListener('click', () => {
            currentPage = i;
            renderCards(currentPage);
            renderPagination();
        });
        pagination.appendChild(button);
    }

    // Botón para la última página
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            const ellipsis = document.createElement('span');
            ellipsis.innerText = '...';
            pagination.appendChild(ellipsis);
        }

        const lastPageButton = document.createElement('button');
        lastPageButton.innerText = totalPages;
        lastPageButton.addEventListener('click', () => {
            currentPage = totalPages;
            renderCards(currentPage);
            renderPagination();
        });
        pagination.appendChild(lastPageButton);
    }

    // Botón "Siguiente"
    const nextButton = document.createElement('button');
    nextButton.innerHTML = '<i class="fas fa-chevron-right icon"></i>';
    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderCards(currentPage);
            renderPagination();
        }
    });
    nextButton.disabled = currentPage === totalPages;
    pagination.appendChild(nextButton);
}

//  FIN DE LISTADO DE PROYECTOS //

// Sistema completo de calendario con eventos 
document.addEventListener('DOMContentLoaded', function() {
    const calendarApp = {
        currentDate: new Date(),
        events: JSON.parse(localStorage.getItem('calendarEvents')) || [],
        selectedDate: null,
        editingEvent: null,
        
        init() {
            this.setupEventListeners();
            this.renderMonth();
            this.updateEventsSidebar();
        },
        
        setupEventListeners() {
        // Navegación del calendario - prevenir propagación
        document.querySelector('.prev-month').addEventListener('click', (e) => {
            e.stopPropagation();
            this.changeMonth(-1);
        });
        document.querySelector('.next-month').addEventListener('click', (e) => {
            e.stopPropagation();
            this.changeMonth(1);
        });
        document.querySelector('.prev-year').addEventListener('click', (e) => {
            e.stopPropagation();
            this.changeYear(-1);
        });
        document.querySelector('.next-year').addEventListener('click', (e) => {
            e.stopPropagation();
            this.changeYear(1);
        });
        document.querySelector('#goToToday').addEventListener('click', (e) => {
            e.stopPropagation();
            this.goToToday();
        });
        
        // Vistas - prevenir propagación
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.switchView(e.target.dataset.view);
            });
        });
        
        // Modal de eventos - prevenir propagación
        document.querySelector('#addEventBtn').addEventListener('click', (e) => {
            e.stopPropagation();
            this.openEventModal();
        });
        document.querySelector('#addFirstEvent').addEventListener('click', (e) => {
            e.stopPropagation();
            this.openEventModal();
        });
        document.querySelector('#closeModal').addEventListener('click', (e) => {
            e.stopPropagation();
            this.closeEventModal();
        });
        document.querySelector('#cancelEvent').addEventListener('click', (e) => {
            e.stopPropagation();
            this.closeEventModal();
        });
        document.querySelector('#eventForm').addEventListener('submit', (e) => {
            e.stopPropagation();
            this.saveEvent(e);
        });
        
        // Prevenir propagación en elementos del modal
        document.querySelector('#eventModal .modal-content').addEventListener('click', (e) => {
            e.stopPropagation();
        });
        
        // Prevenir propagación en celdas del calendario
        document.addEventListener('click', (e) => {
            if (e.target.closest('.day-cell') || e.target.closest('.day-event')) {
                e.stopPropagation();
            }
        });
        
        // Cerrar modal haciendo clic fuera
        document.querySelector('#eventModal').addEventListener('click', (e) => {
            if (e.target.id === 'eventModal') this.closeEventModal();
        });
    },
        
        // Navegación
        changeMonth(direction) {
            this.currentDate.setMonth(this.currentDate.getMonth() + direction);
            this.renderMonth();
        },
        
        changeYear(direction) {
            this.currentDate.setFullYear(this.currentDate.getFullYear() + direction);
            this.renderMonth();
        },
        
        goToToday() {
            this.currentDate = new Date();
            this.selectedDate = new Date();
            this.renderMonth();
            this.updateEventsSidebar();
        },
        
        switchView(view) {
            document.querySelectorAll('.calendar-view').forEach(v => v.classList.remove('active'));
            document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
            document.querySelector(`.${view}-view`).classList.add('active');
            document.querySelector(`[data-view="${view}"]`).classList.add('active');
        },
        
        // Renderizado del mes
        renderMonth() {
            const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                               'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
            
            document.querySelector('#currentMonthYear').textContent = 
                `${monthNames[this.currentDate.getMonth()]} ${this.currentDate.getFullYear()}`;
            
            this.generateMonthGrid();
        },
        
        generateMonthGrid() {
            const grid = document.querySelector('#monthDaysGrid');
            grid.innerHTML = '';
            
            const year = this.currentDate.getFullYear();
            const month = this.currentDate.getMonth();
            
            // Primer día del mes
            const firstDay = new Date(year, month, 1);
            // Último día del mes
            const lastDay = new Date(year, month + 1, 0);
            // Día de la semana del primer día (0 = Domingo, 6 = Sábado)
            const firstDayOfWeek = firstDay.getDay();
            
            // Días del mes anterior
            const prevMonthLastDay = new Date(year, month, 0).getDate();
            for (let i = firstDayOfWeek - 1; i >= 0; i--) {
                const day = prevMonthLastDay - i;
                this.createDayCell(grid, day, 'other-month', new Date(year, month - 1, day));
            }
            
            // Días del mes actual
            for (let day = 1; day <= lastDay.getDate(); day++) {
                const date = new Date(year, month, day);
                const isToday = this.isToday(date);
                const isSelected = this.selectedDate && this.isSameDay(date, this.selectedDate);
                const classes = ['current-month'];
                if (isToday) classes.push('today');
                if (isSelected) classes.push('selected');
                
                this.createDayCell(grid, day, classes.join(' '), date);
            }
            
            // Días del próximo mes
            const totalCells = 42; // 6 semanas
            const daysSoFar = firstDayOfWeek + lastDay.getDate();
            const nextMonthDays = totalCells - daysSoFar;
            
            for (let day = 1; day <= nextMonthDays; day++) {
                this.createDayCell(grid, day, 'other-month', new Date(year, month + 1, day));
            }
        },
        
        createDayCell(grid, dayNumber, className, date) {
            const cell = document.createElement('div');
            cell.className = `day-cell ${className}`;
            cell.dataset.date = date.toISOString().split('T')[0];
            
            const events = this.getEventsForDate(date);
            const hasEvents = events.length > 0;
            
            cell.innerHTML = `
                <div class="day-number">${dayNumber}</div>
                <div class="day-events">
                    ${events.slice(0, 2).map(event => `
                        <div class="day-event" style="background-color: ${event.color};" 
                             data-event-id="${event.id}">
                            ${event.title}
                        </div>
                    `).join('')}
                    ${events.length > 2 ? `<div class="more-events">+${events.length - 2} más</div>` : ''}
                </div>
                ${hasEvents && events.length > 2 ? `
                    <div class="event-indicator">
                        ${events.slice(0, 3).map(event => `
                            <div class="event-dot-small" style="background-color: ${event.color};"></div>
                        `).join('')}
                    </div>
                ` : ''}
            `;
            
            cell.addEventListener('click', () => this.selectDate(date));
            grid.appendChild(cell);
        },
        
        // Gestión de eventos
        openEventModal(date = null) {
            this.editingEvent = null;
            const modal = document.querySelector('#eventModal');
            const form = document.querySelector('#eventForm');
            
            document.querySelector('#modalTitle').textContent = 'Nuevo Evento';
            form.reset();
            document.querySelector('#eventColor').value = '#0078d4';
            document.querySelector('#eventDuration').value = '60';
            
            if (date) {
                document.querySelector('#eventDate').value = date.toISOString().split('T')[0];
                document.querySelector('#eventTime').value = '09:00';
            } else {
                const now = new Date();
                document.querySelector('#eventDate').value = now.toISOString().split('T')[0];
                document.querySelector('#eventTime').value = 
                    `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
            }
            
            modal.style.display = 'flex';
        },
        
        closeEventModal() {
            document.querySelector('#eventModal').style.display = 'none';
            this.editingEvent = null;
        },
        
        saveEvent(e) {
            e.preventDefault();
            
            const eventData = {
                id: this.editingEvent ? this.editingEvent.id : this.generateId(),
                title: document.querySelector('#eventTitle').value,
                date: document.querySelector('#eventDate').value,
                time: document.querySelector('#eventTime').value,
                duration: parseInt(document.querySelector('#eventDuration').value),
                color: document.querySelector('#eventColor').value,
                location: document.querySelector('#eventLocation').value,
                description: document.querySelector('#eventDescription').value,
                createdAt: new Date().toISOString()
            };
            
            if (this.editingEvent) {
                // Actualizar evento existente
                const index = this.events.findIndex(e => e.id === this.editingEvent.id);
                this.events[index] = eventData;
            } else {
                // Agregar nuevo evento
                this.events.push(eventData);
            }
            
            this.saveEventsToStorage();
            this.renderMonth();
            this.updateEventsSidebar();
            this.closeEventModal();
        },
        
        deleteEvent(eventId) {
            if (confirm('¿Estás seguro de que quieres eliminar este evento?')) {
                this.events = this.events.filter(event => event.id !== eventId);
                this.saveEventsToStorage();
                this.renderMonth();
                this.updateEventsSidebar();
            }
        },
        
        editEvent(eventId) {
            const event = this.events.find(e => e.id === eventId);
            if (event) {
                this.editingEvent = event;
                this.openEventModal();
                
                // Llenar el formulario con los datos del evento
                document.querySelector('#modalTitle').textContent = 'Editar Evento';
                document.querySelector('#eventId').value = event.id;
                document.querySelector('#eventTitle').value = event.title;
                document.querySelector('#eventDate').value = event.date;
                document.querySelector('#eventTime').value = event.time;
                document.querySelector('#eventDuration').value = event.duration;
                document.querySelector('#eventColor').value = event.color;
                document.querySelector('#eventLocation').value = event.location || '';
                document.querySelector('#eventDescription').value = event.description || '';
            }
        },
        
        // Utilidades
        selectDate(date) {
            this.selectedDate = date;
            this.renderMonth();
            this.updateEventsSidebar();
            
            // Abrir modal para agregar evento al hacer clic en una fecha
            this.openEventModal(date);
        },
        
        updateEventsSidebar() {
            const eventsList = document.querySelector('#eventsList');
            const noEventsMessage = document.querySelector('#noEventsMessage');
            const sidebarDate = document.querySelector('#sidebarDate');
            
            const date = this.selectedDate || new Date();
            const events = this.getEventsForDate(date);
            
            // Actualizar fecha en el sidebar
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            sidebarDate.textContent = date.toLocaleDateString('es-ES', options);
            
            if (events.length === 0) {
                noEventsMessage.style.display = 'block';
                eventsList.innerHTML = '';
                eventsList.appendChild(noEventsMessage);
            } else {
                noEventsMessage.style.display = 'none';
                eventsList.innerHTML = events.map(event => `
                    <div class="event-item ${this.isPastEvent(event) ? 'past' : ''} ${this.isCurrentEvent(event) ? 'current' : ''}">
                        <div class="event-time">${event.time}</div>
                        <div class="event-details">
                            <div class="event-title">${event.title}</div>
                            ${event.location ? `<div class="event-location">${event.location}</div>` : ''}
                        </div>
                        <div class="event-color" style="background-color: ${event.color};"></div>
                        <div class="event-actions">
                            <button class="event-action-btn" onclick="calendarApp.editEvent('${event.id}')">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="event-action-btn" onclick="calendarApp.deleteEvent('${event.id}')">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                `).join('');
            }
        },
        
        getEventsForDate(date) {
            const dateStr = date.toISOString().split('T')[0];
            return this.events
                .filter(event => event.date === dateStr)
                .sort((a, b) => a.time.localeCompare(b.time));
        },
        
        isToday(date) {
            const today = new Date();
            return date.toDateString() === today.toDateString();
        },
        
        isSameDay(date1, date2) {
            return date1.toDateString() === date2.toDateString();
        },
        
        isPastEvent(event) {
            const now = new Date();
            const eventDateTime = new Date(`${event.date}T${event.time}`);
            return eventDateTime < now;
        },
        
        isCurrentEvent(event) {
            const now = new Date();
            const eventDateTime = new Date(`${event.date}T${event.time}`);
            const eventEndTime = new Date(eventDateTime.getTime() + (event.duration * 60000));
            return now >= eventDateTime && now <= eventEndTime;
        },
        
        generateId() {
            return Date.now().toString(36) + Math.random().toString(36).substr(2);
        },
        
        saveEventsToStorage() {
            localStorage.setItem('calendarEvents', JSON.stringify(this.events));
        }
    };
    
    // Inicializar la aplicación
    window.calendarApp = calendarApp;
    calendarApp.init();
});
document.addEventListener('DOMContentLoaded', () => {
    // Remove loader after initial presentation
    setTimeout(() => {
        const loader = document.querySelector('.loader');
        loader.classList.add('fade-out');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1000);

    // Logo click handler
    document.querySelector('.logo').addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Navbar scroll effect
    const nav = document.querySelector('.nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            navLinks.classList.remove('active');
        }
    });

    // 3D Mode functionality
    const enter3dBtn = document.getElementById('toggle-3d');
    const exit3dBtn = document.getElementById('exit-3d');
    const options3dBtn = document.getElementById('options-3d');
    const sectionNavButtons = document.querySelector('.section-nav-buttons');
    const threeContainer = document.getElementById('three-container');
    const mainContent = document.querySelector('main');
    const navigation = document.querySelector('.nav');
    const heroContent = document.querySelector('.hero-content');
    const footer = document.querySelector('footer');
    const discoverBtn = document.querySelector('.discover-btn');

    let is3DMode = false;
    let isOptionsOpen = false;
    
    // Función global para cerrar el menú
    window.closeOptionsMenu = function() {
        console.log('Cerrando menú desde función global');
        console.log('Estado anterior isOptionsOpen:', isOptionsOpen);
        
        isOptionsOpen = false;
        console.log('Nuevo estado isOptionsOpen:', isOptionsOpen);
        
        sectionNavButtons.classList.remove('active');
        console.log('Clase active removida');
        
        sectionNavButtons.style.opacity = '0';
        sectionNavButtons.style.visibility = 'hidden';
        sectionNavButtons.style.pointerEvents = 'none';
        console.log('Estilos aplicados:', {
            opacity: sectionNavButtons.style.opacity,
            visibility: sectionNavButtons.style.visibility,
            pointerEvents: sectionNavButtons.style.pointerEvents
        });
    }

    // Toggle options menu
    options3dBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        isOptionsOpen = !isOptionsOpen;
        
        if (isOptionsOpen) {
            sectionNavButtons.classList.add('active');
            sectionNavButtons.style.opacity = '1';
            sectionNavButtons.style.visibility = 'visible';
            sectionNavButtons.style.pointerEvents = 'auto';
        } else {
            closeOptionsMenu();
        }
    });

    // Close options menu when clicking outside
    document.addEventListener('click', (e) => {
        if (isOptionsOpen && 
            !sectionNavButtons.contains(e.target) && 
            !options3dBtn.contains(e.target)) {
            closeOptionsMenu();
        }
    });

    // Prevent closing when clicking inside the menu
    // sectionNavButtons.addEventListener('click', (e) => {
    //     // No detener la propagación para permitir que los clics en los botones cierren el menú
    //     // e.stopPropagation();
    // });

    enter3dBtn.addEventListener('click', () => {
        is3DMode = true;
        isOptionsOpen = false;
        mainContent.style.display = 'none';
        nav.style.display = 'none';
        heroContent.style.display = 'none';
        footer.style.display = 'none';
        discoverBtn.style.display = 'none';
        threeContainer.classList.add('fullscreen');
        sectionNavButtons.classList.remove('active');
        threeContainer.style.pointerEvents = 'auto';
        threeContainer.style.opacity = '1';
        
        // Animar la cámara acercándose al cubo
        if (window.threeScene) {
            window.threeScene.setMode('fullscreen');
            
            // Forzar un redimensionamiento después de que se complete la transición
            setTimeout(() => {
                window.threeScene.handleResize();
            }, 100);
        }
    });

    exit3dBtn.addEventListener('click', () => {
        // Cerrar el menú desplegable si está abierto
        if (isOptionsOpen) {
            closeOptionsMenu();
        }
        
        // Cerrar cualquier sección abierta
        if (window.threeScene) {
            window.threeScene.hideAllSectionOverlays();
        }
        
        is3DMode = false;
        isOptionsOpen = false;
        mainContent.style.display = 'block';
        nav.style.display = 'flex';
        heroContent.style.display = 'block';
        footer.style.display = 'block';
        discoverBtn.style.display = 'flex';
        threeContainer.classList.remove('fullscreen');
        sectionNavButtons.classList.remove('active');
        threeContainer.style.pointerEvents = 'none';
        threeContainer.style.opacity = '0.3';
        
        // Animar la cámara alejándose del cubo
        if (window.threeScene) {
            window.threeScene.setMode('normal');
            
            // Forzar un redimensionamiento después de que se complete la transición
            setTimeout(() => {
                window.threeScene.handleResize();
            }, 100);
        }
    });

    // Add section navigation functionality
    document.querySelectorAll('.section-nav-buttons .nav-button').forEach(button => {
        button.addEventListener('click', function(e) {
            // Detener la propagación del evento
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Opción de menú seleccionada (desde addEventListener):', this.dataset.section);
            
            // Cerrar el menú usando la función global
            closeOptionsMenu();
            
            const sectionId = this.dataset.section;
            
            // Navegar al punto de aterrizaje en el planeta en lugar de salir del modo 3D
            if (window.threeScene && sectionId) {
                console.log('Navegando a la sección 3D:', sectionId);
                window.threeScene.moveToTarget(sectionId);
            }
        }, true); // Usar captura para asegurar que este evento se ejecute primero
    });
    
    // Manejar el redimensionamiento de la ventana
    let resizeTimer;
    window.addEventListener('resize', () => {
        // Limpiar el temporizador anterior si existe
        if (resizeTimer) clearTimeout(resizeTimer);
        
        // Establecer un nuevo temporizador
        resizeTimer = setTimeout(() => {
            // Actualizar el viewport si estamos en modo 3D
            if (is3DMode && window.threeScene) {
                window.threeScene.handleResize();
            }
        }, 250); // Esperar 250ms después del último evento de redimensionamiento
    });

    // Close options menu when clicking on the 3D container
    threeContainer.addEventListener('click', (e) => {
        // Solo cerrar si el clic no fue en el menú ni en el botón de opciones
        if (isOptionsOpen && 
            !sectionNavButtons.contains(e.target) && 
            !options3dBtn.contains(e.target)) {
            closeOptionsMenu();
        }
    });

    // Añadir eventos de clic directamente a los botones del menú
    setTimeout(() => {
        document.querySelectorAll('.section-nav-buttons .nav-button').forEach(button => {
            console.log('Añadiendo evento de clic a botón:', button.dataset.section);
            button.onclick = function() {
                console.log('Clic directo en botón:', this.dataset.section);
                closeOptionsMenu();
            };
        });
    }, 1000);
});

// Función global para cerrar una sección en el modo 3D
function closeSection3DOverlay(section) {
    console.log('Cerrando sección 3D:', section);
    if (window.threeScene) {
        window.threeScene.hideSectionOverlay(section);
    }
} 
class ThreeScene {
    constructor() {
        this.container = document.getElementById('three-container');
        this.scene = new THREE.Scene();
        
        // Get container dimensions
        const container = this.container;
        const width = container.clientWidth;
        const height = container.clientHeight;
        
        // Create camera with wider field of view
        this.camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
        
        // Define camera positions for different modes
        this.cameraPositions = {
            normal: { z: 50 },
            fullscreen: { z: 25 }
        };

        // Define targets for different sections with their positions (en el ecuador)
        this.targets = {
            'about': { angle: 0 },                    // 0°
            'skills': { angle: (2 * Math.PI) / 5 },   // 72°
            'experience': { angle: (4 * Math.PI) / 5 }, // 144°
            'projects': { angle: (6 * Math.PI) / 5 },  // 216°
            'contact': { angle: (8 * Math.PI) / 5 }    // 288°
        };

        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true, 
            alpha: true,
            powerPreference: "high-performance"
        });
        
        // Set renderer size to match container
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.container.appendChild(this.renderer.domElement);

        // Implementar un debounce para el evento de redimensionamiento
        let resizeTimeout;
        const handleResizeWithDebounce = () => {
            if (resizeTimeout) clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 100); // Esperar 100ms después del último evento de redimensionamiento
        };

        // Agregar listener para el evento de redimensionamiento
        window.addEventListener('resize', handleResizeWithDebounce);
        
        // También manejar cambios de orientación en dispositivos móviles
        window.addEventListener('orientationchange', () => {
            // Esperar un momento para que el navegador actualice las dimensiones
            setTimeout(() => this.handleResize(), 200);
        });

        this.init();
        this.animate();
        this.setupResizeObserver();
    }

    init() {
        // Create planet
        const planetRadius = 5;
        const planetGeometry = new THREE.SphereGeometry(planetRadius, 32, 32);
        
        // Crear material wireframe con el color #00f7ff
        const planetMaterial = new THREE.MeshPhongMaterial({
            color: 0x00f7ff,  // Color azul cian
            wireframe: true,
            wireframeLinewidth: 1,
            emissive: 0x00f7ff,
            emissiveIntensity: 0.2
        });

        this.planet = new THREE.Mesh(planetGeometry, planetMaterial);
        this.scene.add(this.planet);

        // Create panels
        const panelGeometry = new THREE.PlaneGeometry(5, 3); // Paneles más grandes para evitar recortes

        // Create panels for each section
        this.panels = {};
        Object.entries(this.targets).forEach(([section, position]) => {
            const texture = this.createTextTexture(section);
            
            const panel = new THREE.Mesh(
                panelGeometry,
                new THREE.MeshBasicMaterial({
                    map: texture,
                    transparent: true,
                    opacity: 1.0, // Opacidad completa para el texto
                    side: THREE.DoubleSide, // Visible desde ambos lados
                    depthWrite: false, // Ayuda con la transparencia
                    alphaTest: 0.1 // Solo renderiza píxeles con alpha > 0.1 (el texto)
                })
            );
            
            // Posicionar el panel en el ecuador del planeta
            const radius = planetRadius + 0.5;
            panel.position.x = Math.cos(position.angle) * radius;
            panel.position.z = Math.sin(position.angle) * radius;
            
            // Hacer que el panel mire hacia afuera
            panel.lookAt(0, 0, 0);
            panel.rotateY(Math.PI); // Girar el panel para que el texto mire hacia afuera
            
            this.planet.add(panel);
            this.panels[section] = panel;
        });

        // Create starfield
        const starGeometry = new THREE.BufferGeometry();
        const starCount = 2000;
        const positions = new Float32Array(starCount * 3);
        
        for (let i = 0; i < starCount * 3; i += 3) {
            const radius = 20 + Math.random() * 30;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos((Math.random() * 2) - 1);
            
            positions[i] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i + 2] = radius * Math.cos(phi);
        }
        
        starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        
        const starMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.1,
            sizeAttenuation: true
        });
        
        this.starfield = new THREE.Points(starGeometry, starMaterial);
        this.scene.add(this.starfield);

        // Add lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5);
        this.scene.add(directionalLight);

        // Position camera
        this.camera.position.z = this.cameraPositions.normal.z;

        // Initialize camera target
        this.currentTarget = null;
        this.isMovingToTarget = false;

        // Crear la luna
        const moonGeometry = new THREE.IcosahedronGeometry(2, 2);
        const moonMaterial = new THREE.MeshBasicMaterial({
            color: '#00f7ff',
            wireframe: true,
            transparent: true,
            opacity: 0.8
        });
        this.moon = new THREE.Mesh(moonGeometry, moonMaterial);
        this.scene.add(this.moon);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        // Rotate the planet solo si no estamos en transición
        if (!this.isMovingToTarget) {
            this.planet.rotation.y += 0.002;
        }

        // Rotate the starfield slowly
        this.starfield.rotation.x += 0.0002;
        this.starfield.rotation.y += 0.0002;

        // Rotar la luna alrededor del planeta
        if (this.moon) {
            const time = Date.now() * 0.0005; // Velocidad de rotación
            const radius = 15; // Radio de la órbita
            const height = 5; // Altura de la órbita (para hacerla diagonal)
            
            this.moon.position.x = Math.cos(time) * radius;
            this.moon.position.y = Math.sin(time) * height;
            this.moon.position.z = Math.sin(time) * radius;
            
            // Hacer que la luna mire al planeta
            this.moon.lookAt(0, 0, 0);
        }

        // Solo actualizar la posición de la cámara si no estamos en transición
        if (this.currentTarget && !this.isMovingToTarget) {
            const panel = this.panels[this.currentTarget];
            if (panel) {
                const panelPosition = new THREE.Vector3();
                panel.getWorldPosition(panelPosition);
                
                const directionToPanel = new THREE.Vector3().subVectors(panelPosition, new THREE.Vector3(0, 0, 0));
                directionToPanel.normalize();
                
                // Usar una distancia más cercana para el zoom (40% de la distancia normal)
                const normalDistance = 20; // Distancia base
                const zoomDistance = normalDistance * 0.4; // Distancia cercana para el zoom
                
                // Actualizar la posición de la cámara con la distancia de zoom
                this.camera.position.copy(directionToPanel.multiplyScalar(zoomDistance));
                
                // Mirar hacia el panel
                this.camera.lookAt(panelPosition);
            }
        }

        this.renderer.render(this.scene, this.camera);
    }

    moveToTarget(section, duration = 1500) {
        // Si ya estamos en el target actual, no hacer nada
        if (this.currentTarget === section) return;
        
        if (this.isMovingToTarget) return;

        const panel = this.panels[section];
        if (!panel) return;

        // Guardar el target anterior
        const previousTarget = this.currentTarget;

        // Cerrar la sección anterior si existe
        if (previousTarget) {
            const previousOverlay = document.getElementById(`${previousTarget}-3d-overlay`);
            if (previousOverlay && previousOverlay.classList.contains('active')) {
                previousOverlay.classList.remove('active');
            }
        }

        this.isMovingToTarget = true;
        this.currentTarget = section;
        
        // Obtener la posición actual de la cámara y su distancia al centro
        const normalDistance = 20; // Distancia normal para orbitar
        const zoomDistance = normalDistance * 0.4; // Distancia cercana para el zoom (40% de la distancia normal)
        
        // Obtener la posición del panel en coordenadas mundiales
        const panelPosition = new THREE.Vector3();
        panel.getWorldPosition(panelPosition);
        
        // Calcular la dirección al panel desde el centro (guardar una copia para usarla después)
        const directionToPanel = new THREE.Vector3().subVectors(panelPosition, new THREE.Vector3(0, 0, 0)).normalize();
        
        // Calcular la dirección actual de la cámara
        const currentDirection = this.camera.position.clone().normalize();
        const currentDistance = this.camera.position.length();
        
        // Calcular el ángulo entre las direcciones usando el producto punto
        const dot = currentDirection.dot(directionToPanel);
        const angle = Math.acos(Math.min(Math.max(dot, -1), 1));
        
        // Determinar la dirección de la rotación usando el producto cruz
        const cross = new THREE.Vector3().crossVectors(currentDirection, directionToPanel);
        const rotationDirection = cross.y > 0 ? 1 : -1;
        
        // Variables para controlar la animación
        const startTime = Date.now();
        const totalDuration = duration;
        const zoomOutDuration = totalDuration * 0.3;
        const orbitDuration = totalDuration * 0.4;
        const zoomInDuration = totalDuration * 0.3;
        
        // Función de animación principal
        const animate = () => {
            const currentTime = Date.now();
            const elapsedTime = currentTime - startTime;
            
            if (elapsedTime >= totalDuration) {
                // Asegurarse de que al final mire directamente al panel
                const finalPanelPos = new THREE.Vector3();
                panel.getWorldPosition(finalPanelPos);
                
                // Establecer la posición final de la cámara
                const finalDirection = directionToPanel.clone();
                this.camera.position.copy(finalDirection.multiplyScalar(zoomDistance));
                this.camera.lookAt(finalPanelPos);
                
                // Finalizar la animación
                this.isMovingToTarget = false;
                
                // Mostrar la sección correspondiente
                this.showSectionOverlay(section);
                
                return;
            }
            
            // Calcular el progreso de cada fase
            const zoomOutProgress = Math.min(elapsedTime / zoomOutDuration, 1);
            const orbitProgress = elapsedTime > zoomOutDuration ? 
                Math.min((elapsedTime - zoomOutDuration) / orbitDuration, 1) : 0;
            const zoomInProgress = elapsedTime > (zoomOutDuration + orbitDuration) ? 
                Math.min((elapsedTime - zoomOutDuration - orbitDuration) / zoomInDuration, 1) : 0;
            
            // Aplicar easing a los progresos
            const easeProgress = t => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
            
            // Calcular la posición de la cámara
            let cameraDirection = currentDirection.clone();
            let cameraDistance = currentDistance;
            
            // Aplicar zoom out
            if (zoomOutProgress > 0) {
                cameraDistance = currentDistance + (normalDistance - currentDistance) * easeProgress(zoomOutProgress);
            }
            
            // Aplicar rotación orbital
            if (orbitProgress > 0) {
                const currentAngle = angle * easeProgress(orbitProgress) * rotationDirection;
                const matrix = new THREE.Matrix4();
                matrix.makeRotationY(currentAngle);
                cameraDirection = currentDirection.clone().applyMatrix4(matrix);
                cameraDistance = normalDistance;
            }
            
            // Aplicar zoom in
            if (zoomInProgress > 0) {
                cameraDirection = cameraDirection.clone().lerp(directionToPanel, easeProgress(zoomInProgress));
                cameraDistance = normalDistance - (normalDistance - zoomDistance) * easeProgress(zoomInProgress);
            }
            
            // Actualizar la posición de la cámara
            this.camera.position.copy(cameraDirection.multiplyScalar(cameraDistance));
            
            // Interpolar la mirada entre el centro y el panel objetivo
            const panelWorldPos = new THREE.Vector3();
            panel.getWorldPosition(panelWorldPos);
            const centerPos = new THREE.Vector3(0, 0, 0);
            const lookAtPos = new THREE.Vector3();
            
            if (zoomInProgress > 0) {
                lookAtPos.lerpVectors(centerPos, panelWorldPos, easeProgress(zoomInProgress));
            } else {
                lookAtPos.copy(centerPos);
            }
            
            this.camera.lookAt(lookAtPos);
            
            // Continuar la animación
            requestAnimationFrame(animate);
        };
        
        // Iniciar la animación
        animate();
    }

    handleResize() {
        // Obtener las dimensiones actuales del contenedor
        const container = this.container;
        const width = container.clientWidth;
        const height = container.clientHeight;

        // Actualizar la cámara
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();

        // Actualizar el tamaño del renderer y la relación de píxeles
        this.renderer.setSize(width, height, false); // false para evitar establecer el estilo
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
        // Forzar un renderizado para actualizar la vista inmediatamente
        this.renderer.render(this.scene, this.camera);
    }

    setMode(mode, duration = 1000) {
        const targetZ = mode === 'fullscreen' ? this.cameraPositions.fullscreen.z : this.cameraPositions.normal.z;
        this.animateCamera(targetZ, duration);
        
        // Esperar a que termine la animación y luego actualizar el tamaño
        setTimeout(() => {
            this.handleResize();
        }, duration + 50);
    }

    animateCamera(targetZ, duration = 1000) {
        const startZ = this.camera.position.z;
        const startTime = Date.now();

        const animate = () => {
            const currentTime = Date.now();
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const easeProgress = progress < 0.5
                ? 2 * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 2) / 2;

            this.camera.position.z = startZ + (targetZ - startZ) * easeProgress;

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        animate();
    }

    resetScene() {
        // Resetear la posición de la cámara
        this.camera.position.set(0, 0, 20);
        this.camera.lookAt(0, 0, 0);
        
        // Resetear la rotación del planeta
        this.planet.rotation.y = 0;
        
        // Resetear los targets
        this.currentTarget = null;
        this.isMovingToTarget = false;
        
        // Cerrar todas las secciones
        this.hideAllSectionOverlays();
    }

    createTextTexture(text) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 1240; // Canvas más ancho
        canvas.height = 512; // Canvas más alto

        // Fondo completamente transparente
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Calcular el tamaño de fuente adecuado basado en la longitud del texto
        const baseSize = 180;
        const fontSize = Math.min(baseSize, baseSize * (10 / Math.max(text.length, 5)));
        
        // Texto con color rosa
        ctx.fillStyle = '#ffffff'; // Color rosa
        ctx.font = `bold ${fontSize}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Añadir padding para evitar recortes
        const padding = 40;
        const textX = canvas.width / 2;
        const textY = canvas.height / 2;
        
        // Dibujar el texto con brillo
        ctx.shadowColor = '#00f7ff';
        ctx.shadowBlur = 15;
        ctx.fillText(text.toUpperCase(), textX, textY);

        return new THREE.CanvasTexture(canvas);
    }

    // Añadir esta función después de resetScene
    setupResizeObserver() {
        // Crear un observador de mutaciones para detectar cambios en el contenedor
        if (window.ResizeObserver) {
            const resizeObserver = new ResizeObserver(entries => {
                for (let entry of entries) {
                    if (entry.target === this.container) {
                        this.handleResize();
                    }
                }
            });
            
            // Observar el contenedor
            resizeObserver.observe(this.container);
        }
    }

    easeInOut(t) {
        return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    }

    // Método para mostrar la sección correspondiente
    showSectionOverlay(section) {
        // Obtener el contenido de la sección original
        const originalSection = document.getElementById(section);
        if (!originalSection) return;
        
        // Obtener el overlay correspondiente
        const overlay = document.getElementById(`${section}-3d-overlay`);
        if (!overlay) return;
        
        // Clonar el contenido de la sección original
        const content = originalSection.cloneNode(true);
        
        // Limpiar el overlay y añadir el nuevo contenido
        overlay.innerHTML = '';
        
        // Añadir el botón de cierre
        const closeButton = document.createElement('button');
        closeButton.className = 'close-overlay';
        closeButton.innerHTML = '×';
        closeButton.onclick = () => this.hideSectionOverlay(section);
        overlay.appendChild(closeButton);
        
        // Añadir el contenido clonado
        overlay.appendChild(content);
        
        // Marcar el contenedor 3D
        this.container.classList.add('has-active-section');
        
        // Mostrar el overlay
        overlay.classList.add('active');
    }
    
    // Método para hacer zoom out desde un panel
    zoomOutFromPanel(duration = 800) {
        if (!this.currentTarget || this.isMovingToTarget) return;
        
        const panel = this.panels[this.currentTarget];
        if (!panel) return;

        this.isMovingToTarget = true;
        
        // Obtener la posición actual de la cámara
        const startDirection = this.camera.position.clone().normalize();
        const startDistance = this.camera.position.length();
        const normalDistance = 20; // Distancia normal para orbitar
        
        const startTime = Date.now();
        
        // Función de ease para suavizar la animación
        const easeOutCubic = t => 1 - Math.pow(1 - t, 3);
        
        const animate = () => {
            const currentTime = Date.now();
            const elapsedTime = currentTime - startTime;
            
            if (elapsedTime >= duration) {
                // Finalizar la animación
                this.camera.position.copy(startDirection.multiplyScalar(normalDistance));
                this.camera.lookAt(0, 0, 0);
                this.isMovingToTarget = false;
                this.currentTarget = null;
                return;
            }
            
            // Calcular el progreso con easing
            const progress = easeOutCubic(Math.min(elapsedTime / duration, 1));
            
            // Interpolar la distancia
            const currentDistance = startDistance + (normalDistance - startDistance) * progress;
            
            // Actualizar la posición de la cámara
            this.camera.position.copy(startDirection.clone().multiplyScalar(currentDistance));
            
            // Interpolar la mirada desde el panel hacia el centro
            const panelWorldPos = new THREE.Vector3();
            panel.getWorldPosition(panelWorldPos);
            const centerPos = new THREE.Vector3(0, 0, 0);
            const lookAtPos = new THREE.Vector3();
            lookAtPos.lerpVectors(panelWorldPos, centerPos, progress);
            this.camera.lookAt(lookAtPos);
            
            // Continuar la animación
            requestAnimationFrame(animate);
        };
        
        // Iniciar la animación
        animate();
    }
    
    // Método para ocultar la sección
    hideSectionOverlay(section) {
        const overlay = document.getElementById(`${section}-3d-overlay`);
        if (!overlay) return;
        
        // Ocultar el overlay
        overlay.classList.remove('active');
        
        // Quitar la marca del contenedor 3D
        this.container.classList.remove('has-active-section');
        
        // Hacer zoom out para volver a la vista orbital
        this.zoomOutFromPanel();
    }

    // Método para ocultar todas las secciones
    hideAllSectionOverlays() {
        const overlays = document.querySelectorAll('.section-3d-overlay');
        let wasAnyActive = false;
        
        overlays.forEach(overlay => {
            if (overlay.classList.contains('active')) {
                wasAnyActive = true;
                overlay.classList.remove('active');
            }
        });
        
        // Quitar la marca del contenedor 3D
        this.container.classList.remove('has-active-section');
        
        // Si había alguna sección activa, hacer zoom out
        if (wasAnyActive && this.currentTarget) {
            this.zoomOutFromPanel();
        }
    }
}

// Initialize the scene when the page loads
window.addEventListener('load', () => {
    const scene = new ThreeScene();
    window.threeScene = scene;
    
    const enter3dBtn = document.getElementById('toggle-3d');
    const exit3dBtn = document.getElementById('exit-3d');
    const threeContainer = document.getElementById('three-container');
    
    enter3dBtn.addEventListener('click', () => {
        scene.resetScene();  // Resetear todo antes de entrar
        scene.setMode('fullscreen');
    });
    
    exit3dBtn.addEventListener('click', () => {
        scene.setMode('normal');
        scene.resetScene();  // Resetear todo al salir
    });

    // Add event listeners for section navigation
    document.querySelectorAll('.section-nav-buttons .nav-button').forEach(button => {
        // Prevenir el comportamiento por defecto en modo 3D
        button.addEventListener('click', (e) => {
            const section = button.dataset.section;
            if (section && scene.targets[section]) {
                if (threeContainer.classList.contains('fullscreen')) {
                    e.preventDefault();
                    e.stopPropagation();
                    scene.moveToTarget(section);
                    return false;
                }
            }
        }, true); // Usar capture phase para asegurar que se ejecuta antes que otros handlers
    });
}); 
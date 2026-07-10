/**
 * ThreeScene - Gestión de escena 3D con Three.js
 * Responsabilidades: Renderizado, animación, cámara, objetos 3D
 */
class ThreeScene {
    constructor() {
        this.container = document.getElementById('three-container');
        this.scene = new THREE.Scene();
        
        // Get container dimensions
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;
        
        // Create camera with wider field of view
        this.camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
        
        // Camera positions from config
        this.cameraPositions = window.PortfolioConfig?.three?.cameraPositions || {
            normal: { z: 50 },
            fullscreen: { z: 25 }
        };

        // Targets from config
        this.targets = window.PortfolioConfig?.three?.targets || {
            'about': { angle: 0 },
            'skills': { angle: (2 * Math.PI) / 5 },
            'experience': { angle: (4 * Math.PI) / 5 },
            'projects': { angle: (6 * Math.PI) / 5 },
            'contact': { angle: (8 * Math.PI) / 5 }
        };

        // Animation config
        this.animationDurations = window.PortfolioConfig?.three?.animationDurations || {
            cameraTransition: 1000,
            sectionTransition: 1500,
            zoomOut: 800
        };

        this.quality = this._resolveQuality();
        this.lastRenderTime = 0;

        this.renderer = new THREE.WebGLRenderer({ 
            antialias: this.quality.antialias, 
            alpha: true,
            powerPreference: 'high-performance'
        });
        
        // Set renderer size to match container
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, this.quality.maxPixelRatio));
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

    _resolveQuality() {
        const defaults = {
            starCount: 2000,
            planetSegments: 32,
            moonDetail: 2,
            maxPixelRatio: 2,
            antialias: true,
            textureScale: 1,
            previewFrameMs: 33,
            activeFrameMs: 0
        };
        const qualityConfig = window.PortfolioConfig?.three?.quality || {};
        const isMobile = window.matchMedia('(max-width: 768px)').matches
            || navigator.maxTouchPoints > 0;
        const profile = isMobile
            ? { ...defaults, ...qualityConfig.mobile }
            : { ...defaults, ...qualityConfig.desktop };

        return { ...profile, isMobile };
    }

    _getFrameInterval() {
        if (document.hidden) return Infinity;

        const is3DActive = document.body.classList.contains('mode-3d-active');
        return is3DActive ? this.quality.activeFrameMs : this.quality.previewFrameMs;
    }

    init() {
        // Planet configuration
        const planetConfig = window.PortfolioConfig?.three?.planet || {
            radius: 5,
            wireframeColor: 0x00f7ff,
            segments: 32
        };
        const planetSegments = this.quality.planetSegments ?? planetConfig.segments;

        // Create planet
        const planetGeometry = new THREE.SphereGeometry(
            planetConfig.radius,
            planetSegments,
            planetSegments
        );
        
        // Create wireframe material
        const planetMaterial = new THREE.MeshPhongMaterial({
            color: planetConfig.wireframeColor,
            wireframe: true,
            wireframeLinewidth: 1,
            emissive: planetConfig.wireframeColor,
            emissiveIntensity: 0.2
        });

        this.planet = new THREE.Mesh(planetGeometry, planetMaterial);
        this.scene.add(this.planet);

        // Create panels
        this.panelDisplayWidth = 5;
        this.panelDisplayHeight = 3;
        const panelGeometry = new THREE.PlaneGeometry(
            this.panelDisplayWidth,
            this.panelDisplayHeight
        );

        // Create panels for each section
        this.panels = {};
        this.panelHitMeshes = [];
        Object.entries(this.targets).forEach(([section, position]) => {
            const { texture, hitSize } = this.createTextTexture(section.toUpperCase());
            
            const panel = new THREE.Mesh(
                panelGeometry,
                new THREE.MeshBasicMaterial({
                    map: texture,
                    transparent: true,
                    opacity: 1.0,
                    side: THREE.FrontSide,
                    depthWrite: false,
                    alphaTest: 0.1
                })
            );
            
            // Position panel on planet's equator
            const radius = planetConfig.radius + 0.5;
            panel.position.x = Math.cos(position.angle) * radius;
            panel.position.z = Math.sin(position.angle) * radius;
            
            // Make panel look outward
            panel.lookAt(0, 0, 0);
            panel.rotateY(Math.PI);
            panel.raycast = () => {};

            const hitMesh = this.createPanelHitMesh(section, panel, hitSize);
            panel.add(hitMesh);
            this.panelHitMeshes.push(hitMesh);
            
            this.planet.add(panel);
            this.panels[section] = panel;
        });

        // Create starfield
        const starfieldConfig = window.PortfolioConfig?.three?.starfield || {
            count: 2000,
            minRadius: 20,
            maxRadius: 50
        };
        const starCount = this.quality.starCount ?? starfieldConfig.count;

        const starGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array(starCount * 3);
        
        for (let i = 0; i < starCount * 3; i += 3) {
            const radius = starfieldConfig.minRadius + 
                Math.random() * (starfieldConfig.maxRadius - starfieldConfig.minRadius);
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos((Math.random() * 2) - 1);
            
            positions[i] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i + 2] = radius * Math.cos(phi);
        }
        
        starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        
        const starMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: this.quality.isMobile ? 0.14 : 0.1,
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
        this.cameraAnimationGeneration = 0;

        // Create moon
        const moonConfig = window.PortfolioConfig?.three?.moon || {
            size: 2,
            orbitRadius: 15,
            orbitHeight: 5,
            orbitSpeed: 0.0005
        };

        const moonGeometry = new THREE.IcosahedronGeometry(
            moonConfig.size,
            this.quality.moonDetail ?? 2
        );
        const moonMaterial = new THREE.MeshBasicMaterial({
            color: '#00f7ff',
            wireframe: true,
            transparent: true,
            opacity: 0.8
        });
        this.moon = new THREE.Mesh(moonGeometry, moonMaterial);
        this.moonConfig = moonConfig;
        this.scene.add(this.moon);

        this.setupInteractions();
    }

    setupInteractions() {
        this.raycaster = new THREE.Raycaster();
        this.pointer = new THREE.Vector2();
        this.interactionsEnabled = false;
        this.isPointerDown = false;
        this.didDrag = false;
        this.hoveredPanel = null;
        this.dragSensitivity = this.quality.isMobile ? 0.009 : 0.006;
        this.dragThreshold = this.quality.isMobile ? 12 : 4;
        this.hitSizeMultiplier = this.quality.isMobile ? 1.25 : 1;

        Object.entries(this.panels).forEach(([section, panel]) => {
            panel.userData.section = section;
            panel.userData.baseOpacity = panel.material.opacity;
        });

        const canvas = this.renderer.domElement;
        canvas.style.touchAction = 'none';

        this._onPointerDown = (e) => this.onPointerDown(e);
        this._onPointerMove = (e) => this.onPointerMove(e);
        this._onPointerUp = (e) => this.onPointerUp(e);

        canvas.addEventListener('pointerdown', this._onPointerDown);
        canvas.addEventListener('pointermove', this._onPointerMove);
        canvas.addEventListener('pointerup', this._onPointerUp);
        canvas.addEventListener('pointerleave', this._onPointerUp);
        canvas.addEventListener('pointercancel', this._onPointerUp);
    }

    setInteractionsEnabled(enabled) {
        this.interactionsEnabled = enabled;

        if (!enabled) {
            this.resetPointerState();
        }
    }

    resetPointerState() {
        this.isPointerDown = false;
        this.didDrag = false;
        this.pointerDownPanel = null;
        this.setHoveredPanel(null);
        this.renderer.domElement.style.cursor = '';
        this.container.classList.remove('is-dragging');
    }

    updatePointer(event) {
        const rect = this.renderer.domElement.getBoundingClientRect();
        this.pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    }

    getPointerDx(event) {
        return event.clientX - this.pointerDownPos.x;
    }

    getPanelHit() {
        this.raycaster.setFromCamera(this.pointer, this.camera);
        const hits = this.raycaster.intersectObjects(this.panelHitMeshes, false);
        return hits.length > 0 ? hits[0].object.userData.parentPanel : null;
    }

    beginCameraAnimation() {
        this.cameraAnimationGeneration += 1;
        this.isMovingToTarget = true;
        return this.cameraAnimationGeneration;
    }

    startCameraTransition() {
        this.cameraAnimationGeneration += 1;
        return this.cameraAnimationGeneration;
    }

    cancelCameraAnimation() {
        this.cameraAnimationGeneration += 1;
        this.isMovingToTarget = false;
    }

    canDrag() {
        return this.interactionsEnabled
            && !this.container.classList.contains('has-active-section');
    }

    setHoveredPanel(panel) {
        if (this.isPointerDown || this.hoveredPanel === panel) return;

        if (this.hoveredPanel) {
            this.hoveredPanel.material.opacity = this.hoveredPanel.userData.baseOpacity;
        }

        this.hoveredPanel = panel;

        if (panel) {
            panel.material.opacity = 1;
        }
    }

    onPointerDown(event) {
        if (!this.canDrag() || event.button !== 0) return;

        if (this.isMovingToTarget) {
            this.cancelCameraAnimation();
            this.currentTarget = null;
        }

        this.updatePointer(event);
        this.pointerDownPanel = this.getPanelHit();

        this.isPointerDown = true;
        this.didDrag = false;
        this.pointerDownPos = { x: event.clientX, y: event.clientY };
        this.dragPlanetStartY = this.planet.rotation.y;

        this.renderer.domElement.setPointerCapture(event.pointerId);
        event.preventDefault();
    }

    onPointerMove(event) {
        if (!this.interactionsEnabled) return;

        this.updatePointer(event);

        if (this.isPointerDown && this.canDrag()) {
            const dx = this.getPointerDx(event);

            if (Math.abs(dx) > this.dragThreshold) {
                this.didDrag = true;
                this.container.classList.add('is-dragging');
            }

            this.planet.rotation.y = this.dragPlanetStartY + dx * this.dragSensitivity;
            this.renderer.domElement.style.cursor = 'grabbing';
            this.setHoveredPanel(null);
            return;
        }

        if (!this.canDrag()) {
            this.renderer.domElement.style.cursor = '';
            this.setHoveredPanel(null);
            return;
        }

        const panel = this.getPanelHit();
        this.setHoveredPanel(panel);
        this.renderer.domElement.style.cursor = panel ? 'pointer' : 'grab';
    }

    onPointerUp(event) {
        if (!this.isPointerDown) return;

        try {
            this.renderer.domElement.releasePointerCapture(event.pointerId);
        } catch (_) {
            // Pointer may already be released
        }

        const dx = this.getPointerDx(event);

        if (this.canDrag() && Math.abs(dx) <= this.dragThreshold) {
            this.updatePointer(event);
            const panel = this.pointerDownPanel || this.getPanelHit();
            if (panel) {
                this.moveToTarget(panel.userData.section);
            }
        }

        this.pointerDownPanel = null;
        this.resetPointerState();

        if (this.canDrag()) {
            this.updatePointer(event);
            const panel = this.getPanelHit();
            this.setHoveredPanel(panel);
            this.renderer.domElement.style.cursor = panel ? 'pointer' : 'grab';
        }
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        const now = performance.now();
        const frameInterval = this._getFrameInterval();
        if (frameInterval > 0 && now - this.lastRenderTime < frameInterval) {
            return;
        }
        this.lastRenderTime = now;

        // Rotate the planet solo si no estamos en transición, arrastrando o sobre un cartel
        if (!this.isMovingToTarget && !this.isPointerDown && !this.hoveredPanel) {
            this.planet.rotation.y += 0.002;
        }

        // Rotación del starfield (más lenta en móvil)
        const starfieldSpeed = this.quality.isMobile ? 0.00008 : 0.0002;
        this.starfield.rotation.x += starfieldSpeed;
        this.starfield.rotation.y += starfieldSpeed;

        // Rotate moon around planet
        if (this.moon && this.moonConfig) {
            const time = Date.now() * this.moonConfig.orbitSpeed;
            
            this.moon.position.x = Math.cos(time) * this.moonConfig.orbitRadius;
            this.moon.position.y = Math.sin(time) * this.moonConfig.orbitHeight;
            this.moon.position.z = Math.sin(time) * this.moonConfig.orbitRadius;
            
            // Make moon look at planet
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

    moveToTarget(section, duration) {
        // Use config duration if not provided
        if (!duration) {
            duration = this.animationDurations.sectionTransition || 1500;
        }

        // If already at target, do nothing
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

        const animationGeneration = this.beginCameraAnimation();
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
            if (animationGeneration !== this.cameraAnimationGeneration) return;

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
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, this.quality.maxPixelRatio));
        
        // Forzar un renderizado para actualizar la vista inmediatamente
        this.renderer.render(this.scene, this.camera);
    }

    setMode(mode, duration) {
        // Use config duration if not provided
        if (!duration) {
            duration = this.animationDurations.cameraTransition || 1000;
        }

        const isFullscreen = mode === 'fullscreen';
        this.container.classList.toggle('fullscreen', isFullscreen);
        this.setInteractionsEnabled(isFullscreen);

        const targetZ = isFullscreen
            ? this.cameraPositions.fullscreen.z 
            : this.cameraPositions.normal.z;
        
        // Restore orientation when exiting fullscreen
        if (mode === 'normal') {
            this.camera.position.set(0, 0, this.camera.position.z);
            this.camera.lookAt(0, 0, 0);
            this.setHoveredPanel(null);
        }
        
        this.animateCamera(targetZ, duration);
        
        // Wait for animation to complete then resize
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
        // Resetear la posición y orientación de la cámara
        this.camera.position.set(0, 0, this.cameraPositions.normal.z);
        this.camera.lookAt(0, 0, 0);
        
        // Resetear la rotación del planeta
        if (this.planet) {
            this.planet.rotation.y = 0;
        }

        this.resetPointerState();

        Object.values(this.panels).forEach(panel => {
            panel.scale.set(1, 1, 1);
            if (panel.material && panel.userData.baseOpacity !== undefined) {
                panel.material.opacity = panel.userData.baseOpacity;
            }
        });
        
        // Resetear los targets y estado de movimiento
        this.currentTarget = null;
        this.isMovingToTarget = false;
        
        // Cerrar overlays (el contenido es un clon; el original sigue en <main>)
        const sections = ['about', 'skills', 'experience', 'projects', 'contact'];
        sections.forEach(sectionId => {
            const overlay = document.getElementById(`${sectionId}-3d-overlay`);
            this.clearSectionOverlay(overlay);
        });
        
        // Quitar la marca del contenedor 3D
        this.container.classList.remove('has-active-section');
        
        // Restaurar el scroll del documento
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        
        // Forzar un reflow para asegurar que los cambios se aplican
        this.container.offsetHeight;
        
        // Actualizar el renderer
        this.handleResize();
    }

    createPanelHitMesh(section, panel, hitSize) {
        const width = Math.min(1, hitSize.width * this.hitSizeMultiplier) * this.panelDisplayWidth;
        const height = Math.min(1, hitSize.height * this.hitSizeMultiplier) * this.panelDisplayHeight;

        const hitMesh = new THREE.Mesh(
            new THREE.PlaneGeometry(width, height),
            new THREE.MeshBasicMaterial({ visible: false })
        );
        hitMesh.userData.section = section;
        hitMesh.userData.parentPanel = panel;
        panel.userData.hitMesh = hitMesh;
        return hitMesh;
    }

    updatePanelHitMesh(panel, hitSize) {
        const hitMesh = panel.userData.hitMesh;
        if (!hitMesh) return;

        const width = Math.min(1, hitSize.width * this.hitSizeMultiplier) * this.panelDisplayWidth;
        const height = Math.min(1, hitSize.height * this.hitSizeMultiplier) * this.panelDisplayHeight;

        hitMesh.geometry.dispose();
        hitMesh.geometry = new THREE.PlaneGeometry(width, height);
    }

    createTextTexture(text) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const scale = this.quality.textureScale || 1;
        canvas.width = Math.round(1240 * scale);
        canvas.height = Math.round(512 * scale);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const upperText = text.toUpperCase();
        const baseSize = Math.round(180 * scale);
        const fontSize = Math.min(baseSize, baseSize * (10 / Math.max(upperText.length, 5)));
        const shadowBlur = Math.round(15 * scale);

        ctx.font = `bold ${fontSize}px Arial`;
        const metrics = ctx.measureText(upperText);
        const textWidth = metrics.width;
        const textHeight =
            (metrics.actualBoundingBoxAscent || fontSize * 0.82)
            + (metrics.actualBoundingBoxDescent || fontSize * 0.18);

        const padX = Math.round(12 * scale);
        const padY = Math.round(shadowBlur * 0.75);

        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = '#00f7ff';
        ctx.shadowBlur = shadowBlur;
        ctx.fillText(upperText, canvas.width / 2, canvas.height / 2);

        const texture = new THREE.CanvasTexture(canvas);
        texture.minFilter = THREE.LinearFilter;
        texture.generateMipmaps = false;

        return {
            texture,
            hitSize: {
                width: Math.min(1, (textWidth + padX * 2) / canvas.width),
                height: Math.min(1, (textHeight + padY * 2) / canvas.height)
            }
        };
    }

    updatePanelLabels(labels) {
        Object.entries(labels).forEach(([section, label]) => {
            const panel = this.panels[section];
            if (!panel?.material) return;

            const { texture, hitSize } = this.createTextTexture(label);

            if (panel.material.map) {
                panel.material.map.dispose();
            }

            panel.material.map = texture;
            panel.material.needsUpdate = true;
            this.updatePanelHitMesh(panel, hitSize);
        });
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

    clearSectionOverlay(overlay) {
        if (!overlay) return;

        overlay.classList.remove('active');
        overlay.style.display = 'none';
        overlay.innerHTML = '';
    }

    // Método para mostrar la sección correspondiente
    showSectionOverlay(section) {
        // Obtener la sección original y el overlay
        const originalSection = document.getElementById(section);
        const overlay = document.getElementById(`${section}-3d-overlay`);
        if (!originalSection || !overlay) return;
        
        // Limpiar el overlay
        overlay.innerHTML = '';
        
        // Añadir el botón de cierre (fijo al overlay, fuera del scroll)
        const closeButton = document.createElement('button');
        closeButton.className = 'close-overlay';
        closeButton.innerHTML = '×';
        closeButton.onclick = () => this.hideSectionOverlay(section);
        overlay.appendChild(closeButton);

        const scrollWrapper = document.createElement('div');
        scrollWrapper.className = 'overlay-scroll';
        overlay.appendChild(scrollWrapper);
        
        // Clonar el contenido principal de la sección al área scrollable
        const content = originalSection.querySelector('.about-content, .skills, .timeline, .projects-grid, .contact-content');
        if (content) {
            const clonedContent = content.cloneNode(true);
            scrollWrapper.appendChild(clonedContent);
        }
        
        // Marcar el contenedor 3D
        this.container.classList.add('has-active-section');
        
        // Mostrar el overlay
        overlay.classList.add('active');
        overlay.style.display = 'flex';
    }
    
    // Method to zoom out from a panel (no bloquea el arrastre)
    zoomOutFromPanel(duration, sectionOverride) {
        if (!duration) {
            duration = this.animationDurations.zoomOut || 800;
        }

        const targetSection = sectionOverride || this.currentTarget;
        if (!targetSection) return;
        
        const panel = this.panels[targetSection];
        if (!panel) return;

        this.currentTarget = null;
        const animationGeneration = this.startCameraTransition();
        
        const startDirection = this.camera.position.clone().normalize();
        const startDistance = this.camera.position.length();
        const normalDistance = 20;
        const startTime = Date.now();
        const easeOutCubic = t => 1 - Math.pow(1 - t, 3);
        
        const animate = () => {
            if (animationGeneration !== this.cameraAnimationGeneration) return;

            const elapsedTime = Date.now() - startTime;
            
            if (elapsedTime >= duration) {
                this.camera.position.copy(startDirection.multiplyScalar(normalDistance));
                this.camera.lookAt(0, 0, 0);
                return;
            }
            
            const progress = easeOutCubic(Math.min(elapsedTime / duration, 1));
            const currentDistance = startDistance + (normalDistance - startDistance) * progress;
            
            this.camera.position.copy(startDirection.clone().multiplyScalar(currentDistance));
            
            const panelWorldPos = new THREE.Vector3();
            panel.getWorldPosition(panelWorldPos);
            const lookAtPos = new THREE.Vector3();
            lookAtPos.lerpVectors(panelWorldPos, new THREE.Vector3(0, 0, 0), progress);
            this.camera.lookAt(lookAtPos);
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }
    
    // Método para ocultar la sección
    hideSectionOverlay(section) {
        const overlay = document.getElementById(`${section}-3d-overlay`);
        if (!overlay) return;
        
        this.clearSectionOverlay(overlay);
        
        // Quitar la marca del contenedor 3D
        this.container.classList.remove('has-active-section');
        this.resetPointerState();
        
        // Hacer zoom out para volver a la vista orbital
        this.zoomOutFromPanel(undefined, section);
    }

    // Método para ocultar todas las secciones
    hideAllSectionOverlays() {
        const overlays = document.querySelectorAll('.section-3d-overlay');
        let wasAnyActive = false;
        
        overlays.forEach(overlay => {
            if (overlay.classList.contains('active')) {
                wasAnyActive = true;
            }

            this.clearSectionOverlay(overlay);
        });
        
        // Quitar la marca del contenedor 3D
        this.container.classList.remove('has-active-section');
        
        // Si había alguna sección activa, hacer zoom out y restaurar la cámara
        if (wasAnyActive && this.currentTarget) {
            // Detener cualquier animación en curso
            this.isMovingToTarget = false;
            
            // Restaurar la posición y orientación de la cámara
            const normalDistance = this.cameraPositions.normal.z;
            this.camera.position.set(0, 0, normalDistance);
            this.camera.lookAt(0, 0, 0);
            
            // Resetear el target actual
            this.currentTarget = null;
        }
    }
}

// Exponer la clase globalmente para que app.js pueda usarla
window.ThreeScene = ThreeScene; 
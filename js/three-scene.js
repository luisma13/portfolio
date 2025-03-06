class ThreeScene {
    constructor() {
        this.container = document.getElementById('three-container');
        this.scene = new THREE.Scene();
        
        // Get container dimensions
        const container = this.container;
        const width = container.clientWidth;
        const height = container.clientHeight;
        
        // Create camera with correct aspect ratio
        this.camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
        
        // Define camera positions for different modes
        this.cameraPositions = {
            normal: { z: 15 },
            fullscreen: { z: 10 }
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

        this.init();
        this.animate();
        this.handleResize();
    }

    createNeonMaterial(color) {
        return new THREE.MeshPhongMaterial({
            color: color,
            emissive: color,
            emissiveIntensity: 0.5,
            shininess: 100,
            transparent: true,
            opacity: 0.9
        });
    }

    init() {
        // Create main cube group
        this.cubeGroup = new THREE.Group();
        
        // Define cube parameters
        const size = 1;
        const gap = 0.2;
        const dimension = 3; // 3x3x3 cube
        const totalSize = (size + gap) * dimension;
        const offset = totalSize / 2 - (size + gap) / 2;

        // Materials
        const materials = [
            this.createNeonMaterial(0x00f7ff), // cyan
            this.createNeonMaterial(0x0066ff), // blue
            this.createNeonMaterial(0xff00ff)  // magenta
        ];

        // Create small cubes
        const geometry = new THREE.BoxGeometry(size, size, size);
        
        for(let x = 0; x < dimension; x++) {
            for(let y = 0; y < dimension; y++) {
                for(let z = 0; z < dimension; z++) {
                    // Skip some random cubes for effect
                    if(Math.random() < 0.2) continue;
                    
                    // Only create cubes on the edges
                    if(x === 0 || x === dimension-1 || 
                       y === 0 || y === dimension-1 || 
                       z === 0 || z === dimension-1) {
                        
                        const material = materials[Math.floor(Math.random() * materials.length)];
                        const cube = new THREE.Mesh(geometry, material);
                        
                        cube.position.set(
                            x * (size + gap) - offset,
                            y * (size + gap) - offset,
                            z * (size + gap) - offset
                        );
                        
                        // Add random rotation animation
                        cube.userData.rotationSpeed = {
                            x: (Math.random() - 0.5) * 0.02,
                            y: (Math.random() - 0.5) * 0.02,
                            z: (Math.random() - 0.5) * 0.02
                        };
                        
                        this.cubeGroup.add(cube);
                    }
                }
            }
        }

        this.scene.add(this.cubeGroup);

        // Create particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 2000;
        const posArray = new Float32Array(particlesCount * 3);
        
        for(let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 40;
        }
        
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.05,
            color: 0x00f7ff,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });
        
        this.particles = new THREE.Points(particlesGeometry, particlesMaterial);
        this.scene.add(this.particles);

        // Add lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0x00f7ff, 2);
        directionalLight.position.set(5, 5, 5);
        this.scene.add(directionalLight);

        const pointLight1 = new THREE.PointLight(0x0066ff, 2, 50);
        pointLight1.position.set(-5, -5, 5);
        this.scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0xff00ff, 2, 50);
        pointLight2.position.set(5, -5, -5);
        this.scene.add(pointLight2);

        // Position camera in normal mode
        this.camera.position.z = this.cameraPositions.normal.z;

        // Add mouse interaction
        this.mouseX = 0;
        this.mouseY = 0;
        this.targetRotationX = 0;
        this.targetRotationY = 0;

        document.addEventListener('mousemove', (event) => {
            const rect = this.container.getBoundingClientRect();
            this.mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            this.mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        });
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        // Smooth rotation following mouse
        this.targetRotationX += (this.mouseX - this.targetRotationX) * 0.05;
        this.targetRotationY += (this.mouseY - this.targetRotationY) * 0.05;

        // Rotate cube group
        this.cubeGroup.rotation.x += 0.005;
        this.cubeGroup.rotation.y += 0.005;
        this.cubeGroup.rotation.x += this.targetRotationY * 0.01;
        this.cubeGroup.rotation.y += this.targetRotationX * 0.01;

        // Animate individual cubes
        this.cubeGroup.children.forEach(cube => {
            cube.rotation.x += cube.userData.rotationSpeed.x;
            cube.rotation.y += cube.userData.rotationSpeed.y;
            cube.rotation.z += cube.userData.rotationSpeed.z;
        });

        // Animate particles
        this.particles.rotation.x += 0.0005;
        this.particles.rotation.y += 0.0005;

        this.renderer.render(this.scene, this.camera);
    }

    handleResize() {
        window.addEventListener('resize', () => {
            // Get container dimensions
            const container = this.container;
            const width = container.clientWidth;
            const height = container.clientHeight;
            
            // Update camera aspect ratio
            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();
            
            // Update renderer size
            this.renderer.setSize(width, height);
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        });
    }

    // Add new method to handle mode changes with animation
    setMode(mode, duration = 1000) {
        const targetZ = mode === 'fullscreen' ? this.cameraPositions.fullscreen.z : this.cameraPositions.normal.z;
        this.animateCamera(targetZ, duration);
    }

    // Add animation method
    animateCamera(targetZ, duration = 1000) {
        const startZ = this.camera.position.z;
        const startTime = Date.now();

        const animate = () => {
            const currentTime = Date.now();
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Función de easing para suavizar la animación
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
}

// Initialize the scene when the page loads
window.addEventListener('load', () => {
    const scene = new ThreeScene();
    
    // Exponer la instancia de la escena globalmente
    window.threeScene = scene;
    
    // Add event listeners for mode changes
    const enter3dBtn = document.getElementById('toggle-3d');
    const exit3dBtn = document.getElementById('exit-3d');
    
    enter3dBtn.addEventListener('click', () => {
        scene.setMode('fullscreen');
    });
    
    exit3dBtn.addEventListener('click', () => {
        scene.setMode('normal');
    });
});

let camera;
let scene;
let renderer;
let cube;
let controls;
let isAnimating = false;

// Función para animar la cámara
function animateCamera(targetZ, duration = 1000) {
    if (isAnimating) return;
    isAnimating = true;
    
    const startZ = camera.position.z;
    const startTime = Date.now();

    function animate() {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Función de easing para suavizar la animación
        const easeProgress = progress < 0.5
            ? 2 * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 2) / 2;

        camera.position.z = startZ + (targetZ - startZ) * easeProgress;

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            isAnimating = false;
        }
    }

    animate();
}

// Exponer la función para que pueda ser usada desde main.js
window.animateCamera = animateCamera; 
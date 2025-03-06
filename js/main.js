document.addEventListener('DOMContentLoaded', () => {
    // Remove loader after page loads
    setTimeout(() => {
        const loader = document.querySelector('.loader');
        loader.classList.add('fade-out');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 2000);

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
    const threeContainer = document.getElementById('three-container');
    const mainContent = document.querySelector('main');
    const navigation = document.querySelector('.nav');
    const heroContent = document.querySelector('.hero-content');
    const footer = document.querySelector('footer');
    const discoverBtn = document.querySelector('.discover-btn');

    let is3DMode = false;

    enter3dBtn.addEventListener('click', () => {
        is3DMode = true;
        mainContent.style.display = 'none';
        nav.style.display = 'none';
        heroContent.style.display = 'none';
        footer.style.display = 'none';
        discoverBtn.style.display = 'none';
        threeContainer.classList.add('fullscreen');
        exit3dBtn.style.display = 'block';
        threeContainer.style.pointerEvents = 'auto';
        threeContainer.style.opacity = '1';
        
        // Animar la cámara acercándose al cubo
        if (window.threeScene) {
            window.threeScene.setMode('fullscreen');
        }
    });

    exit3dBtn.addEventListener('click', () => {
        is3DMode = false;
        mainContent.style.display = 'block';
        nav.style.display = 'flex';
        heroContent.style.display = 'block';
        footer.style.display = 'block';
        discoverBtn.style.display = 'flex';
        threeContainer.classList.remove('fullscreen');
        exit3dBtn.style.display = 'none';
        threeContainer.style.pointerEvents = 'none';
        threeContainer.style.opacity = '0.3';
        
        // Animar la cámara alejándose del cubo
        if (window.threeScene) {
            window.threeScene.setMode('normal');
        }
    });
}); 
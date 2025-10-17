/**
 * Translations - Contenido multiidioma del portfolio
 */
const translations = {
    en: {
        nav: {
            home: 'Home',
            about: 'About',
            experience: 'Experience',
            skills: 'Skills',
            projects: 'Projects',
            contact: 'Contact'
        },
        hero: {
            name: 'Luis María González Pradas',
            title: 'Senior Full-Stack Developer | Tech Lead',
            subtitle: 'Specialized in scalable end-to-end architectures with 10 years of experience',
            view3D: 'View in 3D',
            scrollDown: 'Scroll down to discover more'
        },
        about: {
            title: 'About Me',
            description: 'Full-stack developer with <strong>10 years of experience</strong>, specialized in scalable end-to-end architectures. Frontend: Angular, RxJS, ThreeJS/WebGL with 60fps 3D rendering. Backend: NestJS with hexagonal architecture, authentication/authorization (OAuth2, API keys), async queues (BullJS/Redis), REST APIs and monitoring (Grafana). I have developed SDKs with custom authentication, implemented CI/CD and led technical teams.'
        },
        skills: {
            title: 'Technical Stack',
            categories: {
                frontend: {
                    title: 'Frontend',
                    items: ['Angular (v2-20)', 'Next.js', 'TypeScript', 'RxJS', 'Signals', 'Angular Material', 'Ionic', 'ThreeJS/WebGL', 'NgRx']
                },
                backend: {
                    title: 'Backend',
                    items: ['NestJS', 'Node.js', 'Java', 'Python', 'REST APIs', 'MongoDB', 'MySQL', 'TypeORM', 'Redis', 'BullJS']
                },
                devops: {
                    title: 'DevOps & Tools',
                    items: ['Docker', 'Jenkins', 'CI/CD', 'Grafana', 'Loki', 'Git', 'OAuth2', 'JWT']
                },
                gamedev: {
                    title: 'Game Dev & 3D',
                    items: ['Unity', 'Unreal Engine', 'C#', 'C++', 'Blender API', 'WebGL']
                },
                architecture: {
                    title: 'Architecture',
                    items: ['Hexagonal/DDD', 'Microservices', 'Event-Driven', 'TDD', 'SOLID', 'Design Patterns']
                },
                mobile: {
                    title: 'Mobile & Other',
                    items: ['Android', 'Ionic', 'RPA', 'Automation', 'Selenium']
                }
            }
        },
        experience: {
            title: 'Professional Experience',
            jobs: [
                {
                    company: 'Freelance',
                    role: 'Full-Stack Developer',
                    period: 'Aug 2024 - Present',
                    location: 'Remote',
                    description: 'Full-stack application development for international clients after PolygonalMind closure.',
                    highlights: [
                        '<strong>Social App for NGOs (Swiss Client):</strong> Ionic/Angular mobile app + NestJS backend. Matching system, messaging and event management',
                        '<strong>3D Sofa Configurator (Real Estate):</strong> Angular web with Unity viewer (WebGL). Modular configurator, Angular-Unity communication, quote generation'
                    ]
                },
                {
                    company: 'PolygonalMind',
                    role: 'Tech Lead',
                    period: 'Jul 2021 - Aug 2024',
                    location: 'Zaragoza, Spain',
                    description: 'Design and implementation of <strong>VIPE</strong> (<a href="https://vipe.io" target="_blank" rel="noopener">vipe.io</a>), 3D avatar ecosystem with marketplace and real-time rendering. Technical lead on Forbes web3 page (Next.js) and internal web tools.',
                    highlights: [
                        'Angular app with optimized ThreeJS (60fps), standalone components, signals and RxJS. Code splitting and lazy loading',
                        'Hybrid state system (NgRx + custom Signals). Reusable modular components',
                        'NestJS backend with hexagonal/DDD architecture, async queues (BullJS/Redis) for 3D processing',
                        'Authentication system: OAuth2 (Google, Discord), custom OAuth for SDKs, API key management and role-based permissions',
                        'Testing: Jest (unit), Selenium (E2E). Complete dockerization. CI/CD with Jenkins',
                        'Observability: Grafana + Loki for logs, error analysis and system monitoring',
                        'Cross-platform SDKs (JavaScript, Unity C#, Unreal C++) with documentation',
                        'Blender Python API automation for avatar generation',
                        'Team coordination of 11 people, code reviews and pair programming'
                    ]
                },
                {
                    company: 'esPublico Tecnología',
                    role: 'Senior Java Developer',
                    period: 'Dec 2019 - May 2021',
                    location: 'Zaragoza, Spain',
                    description: 'RPA solutions for administrative workflow automation, API integrations and Java desktop applications'
                },
                {
                    company: 'MedUX',
                    role: 'Android Developer',
                    period: 'Nov 2016 - Jul 2019',
                    location: 'Madrid, Spain',
                    description: 'App for telecom operators for network quality measurement. Automated testing with Selenium'
                },
                {
                    company: 'Tessera Studios',
                    role: 'Game Developer',
                    period: 'May 2016 - Dec 2016',
                    location: 'Madrid, Spain',
                    description: '<strong>Intruders: Hide and Seek</strong> (award "Best Game for Press" PlayStation Talents 2016). VR mechanics, AI and UI in C++/Unreal'
                }
            ]
        },
        projects: {
            title: 'Featured Projects',
            items: [
                {
                    title: 'VIPE Platform',
                    description: '3D Avatar Marketplace with blockchain integration and real-time rendering. Complete ecosystem with web3 wallet, NFT minting, and cross-platform SDK support.',
                    technologies: ['Angular', 'Three.js', 'NestJS', 'MongoDB', 'Solidity', 'Web3']
                },
                {
                    title: 'Avatar Webcam',
                    description: 'Real-time virtual camera application that transforms your webcam into a 3D avatar. Face tracking, expression mapping, and seamless integration with video conferencing apps.',
                    technologies: ['Unity', 'C#', 'Computer Vision', 'WebRTC']
                },
                {
                    title: 'Intruders: Hide and Seek',
                    description: 'First-person stealth game for PS VR. Winner of "Best Game for Press" at PlayStation Talents 2016. Advanced AI, immersive VR mechanics.',
                    technologies: ['Unreal Engine', 'C++', 'PlayStation VR']
                },
                {
                    title: 'YetiRush',
                    description: 'Multiplayer racing game for mobile platforms. Real-time synchronization, custom physics engine, and competitive matchmaking system.',
                    technologies: ['Unity', 'Photon', 'C#', 'Mobile']
                },
                {
                    title: 'Zizeron AI',
                    description: 'Platform for analyzing images with artificial intelligence that detects and alerts about different situations. Real-time monitoring system with anomaly detection and automatic alerts.',
                    technologies: ['Python', 'TensorFlow', 'OpenCV', 'React', 'Node.js']
                }
            ]
        },
        contact: {
            title: 'Get in Touch',
            description: 'Open to projects where I can contribute in frontend architecture, optimization and system design.',
            email: 'Email',
            linkedin: 'LinkedIn',
            github: 'GitHub',
            location: 'Location',
            locationValue: 'Zaragoza, Spain (open to remote/hybrid)'
        },
        footer: {
            rights: 'All rights reserved.',
            madeWith: 'Made with'
        }
    },
    es: {
        nav: {
            home: 'Inicio',
            about: 'Sobre mí',
            experience: 'Experiencia',
            skills: 'Habilidades',
            projects: 'Proyectos',
            contact: 'Contacto'
        },
        hero: {
            name: 'Luis María González Pradas',
            title: 'Desarrollador Full-Stack Senior | Tech Lead',
            subtitle: 'Especializado en arquitecturas escalables end-to-end con 10 años de experiencia',
            view3D: 'Ver en 3D',
            scrollDown: 'Desliza para descubrir más'
        },
        about: {
            title: 'Sobre mí',
            description: 'Desarrollador full-stack con <strong>10 años de experiencia</strong>, especializado en arquitecturas escalables end-to-end. En frontend: Angular, RxJS, ThreeJS/WebGL con rendering 3D a 60fps. En backend: NestJS con arquitectura hexagonal, autenticación/autorización (OAuth2, API keys), colas asíncronas (BullJS/Redis), APIs REST y monitorización (Grafana). He desarrollado SDKs con autenticación propia, implementado CI/CD y liderado equipos técnicos.'
        },
        skills: {
            title: 'Stack Técnico',
            categories: {
                frontend: {
                    title: 'Frontend',
                    items: ['Angular (v2-20)', 'Next.js', 'TypeScript', 'RxJS', 'Signals', 'Angular Material', 'Ionic', 'ThreeJS/WebGL', 'NgRx']
                },
                backend: {
                    title: 'Backend',
                    items: ['NestJS', 'Node.js', 'Java', 'Python', 'APIs REST', 'MongoDB', 'MySQL', 'TypeORM', 'Redis', 'BullJS']
                },
                devops: {
                    title: 'DevOps & Herramientas',
                    items: ['Docker', 'Jenkins', 'CI/CD', 'Grafana', 'Loki', 'Git', 'OAuth2', 'JWT']
                },
                gamedev: {
                    title: 'Game Dev & 3D',
                    items: ['Unity', 'Unreal Engine', 'C#', 'C++', 'Blender API', 'WebGL']
                },
                architecture: {
                    title: 'Arquitectura',
                    items: ['Hexagonal/DDD', 'Microservicios', 'Event-Driven', 'TDD', 'SOLID', 'Patrones de Diseño']
                },
                mobile: {
                    title: 'Mobile & Otros',
                    items: ['Android', 'Ionic', 'RPA', 'Automatización', 'Selenium']
                }
            }
        },
        experience: {
            title: 'Experiencia Profesional',
            jobs: [
                {
                    company: 'Freelance',
                    role: 'Desarrollador Full-Stack',
                    period: 'Ago 2024 - Actualidad',
                    location: 'Remoto',
                    description: 'Desarrollo de aplicaciones full-stack para clientes internacionales tras el cierre de PolygonalMind.',
                    highlights: [
                        '<strong>App social para ONGs (Cliente Suizo):</strong> App móvil Ionic/Angular + backend NestJS. Sistema de matching, mensajería y gestión de eventos',
                        '<strong>Configurador 3D de sofás (Inmobiliaria):</strong> Web Angular con visor Unity (WebGL). Configurador modular, comunicación Angular-Unity, generación de presupuestos'
                    ]
                },
                {
                    company: 'PolygonalMind',
                    role: 'Tech Lead',
                    period: 'Jul 2021 - Ago 2024',
                    location: 'Zaragoza, España',
                    description: 'Diseño e implementación de <strong>VIPE</strong> (<a href="https://vipe.io" target="_blank" rel="noopener">vipe.io</a>), ecosistema de avatares 3D con marketplace y renderizado en tiempo real. Lead técnico en página web3 de Forbes (Next.js) y herramientas web internas.',
                    highlights: [
                        'App Angular con ThreeJS optimizado (60fps), standalone components, signals y RxJS. Code splitting y lazy loading',
                        'Sistema de estado híbrido (NgRx + Signals custom). Componentes modulares reutilizables',
                        'Backend NestJS con arquitectura hexagonal/DDD, colas asíncronas (BullJS/Redis) para procesamiento 3D',
                        'Sistema de autenticación: OAuth2 (Google, Discord), OAuth propio para SDKs, gestión de API keys y permisos por rol',
                        'Testing: Jest (unitarios), Selenium (E2E). Dockerización completa. CI/CD con Jenkins',
                        'Observabilidad: Grafana + Loki para logs, análisis de errores y monitorización del sistema',
                        'SDKs multiplataforma (JavaScript, Unity C#, Unreal C++) con documentación',
                        'Automatización Blender Python API para generación de avatares',
                        'Coordinación de equipo de 11 personas, code reviews y pair programming'
                    ]
                },
                {
                    company: 'esPublico Tecnología',
                    role: 'Senior Java Developer',
                    period: 'Dic 2019 - May 2021',
                    location: 'Zaragoza, España',
                    description: 'Soluciones RPA para automatización de flujos administrativos, integraciones API y aplicaciones de escritorio Java'
                },
                {
                    company: 'MedUX',
                    role: 'Android Developer',
                    period: 'Nov 2016 - Jul 2019',
                    location: 'Madrid, España',
                    description: 'App para operadores de telecomunicaciones para medición de calidad de red. Testing automatizado con Selenium'
                },
                {
                    company: 'Tessera Studios',
                    role: 'Game Developer',
                    period: 'May 2016 - Dic 2016',
                    location: 'Madrid, España',
                    description: '<strong>Intruders: Hide and Seek</strong> (premio "Mejor Juego para la Prensa" PlayStation Talents 2016). Mecánicas VR, IA y UI en C++/Unreal'
                }
            ]
        },
        projects: {
            title: 'Proyectos Destacados',
            items: [
                {
                    title: 'VIPE Platform',
                    description: 'Marketplace de Avatares 3D con integración blockchain y renderizado en tiempo real. Ecosistema completo con wallet web3, minting de NFTs y soporte SDK multiplataforma.',
                    technologies: ['Angular', 'Three.js', 'NestJS', 'MongoDB', 'Solidity', 'Web3']
                },
                {
                    title: 'Avatar Webcam',
                    description: 'Aplicación de cámara virtual en tiempo real que transforma tu webcam en un avatar 3D. Seguimiento facial, mapeo de expresiones e integración fluida con apps de videoconferencia.',
                    technologies: ['Unity', 'C#', 'Computer Vision', 'WebRTC']
                },
                {
                    title: 'Intruders: Hide and Seek',
                    description: 'Juego de sigilo en primera persona para PS VR. Ganador de "Mejor Juego para la Prensa" en PlayStation Talents 2016. IA avanzada, mecánicas VR inmersivas.',
                    technologies: ['Unreal Engine', 'C++', 'PlayStation VR']
                },
                {
                    title: 'YetiRush',
                    description: 'Juego de carreras multijugador para plataformas móviles. Sincronización en tiempo real, motor de física personalizado y sistema de matchmaking competitivo.',
                    technologies: ['Unity', 'Photon', 'C#', 'Mobile']
                },
                {
                    title: 'Zizeron AI',
                    description: 'Plataforma para analizar imágenes con inteligencia artificial que detecta y alerta sobre diferentes situaciones. Sistema de monitoreo en tiempo real con detección de anomalías y alertas automáticas.',
                    technologies: ['Python', 'TensorFlow', 'OpenCV', 'React', 'Node.js']
                }
            ]
        },
        contact: {
            title: 'Contacto',
            description: 'Abierto a proyectos donde pueda aportar en arquitectura frontend, optimización y diseño de sistemas.',
            email: 'Email',
            linkedin: 'LinkedIn',
            github: 'GitHub',
            location: 'Ubicación',
            locationValue: 'Zaragoza, España (abierto a remoto/híbrido)'
        },
        footer: {
            rights: 'Todos los derechos reservados.',
            madeWith: 'Hecho con'
        }
    }
};

export default translations;


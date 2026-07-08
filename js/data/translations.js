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
        three: {
            options: 'OPTIONS'
        },
        hero: {
            name: 'Luis María González Pradas',
            title: 'Senior Full Stack Engineer & Tech Lead',
            subtitle: 'Angular · NestJS · Clean architecture · 10+ years building production web apps',
            view3D: 'View in 3D',
            scrollDown: 'Scroll down to discover more'
        },
        about: {
            title: 'About Me',
            description: 'Full Stack engineer with over <strong>10 years of experience</strong> building production web applications, with a strong focus on Angular and NestJS, clean architecture (Hexagonal, DDD) and reactive state (NgRx, RxJS, Signals). Between 2021 and 2025 I was Tech Lead at Polygonal Mind, coordinating a team of <strong>11 people</strong> while leading the architecture of <strong>VIPE / CryptoAvatars</strong> and the <strong>Forbes Web3 Legacy Pass</strong>. Equally comfortable on frontend and backend, with hands-on experience in 3D (Three.js, Unity), AR/WebXR and Web3 (Solidity) as a differentiator. Currently open to Senior Full Stack or Tech Lead roles, remote or hybrid.'
        },
        skills: {
            title: 'Technical Stack',
            categories: {
                frontend: {
                    title: 'Frontend',
                    items: ['Angular (v12–v21)', 'TypeScript', 'Next.js', 'RxJS', 'Signals', 'Standalone Components', 'Ionic', 'Tailwind CSS', 'SCSS/Sass', 'NgRx']
                },
                backend: {
                    title: 'Backend & Data',
                    items: ['NestJS', 'Node.js', 'Java', 'REST APIs', 'WebSockets', 'PostgreSQL', 'MongoDB', 'Prisma', 'Redis', 'BullJS', 'MySQL']
                },
                devops: {
                    title: 'DevOps & Cloud',
                    items: ['Docker', 'Docker Compose', 'Nginx', 'CI/CD (Jenkins, GitHub Actions)', 'DigitalOcean', 'AWS S3', 'Grafana', 'Loki']
                },
                gamedev: {
                    title: '3D, AR & Web3',
                    items: ['Three.js', 'WebGL', 'Unity (WebGL)', 'Unreal Engine', 'Blender API', 'WebXR', 'Solidity', 'Ethereum']
                },
                architecture: {
                    title: 'Architecture',
                    items: ['Hexagonal / DDD', 'Clean Architecture', 'SOLID', 'Microservices', 'Nx Monorepo', 'Module Federation', 'Microfrontends', 'Event-Driven']
                },
                mobile: {
                    title: 'Auth, Testing & Integrations',
                    items: ['OAuth2', 'JWT', 'RBAC', 'Jest', 'Karma', 'Selenium', 'Stripe', 'WhatsApp Business API', 'LLM / AI', 'ElevenLabs']
                }
            }
        },
        experience: {
            title: 'Professional Experience',
            jobs: [
                {
                    company: 'North Studio',
                    role: 'Full Stack Developer',
                    period: 'Oct 2025 – Mar 2026',
                    location: 'Remote',
                    logo: 'images/north-logo.jpg',
                    logoAlt: 'North Studio Logo',
                    description: '3D product configurator for <strong>Kettal</strong> (international luxury outdoor furniture brand) on Unity WebGL, integrated as an embeddable widget into Kettal\'s Nuxt/Vue.js frontend with real-time postMessage/API sync.',
                    highlights: [
                        'Live at <a href="https://www.kettal.com/es/configurator" target="_blank" rel="noopener">kettal.com/es/configurator</a>.',
                        'AR preview with WebXR and bidirectional real-time sync between the configurator and the host frontend.'
                    ]
                },
                {
                    company: 'Tarity',
                    role: 'Full Stack Developer',
                    period: 'Apr 2025 – Sep 2025',
                    location: 'Remote',
                    logo: 'images/tarity-logo.png',
                    logoAlt: 'Tarity Logo',
                    description: 'Cross-platform Ionic/Angular mobile app with NestJS backend on MongoDB for a social dating platform focused on philanthropy.',
                    highlights: [
                        'Real-time chat and push notifications (WebSockets, RxJS, NgRx).',
                        'OAuth2 + SMS authentication and Stripe in-app payments. Product landing at <a href="https://tarity.com/" target="_blank" rel="noopener">tarity.com</a>.'
                    ]
                },
                {
                    company: 'Polygonal Mind',
                    role: 'Tech Lead · Senior Full Stack Engineer',
                    period: 'Jul 2021 – Jul 2025',
                    location: 'Remote',
                    logo: 'images/polygonal_mind_logo.jpg',
                    logoAlt: 'Polygonal Mind Logo',
                    description: 'Architecture and development of <strong>VIPE / CryptoAvatars</strong> (<a href="https://vipe.io" target="_blank" rel="noopener">vipe.io</a>), an interoperable Web3 avatar ecosystem, and the <strong>Forbes Web3 Legacy Pass</strong> in Next.js. Company closed in 2025.',
                    highlights: [
                        'Led a multidisciplinary team of <strong>11 people</strong>: architecture decisions, code reviews, mentoring and hiring. Notion sprints and Figma UI design with direct partner/client communication.',
                        'Full-stack platform: Angular (NgRx, Signals, RxJS, SSR, lazy loading) + NestJS with <strong>Hexagonal Architecture</strong> and DDD. Heavy 3D jobs via BullJS/Redis.',
                        'Migrated to <strong>Standalone Components</strong>, built a reusable Angular component library and optimised change detection (OnPush, trackBy) across heavy 3D views.',
                        'Shipped three SDKs (JavaScript — <a href="https://www.npmjs.com/package/@vipeio/sdk" target="_blank" rel="noopener">npm</a> —, Unity and Unreal) and an iframe-based embeddable microfrontend architecture with postMessage.',
                        'Docker, Jenkins CI/CD, Grafana/Loki observability. Three.js/WebGL, Blender API automation, NFT marketplace (Solidity) and ElevenLabs TTS integration.'
                    ]
                },
                {
                    company: 'esPublico Tecnología',
                    role: 'Java Developer – RPA & Process Automation',
                    period: 'Dec 2019 – Jul 2021',
                    location: 'Zaragoza, Spain',
                    logo: 'images/espublico_tech_logo.jpg',
                    logoAlt: 'esPublico Logo',
                    description: 'RPA workflows for public-administration processes, Java Swing desktop UIs and REST APIs. Unit and integration tests. Task management in Redmine.'
                },
                {
                    company: 'MedUX',
                    role: 'Java / Android Developer',
                    period: 'Nov 2016 – Dec 2019',
                    location: 'Madrid, Spain',
                    logo: 'images/meduxjpg.jpg',
                    logoAlt: 'MedUX Logo',
                    description: 'Android app (Dagger 2, MVP/MVVM) for large-scale network-quality diagnostics with REST APIs and MongoDB data pipelines. Selenium testing and Scrum with Jira.'
                },
                {
                    company: 'Tessera Studios',
                    role: 'Game Developer – VR / PS VR',
                    period: 'May 2016 – Oct 2016',
                    location: 'Madrid, Spain',
                    logo: 'images/tesserajpg.jpg',
                    logoAlt: 'Tessera Studios Logo',
                    description: 'AI, UI and VR mechanics in C++ for <strong>Intruders: Hide and Seek</strong> (Unreal Engine 4, PlayStation VR), winner of <strong>PlayStation Talents 2016 – Best Game and Best Game for the Press</strong>.'
                },
                {
                    company: 'Trucas',
                    role: 'Android & Java Desktop Developer',
                    period: 'Jun 2015 – Oct 2015',
                    location: 'Zaragoza, Spain',
                    description: 'Android apps (pet social network with geolocation, internal ticket-management system) and Point-of-Sale terminals in Java backed by MySQL.'
                }
            ]
        },
        projects: {
            title: 'Featured Projects',
            items: [
                {
                    title: 'Kettal 3D Configurator',
                    description: '3D product configurator for Kettal developed at <strong>North Studio</strong> on Unity WebGL and embedded as a framework-agnostic widget inside Kettal\'s Nuxt/Vue.js frontend, with bidirectional real-time sync and AR preview via WebXR.',
                    technologies: ['Unity WebGL', 'WebXR', 'Nuxt / Vue.js', 'postMessage', 'Figma'],
                    image: 'images/kettal.png',
                    url: 'https://www.kettal.com/es/configurator'
                },
                {
                    title: 'Tarity',
                    description: 'Cross-platform mobile app for iOS and Android with Ionic/Angular and a NestJS backend on MongoDB. Real-time chat, push notifications, OAuth2/SMS authentication and Stripe in-app payments.',
                    technologies: ['Ionic', 'Angular', 'NestJS', 'MongoDB', 'WebSockets', 'NgRx', 'Stripe'],
                    image: 'images/tarity.png',
                    url: 'https://tarity.com'
                },
                {
                    title: 'VIPE / CryptoAvatars',
                    description: 'Web3 ecosystem of interoperable 3D avatars compatible with VRChat, Decentraland and Ready Player Me. Full-stack Angular + NestJS platform with cross-platform SDKs, NFT marketplace and real-time 3D rendering.',
                    technologies: ['Angular', 'Three.js', 'NestJS', 'MongoDB', 'Solidity', 'Web3'],
                    image: 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*DTn5k1-XaBaiO0y3ZJSRyQ.jpeg',
                    url: 'https://medium.com/@vipeio'
                },
                {
                    title: 'Wanxas',
                    description: 'Personal SaaS for business management and automation. NestJS + PostgreSQL/Prisma backend with DDD and Hexagonal Architecture; Angular 20 frontend with Nx monorepo and Module Federation microfrontends.',
                    technologies: ['Angular 20', 'NestJS', 'Nx', 'Module Federation', 'PostgreSQL', 'Prisma', 'Docker'],
                    image: 'images/wanxas.png',
                    url: 'https://wanxas.com'
                },
                {
                    title: 'Intruders: Hide and Seek',
                    description: 'First-person stealth game for PlayStation VR. Winner of Best Game and Best Game for the Press at PlayStation Talents 2016. Advanced AI, immersive VR mechanics in Unreal Engine 4.',
                    technologies: ['Unreal Engine 4', 'C++', 'PlayStation VR'],
                    image: 'https://i.ytimg.com/vi/UjBUxNE7N4w/maxresdefault.jpg',
                    url: 'https://store.steampowered.com/app/1045840/Intruders_Hide_and_Seek/'
                }
            ]
        },
        contact: {
            title: 'Get in Touch',
            description: 'Open to Senior Full Stack or Tech Lead positions where I can contribute in architecture, optimisation and system design. Remote or hybrid.',
            email: 'Email',
            linkedin: 'LinkedIn',
            github: 'GitHub',
            location: 'Location',
            locationValue: 'Zaragoza, Spain · Open to remote / hybrid'
        },
        footer: {
            rights: 'All rights reserved.',
            madeWith: 'Made with',
            copyright: '© 2026 Luis María González Pradas. All rights reserved.'
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
        three: {
            options: 'OPCIONES'
        },
        hero: {
            name: 'Luis María González Pradas',
            title: 'Senior Full Stack Engineer & Tech Lead',
            subtitle: 'Angular · NestJS · Arquitectura limpia · 10 años dev · 5+ como Tech Lead',
            view3D: 'Ver en 3D',
            scrollDown: 'Desliza para descubrir más'
        },
        about: {
            title: 'Sobre mí',
            description: 'Desarrollador Full Stack con <strong>10 años de experiencia</strong> construyendo aplicaciones web en producción, los últimos <strong>5 como Tech Lead / Arquitecto</strong>, con foco en Angular y NestJS, arquitectura limpia (Hexagonal, DDD) y estado reactivo (NgRx, RxJS, Signals). Entre 2021 y 2025 fui Tech Lead en Polygonal Mind, coordinando un equipo de <strong>11 personas</strong> mientras lideraba la arquitectura de <strong>VIPE / CryptoAvatars</strong> y el <strong>Web3 Legacy Pass para Forbes</strong>. Me muevo igual de bien en frontend y backend, con experiencia real en 3D (Three.js, Unity), AR/WebXR y Web3 (Solidity) como diferenciador. Busco una posición Senior Full Stack o Tech Lead, en remoto o híbrido.'
        },
        skills: {
            title: 'Stack Técnico',
            categories: {
                frontend: {
                    title: 'Frontend',
                    items: ['Angular (v12–v21)', 'TypeScript', 'Next.js', 'RxJS', 'Signals', 'Standalone Components', 'Ionic', 'Tailwind CSS', 'SCSS/Sass', 'NgRx']
                },
                backend: {
                    title: 'Backend & Datos',
                    items: ['NestJS', 'Node.js', 'Java', 'APIs REST', 'WebSockets', 'PostgreSQL', 'MongoDB', 'Prisma', 'Redis', 'BullJS', 'MySQL']
                },
                devops: {
                    title: 'DevOps & Cloud',
                    items: ['Docker', 'Docker Compose', 'Nginx', 'CI/CD (Jenkins, GitHub Actions)', 'DigitalOcean', 'AWS S3', 'Grafana', 'Loki']
                },
                gamedev: {
                    title: '3D, AR & Web3',
                    items: ['Three.js', 'WebGL', 'Unity (WebGL)', 'Unreal Engine', 'Blender API', 'WebXR', 'Solidity', 'Ethereum']
                },
                architecture: {
                    title: 'Arquitectura',
                    items: ['Hexagonal / DDD', 'Clean Architecture', 'SOLID', 'Microservicios', 'Nx Monorepo', 'Module Federation', 'Microfrontends', 'Event-Driven']
                },
                mobile: {
                    title: 'Auth, Testing & Integraciones',
                    items: ['OAuth2', 'JWT', 'RBAC', 'Jest', 'Karma', 'Selenium', 'Stripe', 'WhatsApp Business API', 'LLM / IA', 'ElevenLabs']
                }
            }
        },
        experience: {
            title: 'Experiencia Profesional',
            jobs: [
                {
                    company: 'North Studio',
                    role: 'Full Stack Developer',
                    period: 'Oct 2025 – Mar 2026',
                    location: 'Remoto',
                    logo: 'images/north-logo.jpg',
                    logoAlt: 'North Studio Logo',
                    description: 'Configurador 3D de producto para <strong>Kettal</strong> (marca internacional de mobiliario outdoor de lujo) sobre Unity WebGL, integrado como widget embebible en el frontend Nuxt/Vue.js de Kettal con sincronización bidireccional en tiempo real (postMessage/API).',
                    highlights: [
                        'En producción: <a href="https://www.kettal.com/es/configurator" target="_blank" rel="noopener">kettal.com/es/configurator</a>.',
                        'Preview AR con WebXR y sincronización bidireccional en tiempo real entre el configurador y el frontend host.'
                    ]
                },
                {
                    company: 'Tarity',
                    role: 'Full Stack Developer',
                    period: 'Abr 2025 – Sep 2025',
                    location: 'Remoto',
                    logo: 'images/tarity-logo.png',
                    logoAlt: 'Tarity Logo',
                    description: 'App móvil multiplataforma Ionic/Angular con backend NestJS sobre MongoDB para una plataforma social de citas enfocada en filantropía.',
                    highlights: [
                        'Chat y notificaciones push en tiempo real (WebSockets, RxJS, NgRx).',
                        'Autenticación OAuth2 + SMS y pagos in-app con Stripe. Landing del producto en <a href="https://tarity.com/" target="_blank" rel="noopener">tarity.com</a>.'
                    ]
                },
                {
                    company: 'Polygonal Mind',
                    role: 'Tech Lead · Senior Full Stack Engineer',
                    period: 'Jul 2021 – Jul 2025',
                    location: 'Remoto',
                    logo: 'images/polygonal_mind_logo.jpg',
                    logoAlt: 'Polygonal Mind Logo',
                    description: 'Arquitectura y desarrollo de <strong>VIPE / CryptoAvatars</strong> (<a href="https://vipe.io" target="_blank" rel="noopener">vipe.io</a>), ecosistema Web3 de avatares interoperables, y el <strong>Web3 Legacy Pass para Forbes</strong> en Next.js. La empresa cerró en 2025.',
                    highlights: [
                        'Lideré un equipo multidisciplinar de <strong>11 personas</strong>: decisiones de arquitectura, code reviews, mentoring y contratación. Sprints en Notion y diseño UI en Figma con trato directo con partners y clientes.',
                        'Plataforma full-stack: Angular (NgRx, Signals, RxJS, SSR, lazy loading) + NestJS con <strong>Arquitectura Hexagonal</strong> y DDD. Trabajos 3D pesados con BullJS/Redis.',
                        'Migré a <strong>Standalone Components</strong>, diseñé una librería interna de componentes reutilizables y optimicé change detection (OnPush, trackBy) en las vistas 3D más pesadas.',
                        'Publiqué tres SDKs (JavaScript — <a href="https://www.npmjs.com/package/@vipeio/sdk" target="_blank" rel="noopener">npm</a> —, Unity y Unreal) y una arquitectura de microfrontends embebibles vía iframe con postMessage.',
                        'Docker, CI/CD con Jenkins, observabilidad Grafana/Loki. Three.js/WebGL, automatización con Blender API, marketplace NFT (Solidity) e integración ElevenLabs TTS.'
                    ]
                },
                {
                    company: 'esPublico Tecnología',
                    role: 'Java Developer – RPA & Automatización de Procesos',
                    period: 'Dic 2019 – Jul 2021',
                    location: 'Zaragoza, España',
                    logo: 'images/espublico_tech_logo.jpg',
                    logoAlt: 'esPublico Logo',
                    description: 'Flujos RPA para procesos de administración pública, UIs de escritorio Java Swing y APIs REST. Tests unitarios y de integración. Gestión de tareas en Redmine.'
                },
                {
                    company: 'MedUX',
                    role: 'Java / Android Developer',
                    period: 'Nov 2016 – Dic 2019',
                    location: 'Madrid, España',
                    logo: 'images/meduxjpg.jpg',
                    logoAlt: 'MedUX Logo',
                    description: 'App Android (Dagger 2, MVP/MVVM) para diagnóstico de calidad de red a gran escala con APIs REST y pipelines sobre MongoDB. Tests con Selenium y Scrum con Jira.'
                },
                {
                    company: 'Tessera Studios',
                    role: 'Game Developer – VR / PS VR',
                    period: 'May 2016 – Oct 2016',
                    location: 'Madrid, España',
                    logo: 'images/tesserajpg.jpg',
                    logoAlt: 'Tessera Studios Logo',
                    description: 'Mecánicas de IA, UI y realidad virtual en C++ para <strong>Intruders: Hide and Seek</strong> (Unreal Engine 4, PlayStation VR), ganador de <strong>PlayStation Talents 2016 – Mejor Juego y Mejor Juego para la Prensa</strong>.'
                },
                {
                    company: 'Trucas',
                    role: 'Android & Java Desktop Developer',
                    period: 'Jun 2015 – Oct 2015',
                    location: 'Zaragoza, España',
                    description: 'Apps Android (red social para mascotas con geolocalización, gestión interna de tickets) y terminales de Punto de Venta en Java sobre MySQL.'
                }
            ]
        },
        projects: {
            title: 'Proyectos Destacados',
            items: [
                {
                    title: 'Configurador 3D Kettal',
                    description: 'Configurador 3D de producto para Kettal desarrollado en <strong>North Studio</strong> sobre Unity WebGL, integrado como widget embebible agnóstico de framework en el frontend Nuxt/Vue.js de Kettal, con sincronización bidireccional en tiempo real y preview AR vía WebXR.',
                    technologies: ['Unity WebGL', 'WebXR', 'Nuxt / Vue.js', 'postMessage', 'Figma'],
                    image: 'images/kettal.png',
                    url: 'https://www.kettal.com/es/configurator'
                },
                {
                    title: 'Tarity',
                    description: 'App móvil multiplataforma para iOS y Android con Ionic/Angular y backend NestJS sobre MongoDB. Chat en tiempo real, notificaciones push, autenticación OAuth2/SMS y pagos in-app con Stripe.',
                    technologies: ['Ionic', 'Angular', 'NestJS', 'MongoDB', 'WebSockets', 'NgRx', 'Stripe'],
                    image: 'images/tarity.png',
                    url: 'https://tarity.com'
                },
                {
                    title: 'VIPE / CryptoAvatars',
                    description: 'Ecosistema Web3 de avatares 3D interoperables con VRChat, Decentraland y Ready Player Me. Plataforma full-stack Angular + NestJS con SDKs multiplataforma, marketplace NFT y renderizado 3D en tiempo real.',
                    technologies: ['Angular', 'Three.js', 'NestJS', 'MongoDB', 'Solidity', 'Web3'],
                    image: 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*DTn5k1-XaBaiO0y3ZJSRyQ.jpeg',
                    url: 'https://medium.com/@vipeio'
                },
                {
                    title: 'Wanxas',
                    description: 'SaaS personal de gestión y automatización para negocios. Backend NestJS + PostgreSQL/Prisma con DDD y Arquitectura Hexagonal; frontend Angular 20 con monorepo Nx y microfrontends con Module Federation.',
                    technologies: ['Angular 20', 'NestJS', 'Nx', 'Module Federation', 'PostgreSQL', 'Prisma', 'Docker'],
                    image: 'images/wanxas.png',
                    url: 'https://wanxas.com'
                },
                {
                    title: 'Intruders: Hide and Seek',
                    description: 'Juego de sigilo en primera persona para PlayStation VR. Ganador de Mejor Juego y Mejor Juego para la Prensa en PlayStation Talents 2016. IA avanzada y mecánicas VR inmersivas en Unreal Engine 4.',
                    technologies: ['Unreal Engine 4', 'C++', 'PlayStation VR'],
                    image: 'https://i.ytimg.com/vi/UjBUxNE7N4w/maxresdefault.jpg',
                    url: 'https://store.steampowered.com/app/1045840/Intruders_Hide_and_Seek/'
                }
            ]
        },
        contact: {
            title: 'Contacto',
            description: 'Abierto a posiciones Senior Full Stack o Tech Lead donde pueda aportar en arquitectura, optimización y diseño de sistemas. Remoto o híbrido.',
            email: 'Email',
            linkedin: 'LinkedIn',
            github: 'GitHub',
            location: 'Ubicación',
            locationValue: 'Zaragoza, España · Disponible remoto / híbrido'
        },
        footer: {
            rights: 'Todos los derechos reservados.',
            madeWith: 'Hecho con',
            copyright: '© 2026 Luis María González Pradas. Todos los derechos reservados.'
        }
    }
};

export default translations;

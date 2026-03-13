// ====================================
// Navigation & Theme Toggle
// ====================================
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('navMenu');
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelectorAll('.nav-link');
const backToTop = document.getElementById('backToTop');

// Handle scroll events
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add scrolled class to navbar
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Show/hide back to top button
    if (currentScroll > 500) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
    
    // Update active nav link based on scroll position
    updateActiveNavLink();
    
    lastScroll = currentScroll;
});

// Hamburger menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Back to top button
backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Update active nav link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('.section, .hero');
    const scrollPos = window.pageYOffset + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ====================================
// Hero Section - Typing Animation
// ====================================
const typingText = document.getElementById('typingText');
const roles = [
    'Estudante de Engenharia de Software',
    'Desenvolvedor',
    'Entusiasta de Big Data',
    'Professor Voluntário'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeRole() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 500; // Pause before next word
    }
    
    setTimeout(typeRole, typingSpeed);
}

// Start typing animation
setTimeout(typeRole, 1000);

// ====================================
// Particles Animation
// ====================================
const particlesContainer = document.getElementById('particles');
const particleCount = 50;

function createParticle() {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = Math.random() * 5 + 2 + 'px';
    particle.style.height = particle.style.width;
    particle.style.background = `rgba(99, 102, 241, ${Math.random() * 0.5 + 0.2})`;
    particle.style.borderRadius = '50%';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.pointerEvents = 'none';
    
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;
    
    particle.style.animation = `float ${duration}s ${delay}s infinite ease-in-out`;
    
    particlesContainer.appendChild(particle);
}

for (let i = 0; i < particleCount; i++) {
    createParticle();
}

// ====================================
// Counter Animation for Stats
// ====================================
const statNumbers = document.querySelectorAll('.stat-number');
let statsAnimated = false;

function animateStats() {
    if (statsAnimated) return;
    
    const aboutSection = document.getElementById('about');
    const rect = aboutSection.getBoundingClientRect();
    
    if (rect.top < window.innerHeight && rect.bottom > 0) {
        statsAnimated = true;
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            let current = 0;
            const increment = target / 50;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target + '+';
                }
            };
            
            updateCounter();
        });
    }
}

window.addEventListener('scroll', animateStats);

// ====================================
// Skills Filter
// ====================================
const skillCategories = document.querySelectorAll('.skill-category');
const skillCards = document.querySelectorAll('.skill-card');

skillCategories.forEach(category => {
    category.addEventListener('click', () => {
        // Remove active class from all categories
        skillCategories.forEach(cat => cat.classList.remove('active'));
        category.classList.add('active');
        
        const filter = category.getAttribute('data-category');
        
        // Filter skill cards
        skillCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            
            if (filter === 'all' || cardCategory === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Animate skill bars on scroll
let skillsAnimated = false;

function animateSkillBars() {
    if (skillsAnimated) return;
    
    const skillsSection = document.getElementById('skills');
    const rect = skillsSection.getBoundingClientRect();
    
    if (rect.top < window.innerHeight && rect.bottom > 0) {
        skillsAnimated = true;
        
        const skillProgress = document.querySelectorAll('.skill-progress');
        skillProgress.forEach(progress => {
            const width = progress.getAttribute('data-progress');
            progress.style.width = width + '%';
        });
    }
}

window.addEventListener('scroll', animateSkillBars);

// ====================================
// Projects Filter
// ====================================
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        // Filter project cards
        projectCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            
            if (filter === 'all' || cardCategory === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ====================================
// Language Toggle (PT/EN)
// ====================================
const languageToggle = document.getElementById('languageToggle');
let currentLanguage = 'pt';

const translations = {
    pt: {
        // Navigation
        nav: ['Início', 'Sobre', 'Habilidades', 'Experiência', 'Projetos', 'Contato'],
        
        // Hero
        greeting: 'Olá, eu sou',
        roles: ['Estudante de Engenharia de Software', 'Desenvolvedor Python & Java', 'Entusiasta de Big Data', 'Professor Voluntário'],
        heroBtn1: 'Entre em Contato',
        heroBtn2: 'Ver Projetos',
        scrollDown: 'Scroll Down',
        
        // About section
        aboutTag: 'Conheça-me',
        aboutTitle: 'Sobre Mim',
        aboutDesc: 'Minha jornada e paixões',
        aboutStat1: 'Formatura Prevista',
        aboutStat2: 'Cursos Concluídos',
        aboutStat3: 'Idiomas',
        aboutP1: 'Estudante de Engenharia de Software no Instituto Nacional de Telecomunicações (INATEL), com formação prevista para 2026. Dedicado e comprometido, com forte habilidade de comunicação e grande vontade de aprender e compartilhar conhecimento.',
        aboutP2: 'Experiência prática em desenvolvimento de software, análise de dados e ensino voluntário. Conhecimentos em múltiplas linguagens de programação (Python, Java, C++), bancos de dados (SQL e NoSQL), ferramentas de testes e plataformas de Big Data como Databricks e Apache Spark. Fluente em inglês e espanhol.',
        aboutHighlights: ['Desenvolvimento de Software', 'Análise de Dados', 'Big Data & Spark', 'Ensino Voluntário'],
        aboutBtn: 'Vamos Conversar',
        
        // Skills section
        skillsTag: 'Competências',
        skillsTitle: 'Minhas Habilidades',
        skillsDesc: 'Tecnologias e ferramentas que domino',
        skillsFilter: ['Todas', 'Frontend', 'Backend', 'Ferramentas', 'Soft Skills'],
        skillsSoft: ['Ensino', 'Trabalho em Equipe', 'Comunicação', 'Resolução de Problemas'],
        
        // Experience section
        expTag: 'Trajetória',
        expTitle: 'Experiência Profissional',
        expDesc: 'Minha jornada de crescimento e aprendizado',
        expJobs: [
            {
                date: '2024 - Presente',
                title: 'Bolsista de Iniciação Científica',
                company: 'Inatel eHealth - Projeto "Risco de Queda"',
                desc: 'Desenvolvimento de projeto de pesquisa focado em análise de risco de queda utilizando tecnologias de eHealth. Aplicação prática de conhecimentos em análise de dados e desenvolvimento.',
                tags: ['Python', 'Data Science', 'eHealth', 'Research']
            },
            {
                date: '2024 - Presente',
                title: 'Supervisor de Teste TOEFL',
                company: 'Mastertest Educational',
                desc: 'Supervisão de aplicação de exames TOEFL, garantindo conformidade com protocolos internacionais e suporte aos candidatos durante o processo de avaliação.',
                tags: ['English', 'Supervisão', 'TOEFL']
            },
            {
                date: '2023',
                title: 'Professor Voluntário',
                company: 'Inatel Casa Viva',
                desc: 'Ensino voluntário de Inglês (1º semestre) e Programação em Python (2º semestre). Compartilhamento de conhecimento e desenvolvimento de materiais didáticos para a comunidade.',
                tags: ['Ensino', 'Python', 'English', 'Voluntariado']
            }
        ],
        
        // Projects section
        projTag: 'Meu Trabalho',
        projTitle: 'Projetos em Destaque',
        projDesc: 'Alguns dos meus trabalhos mais recentes',
        projFilter: ['Todos', 'Web/Mobile', 'Data Science', 'Acadêmico'],
        projects: [
            {
                title: '🥈 Alimentação Remota de Animais - FETIN',
                desc: '2º Lugar na Categoria 2 da FETIN (Feira Tecnológica do Inatel). Projeto IoT para monitoramento e alimentação remota de animais domésticos e de fazenda. Competiu com mais de 100 projetos incríveis. Sistema completo com hardware e interface de controle.'
            },
            {
                title: 'Projeto Risco de Queda',
                desc: 'Pesquisa de iniciação científica em eHealth focada em análise e prevenção de risco de queda. Aplicação de machine learning e análise de dados para saúde preventiva.'
            },
            {
                title: 'Análise de Dados Pokémon',
                desc: 'Análise exploratória e visualização de dados utilizando dataset de Pokémon. Projeto desenvolvido com Pandas, NumPy, Matplotlib, Plotly e Seaborn para extrair insights e padrões dos dados.'
            },
            {
                title: 'Portal Acadêmico Inatel',
                desc: 'Portal acadêmico completo e moderno para gerenciar informações estudantis. Sistema com dashboard interativo, controle de frequência, visualização de notas, calendário acadêmico, gráficos de desempenho e múltiplos temas personalizáveis.'
            },
            {
                title: 'EssentIA - Sistema IA para Perfumes',
                desc: 'Sistema fullstack com IA especializada em recomendação de perfumes. Agente LangGraph com 8 nós, busca web em tempo real (Tavily API), chat personalizado e interface responsiva. Atuação como desenvolvedor frontend e DevOps.'
            },
            {
                title: 'Pipeline Big Data - Arquitetura Medallion',
                desc: 'Pipeline completo de dados no Databricks seguindo arquitetura Medallion (Bronze, Silver, Gold). Implementação de ETL com PySpark, Delta Lake e orquestração via Databricks Jobs. Processamento desde ingestão de dados brutos até KPIs de negócio otimizados.'
            },
            {
                title: '🍕 Pizzaguidão - Game Roguelike',
                desc: 'Jogo roguelike criado em 36 horas durante Hackathon CPG no INATEL. Desvie de obstáculos e mendigos para devolver uma pizza ao professor Renzo! Primeiro projeto de game dev da equipe - desenvolvido com pizza, energético e pouquíssimo sono.'
            },
            {
                title: 'Task Manager API - CI/CD Pipeline',
                desc: 'Sistema completo de CI/CD com Jenkins para API REST de gerenciamento de tarefas. Pipeline automatizado com 98% de cobertura de testes, Docker containerization e interface web moderna. Projeto DevOps completo.'
            }
        ],
        
        // Contact section
        contactTag: 'Fale Comigo',
        contactTitle: 'Entre em Contato',
        contactDesc: 'Vamos trabalhar juntos no seu próximo projeto',
        contactInfoTitle: 'Informações de Contato',
        contactInfoText: 'Estou sempre aberto a discutir novos projetos, ideias criativas ou oportunidades para fazer parte de sua visão.',
        contactLabels: ['Email', 'WhatsApp', 'Localização'],
        
        // Footer
        footerText: 'Estudante de Engenharia de Software no INATEL. Apaixonado por tecnologia, dados e desenvolvimento de soluções inovadoras.',
        footerLinks: 'Links Rápidos',
        footerConnect: 'Conecte-se',
        footerCopy: '© 2025 Fernando Puebla Stein. Todos os direitos reservados.'
    },
    en: {
        // Navigation
        nav: ['Home', 'About', 'Skills', 'Experience', 'Projects', 'Contact'],
        
        // Hero
        greeting: 'Hello, I am',
        roles: ['Software Engineering Student', 'Python & Java Developer', 'Big Data Enthusiast', 'Volunteer Teacher'],
        heroBtn1: 'Get in Touch',
        heroBtn2: 'See Projects',
        scrollDown: 'Scroll Down',
        
        // About section
        aboutTag: 'Get to Know Me',
        aboutTitle: 'About Me',
        aboutDesc: 'My journey and passions',
        aboutStat1: 'Expected Graduation',
        aboutStat2: 'Completed Courses',
        aboutStat3: 'Languages',
        aboutP1: 'Software Engineering student at the National Telecommunications Institute (INATEL), expected to graduate in 2026. Dedicated and committed, with strong communication skills and a great desire to learn and share knowledge.',
        aboutP2: 'Practical experience in software development, data analysis, and volunteer teaching. Knowledge in multiple programming languages (Python, Java, C++), databases (SQL and NoSQL), testing tools, and Big Data platforms like Databricks and Apache Spark. Fluent in English and Spanish.',
        aboutHighlights: ['Software Development', 'Data Analysis', 'Big Data & Spark', 'Volunteer Teaching'],
        aboutBtn: "Let's Talk",
        
        // Skills section
        skillsTag: 'Competencies',
        skillsTitle: 'My Skills',
        skillsDesc: 'Technologies and tools I master',
        skillsFilter: ['All', 'Frontend', 'Backend', 'Tools', 'Soft Skills'],
        skillsSoft: ['Teaching', 'Teamwork', 'Communication', 'Problem Solving'],
        
        // Experience section
        expTag: 'Journey',
        expTitle: 'Professional Experience',
        expDesc: 'My journey of growth and learning',
        expJobs: [
            {
                date: '2024 - Present',
                title: 'Research Fellow',
                company: 'Inatel eHealth - "Fall Risk" Project',
                desc: 'Development of research project focused on fall risk analysis using eHealth technologies. Practical application of knowledge in data analysis and development.',
                tags: ['Python', 'Data Science', 'eHealth', 'Research']
            },
            {
                date: '2024 - Present',
                title: 'TOEFL Test Supervisor',
                company: 'Mastertest Educational',
                desc: 'Supervision of TOEFL exam administration, ensuring compliance with international protocols and support for candidates during the evaluation process.',
                tags: ['English', 'Supervision', 'TOEFL']
            },
            {
                date: '2023',
                title: 'Volunteer Teacher',
                company: 'Inatel Casa Viva',
                desc: 'Volunteer teaching of English (1st semester) and Python Programming (2nd semester). Knowledge sharing and development of teaching materials for the community.',
                tags: ['Teaching', 'Python', 'English', 'Volunteering']
            }
        ],
        
        // Projects section
        projTag: 'My Work',
        projTitle: 'Featured Projects',
        projDesc: 'Some of my most recent work',
        projFilter: ['All', 'Web/Mobile', 'Data Science', 'Academic'],
        projects: [
            {
                title: '🥈 Remote Animal Feeding - FETIN',
                desc: '2nd Place in Category 2 at FETIN (Inatel Technology Fair). IoT project for monitoring and remote feeding of domestic and farm animals. Competed with over 100 incredible projects. Complete system with hardware and control interface.'
            },
            {
                title: 'Fall Risk Project',
                desc: 'Scientific research project in eHealth focused on fall risk analysis and prevention. Application of machine learning and data analysis for preventive healthcare.'
            },
            {
                title: 'Pokémon Data Analysis',
                desc: 'Exploratory analysis and data visualization using Pokémon dataset. Project developed with Pandas, NumPy, Matplotlib, Plotly, and Seaborn to extract insights and data patterns.'
            },
            {
                title: 'Inatel Academic Portal',
                desc: 'Complete and modern academic portal to manage student information. System with interactive dashboard, attendance control, grade visualization, academic calendar, performance charts, and multiple customizable themes.'
            },
            {
                title: 'EssentIA - AI System for Perfumes',
                desc: 'Fullstack system with AI specialized in perfume recommendation. LangGraph agent with 8 nodes, real-time web search (Tavily API), personalized chat, and responsive interface. Role as frontend developer and DevOps.'
            },
            {
                title: 'Big Data Pipeline - Medallion Architecture',
                desc: 'Complete data pipeline on Databricks following Medallion architecture (Bronze, Silver, Gold). ETL implementation with PySpark, Delta Lake, and orchestration via Databricks Jobs. Processing from raw data ingestion to optimized business KPIs.'
            },
            {
                title: '🍕 Pizzaguidão - Roguelike Game',
                desc: 'Roguelike game created in 36 hours during CPG Hackathon at INATEL. Dodge obstacles and beggars to deliver a pizza to professor Renzo! Team\'s first game dev project - developed with pizza, energy drinks, and very little sleep.'
            },
            {
                title: 'Task Manager API - CI/CD Pipeline',
                desc: 'Complete CI/CD system with Jenkins for task management REST API. Automated pipeline with 98% test coverage, Docker containerization, and modern web interface. Complete DevOps project.'
            }
        ],
        
        // Contact section
        contactTag: 'Talk to Me',
        contactTitle: 'Get In Touch',
        contactDesc: "Let's work together on your next project",
        contactInfoTitle: 'Contact Information',
        contactInfoText: 'I am always open to discussing new projects, creative ideas, or opportunities to be part of your vision.',
        contactLabels: ['Email', 'WhatsApp', 'Location'],
        
        // Footer
        footerText: 'Software Engineering student at INATEL. Passionate about technology, data, and developing innovative solutions.',
        footerLinks: 'Quick Links',
        footerConnect: 'Connect',
        footerCopy: '© 2025 Fernando Puebla Stein. All rights reserved.'
    }
};

function translatePage(lang) {
    const t = translations[lang];
    
    // Update language toggle button
    languageToggle.querySelector('span').textContent = lang === 'pt' ? 'EN' : 'PT';
    
    // Navigation
    document.querySelectorAll('.nav-link').forEach((link, index) => {
        link.textContent = t.nav[index];
    });
    
    // Hero section
    const greeting = document.querySelector('.greeting');
    const heroDesc = document.querySelector('.hero-description');
    const scrollIndicator = document.querySelector('.scroll-indicator span');
    if (greeting) greeting.textContent = t.greeting;
    if (heroDesc) heroDesc.textContent = t.heroDesc;
    if (scrollIndicator) scrollIndicator.textContent = t.scrollDown;
    
    const heroBtns = document.querySelectorAll('.hero-cta .btn span');
    if (heroBtns[0]) heroBtns[0].textContent = t.heroBtn1;
    if (heroBtns[1]) heroBtns[1].textContent = t.heroBtn2;
    
    // About section
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
        const tag = aboutSection.querySelector('.section-tag');
        const title = aboutSection.querySelector('.section-title');
        const desc = aboutSection.querySelector('.section-description');
        if (tag) tag.textContent = t.aboutTag;
        if (title) title.textContent = t.aboutTitle;
        if (desc) desc.textContent = t.aboutDesc;
        
        // About stats
        const statLabels = aboutSection.querySelectorAll('.stat-label');
        if (statLabels[0]) statLabels[0].textContent = t.aboutStat1;
        if (statLabels[1]) statLabels[1].textContent = t.aboutStat2;
        if (statLabels[2]) statLabels[2].textContent = t.aboutStat3;
        
        // About paragraphs
        const aboutParagraphs = aboutSection.querySelectorAll('.about-paragraph');
        if (aboutParagraphs[0]) aboutParagraphs[0].textContent = t.aboutP1;
        if (aboutParagraphs[1]) aboutParagraphs[1].textContent = t.aboutP2;
        
        // About highlights
        const highlights = aboutSection.querySelectorAll('.highlight-item span');
        highlights.forEach((h, i) => {
            if (t.aboutHighlights[i]) h.textContent = t.aboutHighlights[i];
        });
        
        // About button
        const aboutBtn = aboutSection.querySelector('.btn span');
        if (aboutBtn) aboutBtn.textContent = t.aboutBtn;
    }
    
    // Skills section
    const skillsSection = document.querySelector('#skills');
    if (skillsSection) {
        const tag = skillsSection.querySelector('.section-tag');
        const title = skillsSection.querySelector('.section-title');
        const desc = skillsSection.querySelector('.section-description');
        if (tag) tag.textContent = t.skillsTag;
        if (title) title.textContent = t.skillsTitle;
        if (desc) desc.textContent = t.skillsDesc;
        
        // Skills filter buttons
        const filterBtns = skillsSection.querySelectorAll('.skill-category');
        filterBtns.forEach((btn, i) => {
            if (t.skillsFilter[i]) btn.textContent = t.skillsFilter[i];
        });
        
        // Soft skills names
        const softSkills = skillsSection.querySelectorAll('[data-category="soft"] .skill-name');
        softSkills.forEach((skill, i) => {
            if (t.skillsSoft[i]) skill.textContent = t.skillsSoft[i];
        });
    }
    
    // Experience section
    const expSection = document.querySelector('#experience');
    if (expSection) {
        const tag = expSection.querySelector('.section-tag');
        const title = expSection.querySelector('.section-title');
        const desc = expSection.querySelector('.section-description');
        if (tag) tag.textContent = t.expTag;
        if (title) title.textContent = t.expTitle;
        if (desc) desc.textContent = t.expDesc;
        
        // Translate experience timeline items
        const timelineItems = expSection.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, i) => {
            if (t.expJobs[i]) {
                const date = item.querySelector('.timeline-date');
                const jobTitle = item.querySelector('.timeline-title');
                const company = item.querySelector('.timeline-company');
                const description = item.querySelector('.timeline-description');
                const tags = item.querySelectorAll('.tag');
                
                if (date) date.textContent = t.expJobs[i].date;
                if (jobTitle) jobTitle.textContent = t.expJobs[i].title;
                if (company) company.textContent = t.expJobs[i].company;
                if (description) description.textContent = t.expJobs[i].desc;
                
                tags.forEach((tag, j) => {
                    if (t.expJobs[i].tags[j]) tag.textContent = t.expJobs[i].tags[j];
                });
            }
        });
    }
    
    // Projects section
    const projSection = document.querySelector('#projects');
    if (projSection) {
        const tag = projSection.querySelector('.section-tag');
        const title = projSection.querySelector('.section-title');
        const desc = projSection.querySelector('.section-description');
        if (tag) tag.textContent = t.projTag;
        if (title) title.textContent = t.projTitle;
        if (desc) desc.textContent = t.projDesc;
        
        // Projects filter
        const projFilterBtns = projSection.querySelectorAll('.filter-btn');
        projFilterBtns.forEach((btn, i) => {
            if (t.projFilter[i]) btn.textContent = t.projFilter[i];
        });
        
        // Translate project cards
        const projectCards = projSection.querySelectorAll('.project-card');
        projectCards.forEach((card, i) => {
            if (t.projects[i]) {
                const projTitle = card.querySelector('.project-title');
                const projDesc = card.querySelector('.project-description');
                
                if (projTitle) projTitle.textContent = t.projects[i].title;
                if (projDesc) projDesc.textContent = t.projects[i].desc;
            }
        });
    }
    
    // Contact section
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
        const tag = contactSection.querySelector('.section-tag');
        const title = contactSection.querySelector('.section-title');
        const desc = contactSection.querySelector('.section-description');
        if (tag) tag.textContent = t.contactTag;
        if (title) title.textContent = t.contactTitle;
        if (desc) desc.textContent = t.contactDesc;
        
        const infoTitle = contactSection.querySelector('.contact-info-title');
        const infoText = contactSection.querySelector('.contact-info-text');
        if (infoTitle) infoTitle.textContent = t.contactInfoTitle;
        if (infoText) infoText.textContent = t.contactInfoText;
        
        // Contact labels
        const contactH4s = contactSection.querySelectorAll('.contact-item h4');
        contactH4s.forEach((h4, i) => {
            if (t.contactLabels[i]) h4.textContent = t.contactLabels[i];
        });
    }
    
    // Footer
    const footerText = document.querySelector('.footer-text');
    const footerTitles = document.querySelectorAll('.footer-title');
    const footerCopy = document.querySelector('.footer-bottom p');
    
    if (footerText) footerText.textContent = t.footerText;
    if (footerTitles[0]) footerTitles[0].textContent = t.footerLinks;
    if (footerTitles[1]) footerTitles[1].textContent = t.footerConnect;
    if (footerCopy) footerCopy.textContent = t.footerCopy;
    
    // Update typing animation roles
    typingRoles = t.roles;
    currentRoleIndex = 0;
    currentCharIndex = 0;
    isDeleting = false;
}

languageToggle.addEventListener('click', () => {
    currentLanguage = currentLanguage === 'pt' ? 'en' : 'pt';
    translatePage(currentLanguage);
    localStorage.setItem('language', currentLanguage);
});

// Load saved language preference
const savedLanguage = localStorage.getItem('language');
if (savedLanguage && savedLanguage !== 'pt') {
    currentLanguage = savedLanguage;
    translatePage(currentLanguage);
}

// ====================================
// Intersection Observer for Animations
// ====================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animatedElements = document.querySelectorAll(`
    .skill-card,
    .project-card,
    .timeline-item,
    .about-content,
    .contact-content
`);

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ====================================
// Smooth Scroll for Anchor Links
// ====================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ====================================
// Parallax Effect for Hero Section
// ====================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled / 700);
    }
});

// ====================================
// Add ripple effect to buttons
// ====================================
const buttons = document.querySelectorAll('.btn, .social-link, .social-icon');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        ripple.style.pointerEvents = 'none';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ====================================
// Initialize on Page Load
// ====================================
window.addEventListener('load', () => {
    // Remove any loading animations
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    animateStats();
    animateSkillBars();
    
    // Log welcome message
    console.log('%c🚀 Bem-vindo ao meu portfólio!', 'color: #6366f1; font-size: 20px; font-weight: bold;');
    console.log('%c💼 Desenvolvido com HTML, CSS e JavaScript', 'color: #ec4899; font-size: 14px;');
});

// ====================================
// Performance Optimization
// ====================================
// Lazy load images
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
});

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll-heavy operations
const debouncedScroll = debounce(() => {
    animateStats();
    animateSkillBars();
}, 100);

window.addEventListener('scroll', debouncedScroll);

const menu = document.getElementById('navMenu');
const hamburger = document.getElementById('hamburger');
function closeMenu() { menu.classList.remove('active'); hamburger.classList.remove('active'); hamburger.setAttribute('aria-expanded', 'false'); }
hamburger.addEventListener('click', () => { const open = menu.classList.toggle('active'); hamburger.classList.toggle('active', open); hamburger.setAttribute('aria-expanded', String(open)); });
document.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeMenu(); hamburger.focus(); } });
document.addEventListener('click', e => { if (!e.target.closest('.nav-container')) closeMenu(); });
function filter(buttonSelector, cardSelector, attribute) {
 const buttons = document.querySelectorAll(buttonSelector);
 buttons.forEach(button => { button.setAttribute('aria-pressed', String(button.classList.contains('active'))); button.addEventListener('click', () => {
 buttons.forEach(b => { b.classList.toggle('active', b === button); b.setAttribute('aria-pressed', String(b === button)); });
 document.querySelectorAll(cardSelector).forEach(card => { card.hidden = button.dataset[attribute] !== 'all' && card.dataset.category !== button.dataset[attribute]; });
 }); });
}
filter('.filter-btn', '.project-card', 'filter');
filter('.skill-category', '.skill-card', 'category');
const topButton = document.getElementById('backToTop');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
topButton.addEventListener('click', () => window.scrollTo({top:0, behavior: reducedMotion.matches ? 'instant' : 'smooth'}));
window.addEventListener('scroll', () => { topButton.classList.toggle('show', window.scrollY > 600); document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 20); }, {passive:true});
const sectionObserver = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) document.querySelectorAll('.nav-link').forEach(link => link.classList.toggle('active', link.hash === '#' + entry.target.id)); }); }, {rootMargin:'-15% 0px -60% 0px'});
document.querySelectorAll('section[id]').forEach(section => sectionObserver.observe(section));
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
            const details = projectCardDetails[lang][i];
            if (details) {
                card.querySelector('.visual-label').textContent = details.label;
                const title = card.querySelector('.visual-title');
                title.replaceChildren();
                details.title.forEach((line, index) => {
                    if (index) title.append(document.createElement('br'));
                    title.append(document.createTextNode(line));
                });
                card.querySelector('.visual-caption').textContent = details.caption;
                card.querySelectorAll('.project-tags .tag').forEach((tag, index) => { tag.textContent = details.tags[index]; });
                card.querySelectorAll('.project-btn span').forEach((label, index) => { label.textContent = details.buttons[index]; });
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

    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    updateThemeButton();
    document.querySelector('.hero-subtitle').textContent = lang === 'pt' ? 'Engenharia de software, com olhar para os dados.' : 'Software engineering, with an eye for data.';
}

languageToggle.addEventListener('click', () => {
    currentLanguage = currentLanguage === 'pt' ? 'en' : 'pt';
    translatePage(currentLanguage);
    localStorage.setItem('language', currentLanguage);
});

Object.assign(translations.pt, {greeting:'SOFTWARE · DADOS · PESQUISA', heroDesc:'Da pesquisa em saúde a aplicações web: construo software, exploro dados e aprendo fazendo. Estudante de Engenharia de Software no INATEL.', heroBtn1:'Vamos conversar', heroBtn2:'Explorar projetos'});
Object.assign(translations.en, {greeting:'SOFTWARE · DATA · RESEARCH', heroDesc:'From healthcare research to web applications: I build software, explore data, and learn by doing. Software Engineering student at INATEL.', heroBtn1:"Let's talk", heroBtn2:'Explore projects'});
// Load saved language preference
Object.assign(translations.pt, {
    aboutTitle: 'Curiosidade que vira prática.', aboutDesc: 'Um pouco sobre quem está por trás do código.',
    skillsTitle: 'Minha caixa de ferramentas.', skillsDesc: 'Tecnologias que uso para construir, investigar e testar.',
    expTitle: 'Aprender. Construir. Compartilhar.', expDesc: 'Pesquisa, educação e experiências além da sala de aula.',
    projTitle: 'Ideias colocadas em prática.', projDesc: 'Uma seleção de projetos em software, dados e pesquisa.',
    contactTitle: 'Uma boa conversa é um começo.', contactDesc: 'Tem um projeto, uma oportunidade ou uma ideia? Vamos conversar.',
    contactInfoTitle: 'Me encontre por aqui.', contactInfoText: 'Para conversar sobre software, dados, pesquisa ou uma oportunidade de trabalho, entre em contato.',
    footerCopy: '© 2026 Fernando Puebla Stein. Todos os direitos reservados.'
});
Object.assign(translations.en, {
    aboutTitle: 'Curiosity put into practice.', aboutDesc: 'Meet the person behind the code.',
    skillsTitle: 'My toolkit.', skillsDesc: 'Technologies I use to build, investigate, and test.',
    expTitle: 'Learn. Build. Share.', expDesc: 'Research, teaching, and experience beyond the classroom.',
    projTitle: 'Ideas put into practice.', projDesc: 'Selected work in software, data, and research.',
    contactTitle: 'It starts with a conversation.', contactDesc: 'A project, an opportunity, or an idea? Let’s talk.',
    contactInfoTitle: 'Find me here.', contactInfoText: 'Get in touch to talk about software, data, research, or a work opportunity.',
    footerCopy: '© 2026 Fernando Puebla Stein. All rights reserved.'
});
// Use the current page as the source of truth for Portuguese career details.
translations.pt.expJobs = Array.from(document.querySelectorAll('.timeline-item'), item => ({
    date: item.querySelector('.timeline-date').textContent.trim(),
    title: item.querySelector('.timeline-title').textContent.trim(),
    company: item.querySelector('.timeline-company').textContent.trim(),
    desc: item.querySelector('.timeline-description').textContent.trim(),
    tags: Array.from(item.querySelectorAll('.tag'), tag => tag.textContent.trim())
}));
translations.pt.projects = Array.from(document.querySelectorAll('.project-card'), card => ({
    title: card.querySelector('.project-title').textContent.trim(),
    desc: card.querySelector('.project-description').textContent.trim()
}));
translations.en.expJobs.unshift({date:'2026 – Present',title:'Undergraduate Research Fellow',company:'INATEL eHealth – Santa Rita do Sapucaí, MG',desc:'Machine learning research in healthcare, focused on predictive modeling to support hormone therapy for women living with HIV.',tags:['Machine Learning','Python','Data Science','Healthcare']});
Object.assign(translations.en.expJobs[1], {date:'2024 – 2026',desc:'Low-cost wearable using an ESP32-C3 and MPU6050 sensor to detect fall risk. A finite state machine analyzes acceleration and rotation in real time and sends alerts through a REST API.',tags:['ESP32','MPU6050','C++','FSM','REST API','Healthcare']});
translations.en.expJobs[2].date = '2024 – 2026';
translations.en.expJobs.unshift({date:'Present',title:'Solutions Consultant',company:'Datasolutec',desc:'Working on data engineering and Machine Learning projects, developing solutions to address clients’ data challenges.',tags:['Data Engineering','Machine Learning','Consulting']});
translations.en.projects[1].desc = 'Undergraduate research wearable using an ESP32-C3 and MPU6050 to monitor fall risk. A finite state machine analyzes movement in real time and sends REST API alerts. Validated in a controlled environment.';
translations.en.projects[0].title = 'Remote Animal Feeding';
translations.en.projects[6].title = 'Pizzaguidão — Roguelike Game';
translations.en.projects.unshift({title:'ALERTA — Patient Monitoring',desc:'A wearable device integrated with a monitoring interface to help hospitals and home care services follow patients with mobility restrictions. Developed from the Fall Risk undergraduate research project, ALERTA won first place in Market Feasibility, Level 4, at Inatel’s FETIN.'});
// Keep icons and line breaks intact while translating every part of a card.
const projectCardsForTranslation = Array.from(document.querySelectorAll('.project-card'));
projectCardsForTranslation.forEach(card => {
    card.querySelectorAll('.project-btn').forEach(button => {
        Array.from(button.childNodes).filter(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim()).forEach(node => {
            const label = document.createElement('span');
            label.textContent = node.textContent.trim();
            node.replaceWith(label);
        });
    });
});
const projectCardDetails = {
    pt: projectCardsForTranslation.map(card => ({
        label: card.querySelector('.visual-label').textContent,
        title: card.querySelector('.visual-title').innerHTML.split(/<br\s*\/?\s*>/i),
        caption: card.querySelector('.visual-caption').textContent,
        tags: Array.from(card.querySelectorAll('.project-tags .tag'), tag => tag.textContent),
        buttons: Array.from(card.querySelectorAll('.project-btn span'), label => label.textContent)
    })),
    en: [
        {label:'ALERTA / eHealth',title:['Connected care.','Assisted mobility.'],caption:'1st place · Market Feasibility · Level 4',tags:['Wearable','eHealth','Monitoring','FETIN · 1st place'],buttons:['Explore ALERTA']},
        {label:'IoT / FETIN',title:['Connected.','Even from a distance.'],caption:'2nd place · Category 2',tags:['IoT','Hardware','Award Winner'],buttons:['View post']},
        {label:'eHealth / Research',title:['Technology','that cares.'],caption:'ESP32 + MPU6050',tags:['ESP32','C++','REST API'],buttons:[]},
        {label:'Data / Python',title:['Data reveals','patterns.'],caption:'Exploration & visualization',tags:['Python','Pandas','Matplotlib'],buttons:['GitHub']},
        {label:'Web / Education',title:['Academic life,','organized.'],caption:'INATEL Portal',tags:['HTML/CSS','JavaScript','Chart.js'],buttons:['Demo','GitHub']},
        {label:'AI / Product',title:['One essence.','Many possibilities.'],caption:'EssentIA',tags:['Python','LangGraph','Docker','JavaScript'],buttons:['Demo','GitHub']},
        {label:'Big Data / Engineering',title:['Bronze → Silver','→ Gold.'],caption:'Medallion Architecture',tags:['Databricks','PySpark','Delta Lake','ETL'],buttons:['GitHub']},
        {label:'Game / Web',title:['One pizza.','Another adventure.'],caption:'Pizzaguidão',tags:['JavaScript','Game Dev','Hackathon'],buttons:['Demo','GitHub']},
        {label:'Backend / DevOps',title:['From commit','to delivery.'],caption:'API + CI/CD',tags:['Jenkins','Docker','FastAPI','CI/CD'],buttons:['GitHub']}
    ]
};
const savedLanguage = localStorage.getItem('language');
const themeToggle = document.getElementById('themeToggle');
function updateThemeButton() {
    const dark = document.documentElement.dataset.theme === 'dark';
    const label = currentLanguage === 'en'
        ? (dark ? 'Switch to light theme' : 'Switch to dark theme')
        : (dark ? 'Ativar tema claro' : 'Ativar tema escuro');
    themeToggle.setAttribute('aria-label', label);
    themeToggle.setAttribute('title', label);
    themeToggle.setAttribute('aria-pressed', String(dark));
}
themeToggle.addEventListener('click', () => {
    const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#17231e' : '#f4f3ed';
    try { localStorage.setItem('theme', theme); } catch { /* The theme still works when storage is unavailable. */ }
    updateThemeButton();
});
updateThemeButton();
if (savedLanguage === 'en') {
    currentLanguage = savedLanguage;
    translatePage(currentLanguage);
}

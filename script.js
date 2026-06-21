/**
 * Atzartech Hub Welcome Portal Script
 * -----------------------------------
 * Manage links, rendering, filters, search, and configuration.
 */

// 1. BASE CONFIGURATION
// You can replace this base URL with any other domain or leave it empty if using absolute URLs
const BASE_URL = 'https://atzartech-prog.github.io/';

// 2. PORTAL PAGES DATA
// Add, edit, or remove pages here. 
// - If "path" is specified, it will be concatenated with BASE_URL.
// - If "absolute" is specified, it will use that exact URL instead.
// - Available accent colors: 'indigo', 'violet', 'cyan', 'emerald', 'amber', 'rose', 'blue'
// - Available icons: Any icon name from https://lucide.dev/icons (e.g., 'book-open', 'settings', 'user')
const PAGES_DATA = [
{
        title: "Note App",
        path: "note/",
        description: "A lightweight, markdown-supported note-taking application for quick thoughts and organizing ideas.",
        icon: "file-text",
        category: "Utility",
        accentColor: "indigo"
    },
    {
        title: "App Launcher",
        path: "app-launcher/",
        description: "A sleek dashboard to organize, search, and quickly launch your favorite web applications.",
        icon: "rocket",
        category: "Utility",
        accentColor: "violet"
    },
    {
        title: "Who I Am",
        path: "whoiam/",
        description: "Personal profile page showcasing projects, skills, background, and contact details.",
        icon: "user",
        category: "Personal",
        accentColor: "rose"
    },
    {
        title: "Masjid Digital Signage",
        path: "masjid-digital-signage/",
        description: "Interactive digital signage application for mosques displaying prayer times, announcements, and Islamic calendar info.",
        icon: "monitor",
        category: "App",
        accentColor: "cyan"
    },
    {
        title: "FarmLink",
        path: "farmlink/",
        description: "A digital hub connecting local agriculture, sustainable farming, and fresh crop distribution.",
        icon: "sprout",
        category: "App",
        accentColor: "emerald"
    },
    {
        title: "Awesome Font",
        path: "awesomefont/",
        description: "A curated collection of typographic resources, custom fonts, and styling utilities.",
        icon: "type",
        category: "Reference",
        accentColor: "amber"
    },
    {
        title: "Agenda",
        path: "agenda/",
        description: "An intuitive event planner and schedule manager to organize tasks, deadlines, and daily routines.",
        icon: "calendar",
        category: "Utility",
        accentColor: "blue"
    },
    {
        title: "Darsun",
        path: "darsun/",
        description: "Educational and learning management dashboard tailored for Islamic teachings, lessons, and studies.",
        icon: "graduation-cap",
        category: "App",
        accentColor: "violet"
    },
    {
        title: "Prompt Gen App",
        path: "promptgenapp/",
        description: "AI-powered prompt generator to craft optimized, structured instructions for large language models.",
        icon: "sparkles",
        category: "App",
        accentColor: "cyan"
    },
    {
        title: "Mini CMS",
        path: "minicms/",
        description: "A lightweight, super-fast content management system to publish and manage static web pages.",
        icon: "layout",
        category: "Utility",
        accentColor: "indigo"
    },
    {
        title: "Man Cave",
        path: "mancave/",
        description: "A personal space dashboard containing entertainment widgets, news feeds, and utility apps.",
        icon: "compass",
        category: "Personal",
        accentColor: "rose"
    },
    {
        title: "Micro Apps",
        path: "microapps/",
        description: "A modular platform hosting multiple micro-services, tools, and lightweight utilities.",
        icon: "box",
        category: "Utility",
        accentColor: "emerald"
    },
    {
        title: "Alat Bantu Kerja",
        path: "alatbantukerja/",
        description: "Indonesian helper toolset designed to simplify administrative work, calculations, and data processing.",
        icon: "briefcase",
        category: "Utility",
        accentColor: "blue"
    },
    {
        title: "WP Page Generator v2",
        path: "wppagegenerator-v2/",
        description: "An advanced builder for generating clean, plugin-free custom HTML, CSS, and JS pages for WordPress.",
        icon: "layout",
        category: "Web",
        accentColor: "blue"
    },
    {
        title: "GitHub List",
        path: "githublist/",
        description: "A clean dashboard list viewer to explore public repositories and projects directly from GitHub profiles.",
        icon: "list",
        category: "Utility",
        accentColor: "indigo"
    },
    {
        title: "Not Mini CMS",
        path: "notminicms/",
        description: "An alternative static website generator and content manager with enhanced themes and customization options.",
        icon: "database",
        category: "Utility",
        accentColor: "violet"
    },
    {
        title: "Dongeng",
        path: "dongeng/",
        description: "An interactive digital storytelling and storybook application featuring Indonesian folklore and fairy tales.",
        icon: "book-open",
        category: "App",
        accentColor: "rose"
    },
    {
        title: "TTS KBBI",
        path: "tts-kbbi/",
        description: "A crossword and word puzzle game based on Indonesian vocabulary, definitions, and standard KBBI dictionary entries.",
        icon: "grid",
        category: "App",
        accentColor: "emerald"
    },
    {
        title: "Quotes",
        path: "quotes/",
        description: "A beautiful typography portal that displays motivational and inspiring quotes with custom styling tools.",
        icon: "quote",
        category: "App",
        accentColor: "amber"
    },
    {
        title: "Quran & Science",
        path: "quran_science/",
        description: "An insightful exploration of scientific phenomena through the lens of Quranic verses and Islamic perspective.",
        icon: "book",
        category: "App",
        accentColor: "cyan"
    },
    {
        title: "Maqolah",
        path: "maqolah/",
        description: "A curated collection of profound Islamic aphorisms and wisdom from scholars for daily reflection.",
        icon: "feather",
        category: "App",
        accentColor: "amber"
    },
        {
        title: "Just CSS HTML",
        path: "Justcsshtml/",
        description: "A showcase of creative and modern web designs built purely using HTML and CSS.",
        icon: "code",
        category: "Web",
        accentColor: "blue"
    },
        {
        title: "WP Gen Umum",
        path: "wpgenumum/",
        description: "A specialized WordPress page generator or template management tool designed for general web deployment purposes.",
        icon: "layout",
        category: "Web",
        accentColor: "indigo"
    },
    {
        title: "Hacker Via Pad",
        path: "hackerviapad/",
        description: "A creative web-based notepad interface tailored for developers and tech enthusiasts to log or share scripts and codes.",
        icon: "terminal",
        category: "Web",
        accentColor: "emerald"
    },
    {
        title: "SDM Gen Page",
        path: "sdmgenpage/",
        description: "An automated web landing page generator focused on human resource tracking, profile presentation, or organizational structures.",
        icon: "users",
        category: "Web",
        accentColor: "violet"
    },
    {
        title: "Aqidatul Awam",
        path: "aqidatul-awam/",
        description: "A digital translation and guide of the fundamental Islamic theology text 'Aqidatul Awam' written by Sheikh Ahmad Al-Marzuki.",
        icon: "book-open",
        category: "App",
        accentColor: "teal"
    },
    {
        title: "ATK Habis",
        path: "atk-habis/",
        description: "An inventory management app or script focused on tracking office stationary supplies (ATK) and notifying when stocks run low.",
        icon: "package",
        category: "App",
        accentColor: "rose"
    },
        {
        title: "Favicon Generator",
        path: "favicongenerator/",
        description: "A quick and intuitive utility tool to generate standard web favicons and app icons from custom images.",
        icon: "image",
        category: "Utility",
        accentColor: "amber"
    },
    {
        title: "GitBlog MD Gen",
        path: "gitblogmdgen/",
        description: "A specialized markdown generator tool designed to streamline blogging workflows and content deployment via GitHub.",
        icon: "file-code",
        category: "Utility",
        accentColor: "indigo"
    },
    {
        title: "Quran and Science (Repo)",
        path: "quranandscience/",
        description: "GitHub repository containing source code and assets for the Quran & Science exploration application.",
        icon: "github",
        category: "App",
        accentColor: "cyan"
    },
    {
        title: "Doa",
        path: "doa/",
        description: "A digital collection and interactive guide of daily Islamic prayers and supplications.",
        icon: "heart",
        category: "App",
        accentColor: "teal"
    },
    {
        title: "ThreeJS Game CTF",
        path: "threejsgamectf/",
        description: "A 3D Capture The Flag (CTF) web game built using Three.js for interactive cybersecurity challenges.",
        icon: "gamepad-2",
        category: "Web",
        accentColor: "violet"
    },
    {
        title: "CTF Game",
        path: "ctfgame/",
        description: "A gamified platform designed for cybersecurity enthusiasts to practice hacking, cryptography, and solving CTF challenges.",
        icon: "shield-alert",
        category: "App",
        accentColor: "rose"
    },
    {
        title: "Terminal Game",
        path: "terminalgame/",
        description: "A lightweight, CLI-styled web game played entirely through an interactive terminal interface.",
        icon: "terminal",
        category: "Utility",
        accentColor: "emerald"
    },
    {
        title: "Pinjem Ruang",
        path: "pinjemruang/",
        description: "An automated facility booking system to manage room schedules, reservations, and availability.",
        icon: "door-open",
        category: "App",
        accentColor: "blue"
    },
    {
        title: "My MD Blog",
        path: "mymdblog/",
        description: "A personal blogging platform powered by markdown files, designed for quick posting and clean presentation.",
        icon: "pen-tool",
        category: "Web",
        accentColor: "indigo"
    }
];

// DOM Elements
const cardsGrid = document.getElementById('cardsGrid');
const searchInput = document.getElementById('searchInput');
const clearSearchBtn = document.getElementById('clearSearchBtn');
const categoryFiltersContainer = document.getElementById('categoryFilters');
const noResults = document.getElementById('noResults');

// Theme and Modal Elements
const themeToggleBtn = document.getElementById('themeToggleBtn');
const configToggleBtn = document.getElementById('configToggleBtn');
const configModal = document.getElementById('configModal');
const closeModalBtn = document.getElementById('closeModalBtn');

// Active filter state
let activeCategory = 'all';
let searchQuery = '';

/**
 * Initialize Web Portal
 */
function initPortal() {
    // Load saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    // 1. Generate category filters dynamically from PAGES_DATA
    generateCategoryFilters();
    
    // 2. Render all cards
    renderCards();
    
    // 3. Register Event Listeners
    setupEventListeners();
}

/**
 * Set and apply the active theme (light or dark)
 */
function setTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeToggleBtn.innerHTML = '<i data-lucide="sun"></i>';
    } else {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        themeToggleBtn.innerHTML = '<i data-lucide="moon"></i>';
    }
    
    // Refresh the icon
    if (window.lucide) {
        window.lucide.createIcons();
    }
}

/**
 * Generate category filters dynamically
 */
function generateCategoryFilters() {
    // Find unique categories
    const categories = new Set();
    PAGES_DATA.forEach(page => {
        if (page.category) {
            categories.add(page.category);
        }
    });

    // Create buttons for each unique category
    categories.forEach(category => {
        const btn = document.createElement('button');
        btn.className = 'filter-btn';
        btn.setAttribute('data-category', category.toLowerCase());
        
        // Pick sub-icons depending on category
        let iconName = 'tag';
        if (category.toLowerCase() === 'utility') iconName = 'wrench';
        if (category.toLowerCase() === 'app') iconName = 'play';
        if (category.toLowerCase() === 'personal') iconName = 'user';
        if (category.toLowerCase() === 'reference') iconName = 'bookmark';
        
        btn.innerHTML = `<i data-lucide="${iconName}"></i> ${category}s`;
        categoryFiltersContainer.appendChild(btn);
    });
}

/**
 * Render Cards to Grid based on search query and category filters
 */
function renderCards() {
    // Clear current grid contents
    cardsGrid.innerHTML = '';
    
    // Filter pages
    const filteredPages = PAGES_DATA.filter(page => {
        // Category match
        const matchesCategory = activeCategory === 'all' || 
            (page.category && page.category.toLowerCase() === activeCategory);
            
        // Search query match
        const searchTarget = `${page.title} ${page.description} ${page.category} ${page.path || ''}`.toLowerCase();
        const matchesSearch = searchTarget.includes(searchQuery.toLowerCase());
        
        return matchesCategory && matchesSearch;
    });

    // Handle No Results state
    if (filteredPages.length === 0) {
        cardsGrid.style.display = 'none';
        noResults.style.display = 'flex';
        return;
    } else {
        cardsGrid.style.display = 'grid';
        noResults.style.display = 'none';
    }

    // Generate HTML for cards
    filteredPages.forEach(page => {
        const targetUrl = page.absolute ? page.absolute : `${BASE_URL}${page.path || ''}`;
        const cleanUrlHint = targetUrl.replace('https://', '').replace('http://', '');
        
        const cardElement = document.createElement('a');
        cardElement.className = 'app-card';
        cardElement.href = targetUrl;
        cardElement.target = '_blank';
        cardElement.rel = 'noopener';
        cardElement.setAttribute('data-color', page.accentColor || 'indigo');
        
        cardElement.innerHTML = `
            <div class="card-header">
                <div class="card-icon-box">
                    <i data-lucide="${page.icon || 'external-link'}"></i>
                </div>
                <span class="card-badge">${page.category || 'App'}</span>
            </div>
            <div class="card-body">
                <h3 class="card-title">${page.title}</h3>
                <p class="card-description">${page.description}</p>
            </div>
            <div class="card-footer">
                <span class="card-link-text">Launch <i data-lucide="arrow-right"></i></span>
                <span class="card-url-hint" title="${targetUrl}">${cleanUrlHint}</span>
            </div>
        `;
        
        cardsGrid.appendChild(cardElement);
    });

    // Reinitialize Lucide icons for dynamically added elements
    if (window.lucide) {
        window.lucide.createIcons();
    }
}

/**
 * Setup Interaction Listeners
 */
function setupEventListeners() {
    // Live Search Filter
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim();
        
        // Show/hide clear search button
        if (searchQuery.length > 0) {
            clearSearchBtn.style.display = 'flex';
        } else {
            clearSearchBtn.style.display = 'none';
        }
        
        renderCards();
    });

    // Clear Search Action
    clearSearchBtn.addEventListener('click', () => {
        searchInput.value = '';
        searchQuery = '';
        clearSearchBtn.style.display = 'none';
        searchInput.focus();
        renderCards();
    });

    // Category Tabs Filter
    categoryFiltersContainer.addEventListener('click', (e) => {
        const clickedBtn = e.target.closest('.filter-btn');
        if (!clickedBtn) return;
        
        // Toggle Active state on buttons
        const allBtns = categoryFiltersContainer.querySelectorAll('.filter-btn');
        allBtns.forEach(btn => btn.classList.remove('active'));
        clickedBtn.classList.add('active');
        
        // Filter by category
        activeCategory = clickedBtn.getAttribute('data-category');
        renderCards();
    });

    // Theme Switcher Event
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });

    // Modal Events
    configToggleBtn.addEventListener('click', () => {
        configModal.classList.add('open');
    });

    closeModalBtn.addEventListener('click', () => {
        configModal.classList.remove('open');
    });

    // Close Modal on clicking backdrop
    configModal.addEventListener('click', (e) => {
        if (e.target === configModal) {
            configModal.classList.remove('open');
        }
    });

    // Keyboard support: Escape closes modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && configModal.classList.contains('open')) {
            configModal.classList.remove('open');
        }
    });

    // Easter Egg Click Handler
    let logoClicks = 0;
    const logoArea = document.querySelector('.logo-area');
    if (logoArea) {
        logoArea.addEventListener('click', () => {
            logoClicks++;
            if (logoClicks === 5) {
                triggerEasterEgg();
            }
        });
    }
}

/**
 * Hidden Easter Egg Logic
 */
function triggerEasterEgg() {
  
    const secret = atob('aWxhIHNpeW1hdA==').split('').reverse().join('');
    
    // 1. Change portal subtitle
    const subtitle = document.querySelector('.subtitle');
    if (subtitle) {
        subtitle.innerHTML = `System access granted. Welcome back, <span style="color: var(--clr-emerald); font-weight: 700; border-bottom: 2px dotted var(--clr-emerald);">${secret}</span>.`;
    }
    
    // 2. Add secret card dynamically
    const hasSecretCard = PAGES_DATA.some(page => page.category === 'Classified');
    if (!hasSecretCard) {
        PAGES_DATA.unshift({
            title: secret.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
            absolute: '#',
            description: 'Classified developer portal credentials verified. Local node online.',
            icon: 'shield-check',
            category: 'Classified',
            accentColor: 'emerald'
        });
        
        // Re-render categories if filter filters elements
        const filterContainer = document.getElementById('categoryFilters');
        if (filterContainer) {
            const allBtn = filterContainer.querySelector('[data-category="all"]');
            filterContainer.innerHTML = '';
            if (allBtn) filterContainer.appendChild(allBtn);
            generateCategoryFilters();
        }
        
        renderCards();
    }
    
    // 3. Highlight terminal logo
    const logoIcon = document.querySelector('.logo-icon');
    if (logoIcon) {
        logoIcon.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        logoIcon.style.transform = 'scale(1.2) rotate(360deg)';
        logoIcon.style.backgroundColor = 'var(--clr-emerald)';
        logoIcon.style.color = '#ffffff';
        logoIcon.style.boxShadow = '0 0 20px var(--clr-emerald)';
    }
}

// Kickstart the portal on window load
window.addEventListener('DOMContentLoaded', initPortal);

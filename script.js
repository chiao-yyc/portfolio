// Grace Yang Portfolio - JavaScript

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const sunIcon = `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"></path></svg>`;
const moonIcon = `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>`;

// Check for saved theme preference or default to dark mode
const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'light') {
    body.classList.add('light-mode');
    themeToggle.innerHTML = moonIcon;
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');

    if (body.classList.contains('light-mode')) {
        localStorage.setItem('theme', 'light');
        themeToggle.innerHTML = moonIcon;
    } else {
        localStorage.setItem('theme', 'dark');
        themeToggle.innerHTML = sunIcon;
    }
});

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when clicking on a link
const mobileMenuLinks = mobileMenu.querySelectorAll('a');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Smooth scroll with offset for fixed navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Adjust for fixed nav height
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function activateNavLink() {
    let current = '';
    const scrollPosition = window.pageYOffset + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', activateNavLink);

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections except hero
document.querySelectorAll('section:not(#hero)').forEach(section => {
    observer.observe(section);
});

// Navbar background on scroll
const navbar = document.querySelector('nav');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
        navbar.classList.add('shadow-lg');
    } else {
        navbar.classList.remove('shadow-lg');
    }

    lastScrollTop = scrollTop;
});

// Dynamic year in footer
const currentYear = new Date().getFullYear();
const footerYear = document.querySelector('footer p');
if (footerYear && currentYear > 2025) {
    footerYear.textContent = footerYear.textContent.replace('2025', currentYear);
}

// Console message for developers
console.log('%c👋 Hi there!', 'font-size: 20px; color: #3b82f6; font-weight: bold;');
console.log('%cThanks for checking out my portfolio!', 'font-size: 14px; color: #6b7280;');
console.log('%cFeel free to reach out: chiaoyyc@gmail.com', 'font-size: 14px; color: #6b7280;');

// Projects Tab Switching
const projectTabs = document.querySelectorAll('.project-tab');
const projectContents = document.querySelectorAll('.project-content');

projectTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const targetTab = tab.getAttribute('data-tab');

        // Remove active class from all tabs
        projectTabs.forEach(t => t.classList.remove('active'));

        // Add active class to clicked tab
        tab.classList.add('active');

        // Hide all project contents
        projectContents.forEach(content => {
            content.classList.add('hidden');
        });

        // Show target content
        const targetContent = document.getElementById(`${targetTab}-projects`);
        if (targetContent) {
            targetContent.classList.remove('hidden');
        }
    });
});
// ========================================
// Skills Tab Switching
// ========================================

(function() {
    const skillsTabs = document.querySelectorAll('.skills-tab');
    const skillsContents = document.querySelectorAll('.skills-tab-content');

    skillsTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');

            // Remove active class from all tabs
            skillsTabs.forEach(t => t.classList.remove('active'));

            // Add active class to clicked tab
            tab.classList.add('active');

            // Hide all tab contents
            skillsContents.forEach(content => content.classList.add('hidden'));

            // Show target content
            const targetContent = document.getElementById(`${targetTab}-skills`);
            if (targetContent) targetContent.classList.remove('hidden');
        });
    });
})();

// ========================================
// Horizontal Scrolling Experience Timeline
// Function to initialize after data is loaded
// ========================================

function initExperienceHorizontalScroll() {
    // Only enable on desktop (screen width > 1024px)
    if (window.innerWidth <= 1024) {
        return;
    }

    const wrapper = document.getElementById('experience');
    const experienceSection = wrapper?.querySelector('.experience-horizontal-section');
    const scrollContainer = document.getElementById('experience-scroll-container');
    const itemsContainer = document.querySelector('.experience-items-horizontal');

    if (!wrapper || !experienceSection || !scrollContainer || !itemsContainer) {
        return;
    }

    // Calculate horizontal scroll distance and setup snap scrolling
    function setupScrollHeight() {
        // Calculate padding to center first and last cards
        const containerWidth = scrollContainer.clientWidth;
        const cardWidth = 400; // Fixed card width from CSS
        const sidePadding = (containerWidth - cardWidth) / 2;

        // Set dynamic padding for snap-to-center effect
        itemsContainer.style.paddingLeft = `${sidePadding}px`;
        itemsContainer.style.paddingRight = `${sidePadding}px`;

        // Calculate horizontal scroll distance
        const horizontalScrollWidth = scrollContainer.scrollWidth - scrollContainer.clientWidth;

        // Set wrapper height = viewport height + horizontal scroll distance
        // This creates virtual vertical scroll space for horizontal movement
        const virtualHeight = window.innerHeight + horizontalScrollWidth;
        wrapper.style.height = `${virtualHeight}px`;

        console.log('✅ 水平滾動初始化（含磁吸居中）:', {
            containerWidth,
            cardWidth,
            sidePadding,
            horizontalScrollWidth,
            virtualHeight,
            viewportHeight: window.innerHeight
        });
    }

    // Handle scroll - sync vertical scroll to horizontal position
    function handleScroll() {
        const wrapperRect = wrapper.getBoundingClientRect();
        const wrapperTop = wrapperRect.top;
        const wrapperHeight = wrapperRect.height;

        // Only activate when wrapper is in view
        if (wrapperTop > 0 || wrapperRect.bottom < window.innerHeight) {
            return;
        }

        // Calculate scroll progress (0 to 1)
        const scrollProgress = Math.abs(wrapperTop) / (wrapperHeight - window.innerHeight);
        const clampedProgress = Math.max(0, Math.min(1, scrollProgress));

        // Map progress to horizontal scroll position
        const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;
        scrollContainer.scrollLeft = clampedProgress * maxScrollLeft;

        // Hide scroll hint after scroll starts
        if (clampedProgress > 0.01) {
            const scrollHint = experienceSection.querySelector('.scroll-hint');
            if (scrollHint) {
                scrollHint.style.opacity = '0';
                scrollHint.style.transition = 'opacity 0.3s ease';
            }
        }
    }

    // Update active dot based on centered card
    function updateActiveDot() {
        const items = document.querySelectorAll('.experience-item-horizontal');
        if (items.length === 0) return;

        // Calculate container center
        const containerRect = scrollContainer.getBoundingClientRect();
        const containerCenter = containerRect.left + containerRect.width / 2;

        let closestItem = null;
        let minDistance = Infinity;

        // Find the card closest to container center
        items.forEach(item => {
            const itemRect = item.getBoundingClientRect();
            const itemCenter = itemRect.left + itemRect.width / 2;
            const distance = Math.abs(itemCenter - containerCenter);

            if (distance < minDistance) {
                minDistance = distance;
                closestItem = item;
            }
        });

        // Update active states
        items.forEach(item => {
            if (item === closestItem) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    // Initialize
    setupScrollHeight();
    updateActiveDot(); // Set initial active state

    // Listen to scroll events
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Update active dot when horizontal scroll ends (after snap completes)
    scrollContainer.addEventListener('scrollend', updateActiveDot, { passive: true });

    // Recalculate on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024) {
            setupScrollHeight();
        } else {
            // Clean up desktop styles when switching to mobile
            wrapper.style.height = '';
            itemsContainer.style.paddingLeft = '';
            itemsContainer.style.paddingRight = '';
        }
    });

    // Smooth entrance animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                scrollContainer.style.opacity = '1';
                scrollContainer.style.transition = 'opacity 0.6s ease';
            }
        });
    }, { threshold: 0.2 });

    observer.observe(experienceSection);
}

// ========================================
// Dynamic Projects Rendering
// ========================================

(function() {
    const sideProjectsContainer = document.getElementById('side-projects-container');
    const workProjectsContainer = document.getElementById('work-projects-container');

    // Fetch and render all projects
    fetch('./data/projects.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load projects data');
            }
            return response.json();
        })
        .then(data => {
            // Render Side Projects
            if (sideProjectsContainer && data.sideProjects) {
                renderSideProjects(data.sideProjects);
            }
            // Render Work Projects
            if (workProjectsContainer && data.workProjects) {
                renderWorkProjects(data.workProjects);
            }
        })
        .catch(error => {
            console.error('Error loading projects:', error);
            if (sideProjectsContainer) {
                sideProjectsContainer.innerHTML = '<p class="text-gray-400 text-center">Failed to load projects</p>';
            }
            if (workProjectsContainer) {
                workProjectsContainer.innerHTML = '<p class="text-gray-400 text-center">Failed to load projects</p>';
            }
        });

    // Render Side Projects
    function renderSideProjects(projects) {
        sideProjectsContainer.innerHTML = projects.map(project => createSideProjectCard(project)).join('');
        // Re-initialize Lucide Icons after rendering
        lucide.createIcons();
    }

    function createSideProjectCard(project) {
        const statusColorMap = {
            'green': 'bg-green-600/20 border-green-500/50 text-green-300',
            'blue': 'bg-blue-600/20 border-blue-500/50 text-blue-300',
            'yellow': 'bg-yellow-600/20 border-yellow-500/50 text-yellow-300',
            'purple': 'bg-purple-600/20 border-purple-500/50 text-purple-300'
        };

        const statusClass = statusColorMap[project.statusColor] || statusColorMap['green'];

        // Tech tags (blue)
        const tagsHTML = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');

        // Concept tags (purple)
        const conceptsHTML = project.concepts
            ? project.concepts.map(concept => `<span class="concept-tag">${concept}</span>`).join('')
            : '';

        // Build links HTML
        let linksHTML = '';
        if (project.links.github) {
            linksHTML += `<a href="${project.links.github}" target="_blank" class="text-blue-400 hover:text-blue-300 text-sm font-medium">GitHub →</a>`;
        }
        if (project.links.website) {
            linksHTML += `<a href="${project.links.website}" target="_blank" class="text-blue-400 hover:text-blue-300 text-sm font-medium ml-3">Demo →</a>`;
        }

        // Front image HTML with overlay
        const frontImageHTML = project.media?.front?.type === 'image'
            ? `<div class="card-image-front">
                <img src="${project.media.front.src}" alt="${project.name}" loading="lazy">
                <div class="image-overlay">
                    <h3 class="text-xl font-semibold text-blue-400 text-center px-8 tracking-wide">${project.name}</h3>
                    <span class="overlay-status-tag ${statusClass}">${project.status}</span>
                </div>
            </div>`
            : '';

        // Overlay media HTML (for card back) - supports both image and video
        let overlayMediaHTML = '';
        if (project.media?.overlay) {
            const overlay = project.media.overlay;
            if (overlay.type === 'video') {
                // Video thumbnail with play button
                overlayMediaHTML = `
                    <div class="video-thumbnail-wrapper" data-video-src="${overlay.videoSrc}">
                        <img src="${overlay.thumbnail}" alt="${project.name}" class="project-image">
                        <div class="video-play-overlay">
                            <i data-lucide="play" class="video-play-icon"></i>
                        </div>
                    </div>
                `;
            } else if (overlay.type === 'image' && overlay.src) {
                // Regular image
                overlayMediaHTML = `
                    <div class="project-image-wrapper">
                        <img src="${overlay.src}" alt="${project.name}" class="project-image">
                    </div>
                `;
            }
        }

        return `
            <div class="work-card side-project-card">
                <div class="card-front">
                    <!-- Image -->
                    ${frontImageHTML}

                    <!-- Content Wrapper -->
                    <div class="card-content-wrapper">
                        <!-- Description -->
                        <div class="card-middle">
                            <p class="description-front">${project.description}</p>
                        </div>

                        <!-- Footer: Tech & Concept Tags -->
                        <div class="card-footer">
                            <!-- Tech Tags -->
                            ${tagsHTML ? `<div class="mb-2">
                                <span class="label-text">Tech</span>
                                <div class="flex flex-wrap gap-1 mt-1">
                                    ${tagsHTML}
                                </div>
                            </div>` : ''}

                            <!-- Concept Tags -->
                            ${conceptsHTML ? `<div>
                                <span class="label-text">Concepts</span>
                                <div class="flex flex-wrap gap-1 mt-1">
                                    ${conceptsHTML}
                                </div>
                            </div>` : ''}
                        </div>
                    </div>
                </div>

                <!-- Card Overlay (Hover State) -->
                <div class="card-overlay">
                    <!-- Overlay Media (Image or Video) -->
                    ${overlayMediaHTML}

                    <!-- Detailed Description -->
                    <div class="achievements-section">
                        <h4 class="achievements-title">About</h4>
                        <div class="achievements-content">
                            <p>${project.detailedDescription}</p>
                        </div>
                    </div>

                    <!-- Demo Note -->
                    ${project.demoNote ? `<div class="demo-note">
                        <p>${project.demoNote}</p>
                    </div>` : ''}

                    <!-- Links -->
                    ${linksHTML ? `<div class="links-section">${linksHTML}</div>` : ''}
                </div>
            </div>
        `;
    }

    // Render Work Projects
    function renderWorkProjects(projects) {
        workProjectsContainer.innerHTML = projects.map(project => createWorkProjectCard(project)).join('');
    }

    function createWorkProjectCard(project) {
        // Roles HTML (橙色系)
        const rolesHTML = project.roles && project.roles.length > 0
            ? project.roles.map(role => `<span class="role-tag">${role}</span>`).join('')
            : '';

        // 所有 Tags (顯示在正面)
        const allTagsHTML = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');

        // Achievements
        const achievementsHTML = project.achievements
            .map(achievement => `<p>• ${achievement}</p>`)
            .join('');

        // Freelance badge
        const freelanceBadge = project.isFreelance
            ? `<span class="px-2 py-1 bg-purple-600/20 border border-purple-500/50 rounded text-xs text-purple-300">💼 Freelance</span>`
            : '';

        // Period display
        const periodDisplay = project.company
            ? `${project.period} · ${project.company}`
            : project.period;

        // Build links HTML
        let linksHTML = '';
        if (project.links) {
            if (project.links.github) {
                linksHTML += `<a href="${project.links.github}" target="_blank" class="text-blue-400 hover:text-blue-300 text-sm font-medium">GitHub →</a>`;
            }
            if (project.links.website) {
                linksHTML += `<a href="${project.links.website}" target="_blank" class="text-blue-400 hover:text-blue-300 text-sm font-medium ml-3">Website →</a>`;
            }
        }

        return `
            <div class="work-card">
                <!-- 正面（平時顯示） -->
                <div class="card-front">
                    <!-- 上區：標題 + 時間 -->
                    <div class="card-header">
                        <div class="flex items-start justify-between mb-2">
                            <h3 class="text-lg font-semibold text-blue-400">${project.name}</h3>
                            ${freelanceBadge}
                        </div>
                        <p class="text-xs text-gray-500">${periodDisplay}</p>
                    </div>

                    <!-- 中區：描述（垂直置中） -->
                    <div class="card-middle">
                        <p class="description-front">${project.description}</p>
                    </div>

                    <!-- 下區：Roles & Tags（底部對齊） -->
                    <div class="card-footer">
                        <!-- Roles -->
                        ${rolesHTML ? `<div class="mb-2">
                            <span class="label-text">Role</span>
                            <div class="flex flex-wrap gap-1 mt-1">${rolesHTML}</div>
                        </div>` : ''}

                        <!-- Tags (全部) -->
                        ${allTagsHTML ? `<div>
                            <span class="label-text">Tech</span>
                            <div class="flex flex-wrap gap-1 mt-1">
                                ${allTagsHTML}
                            </div>
                        </div>` : ''}
                    </div>
                </div>

                <!-- 遮罩（hover 顯示） -->
                <div class="card-overlay">
                    <!-- 專案圖片 (如果有) -->
                    ${project.image ? `<div class="project-image-wrapper">
                        <img src="${project.image}" alt="${project.name}" class="project-image">
                    </div>` : ''}

                    <!-- Achievements -->
                    <div class="achievements-section">
                        <h4 class="achievements-title">Achievements</h4>
                        <div class="achievements-content">
                            ${achievementsHTML}
                        </div>
                    </div>

                    <!-- Links -->
                    ${linksHTML ? `<div class="links-section">${linksHTML}</div>` : ''}
                </div>
            </div>
        `;
    }
})();

// ========================================
// Terminal Scroll Hijacking (Desktop Only)
// ========================================

(function() {
    const heroSection = document.getElementById('hero');
    const terminalContent = document.querySelector('.terminal-content');

    if (!heroSection || !terminalContent) return;

    window.addEventListener('wheel', (e) => {
        // 只在桌面版（> 1024px）啟用 scroll hijacking
        if (window.innerWidth <= 1024) return;

        const heroRect = heroSection.getBoundingClientRect();
        const isHeroVisible = heroRect.top <= 0 && heroRect.bottom >= window.innerHeight;

        if (isHeroVisible && terminalContent) {
            const scrollTop = terminalContent.scrollTop;
            const scrollHeight = terminalContent.scrollHeight;
            const clientHeight = terminalContent.clientHeight;
            const isAtTop = scrollTop === 0;
            const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;

            // 向下滾動且 Terminal 未到底部，劫持滾動
            if (e.deltaY > 0 && !isAtBottom) {
                e.preventDefault();
                terminalContent.scrollTop += e.deltaY;
            }
            // 向上滾動且 Terminal 未到頂部，劫持滾動
            else if (e.deltaY < 0 && !isAtTop) {
                e.preventDefault();
                terminalContent.scrollTop += e.deltaY;
            }
            // 否則允許正常頁面滾動
        }
    }, { passive: false });
})();

// ========================================
// Dynamic Experience Timeline Rendering
// ========================================

(function() {
    const container = document.getElementById('experience-items-container');
    if (!container) return;

    // Fetch and render experiences
    fetch('./data/experiences.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load experiences data');
            }
            return response.json();
        })
        .then(data => {
            renderExperiences(data.experiences);

            // Initialize horizontal scroll AFTER data is rendered
            // Use setTimeout to ensure DOM is fully updated
            setTimeout(() => {
                initExperienceHorizontalScroll();
            }, 100);
        })
        .catch(error => {
            console.error('Error loading experiences:', error);
            container.innerHTML = '<p class="text-gray-400 text-center">Failed to load experiences</p>';
        });

    function renderExperiences(experiences) {
        container.innerHTML = experiences.map(exp => createExperienceItem(exp)).join('');
    }

    function createExperienceItem(exp) {
        // Education item - simple card
        if (exp.type === 'education') {
            return `
                <div class="experience-item-horizontal education-item">
                    <div class="timeline-dot-horizontal bg-gray-700"></div>
                    <div class="experience-period text-gray-500">${exp.period}</div>
                    <div class="experience-card">
                        <p class="text-sm text-gray-400">${exp.description}</p>
                    </div>
                </div>
            `;
        }

        // Work item - full card with responsibilities
        const responsibilitiesHTML = exp.responsibilities
            .map(resp => `
                <li class="flex items-start">
                    <span class="text-blue-400 mr-2">•</span>
                    <span>${resp}</span>
                </li>
            `)
            .join('');

        return `
            <div class="experience-item-horizontal">
                <div class="timeline-dot-horizontal bg-gray-700"></div>
                <div class="experience-period text-gray-500">${exp.period}</div>
                <div class="experience-card">
                    <h3 class="text-xl font-semibold text-blue-400">${exp.title}</h3>
                    <p class="text-gray-300 text-sm mt-1">${exp.company}</p>
                    <ul class="space-y-2 text-sm mt-4 experience-responsibilities">
                        ${responsibilitiesHTML}
                    </ul>
                </div>
            </div>
        `;
    }
})();

// ========================================
// Card Description Typewriter Effect on Hover
// ========================================

(function() {
    const cardDescriptions = document.querySelectorAll('.card-description');
    const typewriterSpeed = 45; // ms per character (balanced speed for readability)
    let typingIntervals = new Map(); // Store active intervals for each card
    let fadeTimeouts = new Map(); // Store fade timeouts to prevent text overlap on rapid hover

    // ========================================
    // 切換方案說明：
    // - 方案 A（目前啟用）: 整體顏色變亮 (text-gray-400 → text-gray-300)
    // - 方案 B（註解備用）: 字符逐字淡入動畫
    //
    // 若要改用方案 B：
    // 1. 註解掉方案 A 的程式碼區塊（標記為 "PLAN A"）
    // 2. 取消方案 B 的程式碼區塊註解（標記為 "PLAN B"）
    // ========================================

    cardDescriptions.forEach(desc => {
        const defaultText = desc.getAttribute('data-default');
        const hoverText = desc.getAttribute('data-hover');
        const parentCard = desc.closest('.p-8'); // Get parent card container

        if (!defaultText || !hoverText || !parentCard) return;

        /* // ========== PLAN A START ==========
        // 方案 A: 整體顏色變亮

        // Hover event - start typewriter effect
        parentCard.addEventListener('mouseenter', () => {
            // Clear any existing interval for this description
            if (typingIntervals.has(desc)) {
                clearInterval(typingIntervals.get(desc));
            }

            // Change text color to brighter shade
            desc.classList.remove('text-gray-400');
            desc.classList.add('text-gray-300');

            // Start typewriter effect
            let charIndex = 0;
            desc.textContent = ''; // Clear text

            const interval = setInterval(() => {
                if (charIndex < hoverText.length) {
                    desc.textContent += hoverText[charIndex];
                    charIndex++;
                } else {
                    // Typing complete
                    clearInterval(interval);
                    typingIntervals.delete(desc);
                }
            }, typewriterSpeed);

            // Store interval reference
            typingIntervals.set(desc, interval);
        });

        // Mouse leave event - restore default text immediately
        parentCard.addEventListener('mouseleave', () => {
            // Clear typing interval if still running
            if (typingIntervals.has(desc)) {
                clearInterval(typingIntervals.get(desc));
                typingIntervals.delete(desc);
            }

            // Restore original color
            desc.classList.remove('text-gray-300');
            desc.classList.add('text-gray-400');

            // Restore default text immediately (no typewriter effect)
            desc.innerHTML = defaultText;
        });
        // ========== PLAN A END ========== */

        //  ========== PLAN B START ==========
        // 方案 B: 字符逐字淡入動畫

        // Hover event - start typewriter effect with fade-in animation
        parentCard.addEventListener('mouseenter', () => {
            // Clear any pending fade timeouts from mouseleave (prevents text overlap)
            if (fadeTimeouts.has(desc)) {
                const timeouts = fadeTimeouts.get(desc);
                clearTimeout(timeouts.fadeOut);
                clearTimeout(timeouts.cleanup);
                fadeTimeouts.delete(desc);
            }

            // Clear any existing interval for this description
            if (typingIntervals.has(desc)) {
                clearInterval(typingIntervals.get(desc));
            }

            // Reset opacity and transition (in case interrupted mid-fade)
            desc.style.transition = '';
            desc.style.opacity = '1';

            // Change text color to brighter shade
            desc.classList.remove('text-gray-500');
            desc.classList.add('text-gray-300');

            // Start typewriter effect with character fade-in
            let charIndex = 0;
            desc.innerHTML = ''; // Clear text

            const interval = setInterval(() => {
                if (charIndex < hoverText.length) {
                    // Create span for each character with fade-in animation
                    const span = document.createElement('span');
                    span.textContent = hoverText[charIndex];
                    span.style.opacity = '0';
                    span.style.letterSpacing = '0.12em';
                    span.style.fontWeight = '300';
                    span.style.textShadow = '0 0 12px rgba(34, 197, 94, 0.4), 0 0 8px rgba(34, 197, 94, 0.4)';
                    span.style.animation = 'charFadeIn 0.1s ease forwards';
                    desc.appendChild(span);
                    charIndex++;
                } else {
                    // Typing complete
                    clearInterval(interval);
                    typingIntervals.delete(desc);
                }
            }, typewriterSpeed);

            // Store interval reference
            typingIntervals.set(desc, interval);
        });

        // Mouse leave event - restore default text with fade transition
        parentCard.addEventListener('mouseleave', () => {
            // Clear typing interval if still running
            if (typingIntervals.has(desc)) {
                clearInterval(typingIntervals.get(desc));
                typingIntervals.delete(desc);
            }

            // Step 1: Fade out current hover text
            desc.style.transition = 'opacity 0.3s ease';
            desc.style.opacity = '0';

            // Step 2: After fade out, replace text and fade in
            const fadeOutTimeout = setTimeout(() => {
                // Restore original color
                desc.classList.remove('text-gray-300');
                desc.classList.add('text-gray-500');

                // Replace with default text
                desc.innerHTML = defaultText;

                // Step 3: Fade in default text
                requestAnimationFrame(() => {
                    desc.style.opacity = '1';
                });
            }, 300); // Match transition duration

            // Step 4: Clean up inline styles after animation completes
            const cleanupTimeout = setTimeout(() => {
                desc.style.transition = '';
                fadeTimeouts.delete(desc); // Clean up timeout references
            }, 600); // 300ms fade out + 300ms fade in

            // Store timeout references to allow cancellation on rapid hover
            fadeTimeouts.set(desc, {
                fadeOut: fadeOutTimeout,
                cleanup: cleanupTimeout
            });
        });
        // ========== PLAN B END ==========
    });

    // Add CSS animation for character fade-in (used by Plan B)
    // This will be added to the page dynamically if Plan B is active
    const style = document.createElement('style');
    style.textContent = `
        @keyframes charFadeIn {
            from {
                opacity: 0;
                transform: translateY(-2px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
})();

// ========================================
// Video Modal for Side Projects
// ========================================

(function() {
    // Create modal HTML structure
    const modalHTML = `
        <div id="video-modal" class="video-modal" style="display: none;">
            <div class="video-modal-backdrop"></div>
            <div class="video-modal-content">
                <button class="video-modal-close" aria-label="Close video">
                    <i data-lucide="x" class="w-6 h-6"></i>
                </button>
                <div class="video-container">
                    <video id="modal-video" controls>
                        <source src="" type="video/mp4">
                        您的瀏覽器不支援影片播放。
                    </video>
                </div>
            </div>
        </div>
    `;

    // Insert modal into DOM
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Initialize Lucide Icons for modal close button
    lucide.createIcons();

    const modal = document.getElementById('video-modal');
    const video = document.getElementById('modal-video');
    const videoSource = video.querySelector('source');
    const closeButton = modal.querySelector('.video-modal-close');
    const backdrop = modal.querySelector('.video-modal-backdrop');

    // Open modal function
    function openVideoModal(videoSrc) {
        videoSource.src = videoSrc;
        video.load();
        modal.style.display = 'flex';
        // Trigger reflow for animation
        modal.offsetHeight;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent body scroll
        video.play();
    }

    // Close modal function
    function closeVideoModal() {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
            video.pause();
            video.currentTime = 0;
            videoSource.src = '';
            document.body.style.overflow = ''; // Restore body scroll
        }, 300); // Match CSS transition duration
    }

    // Event listeners for modal
    closeButton.addEventListener('click', closeVideoModal);
    backdrop.addEventListener('click', closeVideoModal);

    // ESC key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeVideoModal();
        }
    });

    // Delegate click events for video thumbnails
    document.addEventListener('click', (e) => {
        const thumbnail = e.target.closest('.video-thumbnail-wrapper');
        if (thumbnail) {
            e.preventDefault();
            const videoSrc = thumbnail.getAttribute('data-video-src');
            if (videoSrc) {
                openVideoModal(videoSrc);
            }
        }
    });
})();

// ========================================
// Initialize Lucide Icons
// ========================================
lucide.createIcons();

// ========================================
// Copy Email to Clipboard Function
// ========================================

function copyEmailToClipboard() {
    const email = 'chiaoyyc@gmail.com';

    // Use modern Clipboard API (with fallback for older browsers)
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email)
            .then(() => {
                showToast('已複製 Email！', 'success');
            })
            .catch(err => {
                console.error('Clipboard API failed:', err);
                fallbackCopyTextToClipboard(email);
            });
    } else {
        // Fallback for older browsers
        fallbackCopyTextToClipboard(email);
    }
}

// Fallback method for older browsers
function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.top = '-9999px';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showToast('已複製 Email！', 'success');
        } else {
            showToast('複製失敗，請手動複製', 'error');
        }
    } catch (err) {
        console.error('Fallback copy failed:', err);
        showToast('複製失敗，請手動複製', 'error');
    }

    document.body.removeChild(textArea);
}

// Toast notification function
function showToast(message, type = 'success') {
    // Remove existing toast if any
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    // Add to DOM
    document.body.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
        toast.classList.add('show');
    });

    // Remove after 2 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300); // Match CSS transition duration
    }, 2000);
}

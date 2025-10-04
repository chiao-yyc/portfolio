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
// Horizontal Scrolling Experience Timeline
// New Approach: Virtual Scroll Height
// ========================================

(function() {
    // Only enable on desktop (screen width > 1024px)
    if (window.innerWidth <= 1024) {
        return;
    }

    const wrapper = document.getElementById('experience-wrapper');
    const experienceSection = document.getElementById('experience');
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

        // Detect centered card and activate its dot
        updateActiveDot();
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

    // Recalculate on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024) {
            setupScrollHeight();
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

})();

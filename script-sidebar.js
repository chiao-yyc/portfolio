// Split-Screen Sidebar JavaScript

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

const sunIcon = `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"></path></svg>`;
const moonIcon = `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>`;

// Check for saved theme
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

// Navigation
const menuItems = document.querySelectorAll('.menu-item[data-section]');
const contentSections = document.querySelectorAll('.content-section');

function switchSection(sectionName) {
    // Update active menu item
    menuItems.forEach(item => {
        if (item.dataset.section === sectionName) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // Update active content section
    contentSections.forEach(section => {
        if (section.id === `section-${sectionName}`) {
            section.classList.add('active');
        } else {
            section.classList.remove('active');
        }
    });

    // Close mobile menu if open
    if (window.innerWidth <= 768) {
        const sidebar = document.querySelector('.sidebar');
        sidebar.classList.remove('mobile-open');
    }
}

// Add click handlers to menu items
menuItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const section = item.dataset.section;
        switchSection(section);
    });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    const activeMenuItem = document.querySelector('.menu-item.active');
    const menuItemsArray = Array.from(menuItems);
    const currentIndex = menuItemsArray.indexOf(activeMenuItem);

    if (e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % menuItemsArray.length;
        const nextSection = menuItemsArray[nextIndex].dataset.section;
        switchSection(nextSection);
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIndex = (currentIndex - 1 + menuItemsArray.length) % menuItemsArray.length;
        const prevSection = menuItemsArray[prevIndex].dataset.section;
        switchSection(prevSection);
    }
});

// Mobile menu toggle (for future implementation)
// You can add a hamburger button for mobile if needed

// Full-Screen Card Stack JavaScript

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

const sunIcon = `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"></path></svg>`;
const moonIcon = `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>`;

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

// Card Navigation
const cards = document.querySelectorAll('.card');
const dots = document.querySelectorAll('.dot');
const currentCardEl = document.getElementById('current-card');
const totalCardsEl = document.getElementById('total-cards');

let currentIndex = 0;
const totalCards = cards.length;

totalCardsEl.textContent = totalCards;

function goToCard(index) {
    if (index < 0 || index >= totalCards) return;

    // Remove active class from all cards and dots
    cards.forEach(card => {
        card.classList.remove('active', 'prev');
    });
    dots.forEach(dot => {
        dot.classList.remove('active');
    });

    // Add prev class to previous cards
    for (let i = 0; i < index; i++) {
        cards[i].classList.add('prev');
    }

    // Set active card and dot
    cards[index].classList.add('active');
    dots[index].classList.add('active');

    currentIndex = index;
    currentCardEl.textContent = index + 1;
}

function nextCard() {
    if (currentIndex < totalCards - 1) {
        goToCard(currentIndex + 1);
    }
}

function prevCard() {
    if (currentIndex > 0) {
        goToCard(currentIndex - 1);
    }
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        nextCard();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        prevCard();
    } else if (e.key >= '1' && e.key <= '6') {
        e.preventDefault();
        const index = parseInt(e.key) - 1;
        goToCard(index);
    }
});

// Dot navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        goToCard(index);
    });
});

// Mouse wheel navigation
let isScrolling = false;
document.addEventListener('wheel', (e) => {
    if (isScrolling) return;

    const delta = e.deltaY;

    if (Math.abs(delta) > 10) {
        isScrolling = true;

        if (delta > 0) {
            nextCard();
        } else {
            prevCard();
        }

        setTimeout(() => {
            isScrolling = false;
        }, 800);
    }
}, { passive: true });

// Touch swipe navigation
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 50) {
        if (diff > 0) {
            // Swiped left
            nextCard();
        } else {
            // Swiped right
            prevCard();
        }
    }
}

// Initialize
goToCard(0);

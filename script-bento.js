// Bento Grid Dashboard JavaScript

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');
const modalClose = document.querySelector('.modal-close');
const modalOverlay = document.querySelector('.modal-overlay');

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

// Modal Content Templates
const contentTemplates = {
    hero: `
        <h2 class="text-3xl font-bold mb-4">楊雅喬 Grace Yang</h2>
        <p class="text-xl text-gray-400 mb-4">Web Developer / 前端開發者</p>
        <p class="text-base text-gray-300 leading-relaxed mb-4">
            3.5 年 Vue.js/Nuxt.js 實戰經驗，熟悉教育平台、內部管理系統與數據分析應用。
        </p>
        <p class="text-base text-gray-300 leading-relaxed">
            曾負責從零建立並帶領 8 人團隊，推動 UI 元件庫導入，顯著縮短開發週期。
        </p>
    `,
    about: `
        <h2 class="text-2xl font-bold mb-4 text-blue-400">About Me</h2>
        <p class="text-base text-gray-300 leading-relaxed mb-4">
            我是一位具備 <span class="text-blue-400 font-semibold">3.5 年經驗</span>的資深前端工程師，專精於 Vue.js/Nuxt.js 生態系，並擁有豐富的 B2B 系統與數據視覺化平台開發經驗。
        </p>
        <p class="text-base text-gray-300 leading-relaxed mb-6">
            我擅長將複雜的業務需求，轉化為高效率、可維護的前端架構。曾帶領 8 人跨職能團隊，從零到一打造多個內部核心系統。
        </p>
        <h3 class="text-xl font-semibold mb-3 text-blue-400">核心能力</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
                <div class="text-2xl mb-2">🎯</div>
                <h4 class="font-semibold mb-1">專案領導</h4>
                <p class="text-sm text-gray-400">從零到一建立並帶領 8 人跨職能團隊</p>
            </div>
            <div>
                <div class="text-2xl mb-2">⚡</div>
                <h4 class="font-semibold mb-1">技術賦能</h4>
                <p class="text-sm text-gray-400">UI 元件庫提升 40% 開發效率</p>
            </div>
            <div>
                <div class="text-2xl mb-2">📊</div>
                <h4 class="font-semibold mb-1">數據驅動</h4>
                <p class="text-sm text-gray-400">需求處理時間縮短 30%</p>
            </div>
        </div>
    `,
    experience: `
        <h2 class="text-2xl font-bold mb-6 text-blue-400">Work Experience</h2>
        <div class="space-y-6">
            <div class="border-l-2 border-blue-500 pl-4">
                <h3 class="text-xl font-semibold">資深前端工程師 / 組長</h3>
                <p class="text-gray-400 text-sm">台灣知識庫股份有限公司</p>
                <p class="text-gray-500 text-xs mt-1 mb-3">2020/12 - 2024/06</p>
                <ul class="space-y-2 text-sm text-gray-300">
                    <li>• 主導從開發到部署的完整流程，管理多個同時進行的專案</li>
                    <li>• 擔任團隊技術負責人，提供技術指導並解決棘手問題</li>
                    <li>• 參與數據分析專案，透過視覺化圖表將洞察轉化為優化策略</li>
                </ul>
            </div>
            <div class="border-l-2 border-gray-600 pl-4">
                <h3 class="text-xl font-semibold">專案企劃</h3>
                <p class="text-gray-400 text-sm">竹冶聯合設計工作室</p>
                <p class="text-gray-500 text-xs mt-1 mb-3">2019/04 - 2019/10</p>
                <ul class="space-y-2 text-sm text-gray-300">
                    <li>• 參與地方創生與文化資產專案</li>
                    <li>• 協調政府、地方組織與居民等多方利害關係人</li>
                </ul>
            </div>
        </div>
    `,
    project1: `
        <h2 class="text-2xl font-bold mb-4 text-blue-400">VisCN Kit</h2>
        <p class="text-base text-gray-300 mb-4">
            一個受 shadcn/ui 啟發，可複製貼上、高度客製化的 D3.js 圖表元件庫。
        </p>
        <h3 class="text-lg font-semibold mb-2 text-blue-400">技術棧</h3>
        <div class="flex flex-wrap gap-2 mb-4">
            <span class="px-3 py-1 bg-blue-900/30 border border-blue-500/30 rounded text-sm">D3.js</span>
            <span class="px-3 py-1 bg-blue-900/30 border border-blue-500/30 rounded text-sm">TypeScript</span>
            <span class="px-3 py-1 bg-blue-900/30 border border-blue-500/30 rounded text-sm">CLI</span>
            <span class="px-3 py-1 bg-blue-900/30 border border-blue-500/30 rounded text-sm">Component Library</span>
        </div>
        <h3 class="text-lg font-semibold mb-2 text-blue-400">特色</h3>
        <ul class="space-y-2 text-sm text-gray-300">
            <li>• CLI 工具，一鍵新增圖表元件</li>
            <li>• 完全控制程式碼，高度客製化</li>
            <li>• TypeScript 原生支援</li>
            <li>• 豐富的元件庫與數據適配器</li>
        </ul>
    `,
    project2: `
        <h2 class="text-2xl font-bold mb-4 text-blue-400">電商後台管理平台</h2>
        <p class="text-base text-gray-300 mb-4">
            企業級的全端電商後台，採用 Monorepo 架構開發，包含完整的訂單管理、庫存追蹤與數據分析。
        </p>
        <h3 class="text-lg font-semibold mb-2 text-blue-400">技術棧</h3>
        <div class="flex flex-wrap gap-2 mb-4">
            <span class="px-3 py-1 bg-blue-900/30 border border-blue-500/30 rounded text-sm">Vue 3</span>
            <span class="px-3 py-1 bg-blue-900/30 border border-blue-500/30 rounded text-sm">React</span>
            <span class="px-3 py-1 bg-blue-900/30 border border-blue-500/30 rounded text-sm">Supabase</span>
            <span class="px-3 py-1 bg-blue-900/30 border border-blue-500/30 rounded text-sm">Monorepo</span>
            <span class="px-3 py-1 bg-blue-900/30 border border-blue-500/30 rounded text-sm">TailwindCSS</span>
        </div>
        <h3 class="text-lg font-semibold mb-2 text-blue-400">核心功能</h3>
        <ul class="space-y-2 text-sm text-gray-300">
            <li>• 儀表板與數據分析</li>
            <li>• 訂單與庫存管理</li>
            <li>• 客戶關係管理 (CRM)</li>
            <li>• 即時通知系統</li>
        </ul>
    `,
    skills: `
        <h2 class="text-2xl font-bold mb-4 text-blue-400">Technical Skills</h2>
        <div class="space-y-4">
            <div>
                <h3 class="text-lg font-semibold mb-2">Frontend</h3>
                <div class="flex flex-wrap gap-2">
                    <span class="px-3 py-1 bg-blue-900/30 border border-blue-500/30 rounded text-sm">JavaScript (ES6+)</span>
                    <span class="px-3 py-1 bg-blue-900/30 border border-blue-500/30 rounded text-sm">TypeScript</span>
                    <span class="px-3 py-1 bg-blue-900/30 border border-blue-500/30 rounded text-sm">Vue.js</span>
                    <span class="px-3 py-1 bg-blue-900/30 border border-blue-500/30 rounded text-sm">Nuxt.js</span>
                    <span class="px-3 py-1 bg-blue-900/30 border border-blue-500/30 rounded text-sm">React</span>
                    <span class="px-3 py-1 bg-blue-900/30 border border-blue-500/30 rounded text-sm">TailwindCSS</span>
                    <span class="px-3 py-1 bg-blue-900/30 border border-blue-500/30 rounded text-sm">D3.js</span>
                </div>
            </div>
            <div>
                <h3 class="text-lg font-semibold mb-2">Backend & Tools</h3>
                <div class="flex flex-wrap gap-2">
                    <span class="px-3 py-1 bg-blue-900/30 border border-blue-500/30 rounded text-sm">Node.js</span>
                    <span class="px-3 py-1 bg-blue-900/30 border border-blue-500/30 rounded text-sm">Supabase</span>
                    <span class="px-3 py-1 bg-blue-900/30 border border-blue-500/30 rounded text-sm">PostgreSQL</span>
                    <span class="px-3 py-1 bg-blue-900/30 border border-blue-500/30 rounded text-sm">Git</span>
                    <span class="px-3 py-1 bg-blue-900/30 border border-blue-500/30 rounded text-sm">Vite</span>
                    <span class="px-3 py-1 bg-blue-900/30 border border-blue-500/30 rounded text-sm">Docker</span>
                </div>
            </div>
        </div>
    `,
    contact: `
        <h2 class="text-2xl font-bold mb-6 text-blue-400">Get in Touch</h2>
        <div class="space-y-4">
            <div class="flex items-center space-x-3">
                <svg class="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
                <a href="mailto:chiaoyyc@gmail.com" class="text-gray-300 hover:text-blue-400">chiaoyyc@gmail.com</a>
            </div>
            <div class="flex items-center space-x-3">
                <svg class="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <a href="https://github.com/chiaoyyc" target="_blank" class="text-gray-300 hover:text-blue-400">GitHub</a>
            </div>
            <div class="flex items-center space-x-3">
                <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
                </svg>
                <a href="https://yachiaoyang.dev" target="_blank" class="text-gray-300 hover:text-blue-400">yachiaoyang.dev</a>
            </div>
        </div>
    `
};

// Handle box clicks
document.querySelectorAll('.bento-box[data-section]').forEach(box => {
    box.addEventListener('click', () => {
        const section = box.dataset.section;
        if (contentTemplates[section]) {
            modalBody.innerHTML = contentTemplates[section];
            modal.classList.remove('hidden');
        }
    });
});

// Close modal
function closeModal() {
    modal.classList.add('hidden');
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});

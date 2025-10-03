// Horizontal Timeline JavaScript

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

// Navigation between timeline and detail views
const timelineView = document.getElementById('timeline-view');
const detailView = document.getElementById('detail-view');
const detailContent = document.querySelector('.detail-content');
const backBtn = document.getElementById('back-btn');
const clickableNodes = document.querySelectorAll('.timeline-node.clickable');

// Period data
const periodData = {
    '2024': {
        title: '2024 - Side Projects 階段',
        description: '離職後專注於個人技術成長與 Side Projects 開發',
        projects: [
            {
                name: 'VisCN Kit',
                desc: '受 shadcn/ui 啟發的 D3.js 圖表元件庫',
                tags: ['D3.js', 'TypeScript', 'CLI', 'Component Library']
            },
            {
                name: '電商後台管理平台',
                desc: '企業級全端電商後台，採 Monorepo 架構',
                tags: ['Vue 3', 'React', 'Supabase', 'Monorepo']
            }
        ],
        highlights: [
            '深入研究 D3.js 與數據視覺化',
            '學習 React 生態系',
            '實踐 Monorepo 架構設計',
            '建立個人技術品牌'
        ]
    },
    '2020-2023': {
        title: '2020-2023 - 台灣知識庫股份有限公司',
        role: '資深前端工程師 / 組長',
        description: '帶領團隊從零到一打造多個內部核心系統，推動技術文化與流程優化',
        achievements: [
            '從零建立並帶領 <span class="text-blue-400 font-semibold">8 人</span>跨職能團隊',
            '建立 UI 元件庫，提升 <span class="text-blue-400 font-semibold">40%</span> 開發效率',
            '需求處理時間縮短 <span class="text-blue-400 font-semibold">30%</span>',
            '跨部門溝通成本減少 <span class="text-blue-400 font-semibold">80%</span>'
        ],
        projects: [
            {
                name: '需求管理平台',
                desc: '集中式需求管理系統，解決跨部門協作問題',
                tags: ['Vue.js', 'Nuxt.js', 'API Integration']
            },
            {
                name: 'UI Component 系統',
                desc: '統一的設計系統與元件庫',
                tags: ['Vue.js', 'Storybook', 'Design System']
            },
            {
                name: '數據視覺化平台',
                desc: '高層決策儀表板',
                tags: ['Chart.js', 'D3.js', 'Data Visualization']
            }
        ]
    },
    '2019': {
        title: '2019 - 竹冶聯合設計工作室',
        role: '專案企劃',
        description: '參與地方創生與文化資產專案，負責提案、資源協調與執行',
        achievements: [
            '成功協調政府、地方組織與居民多方利害關係人',
            '完成地方創生專案提案與資源整合',
            '建立跨領域協作經驗'
        ]
    },
    '2017-2018': {
        title: '2017-2018 - 澳洲工作經驗',
        role: 'Supervisor',
        description: '兩次擔任團隊主管，帶領 15 人跨文化團隊',
        achievements: [
            '帶領 <span class="text-blue-400 font-semibold">15 人</span>跨文化團隊',
            '負責工作分配、進度控管與危機處理',
            '培養跨文化溝通與領導能力'
        ]
    }
};

function showDetail(period) {
    const data = periodData[period];
    if (!data) return;

    let html = `
        <div class="detail-section">
            <h2 class="detail-title">${data.title}</h2>
            ${data.role ? `<p class="text-xl text-gray-400 mb-4">${data.role}</p>` : ''}
            <p class="text-lg text-gray-300 mb-8">${data.description}</p>
        </div>
    `;

    if (data.achievements) {
        html += `
            <div class="detail-section">
                <h3 class="text-2xl font-semibold mb-4 text-blue-400">主要成就</h3>
                <ul class="space-y-3 text-gray-300">
                    ${data.achievements.map(a => `<li class="flex items-start"><span class="text-blue-400 mr-2">•</span><span>${a}</span></li>`).join('')}
                </ul>
            </div>
        `;
    }

    if (data.projects) {
        html += `
            <div class="detail-section">
                <h3 class="text-2xl font-semibold mb-6 text-blue-400">專案經歷</h3>
                <div class="project-grid">
                    ${data.projects.map(p => `
                        <div class="project-card">
                            <h4 class="text-xl font-semibold mb-2 text-blue-400">${p.name}</h4>
                            <p class="text-sm text-gray-400 mb-4">${p.desc}</p>
                            <div class="flex flex-wrap gap-2">
                                ${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    if (data.highlights) {
        html += `
            <div class="detail-section">
                <h3 class="text-2xl font-semibold mb-4 text-blue-400">技術亮點</h3>
                <ul class="space-y-3 text-gray-300">
                    ${data.highlights.map(h => `<li class="flex items-start"><span class="text-blue-400 mr-2">▸</span><span>${h}</span></li>`).join('')}
                </ul>
            </div>
        `;
    }

    detailContent.innerHTML = html;
    detailView.classList.remove('hidden');
    backBtn.classList.remove('hidden');
    timelineView.style.display = 'none';
}

function hideDetail() {
    detailView.classList.add('hidden');
    backBtn.classList.add('hidden');
    timelineView.style.display = 'block';
}

// Add click handlers
clickableNodes.forEach(node => {
    node.addEventListener('click', () => {
        const period = node.dataset.period;
        showDetail(period);
    });
});

backBtn.addEventListener('click', hideDetail);

// Keyboard navigation in detail view
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !detailView.classList.contains('hidden')) {
        hideDetail();
    }
});

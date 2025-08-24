// 全局搜索功能
class GlobalSearch {
    constructor() {
        this.searchDatabase = this.createSearchDatabase();
        this.init();
    }

    // 创建搜索数据库
    createSearchDatabase() {
        return [
            // 页面内容
            {
                id: 'home',
                title: '首页',
                content: '云南悦恩环保技术咨询有限公司 环保服务 环境治理 污染治理 环保咨询 排污许可 环境检测 全周期环保管家',
                url: 'index.html',
                category: '页面'
            },
            {
                id: 'about',
                title: '关于我们',
                content: '企业简介 核心人员 团队风采 工作风采 企业资质 公司介绍 专家团队',
                url: 'about.html',
                category: '页面'
            },
            {
                id: 'services',
                title: '服务项目',
                content: '环策 环协 环责 环境政策 环境协作 环境责任 污染治理 环境检测 排污许可',
                url: 'services.html',
                category: '页面'
            },
            {
                id: 'cases',
                title: '技术合作',
                content: '专业环保技术合作服务 涵盖环评 检测 治理 全方位环保服务',
                url: 'cases.html',
                category: '页面'
            },
            {
                id: 'news',
                title: '新闻中心',
                content: '环保政策 行业动态 公司新闻 最新资讯',
                url: 'news.html',
                category: '页面'
            },
            {
                id: 'jobs',
                title: '职等你来',
                content: '招聘信息 职业发展 工作机会 人才招募',
                url: 'jobs.html',
                category: '页面'
            },
            {
                id: 'contact',
                title: '联系我们',
                content: '联系方式 公司地址 联系电话 获取报价',
                url: 'contact.html',
                category: '页面'
            },

            // 服务项目详细内容
            {
                id: 'service_env_policy',
                title: '环境政策咨询',
                content: '环境政策解读 政策咨询 合规指导 政策更新',
                url: 'services.html#env-policy',
                category: '服务'
            },
            {
                id: 'service_env_cooperation',
                title: '环境协作服务',
                content: '环境协作 项目合作 技术支持 专业服务',
                url: 'services.html#env-cooperation',
                category: '服务'
            },
            {
                id: 'service_env_responsibility',
                title: '环境责任管理',
                content: '环境责任 责任管理 环境管理体系 合规管理',
                url: 'services.html#env-responsibility',
                category: '服务'
            },

            // 技术合作项目
            {
                id: 'tech_wastewater',
                title: '废水处理技术',
                content: '污水处理 废水治理 水质检测 污水运维',
                url: 'cases.html#wastewater',
                category: '技术'
            },
            {
                id: 'tech_air_pollution',
                title: '废气治理技术',
                content: '废气处理 空气污染治理 大气污染防治',
                url: 'cases.html#air-pollution',
                category: '技术'
            },
            {
                id: 'tech_solid_waste',
                title: '固废处理技术',
                content: '固体废物处理 危险废物处置 一般固废处理',
                url: 'cases.html#solid-waste',
                category: '技术'
            },

            // 团队成员
            {
                id: 'team_yaoxiao',
                title: '姚晓（创始人）',
                content: '创始人 总经理 环保专家 技术领导',
                url: 'about.html#core-team',
                category: '团队'
            },
            {
                id: 'team_wangyilu',
                title: '王绎璐（行政副总）',
                content: '行政副总 管理专家 运营管理',
                url: 'about.html#core-team',
                category: '团队'
            },
            {
                id: 'team_zhouzheng',
                title: '周政',
                content: '技术专家 环保工程师',
                url: 'about.html#core-team',
                category: '团队'
            },

            // 资质证书
            {
                id: 'qualification_iso9001',
                title: 'ISO9001质量管理体系',
                content: '质量管理体系认证 ISO9001 国际标准',
                url: 'about.html#qualifications',
                category: '资质'
            },
            {
                id: 'qualification_iso14001',
                title: 'ISO14001环境管理体系',
                content: '环境管理体系认证 ISO14001 环境标准',
                url: 'about.html#qualifications',
                category: '资质'
            },
            {
                id: 'qualification_iso45001',
                title: 'ISO45001职业健康安全管理体系',
                content: '职业健康安全管理体系 ISO45001 安全标准',
                url: 'about.html#qualifications',
                category: '资质'
            }
        ];
    }

    // 基础搜索函数
    search(query) {
        if (!query || query.trim().length === 0) {
            return [];
        }

        const searchTerm = query.trim().toLowerCase();
        const results = [];

        this.searchDatabase.forEach(item => {
            let score = 0;

            // 标题匹配（权重最高）
            if (item.title.toLowerCase().includes(searchTerm)) {
                score += 10;
            }

            // 内容匹配
            if (item.content.toLowerCase().includes(searchTerm)) {
                score += 5;
            }

            // 分词匹配（针对中文）
            const words = searchTerm.split(/\s+/);
            words.forEach(word => {
                if (word.length > 0) {
                    if (item.title.toLowerCase().includes(word)) {
                        score += 3;
                    }
                    if (item.content.toLowerCase().includes(word)) {
                        score += 1;
                    }
                }
            });

            if (score > 0) {
                results.push({
                    ...item,
                    score,
                    highlightTitle: this.highlightText(item.title, searchTerm),
                    highlightContent: this.highlightText(item.content, searchTerm)
                });
            }
        });

        // 按评分排序
        return results.sort((a, b) => b.score - a.score);
    }

    // 高亮显示匹配文本
    highlightText(text, searchTerm) {
        if (!searchTerm) return text;
        
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    // 初始化搜索功能
    init() {
        this.createSearchModal();
        this.bindEvents();
    }

    // 创建搜索模态框
    createSearchModal() {
        const modalHTML = `
            <div id="searchModal" class="search-modal" style="display: none;">
                <div class="search-overlay">
                    <div class="search-container">
                        <div class="search-header">
                            <input type="text" id="searchInput" class="search-input" placeholder="搜索..." autocomplete="off">
                            <button id="searchClose" class="search-close">&times;</button>
                        </div>
                        <div id="searchResults" class="search-results">
                            <div class="search-tips">
                                <p>输入关键词搜索网站内容</p>
                                <div class="search-suggestions">
                                    <span class="suggestion-tag">环保服务</span>
                                    <span class="suggestion-tag">污染治理</span>
                                    <span class="suggestion-tag">环境检测</span>
                                    <span class="suggestion-tag">排污许可</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // 将模态框添加到页面
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    // 绑定事件
    bindEvents() {
        // 搜索按钮点击事件
        document.addEventListener('click', (e) => {
            if (e.target.closest('.search-icon-global')) {
                e.preventDefault();
                this.openSearchModal();
            }
        });

        // 搜索输入事件
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });

            searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.closeSearchModal();
                }
            });
        }

        // 关闭按钮事件
        const searchClose = document.getElementById('searchClose');
        if (searchClose) {
            searchClose.addEventListener('click', () => {
                this.closeSearchModal();
            });
        }

        // 点击外部关闭
        const searchModal = document.getElementById('searchModal');
        if (searchModal) {
            searchModal.addEventListener('click', (e) => {
                if (e.target === searchModal || e.target.classList.contains('search-overlay')) {
                    this.closeSearchModal();
                }
            });
        }

        // 建议标签点击事件
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('suggestion-tag')) {
                const searchInput = document.getElementById('searchInput');
                if (searchInput) {
                    searchInput.value = e.target.textContent;
                    this.handleSearch(e.target.textContent);
                }
            }
        });
    }

    // 打开搜索模态框
    openSearchModal() {
        const modal = document.getElementById('searchModal');
        const searchInput = document.getElementById('searchInput');
        
        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            
            // 聚焦到搜索输入框
            setTimeout(() => {
                if (searchInput) {
                    searchInput.focus();
                }
            }, 100);
        }
    }

    // 关闭搜索模态框
    closeSearchModal() {
        const modal = document.getElementById('searchModal');
        const searchInput = document.getElementById('searchInput');
        
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
            
            // 清空搜索输入
            if (searchInput) {
                searchInput.value = '';
            }
            
            // 重置搜索结果
            this.displayResults([]);
        }
    }

    // 处理搜索
    handleSearch(query) {
        const results = this.search(query);
        this.displayResults(results, query);
    }

    // 显示搜索结果
    displayResults(results, query = '') {
        const resultsContainer = document.getElementById('searchResults');
        if (!resultsContainer) return;

        if (results.length === 0 && query.trim() === '') {
            // 显示默认提示
            resultsContainer.innerHTML = `
                <div class="search-tips">
                    <p>输入关键词搜索网站内容</p>
                    <div class="search-suggestions">
                        <span class="suggestion-tag">环保服务</span>
                        <span class="suggestion-tag">污染治理</span>
                        <span class="suggestion-tag">环境检测</span>
                        <span class="suggestion-tag">排污许可</span>
                    </div>
                </div>
            `;
            return;
        }

        if (results.length === 0 && query.trim() !== '') {
            // 无搜索结果
            resultsContainer.innerHTML = `
                <div class="no-results">
                    <p>未找到相关结果</p>
                    <p class="no-results-tips">试试其他关键词，如：环保、污染治理、检测</p>
                </div>
            `;
            return;
        }

        // 显示搜索结果
        let resultsHTML = `<div class="results-header">找到 ${results.length} 个相关结果</div>`;
        
        results.forEach(result => {
            resultsHTML += `
                <div class="search-result-item" onclick="window.location.href='${result.url}'">
                    <div class="result-category">${result.category}</div>
                    <div class="result-title">${result.highlightTitle}</div>
                    <div class="result-content">${result.highlightContent}</div>
                    <div class="result-url">${result.url}</div>
                </div>
            `;
        });

        resultsContainer.innerHTML = resultsHTML;
    }
}

// 页面加载完成后初始化搜索功能
document.addEventListener('DOMContentLoaded', () => {
    window.globalSearch = new GlobalSearch();
});

// 悬疑探案测试系统
class MysteryTest {
    constructor() {
        this.currentCase = 'case1'; // 当前案件
        this.isTyping = false; // 是否正在打字
        this.typewriterSpeed = 30; // 打字速度（毫秒）
        this.currentText = ''; // 当前显示的文本
        this.fullText = ''; // 完整文本
        this.typewriterTimer = null; // 打字计时器
        
        // 案件数据
        this.cases = {
            case1: {
                title: "📋 探案档案 #001",
                subtitle: "案件性质：空间认知逻辑测试 | 难度等级：★★★☆☆",
                background: "empty-room",
                content: `> 系统正在加载案件资料...
> 案件已锁定，开始数据传输...
> ████████████████████ 100%

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

【案件一：空无一物的房间】

场景描述：

你身处一个完全封闭的、四壁、天花板和地板都是纯白色的立方体房间里。房间里空无一物，没有任何家具、装饰、工具或文字。

房间中央的地板上，放着一个和你手掌大小完全相同的、材质不明的、绝对光滑的黑色立方体。你尝试移动它，但它纹丝不动，仿佛与地板是一体的。你无法以任何方式在它上面留下痕迹。

这个房间没有门，没有窗，你看不到任何出口或入口。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

唯一的线索：

在这个房间里，唯一会发生变化的事情是：每当你眨一次眼睛，你面前的黑色立方体就会瞬间变成白色，再眨一次眼，它又会变回黑色。如此循环往复，黑白交替。除此之外，什么都不会发生。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

【核心问题】

你的任务不是"逃离"这个房间，而是要"理解"你所处环境的"规则"。

请问，你首先需要验证的第一件、也是最重要的一件事情是什么？

请详细说出你的验证方法和理由。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

> 等待你的分析报告...`,
                placeholder: "请在此详细描述你要验证的事情、具体的验证方法，以及你认为这是最重要验证点的理由..."
            },
            case2: {
                title: "📋 探案档案 #002", 
                subtitle: "案件性质：行为模式分析测试 | 难度等级：★★★★☆",
                background: "librarian",
                content: `> 切换案件资料...
> 正在加载第二起案件...
> ████████████████████ 100%

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

【案件二：沉默的图书管理员】

场景描述：

你来到一座宏伟、寂静无声的图书馆，成为一名新来的学徒。这里收藏的不是普通书籍，而是无数本封面、大小、重量和纸张都完全相同的、没有任何文字的"空白之书"。

你的工作任务看似非常简单：将"待处理"推车（A车）上的空白之书，搬到"已处理"推车（B车）上。

你的导师，是一位从不说话的、年长的图书管理员。他/她是你工作的唯一监督者和反馈来源。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

已发现的规则：

经过几轮尝试，你已经摸索出了一个明确且令人困惑的反馈循环：

1. 你从A车上拿起一本书，直接放到B车上。
2. 年长的图书管理员会走过来，拿起你刚放到B车上的那本书，静静地看你一眼，然后将其放回到A车的"待处理"行列中。
3. 这个过程会无限重复。

无论你搬多少本，搬得有多快，多整齐，结果都是一样：你处理的每一本书，最终都会被管理员默默地送回起点。

你已经清楚地知道，简单地将书从A车搬到B车是一个"错误"的或"不完整"的操作。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

【核心问题】

你的目标不是完成搬书这个"表面任务"，而是要理解图书管理员心中真正的"完成"标准。

为了达到这个目的，你接下来必须着手调查的、最核心的一个"区别"是什么？

请具体描述你的调查行为，并解释为什么聚焦于这个"区别"是解开谜题的唯一途径。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

> 等待你的分析报告...`,
                placeholder: "请详细描述你要调查的核心区别、具体的调查方法，以及你认为这个区别是解谜关键的理由..."
            }
        };
    }

    // 初始化测试系统
    init() {
        this.createOverlay();
        this.bindEvents();
    }

    // 创建覆盖层界面
    createOverlay() {
        const overlay = document.createElement('div');
        overlay.id = 'mysteryTestOverlay';
        overlay.className = 'mystery-test-overlay';
        
        overlay.innerHTML = `
            <div class="mystery-container ${this.cases[this.currentCase].background}">
                <!-- 关闭按钮 -->
                <button class="mystery-close-btn" onclick="mysteryTest.close()">✕</button>
                
                <!-- 案件切换器 -->
                <div class="case-switcher">
                    <div class="case-tab ${this.currentCase === 'case1' ? 'active' : ''}" data-case="case1">
                        案件 #001
                    </div>
                    <div class="case-tab ${this.currentCase === 'case2' ? 'active' : ''}" data-case="case2">
                        案件 #002
                    </div>
                </div>
                
                <!-- 主要内容区域 -->
                <div class="mystery-content">
                    <h1 class="mystery-title" id="mysteryTitle">${this.cases[this.currentCase].title}</h1>
                    <p class="mystery-subtitle" id="mysterySubtitle">${this.cases[this.currentCase].subtitle}</p>
                    
                    <!-- 文本显示区域 -->
                    <div class="mystery-text-container">
                        <div class="mystery-text" id="mysteryText"></div>
                        <span class="typewriter-cursor" id="typewriterCursor"></span>
                    </div>
                    
                    <!-- 操作按钮 -->
                    <div class="mystery-actions">
                        <button class="mystery-btn" id="startTypingBtn" onclick="mysteryTest.startTyping()">
                            🎮 开始探案
                        </button>
                        <button class="mystery-btn disabled" id="showAnswerBtn" onclick="mysteryTest.showAnswerSection()">
                            📝 开始作答
                        </button>
                        <button class="mystery-btn" id="switchCaseBtn" onclick="mysteryTest.switchCase()">
                            🔄 切换案件
                        </button>
                    </div>
                    
                    <!-- 答案输入区域 -->
                    <div class="answer-section" id="answerSection">
                        <h3 style="color: #00ff41; font-family: 'Courier New', monospace; margin-bottom: 15px;">
                            📋 提交你的分析报告：
                        </h3>
                        <textarea 
                            class="answer-textarea" 
                            id="answerTextarea"
                            placeholder="${this.cases[this.currentCase].placeholder}"
                        ></textarea>
                        <button class="submit-answer-btn" onclick="mysteryTest.submitAnswer()">
                            📤 提交分析报告
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(overlay);
    }

    // 绑定事件
    bindEvents() {
        // 案件切换
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('case-tab')) {
                const caseId = e.target.dataset.case;
                if (caseId !== this.currentCase) {
                    this.switchToCase(caseId);
                }
            }
        });

        // 键盘事件
        document.addEventListener('keydown', (e) => {
            const overlay = document.getElementById('mysteryTestOverlay');
            if (overlay && overlay.classList.contains('active')) {
                if (e.key === 'Escape') {
                    this.close();
                }
            }
        });
    }

    // 打开测试
    open() {
        const overlay = document.getElementById('mysteryTestOverlay');
        if (overlay) {
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // 防止背景滚动
        }
    }

    // 关闭测试
    close() {
        const overlay = document.getElementById('mysteryTestOverlay');
        if (overlay) {
            overlay.classList.remove('active');
            document.body.style.overflow = ''; // 恢复滚动
            this.stopTyping();
        }
    }

    // 开始打字效果
    startTyping() {
        if (this.isTyping) return;
        
        this.isTyping = true;
        this.currentText = '';
        this.fullText = this.cases[this.currentCase].content;
        
        const textElement = document.getElementById('mysteryText');
        const startBtn = document.getElementById('startTypingBtn');
        const cursor = document.getElementById('typewriterCursor');
        
        // 更新按钮状态
        startBtn.classList.add('disabled');
        startBtn.innerHTML = '🔄 正在加载...';
        
        // 显示光标
        cursor.style.display = 'inline-block';
        
        // 开始打字
        this.typeText(textElement, cursor);
    }

    // 打字动画
    typeText(element, cursor) {
        if (this.currentText.length < this.fullText.length) {
            this.currentText += this.fullText.charAt(this.currentText.length);
            element.textContent = this.currentText;
            
            this.typewriterTimer = setTimeout(() => {
                this.typeText(element, cursor);
            }, this.typewriterSpeed);
        } else {
            // 打字完成
            this.isTyping = false;
            cursor.style.display = 'none';
            
            // 启用作答按钮
            const showAnswerBtn = document.getElementById('showAnswerBtn');
            showAnswerBtn.classList.remove('disabled');
            
            // 重置开始按钮
            const startBtn = document.getElementById('startTypingBtn');
            startBtn.classList.remove('disabled');
            startBtn.innerHTML = '🔄 重新播放';
        }
    }

    // 停止打字
    stopTyping() {
        if (this.typewriterTimer) {
            clearTimeout(this.typewriterTimer);
            this.typewriterTimer = null;
        }
        this.isTyping = false;
    }

    // 显示答案输入区域
    showAnswerSection() {
        const answerSection = document.getElementById('answerSection');
        if (answerSection && !this.isTyping) {
            answerSection.classList.add('active');
            
            // 滚动到答案区域
            setTimeout(() => {
                answerSection.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'nearest' 
                });
            }, 100);
        }
    }

    // 切换案件
    switchCase() {
        const newCase = this.currentCase === 'case1' ? 'case2' : 'case1';
        this.switchToCase(newCase);
    }

    // 切换到指定案件
    switchToCase(caseId) {
        if (this.isTyping) {
            this.stopTyping();
        }
        
        this.currentCase = caseId;
        const caseData = this.cases[caseId];
        
        // 更新背景
        const container = document.querySelector('.mystery-container');
        container.className = `mystery-container ${caseData.background}`;
        
        // 更新标题
        document.getElementById('mysteryTitle').textContent = caseData.title;
        document.getElementById('mysterySubtitle').textContent = caseData.subtitle;
        
        // 清空文本和隐藏答案区域
        document.getElementById('mysteryText').textContent = '';
        document.getElementById('answerSection').classList.remove('active');
        document.getElementById('answerTextarea').placeholder = caseData.placeholder;
        document.getElementById('answerTextarea').value = '';
        
        // 重置按钮状态
        const startBtn = document.getElementById('startTypingBtn');
        const showAnswerBtn = document.getElementById('showAnswerBtn');
        
        startBtn.classList.remove('disabled');
        startBtn.innerHTML = '🎮 开始探案';
        showAnswerBtn.classList.add('disabled');
        
        // 更新案件标签
        document.querySelectorAll('.case-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-case="${caseId}"]`).classList.add('active');
        
        // 添加切换效果
        container.classList.add('glitch-effect');
        setTimeout(() => {
            container.classList.remove('glitch-effect');
        }, 300);
    }

    // 提交答案
    submitAnswer() {
        const textarea = document.getElementById('answerTextarea');
        const answer = textarea.value.trim();
        
        if (!answer) {
            alert('请先填写你的分析报告');
            return;
        }
        
        // 创建邮件内容
        const caseTitle = this.cases[this.currentCase].title;
        const subject = `应聘加分项 - 创新思维挑战 - ${caseTitle}`;
        const body = `您好，

我刚完成了 ${caseTitle} 的思维挑战，以下是我的分析报告：

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${caseTitle}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${answer}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

期待与您进一步交流！

最好的问候`;
        
        // 构造邮件链接
        const mailtoLink = `mailto:2475634516@qq.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        // 确认提交
        if (confirm('确定要提交这份分析报告吗？\n\n点击确定将打开邮件客户端，你可以检查内容后再发送。')) {
            window.location.href = mailtoLink;
            
            // 提交成功提示
            setTimeout(() => {
                alert('分析报告已准备就绪！\n\n请检查邮件内容，确认无误后发送。\n\n感谢你参与我们的创新思维挑战！');
            }, 500);
        }
    }

    // 销毁测试系统
    destroy() {
        const overlay = document.getElementById('mysteryTestOverlay');
        if (overlay) {
            overlay.remove();
        }
        this.stopTyping();
        document.body.style.overflow = ''; // 恢复滚动
    }
}

// 全局实例
let mysteryTest = null;

// 启动探案测试
function startMysteryTest() {
    if (!mysteryTest) {
        mysteryTest = new MysteryTest();
        mysteryTest.init();
    }
    mysteryTest.open();
}

// 页面卸载时清理
window.addEventListener('beforeunload', () => {
    if (mysteryTest) {
        mysteryTest.destroy();
    }
});
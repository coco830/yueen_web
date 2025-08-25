// 极简探案测试系统
class SimpleMystery {
    constructor() {
        this.currentCase = null;
        this.isTyping = false;
        this.typewriterSpeed = 120; // 大幅调慢打字速度，增强逐字显示效果
        this.currentText = '';
        this.fullText = '';
        this.typewriterTimer = null;
        this.keyboardAudio = null; // 机械键盘音效
        this.soundEnabled = true;
        
        // 加载机械键盘音效
        this.loadKeyboardSound();
        
        // 案件数据
        this.cases = {
            case1: {
                title: "空无一物的房间",
                image: "空无一物的房间.png",
                content: `测试题一：空无一物的房间

场景：

你身处一个完全封闭的、四壁、天花板和地板都是纯白色的立方体房间里。房间里空无一物，没有任何家具、装饰、工具或文字。

房间中央的地板上，放着一个和你手掌大小完全相同的、材质不明的、绝对光滑的黑色立方体。你尝试移动它，但它纹丝不动，仿佛与地板是一体的。你无法以任何方式在它上面留下痕迹。

这个房间没有门，没有窗，你看不到任何出口或入口。

唯一的线索：

在这个房间里，唯一会发生变化的事情是：每当你眨一次眼睛，你面前的黑色立方体就会瞬间变成白色，再眨一次眼，它又会变回黑色。如此循环往复，黑白交替。除此之外，什么都不会发生。

问题：

你的任务不是"逃离"这个房间，而是要"理解"你所处环境的"规则"。

请问，你首先需要验证的第一件、也是最重要的一件事情是什么？

请详细说出你的验证方法和理由。`,
                placeholder: "请在此详细描述你要验证的事情、具体的验证方法，以及你认为这是最重要验证点的理由..."
            },
            case2: {
                title: "沉默的图书管理员",
                image: "沉默的图书管理员.png",
                content: `测试题二：沉默的图书管理员

场景：

你来到一座宏伟、寂静无声的图书馆，成为一名新来的学徒。这里收藏的不是普通书籍，而是无数本封面、大小、重量和纸张都完全相同的、没有任何文字的"空白之书"。

你的工作任务看似非常简单：将"待处理"推车（A车）上的空白之书，搬到"已处理"推车（B车）上。

你的导师，是一位从不说话的、年长的图书管理员。他/她是你工作的唯一监督者和反馈来源。

已经发现的规则：

经过几轮尝试，你已经摸索出了一个明确且令人困惑的反馈循环：

1. 你从A车上拿起一本书，直接放到B车上。
2. 年长的图书管理员会走过来，拿起你刚放到B车上的那本书，静静地看你一眼，然后将其放回到A车的"待处理"行列中。
3. 这个过程会无限重复。

无论你搬多少本，搬得有多快，多整齐，结果都是一样：你处理的每一本书，最终都会被管理员默默地送回起点。

你已经清楚地知道，简单地将书从A车搬到B车是一个"错误"的或"不完整"的操作。

问题：

你的目标不是完成搬书这个"表面任务"，而是要理解图书管理员心中真正的"完成"标准。

为了达到这个目的，你接下来必须着手调查的、最核心的一个"区别"是什么？

请具体描述你的调查行为，并解释为什么聚焦于这个"区别"是解开谜题的唯一途径。`,
                placeholder: "请详细描述你要调查的核心区别、具体的调查方法，以及你认为这个区别是解谜关键的理由..."
            }
        };
    }

    // 加载机械键盘音效
    loadKeyboardSound() {
        this.keyboardAudio = new Audio('机械键盘音效.mp3');
        this.keyboardAudio.preload = 'auto';
        this.keyboardAudio.volume = 0.3; // 调整音量
        
        this.keyboardAudio.addEventListener('canplaythrough', () => {
            console.log('机械键盘音效加载成功');
        });
        
        this.keyboardAudio.addEventListener('error', (e) => {
            console.log('机械键盘音效加载失败:', e);
            this.soundEnabled = false;
        });
    }

    // 播放机械键盘音效片段
    playKeyboardSound() {
        if (!this.soundEnabled || !this.keyboardAudio) return;
        
        try {
            // 克隆音频对象以支持快速连续播放
            const audioClone = this.keyboardAudio.cloneNode();
            audioClone.volume = 0.2 + Math.random() * 0.1; // 随机音量变化
            
            // 随机选择8秒音频中的一个0.15秒片段
            const randomStart = Math.random() * (this.keyboardAudio.duration - 0.15);
            audioClone.currentTime = randomStart;
            
            // 播放0.15秒后停止
            audioClone.play();
            setTimeout(() => {
                audioClone.pause();
                audioClone.currentTime = 0;
            }, 150);
            
        } catch (e) {
            console.log('音效播放失败:', e);
        }
    }

    // 创建覆盖层
    createOverlay(caseId) {
        const caseData = this.cases[caseId];
        
        const overlay = document.createElement('div');
        overlay.id = 'simpleMysteryOverlay';
        overlay.className = 'simple-mystery-overlay';
        
        overlay.innerHTML = `
            <div class="mystery-image-card">
                <img src="${caseData.image}" alt="${caseData.title}" class="mystery-image" id="mysteryImage">
                
                <button class="simple-close-btn" onclick="simpleMystery.close()">×</button>
                
                <button class="start-explore-btn" id="startExploreBtn" onclick="simpleMystery.startTyping()">
                    开始探索
                </button>
                
                <div class="text-overlay" id="textOverlay">
                    <div class="typewriter-text" id="typewriterText"></div>
                    <span class="simple-cursor" id="simpleCursor"></span>
                </div>
            </div>
        `;
        
        document.body.appendChild(overlay);
        
        // 绑定键盘事件
        document.addEventListener('keydown', this.handleKeyPress.bind(this));
    }

    // 启动测试
    start(caseId) {
        this.currentCase = caseId;
        this.createOverlay(caseId);
        
        const overlay = document.getElementById('simpleMysteryOverlay');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // 关闭测试
    close() {
        const overlay = document.getElementById('simpleMysteryOverlay');
        if (overlay) {
            overlay.classList.remove('active');
            setTimeout(() => {
                overlay.remove();
                document.body.style.overflow = '';
            }, 400);
        }
        this.stopTyping();
        this.currentCase = null;
    }

    // 开始打字
    startTyping() {
        if (this.isTyping || !this.currentCase) return;
        
        this.isTyping = true;
        this.currentText = '';
        this.fullText = this.cases[this.currentCase].content;
        
        const textOverlay = document.getElementById('textOverlay');
        const startBtn = document.getElementById('startExploreBtn');
        const textElement = document.getElementById('typewriterText');
        const cursor = document.getElementById('simpleCursor');
        
        // 隐藏开始按钮，显示文字覆盖层
        startBtn.classList.add('hidden');
        textOverlay.classList.add('active');
        cursor.style.display = 'inline-block';
        
        // 开始打字动画
        this.typeText(textElement);
    }

    // 打字动画
    typeText(element) {
        if (this.currentText.length < this.fullText.length) {
            this.currentText += this.fullText.charAt(this.currentText.length);
            element.textContent = this.currentText;
            
            // 播放机械键盘音效
            this.playKeyboardSound();
            
            // 自动滚动到底部
            element.scrollTop = element.scrollHeight;
            
            // 随机化打字速度，模拟真实打字感觉，进一步加大变化范围
            const randomDelay = this.typewriterSpeed + (Math.random() * 80 - 40);
            
            this.typewriterTimer = setTimeout(() => {
                this.typeText(element);
            }, randomDelay);
        } else {
            // 打字完成
            this.isTyping = false;
            const cursor = document.getElementById('simpleCursor');
            cursor.style.display = 'none';
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

    // 键盘事件处理
    handleKeyPress(e) {
        const overlay = document.getElementById('simpleMysteryOverlay');
        if (overlay && overlay.classList.contains('active')) {
            if (e.key === 'Escape') {
                this.close();
            }
        }
    }
}

// 全局实例
let simpleMystery = new SimpleMystery();

// 启动函数
function startSimpleMystery(caseId) {
    simpleMystery.start(caseId);
}

// 页面卸载时清理
window.addEventListener('beforeunload', () => {
    if (simpleMystery) {
        simpleMystery.close();
    }
});
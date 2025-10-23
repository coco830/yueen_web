// 发光粒子和电流效果脚本

class ParticlesEffect {
    constructor() {
        this.particlesContainer = null;
        this.electricContainer = null;
        this.init();
    }

    init() {
        // 创建粒子容器
        this.createParticlesContainer();
        
        // 创建电流效果容器
        this.createElectricContainer();
        
        // 生成粒子
        this.generateParticles();
        
        // 生成电流效果
        this.generateElectricEffects();
        
        // 绑定事件
        this.bindEvents();
    }

    createParticlesContainer() {
        this.particlesContainer = document.createElement('div');
        this.particlesContainer.className = 'particles-container';
        document.querySelector('.hero').appendChild(this.particlesContainer);
    }

    createElectricContainer() {
        this.electricContainer = document.createElement('div');
        this.electricContainer.className = 'electric-container';
        document.querySelector('.hero').appendChild(this.electricContainer);
    }

    generateParticles() {
        const particleCount = 30;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'glowing-particle';
            
            // 随机大小
            const size = Math.random() * 4 + 1;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // 随机位置
            const startX = Math.random() * 100;
            const startY = Math.random() * 100;
            particle.style.left = `${startX}%`;
            particle.style.top = `${startY}%`;
            
            // 随机移动方向和距离
            const tx = (Math.random() - 0.5) * 300;
            const ty = (Math.random() - 0.5) * 300;
            particle.style.setProperty('--tx', `${tx}vw`);
            particle.style.setProperty('--ty', `${ty}vh`);
            
            // 随机动画延迟和时长
            const delay = Math.random() * 15;
            const duration = 10 + Math.random() * 20;
            particle.style.animationDelay = `${delay}s`;
            particle.style.animationDuration = `${duration}s`;
            
            this.particlesContainer.appendChild(particle);
        }
    }

    generateElectricEffects() {
        // 生成电流线条（保持4条）
        const lineCount = 4;
        for (let i = 0; i < lineCount; i++) {
            const line = document.createElement('div');
            line.className = 'electric-line';
            
            // 随机位置
            const top = Math.random() * 100;
            line.style.top = `${top}%`;
            
            // 随机宽度
            const width = 20 + Math.random() * 30;
            line.style.width = `${width}%`;
            
            // 随机角度
            const angle = (Math.random() - 0.5) * 60;
            line.style.transform = `rotate(${angle}deg)`;
            
            // 随机动画延迟
            const delay = Math.random() * 5;
            line.style.animationDelay = `${delay}s`;
            
            this.electricContainer.appendChild(line);
        }
        
        // 生成电流节点（增加到20个）
        const nodeCount = 20;
        for (let i = 0; i < nodeCount; i++) {
            const node = document.createElement('div');
            node.className = 'electric-node';
            
            // 随机位置
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            node.style.left = `${left}%`;
            node.style.top = `${top}%`;
            
            // 随机动画延迟
            const delay = Math.random() * 3;
            node.style.animationDelay = `${delay}s`;
            
            this.electricContainer.appendChild(node);
        }
    }

    bindEvents() {
        // 鼠标移动时增加粒子效果
        document.querySelector('.hero').addEventListener('mousemove', (e) => {
            // 在鼠标位置附近生成临时粒子
            if (Math.random() > 0.7) { // 30%概率生成
                this.createTemporaryParticle(e);
            }
        });
    }

    createTemporaryParticle(e) {
        const particle = document.createElement('div');
        particle.className = 'glowing-particle';
        
        // 固定大小
        particle.style.width = '3px';
        particle.style.height = '3px';
        
        // 鼠标位置
        const rect = document.querySelector('.hero').getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        
        // 随机移动方向
        const tx = (Math.random() - 0.5) * 100;
        const ty = (Math.random() - 0.5) * 100;
        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);
        
        // 动画属性
        particle.style.animationDuration = '2s';
        
        this.particlesContainer.appendChild(particle);
        
        // 2秒后移除粒子
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 2000);
    }
}

// 页面加载完成后初始化粒子效果
document.addEventListener('DOMContentLoaded', () => {
    window.particlesEffect = new ParticlesEffect();
});
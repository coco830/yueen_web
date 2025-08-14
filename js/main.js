// 主要JavaScript功能

document.addEventListener('DOMContentLoaded', function() {
    // 移动端导航菜单切换
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // 初始化轮播
    initCarousel();
    
    // 平滑滚动
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 导航栏滚动效果
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.backgroundColor = '#fff';
                header.style.backdropFilter = 'none';
            }
        });
    }
    
    // 表单验证
    const contactForm = document.querySelector('#contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.querySelector('#name').value.trim();
            const company = document.querySelector('#company').value.trim();
            const phone = document.querySelector('#phone').value.trim();
            const email = document.querySelector('#email').value.trim();
            const message = document.querySelector('#message').value.trim();
            
            // 简单验证
            if (!name || !phone || !email || !message) {
                alert('请填写所有必填字段');
                return;
            }
            
            // 邮箱格式验证
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('请输入有效的邮箱地址');
                return;
            }
            
            // 手机号格式验证
            const phoneRegex = /^1[3-9]\d{9}$/;
            if (!phoneRegex.test(phone)) {
                alert('请输入有效的手机号码');
                return;
            }
            
            alert('感谢您的留言，我们会尽快与您联系！');
            contactForm.reset();
        });
    }
    
    // 案例筛选功能
    const filterBtns = document.querySelectorAll('.filter-btn');
    const caseItems = document.querySelectorAll('.case-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 移除所有活动状态
            filterBtns.forEach(b => b.classList.remove('active'));
            // 添加当前按钮的活动状态
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            caseItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // 案例详情模态框
    const caseCards = document.querySelectorAll('.case-item');
    const modal = document.querySelector('.case-modal');
    const modalClose = document.querySelector('.modal-close');
    
    if (modal) {
        caseCards.forEach(card => {
            card.addEventListener('click', function() {
                const title = this.querySelector('.case-title').textContent;
                const client = this.querySelector('.case-client').textContent;
                const description = this.querySelector('.case-description').textContent;
                
                // 更新模态框内容
                modal.querySelector('.modal-title').textContent = title;
                modal.querySelector('.modal-body').innerHTML = `
                    <div class="modal-image" style="background-image: url('images/case-detail.jpg')"></div>
                    <div class="modal-section">
                        <div class="modal-section-title">项目客户</div>
                        <div class="modal-section-content">${client}</div>
                    </div>
                    <div class="modal-section">
                        <div class="modal-section-title">项目背景</div>
                        <div class="modal-section-content">${description}</div>
                    </div>
                    <div class="modal-section">
                        <div class="modal-section-title">解决方案</div>
                        <div class="modal-section-content">我们为客户提供了全面的环保解决方案，包括环境影响评价、污染治理工程设计与施工、环保设备安装调试等一站式服务。通过科学的治理方案和先进的环保技术，有效解决了客户面临的环保问题。</div>
                    </div>
                    <div class="modal-section">
                        <div class="modal-section-title">项目成果</div>
                        <div class="modal-section-content">项目完成后，客户的污染物排放达到国家标准，获得了环保部门的认可，同时为企业节约了运营成本，提升了企业形象。</div>
                    </div>
                `;
                
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
        });
        
        // 关闭模态框
        if (modalClose) {
            modalClose.addEventListener('click', function() {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        }
        
        // 点击背景关闭模态框
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // 动画效果
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 为需要动画的元素添加观察
    const animatedElements = document.querySelectorAll('.service-card, .case-card, .news-card, .team-member');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// 获取报价按钮功能
function getQuote() {
    window.location.href = 'contact.html';
}

// 轮播功能
let currentSlideIndex = 0;
let slides, indicators, autoSlideInterval;

function initCarousel() {
    slides = document.querySelectorAll('.carousel-slide');
    indicators = document.querySelectorAll('.indicator');
    
    if (slides.length === 0) return;
    
    // 自动轮播
    startAutoSlide();
    
    // 添加点击事件到每个slide
    slides.forEach((slide, index) => {
        slide.addEventListener('click', function() {
            const service = slide.getAttribute('data-service');
            jumpToService(service);
        });
    });
    
    // 鼠标悬停暂停自动轮播
    const heroCarousel = document.querySelector('.hero-carousel');
    if (heroCarousel) {
        heroCarousel.addEventListener('mouseenter', function() {
            clearInterval(autoSlideInterval);
        });
        
        heroCarousel.addEventListener('mouseleave', function() {
            startAutoSlide();
        });
    }
}

function showSlide(index) {
    if (!slides || slides.length === 0) return;
    
    // 移除所有active类
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // 添加active类到当前slide
    slides[index].classList.add('active');
    indicators[index].classList.add('active');
    
    currentSlideIndex = index;
}

function nextSlide() {
    if (!slides || slides.length === 0) return;
    const nextIndex = (currentSlideIndex + 1) % slides.length;
    showSlide(nextIndex);
    resetAutoSlide();
}

function previousSlide() {
    if (!slides || slides.length === 0) return;
    const prevIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
    showSlide(prevIndex);
    resetAutoSlide();
}

function currentSlide(index) {
    showSlide(index - 1);
    resetAutoSlide();
}

function startAutoSlide() {
    if (!slides || slides.length === 0) return;
    autoSlideInterval = setInterval(() => {
        nextSlide();
    }, 4000); // 每4秒切换一次
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

function jumpToService(service) {
    // 跳转到服务页面的具体内容
    let targetUrl = 'services.html';
    
    switch(service) {
        case 'huance':
            targetUrl = 'services.html#huance';
            break;
        case 'huanxie':
            targetUrl = 'services.html#huanxie';
            break;
        case 'huanze':
            targetUrl = 'services.html#huanze';
            break;
    }
    
    window.location.href = targetUrl;
}

// 返回顶部功能
window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    let backToTop = document.querySelector('.back-to-top');
    
    if (!backToTop) {
        backToTop = document.createElement('div');
        backToTop.className = 'back-to-top';
        backToTop.innerHTML = '↑';
        backToTop.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background-color: var(--primary-color);
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-size: 20px;
            font-weight: bold;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
        `;
        document.body.appendChild(backToTop);
        
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    if (scrollTop > 300) {
        backToTop.style.opacity = '1';
        backToTop.style.visibility = 'visible';
    } else {
        backToTop.style.opacity = '0';
        backToTop.style.visibility = 'hidden';
    }
});
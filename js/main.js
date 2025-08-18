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
    
    // 平滑滚动 - 支持固定头部偏移
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // 计算固定头部的高度
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 0;
                const offset = 20; // 额外偏移量
                
                // 计算目标位置
                const targetPosition = targetElement.offsetTop - headerHeight - offset;
                
                // 平滑滚动到目标位置
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 导航栏滚动效果
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
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

// 手风琴组件功能
function toggleAccordion(element) {
    const accordionItem = element.parentElement;
    
    // 切换当前项的active状态
    accordionItem.classList.toggle('active');
    
    // 可选：关闭其他打开的手风琴项（如果需要一次只打开一个）
    // const allItems = document.querySelectorAll('.accordion-item');
    // allItems.forEach(item => {
    //     if (item !== accordionItem) {
    //         item.classList.remove('active');
    //     }
    // });
}

// 工作空间相册功能
let currentImageIndex = 0;
const galleryImages = [
    {
        src: '工作空间png图片/办公区域全景.jpg',
        title: '办公区域全景',
        description: '现代化开放式办公环境，为团队协作提供理想空间'
    },
    {
        src: '工作空间png图片/开放办公区.jpg',
        title: '开放办公区',
        description: '协作与创新的工作空间，激发团队创造力'
    },
    {
        src: '工作空间png图片/会议室.jpg',
        title: '会议室',
        description: '高效沟通的专业空间，支持各类商务会议'
    },
    {
        src: '工作空间png图片/行政办公室.jpg',
        title: '行政办公室',
        description: '安静专注的办公环境，提供优质的工作体验'
    },
    {
        src: '工作空间png图片/洽谈区.jpg',
        title: '洽谈区',
        description: '商务洽谈的理想场所，营造专业的商务氛围'
    },
    {
        src: '工作空间png图片/洽谈区2.jpg',
        title: '休闲洽谈区',
        description: '轻松舒适的交流空间，促进非正式沟通'
    }
];

function openWorkspaceGallery() {
    const modal = document.getElementById('workspaceGalleryModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        updateWorkspaceGalleryImage(0);
    }
}

function closeWorkspaceGallery() {
    const modal = document.getElementById('workspaceGalleryModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function updateWorkspaceGalleryImage(index) {
    if (index < 0 || index >= galleryImages.length) return;
    
    currentImageIndex = index;
    const image = galleryImages[index];
    
    // 更新主图片
    const mainImage = document.getElementById('mainImage');
    if (mainImage) {
        mainImage.src = image.src;
        mainImage.alt = image.title;
    }
    
    // 更新图片信息
    const imageTitle = document.getElementById('imageTitle');
    if (imageTitle) {
        imageTitle.textContent = image.title;
    }
    
    const imageDescription = document.getElementById('imageDescription');
    if (imageDescription) {
        imageDescription.textContent = image.description;
    }
    
    // 更新计数器
    const currentImageIndexEl = document.getElementById('currentImageIndex');
    if (currentImageIndexEl) {
        currentImageIndexEl.textContent = index + 1;
    }
    
    // 更新缩略图激活状态
    const thumbnails = document.querySelectorAll('#workspaceGalleryModal .thumbnail');
    thumbnails.forEach((thumbnail, i) => {
        if (i === index) {
            thumbnail.classList.add('active');
        } else {
            thumbnail.classList.remove('active');
        }
    });
}

function selectImage(index) {
    updateWorkspaceGalleryImage(index);
}

function prevImage() {
    const newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : galleryImages.length - 1;
    updateWorkspaceGalleryImage(newIndex);
}

function nextImage() {
    const newIndex = currentImageIndex < galleryImages.length - 1 ? currentImageIndex + 1 : 0;
    updateWorkspaceGalleryImage(newIndex);
}

// 键盘导航
document.addEventListener('keydown', function(e) {
    const modal = document.getElementById('workspaceGalleryModal');
    if (modal && modal.classList.contains('active')) {
        switch(e.key) {
            case 'ArrowLeft':
                prevImage();
                break;
            case 'ArrowRight':
                nextImage();
                break;
            case 'Escape':
                closeWorkspaceGallery();
                break;
        }
    }
});

// 点击模态框背景关闭
document.addEventListener('click', function(e) {
    const modal = document.getElementById('workspaceGalleryModal');
    if (e.target === modal) {
        closeWorkspaceGallery();
    }
});

// 团队风采相册功能
let currentTeamImageIndex = 0;
const teamGalleryImages = [
    {
        src: '团队风采png/77bbb7cc8f6fe4baf07e3dec0a9bc9a9.jpg',
        title: '团队建设活动',
        description: '团队成员共同参与建设活动，增进了解，促进协作'
    },
    {
        src: '团队风采png/373a9ef3cd0c9154aba05d5bf79a73d9.jpg',
        title: '技术交流研讨',
        description: '技术团队开展深度交流，分享专业知识和经验'
    },
    {
        src: '团队风采png/ec6c1eb759493732b1e6ad906ecb861a.jpg',
        title: '项目讨论会议',
        description: '项目团队举行会议，讨论方案实施和优化'
    },
    {
        src: '团队风采png/705a4ffd0c4e5868fc1a2ffc6b3e7903.jpg',
        title: '团队协作工作',
        description: '各部门协同合作，共同推进项目进展'
    },
    {
        src: '团队风采png/f9bee9526a0e91eb57db8a1e120b261c.jpg',
        title: '员工培训现场',
        description: '定期开展专业培训，提升团队能力水平'
    },
    {
        src: '团队风采png/e99a06d7c99641137b76f4a611cee0b9.jpg',
        title: '团队成果分享',
        description: '分享项目成果和工作心得，互相学习进步'
    },
    {
        src: '团队风采png/8a0684c61237d497b16eab547435cc14.jpg',
        title: '业务交流会',
        description: '内部业务交流，提升服务质量和专业水平'
    },
    {
        src: '团队风采png/180405fec2b76c1c62f37778c260a595.jpg',
        title: '团队拓展活动',
        description: '户外拓展训练，增强团队凝聚力和协作能力'
    },
    {
        src: '团队风采png/a4300601d081b1ba75c2f7022f89ae78.jpg',
        title: '团队聚餐活动',
        description: '团队聚餐交流，增进同事间的友谊和了解'
    },
    {
        src: '团队风采png/4afd8de0dd1c20cdbaa2627cee033511.jpg',
        title: '户外团建活动',
        description: '户外团建活动，放松心情，增强团队向心力'
    },
    {
        src: '团队风采png/6eddcfc1a7c8f398fbedbfcbd427c94b.jpg',
        title: '节日庆祝活动',
        description: '庆祝传统节日，体现企业人文关怀'
    },
    {
        src: '团队风采png/2d6eda6618839061dc33600953ab2a6f.jpg',
        title: '团队合影留念',
        description: '记录美好时光，见证团队成长历程'
    }
];

function openTeamGallery() {
    const modal = document.getElementById('teamGalleryModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        updateTeamGalleryImage(0);
    }
}

function closeTeamGallery() {
    const modal = document.getElementById('teamGalleryModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function updateTeamGalleryImage(index) {
    if (index < 0 || index >= teamGalleryImages.length) return;
    
    currentTeamImageIndex = index;
    const image = teamGalleryImages[index];
    
    const mainImage = document.getElementById('teamMainImage');
    if (mainImage) {
        mainImage.src = image.src;
        mainImage.alt = image.title;
    }
    
    const imageTitle = document.getElementById('teamImageTitle');
    if (imageTitle) {
        imageTitle.textContent = image.title;
    }
    
    const imageDescription = document.getElementById('teamImageDescription');
    if (imageDescription) {
        imageDescription.textContent = image.description;
    }
    
    const currentIndexEl = document.getElementById('teamCurrentIndex');
    if (currentIndexEl) {
        currentIndexEl.textContent = index + 1;
    }
    
    const thumbnails = document.querySelectorAll('#teamGalleryModal .thumbnail');
    thumbnails.forEach((thumbnail, i) => {
        if (i === index) {
            thumbnail.classList.add('active');
        } else {
            thumbnail.classList.remove('active');
        }
    });
}

function selectTeamImage(index) {
    updateTeamGalleryImage(index);
}

function prevTeamImage() {
    const newIndex = currentTeamImageIndex > 0 ? currentTeamImageIndex - 1 : teamGalleryImages.length - 1;
    updateTeamGalleryImage(newIndex);
}

function nextTeamImage() {
    const newIndex = currentTeamImageIndex < teamGalleryImages.length - 1 ? currentTeamImageIndex + 1 : 0;
    updateTeamGalleryImage(newIndex);
}

// 工作风采相册功能
let currentWorkImageIndex = 0;
const workGalleryImages = [
    {
        src: '工作风采png/0298a5e59bcbf8d545e628b17c08e944.jpg',
        title: '环境监测现场',
        description: '专业团队在现场进行环境监测，确保数据准确可靠'
    },
    {
        src: '工作风采png/fb1962bab16c4ee8314d07d25b8b6771.jpg',
        title: '设备维护作业',
        description: '技术人员对环保设备进行维护，保障设备正常运行'
    },
    {
        src: '工作风采png/c068e53512469d1fe84a16dea5e4225e.jpg',
        title: '技术研发工作',
        description: '研发团队专注技术创新，推动环保技术发展'
    },
    {
        src: '工作风采png/8b5f1038aba53e4a04412516f9b7fddb.jpg',
        title: '数据分析处理',
        description: '数据专员分析环境数据，为决策提供科学依据'
    },
    {
        src: '工作风采png/d0d50b9752bebb6d01bbe1f7d94ad882.jpg',
        title: '客户沟通洽谈',
        description: '与客户深入沟通，了解需求，提供专业建议'
    },
    {
        src: '工作风采png/e9c5997c054f4041185c6d9804697702.jpg',
        title: '项目汇报展示',
        description: '向客户汇报项目进展，展示专业能力和成果'
    },
    {
        src: '工作风采png/828b4247c6ee168d797a946e2111869e.jpg',
        title: '方案验收交付',
        description: '项目完成后的验收交付，确保客户满意'
    }
];

function openWorkGallery() {
    const modal = document.getElementById('workGalleryModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        updateWorkGalleryImage(0);
    }
}

function closeWorkGallery() {
    const modal = document.getElementById('workGalleryModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function updateWorkGalleryImage(index) {
    if (index < 0 || index >= workGalleryImages.length) return;
    
    currentWorkImageIndex = index;
    const image = workGalleryImages[index];
    
    const mainImage = document.getElementById('workMainImage');
    if (mainImage) {
        mainImage.src = image.src;
        mainImage.alt = image.title;
    }
    
    const imageTitle = document.getElementById('workImageTitle');
    if (imageTitle) {
        imageTitle.textContent = image.title;
    }
    
    const imageDescription = document.getElementById('workImageDescription');
    if (imageDescription) {
        imageDescription.textContent = image.description;
    }
    
    const currentIndexEl = document.getElementById('workCurrentIndex');
    if (currentIndexEl) {
        currentIndexEl.textContent = index + 1;
    }
    
    const thumbnails = document.querySelectorAll('#workGalleryModal .thumbnail');
    thumbnails.forEach((thumbnail, i) => {
        if (i === index) {
            thumbnail.classList.add('active');
        } else {
            thumbnail.classList.remove('active');
        }
    });
}

function selectWorkImage(index) {
    updateWorkGalleryImage(index);
}

function prevWorkImage() {
    const newIndex = currentWorkImageIndex > 0 ? currentWorkImageIndex - 1 : workGalleryImages.length - 1;
    updateWorkGalleryImage(newIndex);
}

function nextWorkImage() {
    const newIndex = currentWorkImageIndex < workGalleryImages.length - 1 ? currentWorkImageIndex + 1 : 0;
    updateWorkGalleryImage(newIndex);
}

// 为新相册添加键盘导航和背景点击关闭
document.addEventListener('keydown', function(e) {
    const teamModal = document.getElementById('teamGalleryModal');
    const workModal = document.getElementById('workGalleryModal');
    
    if (teamModal && teamModal.classList.contains('active')) {
        switch(e.key) {
            case 'ArrowLeft':
                prevTeamImage();
                break;
            case 'ArrowRight':
                nextTeamImage();
                break;
            case 'Escape':
                closeTeamGallery();
                break;
        }
    }
    
    if (workModal && workModal.classList.contains('active')) {
        switch(e.key) {
            case 'ArrowLeft':
                prevWorkImage();
                break;
            case 'ArrowRight':
                nextWorkImage();
                break;
            case 'Escape':
                closeWorkGallery();
                break;
        }
    }
});

document.addEventListener('click', function(e) {
    const teamModal = document.getElementById('teamGalleryModal');
    const workModal = document.getElementById('workGalleryModal');
    
    if (e.target === teamModal) {
        closeTeamGallery();
    }
    
    if (e.target === workModal) {
        closeWorkGallery();
    }
});

// 核心人员个人简介功能
const memberProfiles = {
    yaoxiao: {
        name: '姚晓',
        position: '创始人',
        photo: '核心人员简介和照片/姚晓（创始人）.jpg',
        bio: `我的人生上半场，是一场跨界的探索之旅。我并非科班出身的环保专家，手持新闻系的文凭，一头扎进了社会的洪流。那时的我，对未来并没有清晰的规划，只觉得人生在于体验，在于活着本身。正是这份随性，引领我踏入了迥然不同的行业，从严谨的工程建设，到高效的机场物流；从见证城市崛起的大型地产项目，到运筹帷幄的人力资源管理；再到深入城市肌理的环卫服务，乃至于后来自主创业，涉足品质生活相关的产业。

现在回想，这段看似毫无关联的经历，却是我人生中最宝贵的财富。它让我以"局内人"的身份，观察和体验了不同业态的运作逻辑与人间百态。在一次次的角色转换中，我逐渐养成了一种习惯：无论面对何种挑战，都全力以赴。我从不预设结果，只坚守一个简单的原则——做事不能让别人感到难堪或为难。我始终相信，事"能不能做"和"能不能做到"是两个概念，不亲自尝试，可能性永远为零；去做了，至少未来可期。

在这些历练中，我渐渐发现，多做一些、多付出一点，并不是一种"吃亏"，而是一种让自己内心充实的方式。这种无需交换的付出，让我找到了与人、与事最纯粹的连接。也正是在这个过程中，我对"服务"二字有了更深的理解，并找到了自己真正的热情所在——我最大的快乐，源于看到他人的笑容因我而起，源于感受到自己被他人真诚地需要着。

于是，一个更深层次的问题开始萦绕在我心头：我还能为这个社会做些什么？什么样的事情，是大众真正需要，又能让我倾注所有热情的？带着这个疑问，我将目光投向了我们赖以生存的环境。2019年6月28日，我做出了人生中一个重要的决定，创立了这家环保服务公司。我的初衷简单而纯粹：希望未来的每一个人，都能在健康、洁净的环境中生活。

我深知自己不是环保领域的权威，身后也没有雄厚的资本支持，但我拥有一份不可动摇的信念——一份渴望通过自己的努力去造福社会、守护未来的信念。创立"环保管家"，对我而言，不仅是开启一份事业，更是践行一份承诺。我走的每一步，或许微小，但都无比坚定。即便我无法亲眼看到终点的盛景，我们今天的努力，也能为后人铺就一条更宽阔的道路。哪怕只是为他们提供一些宝贵的经验，那也是我们存在的价值。我们愿成为您最值得信赖的伙伴，共同守护我们的绿色家园。`
    },
    wangyilu: {
        name: '王绎潞',
        position: '行政副总 / 股东',
        photo: '核心人员简介和照片/王绎璐（行政副总）.jpg',
        bio: `我叫王绎潞，作为悦恩环保的新股东及行政副总，我带着16年在医疗行政管理与金融行业的双重积淀，满怀热忱地投身于我所信仰的环保事业。我的职业生涯始终围绕着一个核心展开：为高层管理者提供坚实的战略支持与"零失误"的高效执行。今天，我将这份核心能力注入悦恩环保，致力于将"环保管家"服务提升至一个全新的战略高度，为我们的客户乃至整个社会创造更深远的价值。

"环保管家"是一项要求极高专业性、系统性和前瞻性的综合服务。它不仅仅是解决单一环境问题的"医生"，更是需要全面诊断、系统规划、长期跟踪的"健康管理者"。这与我过去8年在综合医院的行政管理经验形成了完美的共鸣。在医院，我所面对的是一个庞大而复杂的生命系统，需要全面统筹运营、人力、后勤及党建等多个维度，确保每一个环节都精准、高效、合规。我主导搭建的行政管理体系，涵盖了从宏观的院务公开、外联接待到微观的医务人员注册管理，确保了医院这台"精密仪器"的平稳运行。我将把这种"运筹帷幄、决胜千里"的系统性管理思维，完整地迁移到悦恩环保的"环保管家"服务中。无论是为工业园区进行全面的环保合规性排查，还是为企业定制全生命周期的环境解决方案，我都能从顶层设计入手，构建清晰、高效、可执行的管理路径，确保我们的服务不仅能"治已病"，更能"防未病"，真正成为客户值得信赖的环境健康守护者。

人才是事业的基石，环保事业尤其需要一支高度专业、富有责任感的团队。我在医院管理期间，成功建立了完善的人才梯队，制定了从招聘、绩效到培训的全套体系，并主导医护人员技术档案管理，实现了人力资源的优化配置，有力地支持了医疗质量的提升。更重要的是，我深谙劳动关系管理之道，通过平衡员工权益与医院效益，实现了8年内团队零重大劳动纠纷的佳绩。这份"组织发展能手"的经验，将是我为悦恩环保带来的核心价值之一。我将致力于为公司打造一支业内顶尖的"环保管家"专家团队，通过科学的绩效激励与持续的专业培训，激发团队潜能，提升服务质量。一个稳定、专业且充满凝聚力的团队，将是我们为客户提供卓越服务的根本保障。

我深知，环保事业的推进，离不开资源的有效整合与资本的强大助力。我过往的金融行业背景，为此提供了独特的跨领域优势。在平安银行担任支行副行长期间，我曾在1年内实现新增财富管理资产3亿元的突破；而在民生银行的7年运营生涯中，6次荣获"年度优秀员工"的经历，让我对金融服务与风险控制有了深刻的理解。如今，绿色金融方兴未艾，正成为推动环保产业发展的强大引擎。我将充分利用我在金融领域积累的资源与洞察力，探索"环保+金融"的创新模式，为公司的环保项目链接有效的资本支持，同时也为我们的客户在绿色信贷、绿色债券等方面提供增值咨询服务，助力他们实现经济效益与环境效益的双赢。

此外，作为一名经验丰富的党支部书记，我善于通过党建活动来凝聚团队、驱动业务发展。这种将思想建设与企业经营深度融合的能力，将为悦恩环保的企业文化注入"红色动力"，强化团队的使命感与社会责任感，确保公司的发展始终与国家生态文明建设的宏观战略同频共振。

我的职业信仰是"在合规框架下突破创新，以'零失误'标准赋能高管实现战略目标"。加入悦恩环保，我将坚守这一信仰，把我在大型组织中练就的战略支持能力、高效执行力与资源整合能力，全面投入到这份守护绿水青山的事业中。我坚信，我的加入，将为悦恩环保的"环保管家"服务带来更精细化的管理、更专业化的团队、更多元化的资源和更具前瞻性的战略布局，与公司一同开创环保服务的新篇章。`
    },
    zhouzheng: {
        name: '周政',
        position: '股东 / 高校体育教师',
        photo: '核心人员简介和照片/周政.jpg',
        bio: `我叫周政，来自吉林，一个在彩云之南生活和工作多年的东北人。我当前最核心的身份，是一名在高校体育教育领域深耕了十五年的教师。然而，在我的名片上，还有一个特殊的头衔——悦恩环保的股东。这两个看似毫无关联的身份，却在我的人生中交织，共同指向一个朴素的信念：为有价值的事业，尽我所能。

在踏上三尺讲台之前，我的人生轨迹颇为曲折。2006年，我从云南师范大学数学学院毕业，凭借对逻辑与结构的热爱，我曾是一名获得CCNP认证的网络系统工程师，也曾是商海中一名敢于拼搏的创业者，创办过自己的电动车行。这些经历，没少磨砺我的心性，但最终，我选择听从内心的热爱，重返校园，于2013年在云南师范大学体育学院获得教育学硕士学位，并开启了我至今为之奋斗的体育教育事业。

我与悦恩环保的缘分，始于一场纯粹的信任。我不懂环保的技术细节，也并非公司的在岗员工。我成为股东的唯一原因，是我对我的兄弟姚晓那份无条件的信任。我坚信他的人品，更认同他所投身的环保事业是一项于社会有益的善举。在我看来，支持一件正确的事，无论结果如何，其过程本身就意义非凡。能为这份善举尽一份绵薄之力，我便心满意足。

或许有人会问，一个体育老师，能为一家环保公司带来什么？起初，我也只是抱着"帮忙不添乱"的想法。公司有重大决策，我凭借过往的多元经验，提供一个客观的旁观者视角；大家工作疲惫，我便利用专业所长，教教太极拳，帮助大家调养身心。但随着公司发展，我逐渐意识到，我这十五年的高校教学生涯，正是一笔可以为公司持续赋能的宝贵财富。

我的核心价值，在于为公司搭建一座连接高校与社会的"人才桥梁"。一个企业的未来，归根结底是人才的未来。作为一名大学教师，我身处人才培养的第一线。我所能做的，远不止是推荐几名优秀毕业生那么简单。

首先，我能实现人才的精准筛选与长期观察。通过数年的课堂教学与课外互动，我对学生的专业能力、性格特质、抗压能力和团队协作精神有着超越简历和面试的深入了解。我可以从源头上为公司发掘和培养那些不仅业务过硬，更具备坚韧品格和奉献精神的年轻力量，大大提升了人才引进的成功率和稳定性。

其次，我致力于推动深度的校企合作。我可以作为纽带，促成公司与高校建立实习基地、开展项目合作、设立奖学金等。这不仅能为公司提供源源不断的新鲜血液，更能借助高校的科研实力和学术声誉，提升悦恩环保在行业内的品牌形象和社会影响力，实现企业发展与人才培养的双赢。

再者，我将体育精神融入企业文化建设。体育的精髓，不仅在于强健体魄，更在于塑造人的品格——拼搏、坚持、协作、永不言败。我将这些理念带入公司，倡导健康的工作与生活方式。我相信，一个拥有健康体魄和积极心态的团队，才具备最强的战斗力和凝聚力。这种精神内核，正是一个企业在激烈竞争中脱颖而出的关键软实力。

生活中的我，健谈，爱酒，享受与朋友们杯酒言欢的快意人生。我的人生格言很简单：健康的活着就是最大的财富。这份"健康"，既指个人的身心康健，也指我们所处环境的生态健康，更指一个企业的文化健康。在悦恩环保，我找到了这三者的完美契合点。我将继续立足于我的三尺讲台，同时，也愿用我十五年教书育人积累的经验与资源，为我所信任的兄弟和我们共同的环保事业，贡献我最独特、最坚实的力量。`
    }
};

function openMemberProfile(memberId) {
    const profile = memberProfiles[memberId];
    if (!profile) return;
    
    const modal = document.getElementById('memberProfileModal');
    const profilePhoto = document.getElementById('profilePhoto');
    const profileName = document.getElementById('profileName');
    const profilePosition = document.getElementById('profilePosition');
    const profileBio = document.getElementById('profileBio');
    
    if (modal && profilePhoto && profileName && profilePosition && profileBio) {
        // 设置照片
        profilePhoto.src = profile.photo;
        profilePhoto.alt = profile.name;
        
        // 设置基本信息
        profileName.textContent = profile.name;
        profilePosition.textContent = profile.position;
        
        // 设置个人简介（将文本转换为段落）
        const paragraphs = profile.bio.split('\n\n').filter(p => p.trim());
        profileBio.innerHTML = paragraphs.map(p => `<p>${p.trim()}</p>`).join('');
        
        // 显示模态框
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeMemberProfile() {
    const modal = document.getElementById('memberProfileModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// 为个人简介模态框添加键盘和背景点击关闭
document.addEventListener('keydown', function(e) {
    const profileModal = document.getElementById('memberProfileModal');
    
    if (profileModal && profileModal.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeMemberProfile();
        }
    }
});

document.addEventListener('click', function(e) {
    const profileModal = document.getElementById('memberProfileModal');
    
    if (e.target === profileModal) {
        closeMemberProfile();
    }
});

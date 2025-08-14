// 图片查看器功能
document.addEventListener('DOMContentLoaded', function() {
    // 获取模态框元素
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const captionText = document.getElementById('imageCaption');
    const closeBtn = document.getElementsByClassName('close-modal')[0];
    
    // 为所有资质和专利图片添加点击事件
    const qualImages = document.querySelectorAll('.qual-image img');
    qualImages.forEach(img => {
        img.style.cursor = 'pointer'; // 添加鼠标指针样式
        img.addEventListener('click', function() {
            modal.style.display = 'block';
            modalImg.src = this.src;
            captionText.innerHTML = this.alt || this.parentElement.nextElementSibling.textContent;
        });
    });
    
    // 点击关闭按钮关闭模态框
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // 点击模态框外部区域关闭模态框
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // 按ESC键关闭模态框
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });
});
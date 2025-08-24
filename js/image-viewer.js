// 图片查看器功能
document.addEventListener('DOMContentLoaded', function() {
    // 获取模态框元素
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const captionText = document.getElementById('imageCaption');
    const closeBtn = document.getElementsByClassName('close-modal')[0];
    
    // 缩放相关变量
    let scale = 1;
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let translateX = 0;
    let translateY = 0;
    
    // 重置缩放和位置
    function resetImageTransform() {
        scale = 1;
        translateX = 0;
        translateY = 0;
        modalImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
        modalImg.style.cursor = 'zoom-in';
    }
    
    // 更新图片变换
    function updateImageTransform() {
        modalImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
        modalImg.style.cursor = scale > 1 ? 'grab' : 'zoom-in';
    }
    
    // 为所有资质和专利图片添加点击事件
    const qualImages = document.querySelectorAll('.qual-image img');
    qualImages.forEach(img => {
        img.style.cursor = 'pointer'; // 添加鼠标指针样式
        img.addEventListener('click', function() {
            modal.style.display = 'block';
            modalImg.src = this.src;
            captionText.innerHTML = this.alt || this.parentElement.nextElementSibling.textContent;
            resetImageTransform(); // 重置缩放状态
        });
    });
    
    // 鼠标滚轮缩放功能
    modalImg.addEventListener('wheel', function(event) {
        event.preventDefault(); // 阻止页面滚动
        
        const delta = event.deltaY * -0.01;
        const newScale = Math.min(Math.max(0.5, scale + delta), 3); // 限制缩放范围 0.5x - 3x
        
        if (newScale !== scale) {
            // 获取鼠标在图片中的位置
            const rect = modalImg.getBoundingClientRect();
            const mouseX = event.clientX - rect.left - rect.width / 2;
            const mouseY = event.clientY - rect.top - rect.height / 2;
            
            // 计算缩放中心点偏移
            const scaleRatio = newScale / scale;
            translateX = translateX * scaleRatio + mouseX * (1 - scaleRatio);
            translateY = translateY * scaleRatio + mouseY * (1 - scaleRatio);
            
            scale = newScale;
            updateImageTransform();
        }
    });
    
    // 鼠标拖拽功能（仅在放大时启用）
    modalImg.addEventListener('mousedown', function(event) {
        if (scale > 1) {
            isDragging = true;
            startX = event.clientX - translateX;
            startY = event.clientY - translateY;
            modalImg.style.cursor = 'grabbing';
            event.preventDefault(); // 防止选中文本
        }
    });
    
    document.addEventListener('mousemove', function(event) {
        if (isDragging && scale > 1) {
            translateX = event.clientX - startX;
            translateY = event.clientY - startY;
            updateImageTransform();
        }
    });
    
    document.addEventListener('mouseup', function() {
        if (isDragging) {
            isDragging = false;
            modalImg.style.cursor = scale > 1 ? 'grab' : 'zoom-in';
        }
    });
    
    // 双击重置缩放
    modalImg.addEventListener('dblclick', function() {
        resetImageTransform();
    });
    
    // 点击关闭按钮关闭模态框
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        resetImageTransform(); // 关闭时重置
    });
    
    // 点击模态框外部区域关闭模态框
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            resetImageTransform(); // 关闭时重置
        }
    });
    
    // 按ESC键关闭模态框
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            resetImageTransform(); // 关闭时重置
        }
    });
});
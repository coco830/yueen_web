// AI聊天悬浮窗脚本
document.addEventListener('DOMContentLoaded', function() {
    // 打开AI聊天窗口的函数
    window.openAIChat = function() {
        // 跳转到H5页面
        window.open('http://ai.yueen.cc', '_blank');
    };
    
    // 确保悬浮窗始终可见
    window.addEventListener('scroll', function() {
        const aiFloat = document.querySelector('.ai-chat-float');
        if (aiFloat) {
            // 悬浮窗始终保持在固定位置
            aiFloat.style.position = 'fixed';
        }
    });
});
@echo off
echo 正在清理无关文件...

del /f /q run_http_server.bat
del /f /q run_node_server.bat
del /f /q server.js
del /f /q simple_http_server.bat
del /f /q simple_server.bat
del /f /q start_server_ps.ps1
del /f /q view_website.bat

echo 清理完成！
pause
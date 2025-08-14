@echo off
cd /d "E:\yueen_web"
echo Starting web server...
echo Open your browser and go to: http://localhost:9000
python -m http.server 9000
pause

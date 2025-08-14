@echo off
cd /d "E:\悦恩网页"
echo Starting web server...
echo Open your browser and go to: http://localhost:8888
python -m http.server 8888
pause
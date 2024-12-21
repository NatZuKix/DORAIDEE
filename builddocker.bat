@echo off
echo Starting Docker container...
docker build -t int511/doraidee:1.0 .  
docker save -o doraidee.tar int511/doraidee:1.0  
echo create  Docker image successfully!
pause
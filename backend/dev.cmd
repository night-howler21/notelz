@echo off
cd /d "%~dp0"
set JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-21.0.12.101-hotspot
set PORT=8081
call "%~dp0mvnw.cmd" spring-boot:run > "%~dp0dev-server.log" 2>&1
echo EXITED WITH CODE %ERRORLEVEL% >> "%~dp0dev-server.log"

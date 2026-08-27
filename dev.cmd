@echo off
cd /d "%~dp0"
set PATH=C:\Program Files\nodejs;%PATH%
"C:\Program Files\nodejs\node.exe" node_modules\next\dist\bin\next dev

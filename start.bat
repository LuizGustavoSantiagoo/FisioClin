@echo off

echo Iniciando backend...
cd backend
start cmd /k gradlew bootRun
cd C:\Users\SantiagO\Desktop\FisioClin\FisioClin

echo Iniciando frontend...
start cmd /k ng serve
cd
@echo off 

rem This batch file builds application and deploys to GOV UK PaaS
rem Please supply environment(sandbox, staging or production) followed by PaaS username and password

set environment=%1
set username=%2
set password=%3

CALL npm run build-%environment%
cd dist
CALL cf login -u %username% -p %password% -o dof-dss -s %environment%
CALL cf push
cd ..
@echo off 

rem This batch file builds application and deploys to GOV UK PaaS
rem Please supply environment(sandbox, staging or production) followed by PaaS username

set environment=%1
set username=%2

CALL npm run build-%environment%
cd dist
CALL cf login -u %username% -o dof-dss -s %environment%
CALL cf push
cd ..
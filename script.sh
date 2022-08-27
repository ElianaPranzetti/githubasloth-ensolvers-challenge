#!/bin/bash
set -ex

cd backend/

npm install

npm run db:dev:restart 

npm run start & disown

cd ../frontend/

npm install

npm run dev

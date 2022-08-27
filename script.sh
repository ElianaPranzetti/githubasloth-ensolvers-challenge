#!/bin/bash
set -ex

cd backend/

npm run db:dev:restart 

npm run start & disown

cd ../frontend/

npm run dev

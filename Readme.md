# CLI Documentation For Microservices Architecture

# Servers monorepo setup

- nest new
- nest g app - users

# NPM Packages I will Use for Backend

- npm i @apollo/gateway @apollo/subgraph @nestjs/apollo @nestjs/graphql graphql class-validator bcrypt @types/bcrypt
- npm i express
- npm i "@nestjs/config"
- npm i @nestjs/jwt

# To start project

- npm run start:dev
- npm run start:dev projectName
- npm run start:dev gateway -sample

-ctrl+shift+k = remove a line of code
-ctrl+shift+ arrow = highlight the code want to copy

pm2 restart daily-check-service
pm2 logs daily-check-service
pm2 list
pm2 status
pm2 stop daily-check-service

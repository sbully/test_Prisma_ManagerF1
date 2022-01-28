# API to test Prisma

## install dependencies :

`npm install`

## create database:

Must have docker installed and run  
`docker-compose up`

# Prisma action

## create migration file

will name the file with the parameter name
`npx prisma migrate dev --name <migration name>`

## create tables:

will create migration file and ask for a migration name

`npx prisma migrate dev`

## seed tables:

`npx prisma db seed`

## reset all tables and apply migration and seed

will droop table then migrate and seed

`npx prisma migrate reset`

# push prisma schema to database

will update schema if needed then need to migrate db  
`npx prisma db push`  
dont forget to update table (reset)  
`npx prisma migrate reset`

## run projet :

`npm run start`

# API to test Prisma

## install dependencies :

`npm install`

## database création:

Must have docker installed and run
`docker-compose up`

# Prisma action

## create tables:

`npx prisma migrate dev`

## seed tables:

`npx prisma db seed`

## reset all tables and apply migration and seed

will droop table then migrate and seed

`npx prisma migrate reset`

## run projet :

`npm run start`

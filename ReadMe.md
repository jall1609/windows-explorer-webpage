# Windows Explorer Webapp

A simple web-based application for exploring and managing files through an interface similar to Windows Explorer.

## Project Backend
### Step Install : 
- Download Modules
```
npm install
```
- Setting .env  
Just Rename .env.example to .env if use my public database  
OR If use local database :   
Set DATABASE_URL to your localhost database  
Run Migration
```
npx prisma migrate deploy
```
Run Seeder
```
npm run seeder
```
- Build App
```
npm run build
```
- Run Web App
```
npm run start
```
#### Deployment
- Link : https://windows-explorer-backend.rijalf1609.my.id/docs

## Project Frontend
### Step Install : 
- Download Modules
```
npm install
```
- Rename .env.example to .env
- Build App
```
npm run build
```
- Run Web App
```
npm run dev
```
#### Deployment
- Link : https://windows-explorer.rijalf1609.my.id/

## Dummy User
#### Budi Wijaya
email : "budiwijaya@gmail.com" | username : "budiwijaya" password : "12345"

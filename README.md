# Umenit Project

## Description
This project is a monorepo containing both a frontend and a backend. The frontend is built with Vite and React, while the backend is built with NestJS.

## Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

## Getting Started

### Features
- Create a books
- Update a book
- Delete a book
- List all books
- Filter books by title and author
- pagination

### Installation
<!-- install the node modules -->
```bash
cd frontend
npm install
```

```bash
cd backend
npm install
```
<!-- setup postgres database -->
```bash
cd backend
touch .env
```

Add the following to the .env file
```bash
POSTGRES_URL="___postgres_url___"
```

### Running the project
On a root folder, run the following command to start the frontend and backend

we use turbo to run both the frontend and backend at the same time

setup turbo
```bash
npm install
```

<!-- run the project -->
```bash
npm run dev
```

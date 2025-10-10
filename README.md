# Cryptocurrency Tracker with WebSocket

![Screenshot](https://i.postimg.cc/P5kcsCWJ/screen.jpg)

A simple full‑stack project that streams live cryptocurrency prices from a Node.js backend to a React frontend over WebSockets. State is managed with Redux Toolkit and the UI is styled with Tailwind.

## Repository Structure

- App/ — Frontend (Vite + React + TypeScript)
  - src/
    - components/, pages/, store/, ws/
  - scripts: dev, build, preview, lint
- Backend/ — Backend (Node.js + TypeScript)
  - src/server.ts — WebSocket price broadcasting
  - dist/ — compiled JS output
  - scripts: build, start

## Features (Current)

- Real-time price updates via WebSocket
- Client-side state management with Redux Toolkit
- Basic routing with React Router
- Register/Login/Logout with JWT and MongoDB

## Tech Stack (Current)

- Frontend: React, React Router, Redux Toolkit, Tailwind, Vite, TypeScript
- Backend: Node.js, ws (WebSocket), Socket.IO (dependency available), TypeScript, Axios, dotenv
- Database: MongoDB
- Auth: JWT

## Installation

1. Clone the repository

- git clone <repo-url>
- cd websocket

2. Install dependencies

- Frontend
  - cd App
  - npm i
- Backend
  - cd ../Backend
  - npm i

3. Environment variables (Backend)

- Create a .env file in Backend/ if needed for external APIs

## Running the project (Development)

Terminal A — Backend

- cd Backend
- npm run build
- npm run start

Terminal B — Frontend

- cd App
- npm run dev

- Frontend dev server default: http://localhost:5173
- Backend runs Node at dist/server.js (check server port inside code, typically 3000 or similar)

## What’s Next

- Backend
- More deep API integration
- Frontend
  - Better UI/UX Dashboard.

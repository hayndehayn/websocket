# Cryptocurrency Tracker with WebSocket

![Screenshot](https://cdn.discordapp.com/attachments/1263643495688699949/1424326330131939359/screen.jpg?ex=68e38ac3&is=68e23943&hm=ed4cc889f819a920c11f1442e8359c886dac24c4d397252d3aaca65a8d8e8856&)

A simple full‑stack project that streams live cryptocurrency prices from a Node.js backend to a React frontend over WebSockets. State is managed with Redux Toolkit and the UI is styled with Tailwind.

## Repository Structure

- App/ — Frontend (Vite + React + TypeScript)
  - src/
    - components/, pages/, store/
  - scripts: dev, build, preview, lint
- Backend/ — Backend (Node.js + TypeScript)
  - src/server.ts — WebSocket price broadcasting
  - dist/ — compiled JS output
  - scripts: build, start

## Features (Current)

- Real-time price updates via WebSocket
- Client-side state management with Redux Toolkit
- Basic routing with React Router

## Tech Stack (Current)

- Frontend: React, React Router, Redux Toolkit, Tailwind, Vite, TypeScript
- Backend: Node.js, ws (WebSocket), Socket.IO (dependency available), TypeScript, Axios, dotenv
- Database: MongoDB (planned)
- Auth: JWT (planned)

## Installation

1. Clone the repository

- git clone <repo-url>
- cd websocket

2. Install dependencies

- Frontend
  - cd App
  - npm install
- Backend
  - cd ../Backend
  - npm install

3. Environment variables (Backend)

- Create a .env file in Backend/ if needed for external APIs (optional at this stage)

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
  - JWT-based authentication
  - Password hashing with bcrypt
  - REST API for auth and user data
  - Persisting data to MongoDB
- Frontend
  - Auth flows (login/register)
  - Protected routes and protected WebSocket channel
  - Dashboard view for tracked assets
  - Improved UI/UX

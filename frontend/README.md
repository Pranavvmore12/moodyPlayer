Deployed at: moody-player-1tsr.vercel.app

# Moody Player Frontend

A modern React + Vite frontend for mood-based music discovery. The app uses your webcam to detect facial expressions, identifies the dominant mood, and fetches matching songs from the backend for instant playback.

## Overview

- Detect user mood from webcam input
- Fetch songs based on the detected emotion
- Add new songs to the library
- Play or stop songs directly from the UI
- Responsive and lightweight interface

## UI Preview

![Moody Player UI](src/assets/hero.png)

## Tech Stack

- React 19
- Vite 8
- Face API for emotion detection
- CSS-in-JS styling with inline React styles

## Project Structure

```text
frontend/
  public/
    models/           # Face API model files
  src/
    Components/       # UI components such as mood detector and song list
    App.jsx           # Main application layout
    main.jsx          # Application entry point
```

## Prerequisites

- Node.js 18+ recommended
- npm or pnpm

## Installation

```bash
cd frontend
npm install
```

## Run Locally

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

## Available Scripts

- `npm run dev` – start the development server
- `npm run build` – create a production build
- `npm run preview` – preview the production build
- `npm run lint` – run the linter

## How It Works

1. The app loads face-detection models from the public folder.
2. The webcam captures the user’s face.
3. The detected emotion is mapped to a mood.
4. The frontend sends a request to the backend API to fetch matching songs.

## Notes

- The frontend uses a Vite proxy so API requests starting with `/api` are forwarded to the backend.
- The app expects the backend server to be running on port 3000.


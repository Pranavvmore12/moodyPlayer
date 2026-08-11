
Deployed at: moody-player-fawn.vercel.app 


# Moody Player Backend

This backend powers the API for the Moody Player application. It handles song storage, retrieval, MongoDB persistence, and audio upload integration through ImageKit.

## Overview

- Exposes REST APIs for song management
- Stores song metadata in MongoDB
- Uploads audio files to ImageKit
- Serves mood-based song queries for the frontend

## UI Preview

![Backend Flow](../frontend/src/assets/hero.png)

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- Multer for file uploads
- ImageKit for media hosting
- dotenv for environment configuration

## Project Structure

```text
backend/
  src/
    app.js
    db/
      db.js
    models/
      song.model.js
    routes/
      song.route.js
    service/
      imagekit.service.js
  server.js
```

## Prerequisites

- Node.js 18+
- MongoDB instance
- ImageKit account credentials

## Installation

```bash
cd backend
npm install
```

## Environment Variables

Create a `.env` file in the backend folder with the following values:

```env
MONGO_URI=your_mongodb_connection_string
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

## Run Locally

```bash
node server.js
```

The server will run on http://localhost:3000.

## API Endpoints

### POST /songs
Uploads a new song and stores it in MongoDB.

### GET /songs?mood=happy
Returns songs matching the requested mood.

## Notes

- The backend is mounted through the Express app in [src/app.js](src/app.js).
- Song routes are defined in [src/routes/song.route.js](src/routes/song.route.js).
- Audio uploads are handled in [src/service/imagekit.service.js](src/service/imagekit.service.js).

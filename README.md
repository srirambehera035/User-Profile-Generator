# User Profile Card Generator

A small full-stack web app for creating and displaying user profile cards. You fill in a name, a short bio, and an image URL through a form, the data is sent to a Node/Express backend via a `POST` request, and the backend returns a formatted profile card that gets rendered on the page — styled to look like a printed membership card.

This project was built as a hands-on exercise in handling `POST` requests and passing data between a backend and a frontend.

## Live demo

[(https://user-profile-generator.onrender.com)]

## Features

- A simple form to enter a name, bio, and image URL
- Server-side validation (name and bio are required; image URL must start with `http://` or `https://` if provided)
- A backend API built with Express that stores submitted profiles in memory
- A formatted, styled profile card rendered on the frontend after a successful submission
- Graceful fallback avatar (initials in a circle) if no image URL is provided or the image fails to load
- A separate `GET` endpoint to list every profile created during the current server session
- Clear error messages shown in the UI if the submission fails validation

## Tech stack

| Layer    | Technology                          |
|----------|--------------------------------------|
| Backend  | Node.js, Express                     |
| Frontend | Plain HTML, CSS, and vanilla JavaScript (`fetch` API) |
| Storage  | In-memory array (resets on server restart) |

No frontend framework, build step, or database is used — everything runs with just Node and a browser.

## Project structure

```
User-Profile-Generator/
├── server.js           # Express server and API routes
├── package.json         # Project metadata and dependencies
├── package-lock.json
├── .gitignore
└── public/
    ├── index.html        # Form and profile card markup + JS logic
    └── styles.css        # All styling
```

## How it works

1. The user fills in the **Name**, **Bio**, and **Image URL** fields and clicks **Submit**.
2. The frontend JavaScript reads the form values and sends them as JSON in a `POST` request to `/api/profile` using the `fetch` API.
3. The Express server receives the request, validates the data:
   - `name` and `bio` must be non-empty.
   - `imageUrl`, if provided, must start with `http://` or `https://`.
4. If validation fails, the server responds with a `400` status and a list of error messages, which the frontend displays.
5. If validation passes, the server creates a profile object (with an auto-incrementing `id` and a `createdAt` timestamp), stores it in memory, and responds with a `201` status and the saved profile data.
6. The frontend receives the response and renders it as a profile card — showing the name, bio, an avatar (image or initials fallback), and a small "issued" serial number and date, styled like a membership card.

## API reference

### `POST /api/profile`

Creates a new profile.

**Request body** (JSON):
```json
{
  "name": "Ada Lovelace",
  "bio": "Mathematician and writer, known for work on the Analytical Engine.",
  "imageUrl": "https://example.com/photo.jpg"
}
```

`imageUrl` is optional. If omitted, the frontend displays an initials-based avatar instead.

**Success response** — `201 Created`:
```json
{
  "data": {
    "id": 1,
    "name": "Ada Lovelace",
    "bio": "Mathematician and writer, known for work on the Analytical Engine.",
    "imageUrl": "https://example.com/photo.jpg",
    "createdAt": "2026-06-17T12:34:56.789Z"
  }
}
```

**Error response** — `400 Bad Request`:
```json
{
  "errors": [
    "Name is required.",
    "Bio is required."
  ]
}
```

### `GET /api/profiles`

Returns every profile created since the server last started.

**Response** — `200 OK`:
```json
{
  "data": [
    {
      "id": 1,
      "name": "Ada Lovelace",
      "bio": "Mathematician and writer.",
      "imageUrl": "https://example.com/photo.jpg",
      "createdAt": "2026-06-17T12:34:56.789Z"
    }
  ]
}
```

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 16 or later recommended)
- npm (comes bundled with Node.js)

### Installation and running locally

1. Clone the repository:
   ```
   git clone https://github.com/srirambehera035/User-Profile-Generator.git
   cd User-Profile-Generator
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the server:
   ```
   npm start
   ```

4. Open your browser and go to:
   ```
   http://localhost:3000
   ```

The server runs on port `3000` by default, or on the port specified by the `PORT` environment variable (used automatically by most hosting platforms).

## Notes and limitations

- **Data is not persisted.** Profiles are stored in a plain in-memory array, so all data is lost when the server restarts. This was a deliberate simplification for the scope of this project — adding a real database (such as SQLite or PostgreSQL) would be a natural next step.
- **No authentication.** Anyone with access to the app can create a profile; there's no concept of user accounts or ownership.
- **Image URLs are not validated for actual image content** — only that they look like a valid `http(s)` URL. A broken or non-image link will fall back to the initials avatar in the UI.

## Possible future improvements

- Persist profiles to a real database
- Add the ability to edit or delete existing profiles
- Add image upload support instead of requiring a hosted URL
- Add a gallery view of all created profiles using the existing `GET /api/profiles` endpoint
- Add basic rate limiting or spam protection on submissions

## License

This project is open source and available for personal or educational use.

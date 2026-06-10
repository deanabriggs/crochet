# Crochet Projects API

A RESTful API for managing crochet projects and contributors, built with Node.js, Express, and MongoDB. It features GitHub OAuth authentication, request validation, and interactive Swagger documentation.

## Overview

This API lets authenticated users create and manage a catalog of crochet projects (with details like yarn type, needle size, and pattern) along with the contributors associated with them. Read operations are public, while create, update, and delete operations require authentication via GitHub OAuth.

The project demonstrates a clean MVC-style structure (routes, controllers, middleware, data layer), server-side validation, OAuth-based auth with Passport, and auto-generated API documentation.

## Features

- Full CRUD for **projects** and **contributors**
- Public read access; protected write operations (POST/PUT/DELETE)
- GitHub OAuth authentication via Passport
- Server-side validation with express-validator
- Interactive API documentation with Swagger UI

## Tech Stack

| Area | Technology |
| --- | --- |
| Runtime | Node.js |
| Framework | Express |
| Database | MongoDB |
| Auth | Passport (passport-github2), express-session |
| Validation | express-validator |
| Docs | Swagger (swagger-autogen / swagger-ui-express) |

## API Endpoints

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| GET | `/projects` | No | Get all projects |
| GET | `/projects/:id` | No | Get a single project |
| POST | `/projects` | Yes | Create a project |
| PUT | `/projects/:id` | Yes | Update a project |
| DELETE | `/projects/:id` | Yes | Delete a project |
| GET | `/contributors` | No | Get all contributors |
| GET | `/contributors/:id` | No | Get a single contributor |
| POST | `/contributors` | Yes | Create a contributor |
| PUT | `/contributors/:id` | Yes | Update a contributor |
| DELETE | `/contributors/:id` | Yes | Delete a contributor |
| GET | `/login` / `/logout` | — | GitHub OAuth login / logout |
| GET | `/api-docs` | No | Swagger API documentation |

### Project fields

`title`, `category`, `yarnType`, `yarnQty`, `needle`, `picture` (optional), `pattern`

## Getting Started

Requires Node.js and a MongoDB database, plus a GitHub OAuth app for authentication.

```bash
git clone https://github.com/deanabriggs/crochet.git
cd crochet
npm install
```

Create a `.env` file in the project root:

```
MONGODB_URI=your_mongodb_connection_string
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
CALLBACK_URL=http://localhost:3000/github/callback
PORT=3000
```

Start the server:

```bash
npm start
```

Then visit `http://localhost:3000/api-docs` to explore the API in Swagger UI.

## Project Structure

- `routes/` — route definitions (projects, contributors, swagger)
- `controllers/` — request-handling logic
- `middleware/` — validation and authentication
- `data/` — MongoDB connection setup
- `server.js` — app entry point and Passport/OAuth configuration


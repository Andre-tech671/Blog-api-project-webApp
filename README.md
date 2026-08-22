# Blog API Project

A small full-stack blog application built for Angela Yu's Fullstack Web Development Bootcamp. It demonstrates how a REST API, a server-rendered EJS interface, and an in-memory data store work together.

```text
Browser -> server.js (EJS UI, port 3000) -> index.js (REST API, port 4000)
```

## Features

- List all blog posts.
- Create, edit, and delete posts through the web interface.
- Expose the same operations through a JSON REST API.
- Seed three example posts whenever the API process starts.

## Technology Stack

| Layer | Technology | Purpose |
| --- | --- | --- |
| Runtime | Node.js | Runs both servers |
| API and UI server | Express 4 | Routing and HTTP responses |
| UI rendering | EJS | Server-side HTML templates |
| HTTP client | Axios | UI-to-API requests |
| Body parsing | body-parser | JSON and URL-encoded request bodies |
| Styling | Plain CSS | Layout, forms, buttons, and post list |
| Persistence | JavaScript array | Temporary in-memory storage |

## Repository Structure

```text
.
├── index.js                 # REST API on port 4000
├── server.js                # EJS UI server and API proxy on port 3000
├── package.json             # Project metadata and npm scripts
├── package-lock.json        # Locked dependency tree
├── TODO.md                  # Deployment and merge notes
├── public/styles/main.css   # Browser styles
├── views/index.ejs          # Post list page
├── views/modify.ejs         # Create/edit form
└── docs/UI-DESIGN.md        # UI design and interaction specification
```

## Prerequisites And Installation

- Node.js 18 or newer is recommended.
- npm, included with Node.js.

```bash
npm install
```

`server.js` imports Axios. Axios is present in `package-lock.json`; if a clean install reports it missing, run `npm install axios`.

## Running Locally

The current implementation requires two terminals.

**Terminal 1: start the API**

```bash
node index.js
```

The API listens at `http://localhost:4000`.

**Terminal 2: start the web interface**

```bash
node server.js
```

Open `http://localhost:3000`. Start the API before the UI server so the home page can load posts.

> `package.json` currently points its `start` script at `App.js`, but `App.js` is not in the repository. Until the planned merge in `TODO.md` is completed, use the commands above.

## API Reference

The API base URL is `http://localhost:4000`.

### Post resource

```json
{
  "id": 1,
  "title": "The Rise of Decentralized Finance",
  "content": "Decentralized Finance ...",
  "author": "Alex Thompson",
  "date": "2023-08-01T10:00:00Z"
}
```

| Method | Endpoint | Description | Success |
| --- | --- | --- | --- |
| `GET` | `/posts` | Return every post | `200` and an array |
| `GET` | `/posts/:id` | Return one post by numeric ID | `200` and an object |
| `POST` | `/posts` | Create a post | `201` and the created object |
| `PATCH` | `/posts/:id` | Update supplied fields only | `200` and the updated object |
| `DELETE` | `/posts/:id` | Remove a post | `200` and confirmation |

### Create a post

```bash
curl -X POST http://localhost:4000/posts \
  -H "Content-Type: application/json" \
  -d '{"title":"A new post","content":"Post body","author":"Author name"}'
```

The server assigns the next ID and sets `date` to the current time. The current API does not validate required fields, so clients should send non-empty values.

### Update a post

```bash
curl -X PATCH http://localhost:4000/posts/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"An updated title"}'
```

Only supplied truthy values for `title`, `content`, and `author` are changed.

### Delete a post

```bash
curl -X DELETE http://localhost:4000/posts/1
```

Unknown post IDs return `404` with `{ "message": "Post not found" }`.

## Web Routes

| Method | Route | Behavior |
| --- | --- | --- |
| `GET` | `/` | Fetch posts and render `index.ejs` |
| `GET` | `/new` | Render an empty create form |
| `GET` | `/edit/:id` | Fetch a post and render the edit form |
| `POST` | `/api/posts` | Forward form data to API `POST /posts`, then redirect |
| `POST` | `/api/posts/:id` | Forward form data to API `PATCH /posts/:id`, then redirect |
| `GET` | `/api/posts/delete/:id` | Forward delete request, then redirect |

Static assets are served from `public/`, including `/styles/main.css`.

## Data Lifecycle And Limitations

Posts live in the `posts` array inside `index.js`. Data is lost whenever the API process restarts. IDs are generated from an in-memory counter, so this project is intended for learning and local experimentation rather than production use.

- No database or durable persistence.
- No authentication or authorization.
- No request validation or sanitization.
- No pagination, search, or sorting.
- No automated tests.
- Delete is triggered by a `GET` UI route.
- API and UI ports are hard-coded.

## Suggested Next Improvements

1. Merge the API and UI into the planned `App.js`, or add separate npm scripts for both servers.
2. Add Axios to `package.json` if it is not installed by the local lockfile.
3. Move `API_URL` and ports into environment variables.
4. Add validation with clear `400` responses.
5. Replace the array with SQLite, PostgreSQL, or another persistent store.
6. Use a state-changing `POST` or `DELETE` action for deletion and add confirmation.
7. Add API tests and UI smoke tests for create, edit, and delete.

## Learning Objectives

This exercise practices REST conventions, Express routing, HTTP methods and status codes, middleware, EJS rendering, form handling, Axios-based service communication, and the boundary between a frontend server and an API.

## UI Design

See [docs/UI-DESIGN.md](docs/UI-DESIGN.md) for the interface inventory and complete UI design specification.

## License

This project is for educational purposes as part of Angela Yu's Fullstack Web Development Bootcamp.

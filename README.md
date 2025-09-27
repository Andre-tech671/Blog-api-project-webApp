# Blog API Project

This is a simple blog application built as part of Angela Yu's Fullstack Web Development Bootcamp. It demonstrates building a RESTful API with Express.js and creating a web interface using EJS templates.

## Features

- **Backend API**: RESTful API for managing blog posts (CRUD operations)
- **Frontend Interface**: Web-based UI for viewing, creating, editing, and deleting posts
- **In-Memory Storage**: Posts are stored in memory (no database required)
- **Responsive Design**: Clean, modern UI with CSS styling

## Project Structure

```
├── index.js          # Incomplete API implementation (challenges)
├── server.js         # Frontend server (serves web interface)
├── solution.js       # Complete API implementation
├── package.json      # Dependencies and scripts
├── public/           # Static assets
│   └── styles/
│       └── main.css  # CSS styling
└── views/            # EJS templates
    ├── index.ejs     # Main page (list posts)
    └── modify.ejs    # New/Edit post form
```

## Installation

1. Clone or download the project files
2. Navigate to the project directory
3. Install dependencies:
   ```bash
   npm install
   ```

## Usage

### Running the API Server

To run the complete API server (solution):
```bash
node solution.js
```
The API will be available at `http://localhost:4000`

To run the challenge implementation:
```bash
node index.js
```
The API will be available at `http://localhost:4000`

### Running the Frontend

In a separate terminal:
```bash
node server.js
```
The web interface will be available at `http://localhost:3000`

### API Endpoints

- `GET /posts` - Retrieve all posts
- `GET /posts/:id` - Retrieve a specific post by ID
- `POST /posts` - Create a new post
  - Body: `{ "title": "string", "content": "string", "author": "string" }`
- `PATCH /posts/:id` - Update a post (partial update)
  - Body: `{ "title": "string", "content": "string", "author": "string" }`
- `DELETE /posts/:id` - Delete a post by ID

### Sample Posts

The application comes with 3 sample blog posts:
1. "The Rise of Decentralized Finance" by Alex Thompson
2. "The Impact of Artificial Intelligence on Modern Businesses" by Mia Williams
3. "Sustainable Living: Tips for an Eco-Friendly Lifestyle" by Samuel Green

## Technologies Used

- **Backend**: Node.js, Express.js
- **Frontend**: EJS (Embedded JavaScript Templates), HTML, CSS
- **HTTP Client**: Axios (for API communication)
- **Middleware**: Body-parser for parsing request bodies

## Learning Objectives

This project covers:
- Building RESTful APIs with Express.js
- Handling HTTP methods (GET, POST, PATCH, DELETE)
- Server-side rendering with EJS
- Routing and middleware
- In-memory data management
- Frontend-backend communication

## Challenges

The `index.js` file contains commented challenges for implementing the API endpoints. Compare your implementation with `solution.js` to verify correctness.

## License

This project is for educational purposes as part of the Fullstack Web Development Bootcamp by Angela Yu.

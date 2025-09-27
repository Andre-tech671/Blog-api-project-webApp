import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// In-memory storage for posts
let posts = [
  {
    id: 1,
    title: "The Rise of Decentralized Finance",
    content:
      "Decentralized Finance (DeFi) is revolutionizing the financial industry by offering open, permissionless access to financial services. Unlike traditional finance, DeFi operates on blockchain networks, enabling users to lend, borrow, and trade without intermediaries.",
    author: "Alex Thompson",
    date: "2023-08-01T10:00:00Z",
  },
  {
    id: 2,
    title: "The Impact of Artificial Intelligence on Modern Businesses",
    content:
      "Artificial Intelligence (AI) is no longer a concept of the future; it's actively reshaping industries today. From automating routine tasks to providing deep insights through data analysis, AI is helping businesses increase efficiency and drive innovation.",
    author: "Mia Williams",
    date: "2023-08-05T14:30:00Z",
  },
  {
    id: 3,
    title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
    content:
      "Sustainability is more than a buzzword; it's a necessary shift towards preserving our planet. Simple changes like reducing waste, conserving energy, and supporting green products can make a significant impact on the environment.",
    author: "Jordan Lee",
    date: "2023-08-10T09:15:00Z",
  },
];

let lastId = 3;

// GET all posts
app.get("/posts", (req, res) => {
  res.json(posts);
});

// GET a specific post by id
app.get("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((p) => p.id === id);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }
  res.json(post);
});

// POST create a new post
app.post("/posts", (req, res) => {
  const { title, content, author } = req.body;
  if (!title || !content || !author) {
    return res.status(400).json({ message: "Title, content, and author are required" });
  }
  const newPost = {
    id: ++lastId,
    title,
    content,
    author,
    date: new Date().toISOString(),
  };
  posts.push(newPost);
  res.status(201).json(newPost);
});

// PATCH update a post
app.patch("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((p) => p.id === id);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }
  const { title, content, author } = req.body;
  if (title) post.title = title;
  if (content) post.content = content;
  if (author) post.author = author;
  res.json(post);
});

// DELETE a post
app.delete("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = posts.findIndex((p) => p.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Post not found" });
  }
  posts.splice(index, 1);
  res.json({ message: "Post deleted" });
});

app.listen(port, () => {
  console.log(`API server is running on http://localhost:${port}`);
});

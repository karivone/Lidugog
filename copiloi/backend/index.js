
// --- Requires and setup ---
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const app = express();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(uploadsDir));

// --- In-memory data ---
let contacts = [];
let posts = [
  {
    id: 1,
    title: 'How to Start a Blog in 2025',
    author: 'Kayewi',
    date: '2025-09-15',
    summary: 'A step-by-step guide to launching your own blog and sharing your voice with the world.',
    comments: [],
    likes: 0
  },
  {
    id: 2,
    title: 'Faith and Fun: Living with Purpose',
    author: 'Kayewi',
    date: '2025-09-12',
    summary: 'Exploring how faith and fun can go hand in hand for a fulfilling life.',
    comments: [],
    likes: 0
  },
  {
    id: 3,
    title: 'Productivity Tips for Christian Creators',
    author: 'Kayewi',
    date: '2025-09-10',
    summary: 'Boost your productivity and creativity while staying true to your values.',
    comments: [],
    likes: 0
  }
];

// --- Routes ---

// Serve the create blog HTML form at /create-blog
app.get('/create-blog', (req, res) => {
  res.sendFile(path.join(__dirname, 'create-blog.html'));
});

// Blog CRUD
app.get('/api/posts', (req, res) => {
  res.json(posts);
});
app.get('/api/posts/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (post) res.json(post);
  else res.status(404).json({ error: 'Post not found' });
});
app.post('/api/posts', upload.single('image'), (req, res) => {
  const { title, author, date, summary } = req.body;
  if (!title || !author || !date || !summary) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  let imageUrl = '';
  if (req.file) {
    imageUrl = `/uploads/${req.file.filename}`;
  }
  const newPost = {
    id: posts.length ? posts[posts.length - 1].id + 1 : 1,
    title,
    author,
    date,
    summary,
    image: imageUrl,
    comments: [],
    likes: 0
  };
  posts.push(newPost);
  res.status(201).json(newPost);
});
// --- Blog Comments API ---
// Get comments for a post
app.get('/api/posts/:id/comments', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ error: 'Post not found' });
  res.json(post.comments || []);
});

// Add a comment to a post
app.post('/api/posts/:id/comments', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ error: 'Post not found' });
  const { name, text } = req.body;
  if (!name || !text) return res.status(400).json({ error: 'Name and text are required.' });
  const comment = {
    id: post.comments.length ? post.comments[post.comments.length - 1].id + 1 : 1,
    name,
    text,
    date: new Date().toISOString()
  };
  post.comments.push(comment);
  res.status(201).json(comment);
});

// --- Blog Likes API ---
// Get like count for a post
app.get('/api/posts/:id/likes', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ error: 'Post not found' });
  res.json({ likes: post.likes || 0 });
});

// Like a post (increment likes)
app.post('/api/posts/:id/likes', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ error: 'Post not found' });
  post.likes = (post.likes || 0) + 1;
  res.json({ likes: post.likes });
});
app.put('/api/posts/:id', upload.single('image'), (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find(p => p.id === id);
  if (!post) return res.status(404).json({ error: 'Post not found' });
  const { title, author, date, summary } = req.body;
  if (title) post.title = title;
  if (author) post.author = author;
  if (date) post.date = date;
  if (summary) post.summary = summary;
  if (req.file) {
    post.image = `/uploads/${req.file.filename}`;
  }
  res.json(post);
});
app.delete('/api/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const idx = posts.findIndex(p => p.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Post not found' });
  const deleted = posts.splice(idx, 1)[0];
  res.json(deleted);
});

// Contact form endpoint
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  contacts.push({ name, email, message, date: new Date().toISOString() });
  res.json({ message: 'Thank you for contacting us!' });
});

// Subscription route (mock)
app.post('/api/subscribe', (req, res) => {
  const { firstName, lastName, email } = req.body;
  if (!firstName || !lastName || !email) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  // Here you would save to DB or send email
  res.json({ message: `Thank you, ${firstName}! You are subscribed.` });
});

// Root route for API welcome
app.get('/', (req, res) => {
  res.send('Welcome to the Lidugog Blog API!');
});

// --- Start server ---
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend API running on http://localhost:${PORT}`);
});

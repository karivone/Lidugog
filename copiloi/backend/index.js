
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

// Serve uploaded images statically
app.use('/uploads', express.static(uploadsDir));

// ...existing code...

// Create new blog post with image upload
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
    image: imageUrl
  };
  posts.push(newPost);
  res.status(201).json(newPost);
});
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Root route for API welcome
app.get('/', (req, res) => {
  res.send('Welcome to the Lidugog Blog API!');
});

// In-memory contact submissions
let contacts = [];

// Contact form endpoint
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  contacts.push({ name, email, message, date: new Date().toISOString() });
  res.json({ message: 'Thank you for contacting us!' });
});

// Example in-memory blog data
let posts = [
  {
    id: 1,
    title: 'How to Start a Blog in 2025',
    author: 'Kayewi',
    date: '2025-09-15',
    summary: 'A step-by-step guide to launching your own blog and sharing your voice with the world.'
  },
  {
    id: 2,
    title: 'Faith and Fun: Living with Purpose',
    author: 'Kayewi',
    date: '2025-09-12',
    summary: 'Exploring how faith and fun can go hand in hand for a fulfilling life.'
  },
  {
    id: 3,
    title: 'Productivity Tips for Christian Creators',
    author: 'Kayewi',
    date: '2025-09-10',
    summary: 'Boost your productivity and creativity while staying true to your values.'
  }
];

// Blog routes
app.get('/api/posts', (req, res) => {
  res.json(posts);
});

app.get('/api/posts/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (post) res.json(post);
  else res.status(404).json({ error: 'Post not found' });
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

app.listen(PORT, () => {
  console.log(`Backend API running on http://localhost:${PORT}`);
});

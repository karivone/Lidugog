// SQLite database setup for blog system
// This script initializes the database and tables for blogs, comments, likes, and subscriptions.
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./blog.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT NOT NULL,
    date TEXT NOT NULL,
    summary TEXT,
    image TEXT,
    likes INTEGER DEFAULT 0,
    views INTEGER DEFAULT 0
  )`);

  // Add content column if it doesn't exist
  db.run('ALTER TABLE posts ADD COLUMN content TEXT', err => {});

  // Check if we have any posts, if not add some initial ones
  db.get('SELECT COUNT(*) as count FROM posts', [], (err, row) => {
    if (err) {
      console.error('Error checking posts:', err);
      return;
    }
    
    if (row.count === 0) {
      // Add some initial blog posts
      const initialPosts = [
        {
          title: 'Welcome to Lidugog',
          content: 'Welcome to our community! We are excited to share our journey of faith, growth, and meaningful connections with you. Here you will find inspiring stories, thoughtful insights, and uplifting content that celebrates our shared values and experiences.',
          author: 'Lidugog Admin',
          date: new Date().toISOString(),
          summary: 'Welcome to our community! More content coming soon...',
          image: '/uploads/blog1.jpg'
        },
        {
          title: 'Community Updates',
          content: 'Stay tuned for the latest updates from our community. We are working hard to bring you engaging content, meaningful discussions, and opportunities for connection. Our mission is to create a space where faith and fellowship thrive.',
          author: 'Community Team',
          date: new Date(Date.now() - 86400000).toISOString(),
          summary: 'Stay tuned for the latest updates from our community...',
          image: '/uploads/blog2.jpg'
        }
      ];

      initialPosts.forEach(post => {
        db.run(
          'INSERT INTO posts (title, content, author, date, summary, image) VALUES (?, ?, ?, ?, ?, ?)',
          [post.title, post.content, post.author, post.date, post.summary, post.image],
          err => {
            if (err) console.error('Error inserting initial post:', err);
          }
        );
      });
    }
  });

  db.run(`CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    post_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    text TEXT NOT NULL,
    date TEXT NOT NULL,
    FOREIGN KEY(post_id) REFERENCES posts(id) ON DELETE CASCADE
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS subscriptions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    email TEXT NOT NULL,
    gender TEXT,
    age INTEGER,
    country TEXT,
    date TEXT NOT NULL
  )`);
// Add columns to existing tables if missing (for migrations)
db.run('ALTER TABLE posts ADD COLUMN views INTEGER DEFAULT 0', err => {});
db.run('ALTER TABLE subscriptions ADD COLUMN gender TEXT', err => {});
db.run('ALTER TABLE subscriptions ADD COLUMN age INTEGER', err => {});
db.run('ALTER TABLE subscriptions ADD COLUMN country TEXT', err => {});

  // Add sample blog posts if none exist
  db.get('SELECT COUNT(*) as count FROM posts', [], (err, row) => {
    if (err) {
      console.error('Error checking posts:', err);
      return;
    }
    
    if (row.count === 0) {
      const samplePosts = [
        {
          title: 'Welcome to Lidugog',
          content: 'Welcome to our community! Here at Lidugog, we are committed to sharing stories, insights, and updates that matter to our community. Join us on this journey as we explore local events, share important announcements, and celebrate our vibrant culture.',
          author: 'Lidugog Admin',
          date: new Date().toISOString(),
          summary: 'Welcome to our community blog where we share stories and updates that matter.',
          image: '/uploads/lidugog_banner.png'
        },
        {
          title: 'Community Updates: What\'s New in Lidugog',
          content: 'Exciting developments are happening in our community! From infrastructure improvements to new community programs, learn about all the latest updates and how you can get involved in shaping the future of Lidugog.',
          author: 'Community Team',
          date: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
          summary: 'Stay up to date with the latest developments in our community.',
          image: '/uploads/blog1.jpg'
        },
        {
          title: 'Celebrating Our Heritage',
          content: 'Discover the rich cultural heritage of Lidugog through our traditional celebrations, local customs, and historical landmarks. Learn about the events that shaped our community and the traditions that keep our culture alive.',
          author: 'Cultural Committee',
          date: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
          summary: 'Exploring the rich cultural heritage and traditions of Lidugog.',
          image: '/uploads/blog2.jpg'
        }
      ];

      samplePosts.forEach(post => {
        db.run(
          'INSERT INTO posts (title, content, author, date, summary, image) VALUES (?, ?, ?, ?, ?, ?)',
          [post.title, post.content, post.author, post.date, post.summary, post.image],
          err => {
            if (err) console.error('Error inserting sample post:', err);
          }
        );
      });
    }
  });

  db.run(`CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    date TEXT NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    start_date TEXT NOT NULL,
    end_date TEXT NOT NULL,
    location TEXT,
    color TEXT,
    created_at TEXT NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    email TEXT,
    role TEXT DEFAULT 'admin',
    created_at TEXT NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    event_date TEXT NOT NULL,
    reminder_sent INTEGER DEFAULT 0,

    created_at TEXT NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS visits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    path TEXT NOT NULL,
    device TEXT NOT NULL,
    user_agent TEXT,
    date TEXT NOT NULL
  )`);
});

module.exports = db;

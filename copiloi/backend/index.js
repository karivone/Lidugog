// ==========================================
// LIDUGOG BLOG - BACKEND API SERVER
// ==========================================
// Modern, organized Express.js backend with SQLite database
// ==========================================

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const db = require('./db');

// ==========================================
// SERVER CONFIGURATION
// ==========================================

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Frontend dev server
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Accept'],
  credentials: true
}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname)));
app.use('/static', express.static(path.join(__dirname, 'public')));

// ==========================================
// FILE UPLOAD CONFIGURATION
// ==========================================

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only image files are allowed!'));
  }
});

app.use('/uploads', express.static(uploadsDir));

// ==========================================
// ANALYTICS & TRACKING MIDDLEWARE
// ==========================================

function getDeviceType(ua) {
  ua = ua || '';
  if (/mobile/i.test(ua)) return 'Mobile';
  if (/tablet|ipad/i.test(ua)) return 'Tablet';
  if (/android/i.test(ua) && !/mobile/i.test(ua)) return 'Tablet';
  return 'Desktop';
}

function logVisit(pathName) {
  return (req, res, next) => {
    const ua = req.headers['user-agent'] || '';
    const device = getDeviceType(ua);
    const date = new Date().toISOString();
    db.run(
      'INSERT INTO visits (path, device, user_agent, date) VALUES (?, ?, ?, ?)', 
      [pathName, device, ua, date], 
      () => {}
    );
    next();
  };
}

// ==========================================
// SUBSCRIBER STATS ROUTES
// ==========================================

// Get subscriber statistics
app.get('/api/subscribers/stats', async (req, res) => {
  try {
    const stats = await new Promise((resolve, reject) => {
      db.get('SELECT COUNT(*) as total FROM subscribers', [], (err, totalRow) => {
        if (err) {
          reject(err);
          return;
        }

        db.get('SELECT COUNT(*) as active FROM subscribers WHERE status = "active"', [], (err, activeRow) => {
          if (err) {
            reject(err);
            return;
          }

          db.all(`
            SELECT strftime('%Y-%m', subscribed_at) as month,
            COUNT(*) as count
            FROM subscribers
            GROUP BY month
            ORDER BY month DESC
            LIMIT 12
          `, [], (err, monthlyStats) => {
            if (err) {
              reject(err);
              return;
            }

            resolve({
              total: totalRow.total,
              active: activeRow.active,
              monthly: monthlyStats
            });
          });
        });
      });
    });

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error getting subscriber stats:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get subscriber statistics'
    });
  }
});

// Toggle subscriber status
app.put('/api/subscribers/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['active', 'inactive'].includes(status)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid status value'
    });
  }

  try {
    await new Promise((resolve, reject) => {
      db.run(
        'UPDATE subscribers SET status = ? WHERE id = ?',
        [status, id],
        (err) => {
          if (err) {
            reject(err);
            return;
          }
          resolve();
        }
      );
    });

    res.json({
      success: true,
      message: 'Subscriber status updated successfully'
    });
  } catch (error) {
    console.error('Error updating subscriber status:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update subscriber status'
    });
  }
});

// Get list of subscribers with pagination
app.get('/api/subscribers', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  try {
    const subscribers = await new Promise((resolve, reject) => {
      db.all(`
        SELECT * FROM subscribers
        ORDER BY subscribed_at DESC
        LIMIT ? OFFSET ?
      `, [limit, offset], (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(rows);
      });
    });

    const total = await new Promise((resolve, reject) => {
      db.get('SELECT COUNT(*) as count FROM subscribers', [], (err, row) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(row.count);
      });
    });

    res.json({
      success: true,
      data: {
        subscribers,
        pagination: {
          total,
          pages: Math.ceil(total / limit),
          currentPage: page,
          perPage: limit
        }
      }
    });
  } catch (error) {
    console.error('Error getting subscribers:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get subscribers'
    });
  }
});

// ==========================================
// HTML PAGE ROUTES
// ==========================================

// Dashboard & Admin Pages
app.get('/', logVisit('/'), (req, res) => {
  res.sendFile(path.join(__dirname, 'homepage.html'));
});

// Fallback route for admin panel - serves homepage.html for all admin routes
app.get('/admin*', logVisit('/admin'), (req, res) => {
  res.sendFile(path.join(__dirname, 'homepage.html'));
});

app.get('/create-blog', logVisit('/create-blog'), (req, res) => {
  res.sendFile(path.join(__dirname, 'create-blog.html'));
});

// ==========================================
// SUBSCRIPTION ROUTES
// ==========================================

app.post('/api/subscribe', async (req, res) => {
  const { firstName, lastName, email } = req.body;

  // Basic validation
  if (!firstName || !lastName || !email) {
    return res.status(400).json({ 
      error: 'All fields are required' 
    });
  }

  // Email format validation
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      error: 'Invalid email format' 
    });
  }

  try {
    // Check if email already exists
    db.get('SELECT email FROM subscribers WHERE email = ?', [email], (err, row) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ 
          error: 'Internal server error' 
        });
      }

      if (row) {
        return res.status(400).json({ 
          error: 'This email is already subscribed' 
        });
      }

      // Insert new subscriber
      db.run(
        'INSERT INTO subscribers (first_name, last_name, email) VALUES (?, ?, ?)',
        [firstName, lastName, email],
        function(err) {
          if (err) {
            console.error('Error adding subscriber:', err);
            return res.status(500).json({ 
              error: 'Failed to add subscriber' 
            });
          }

          res.status(201).json({
            message: 'Successfully subscribed! Welcome to our community.',
            subscriberId: this.lastID
          });
        }
      );
    });
  } catch (error) {
    console.error('Subscription error:', error);
    res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
});

// Get all subscribers (admin only)
app.get('/api/subscribers', (req, res) => {
  db.all('SELECT * FROM subscribers ORDER BY subscribed_at DESC', [], (err, rows) => {
    if (err) {
      console.error('Error fetching subscribers:', err);
      return res.status(500).json({ 
        error: 'Failed to fetch subscribers' 
      });
    }
    res.json(rows);
  });
});

app.get('/manage-blogs', (req, res) => {
  res.sendFile(path.join(__dirname, 'manage-blogs.html'));
});

app.get('/messages', logVisit('/messages'), (req, res) => {
  res.sendFile(path.join(__dirname, 'messages.html'));
});

app.get('/calendar', logVisit('/calendar'), (req, res) => {
  res.sendFile(path.join(__dirname, 'calendar.html'));
});

app.get('/settings', logVisit('/settings'), (req, res) => {
  res.sendFile(path.join(__dirname, 'settings.html'));
});

// ==========================================
// CONTACT FORM ENDPOINTS
// ==========================================

app.post('/api/contact', async (req, res) => {
  console.log('Received contact form submission:', req.body);
  
  const { name, email, message, subject } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    console.log('Validation failed:', { name, email, message });
    return res.status(400).json({ 
      success: false,
      error: 'All fields are required' 
    });
  }
  
  // Ensure messages table exists
  db.run(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      subject TEXT,
      message TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      read INTEGER DEFAULT 0
    )
  `);

  // Email format validation
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailRegex.test(email)) {
    console.log('Invalid email format:', email);
    return res.status(400).json({ 
      success: false,
      error: 'Invalid email format' 
    });
  }

  try {
    console.log('Attempting to save message to database');
    // Store message in database
    const messageId = await new Promise((resolve, reject) => {
      const params = [name, email, subject || null, message, new Date().toISOString()];
      console.log('Database parameters:', params);
      
      db.run(
        'INSERT INTO messages (name, email, subject, message, created_at) VALUES (?, ?, ?, ?, ?)',
        params,
        function(err) {
          if (err) {
            console.error('Database error details:', err);
            reject(err);
            return;
          }
          resolve(this.lastID);
        }
      );
    });

    console.log('Message saved successfully with ID:', messageId);
    res.status(201).json({
      success: true,
      message: 'Thank you for your message! We will get back to you soon.',
      messageId
    });
  } catch (error) {
    console.error('Detailed error information:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to save message',
      details: error.message
    });
  }
});

// ==========================================
// BLOG POST API ENDPOINTS
// ==========================================

// GET all posts
app.get('/api/posts', (req, res) => {
  db.all('SELECT * FROM posts ORDER BY date DESC', [], (err, posts) => {
    if (err) {
      console.error('Error fetching posts:', err);
      return res.status(500).json({ error: 'Failed to fetch posts' });
    }
    res.json(posts);
  });
});

// GET single post by ID (with view increment)
app.get('/api/posts/:id', (req, res) => {
  const postId = req.params.id;
  
  // Increment view count
  db.run('UPDATE posts SET views = views + 1 WHERE id = ?', [postId], (err) => {
    if (err) {
      console.error('Error incrementing views:', err);
    }
    
    // Fetch the post
    db.get('SELECT * FROM posts WHERE id = ?', [postId], (err, post) => {
      if (err) {
        console.error('Error fetching post:', err);
        return res.status(500).json({ error: 'Failed to fetch post' });
      }
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      res.json(post);
    });
  });
});

// CREATE new post
app.post('/api/posts', upload.single('image'), (req, res) => {
  const { title, author, date, summary, category, imageUrl } = req.body;
  
  if (!title || !author || !date || !summary) {
    return res.status(400).json({ error: 'Title, author, date, and summary are required' });
  }
  
  let imageUrlFinal = '';
  if (req.file) {
    imageUrlFinal = `/uploads/${req.file.filename}`;
  } else if (imageUrl && imageUrl.trim()) {
    imageUrlFinal = imageUrl.trim();
  }
  
  const sql = `INSERT INTO posts (title, author, date, summary, image, category, likes, views, created_at) 
               VALUES (?, ?, ?, ?, ?, ?, 0, 0, ?)`;
  const params = [title, author, date, summary, imageUrlFinal, category || 'general', new Date().toISOString()];
  
  db.run(sql, params, function(err) {
    if (err) {
      console.error('Error creating post:', err);
      return res.status(500).json({ error: 'Failed to create post' });
    }
    
    db.get('SELECT * FROM posts WHERE id = ?', [this.lastID], (err, post) => {
      if (err) {
        console.error('Error fetching created post:', err);
        return res.status(500).json({ error: 'Post created but failed to retrieve' });
      }
      res.status(201).json(post);
    });
  });
});

// UPDATE post
app.put('/api/posts/:id', upload.single('image'), (req, res) => {
  const postId = req.params.id;
  const { title, author, date, summary, category } = req.body;
  
  if (!title || !author || !date || !summary) {
    return res.status(400).json({ error: 'Title, author, date, and summary are required' });
  }
  
  let sql = 'UPDATE posts SET title = ?, author = ?, date = ?, summary = ?, category = ?';
  let params = [title, author, date, summary, category || 'general'];
  
  if (req.file) {
    sql += ', image = ?';
    params.push(`/uploads/${req.file.filename}`);
  }
  
  sql += ' WHERE id = ?';
  params.push(postId);
  
  db.run(sql, params, function(err) {
    if (err) {
      console.error('Error updating post:', err);
      return res.status(500).json({ error: 'Failed to update post' });
    }
    
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    db.get('SELECT * FROM posts WHERE id = ?', [postId], (err, post) => {
      if (err) {
        console.error('Error fetching updated post:', err);
        return res.status(500).json({ error: 'Post updated but failed to retrieve' });
      }
      res.json(post);
    });
  });
});

// DELETE post
app.delete('/api/posts/:id', (req, res) => {
  const postId = req.params.id;
  
  db.get('SELECT * FROM posts WHERE id = ?', [postId], (err, post) => {
    if (err) {
      console.error('Error fetching post:', err);
      return res.status(500).json({ error: 'Failed to fetch post' });
    }
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    // Delete associated comments first
    db.run('DELETE FROM comments WHERE post_id = ?', [postId], (err) => {
      if (err) console.error('Error deleting comments:', err);
      
      // Delete the post
      db.run('DELETE FROM posts WHERE id = ?', [postId], function(err) {
        if (err) {
          console.error('Error deleting post:', err);
          return res.status(500).json({ error: 'Failed to delete post' });
        }
        res.json({ message: 'Post deleted successfully', post });
      });
    });
  });
});

// ==========================================
// COMMENTS API ENDPOINTS
// ==========================================

// GET comments for a post
app.get('/api/posts/:id/comments', (req, res) => {
  db.all(
    'SELECT * FROM comments WHERE post_id = ? ORDER BY date DESC', 
    [req.params.id], 
    (err, comments) => {
      if (err) {
        console.error('Error fetching comments:', err);
        return res.status(500).json({ error: 'Failed to fetch comments' });
      }
      res.json(comments);
    }
  );
});

// CREATE comment
app.post('/api/posts/:id/comments', (req, res) => {
  const { name, text } = req.body;
  const postId = req.params.id;
  
  if (!name || !text) {
    return res.status(400).json({ error: 'Name and text are required' });
  }
  
  const date = new Date().toISOString();
  
  db.run(
    'INSERT INTO comments (post_id, name, text, date) VALUES (?, ?, ?, ?)',
    [postId, name, text, date],
    function(err) {
      if (err) {
        console.error('Error creating comment:', err);
        return res.status(500).json({ error: 'Failed to create comment' });
      }
      
      db.get('SELECT * FROM comments WHERE id = ?', [this.lastID], (err, comment) => {
        if (err) {
          console.error('Error fetching comment:', err);
          return res.status(500).json({ error: 'Comment created but failed to retrieve' });
        }
        res.status(201).json(comment);
      });
    }
  );
});

// ==========================================
// LIKES API ENDPOINTS
// ==========================================

// GET likes for a post
app.get('/api/posts/:id/likes', (req, res) => {
  db.get('SELECT likes FROM posts WHERE id = ?', [req.params.id], (err, row) => {
    if (err) {
      console.error('Error fetching likes:', err);
      return res.status(500).json({ error: 'Failed to fetch likes' });
    }
    if (!row) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json({ likes: row.likes || 0 });
  });
});

// INCREMENT likes for a post
app.post('/api/posts/:id/likes', (req, res) => {
  const postId = req.params.id;
  
  db.run('UPDATE posts SET likes = likes + 1 WHERE id = ?', [postId], function(err) {
    if (err) {
      console.error('Error incrementing likes:', err);
      return res.status(500).json({ error: 'Failed to update likes' });
    }
    
    db.get('SELECT likes FROM posts WHERE id = ?', [postId], (err, row) => {
      if (err) {
        console.error('Error fetching likes:', err);
        return res.status(500).json({ error: 'Likes updated but failed to retrieve' });
      }
      if (!row) {
        return res.status(404).json({ error: 'Post not found' });
      }
      res.json({ likes: row.likes });
    });
  });
});

// ==========================================
// SUBSCRIPTION API ENDPOINTS
// ==========================================

// GET all subscriptions
app.get('/api/subscriptions', (req, res) => {
  db.all('SELECT * FROM subscriptions ORDER BY date DESC', [], (err, rows) => {
    if (err) {
      console.error('Error fetching subscriptions:', err);
      return res.status(500).json({ error: 'Failed to fetch subscriptions' });
    }
    res.json(rows);
  });
});

// GET recent subscriptions
app.get('/api/subscribers/recent', (req, res) => {
  db.all(
    'SELECT firstName, lastName, email, date FROM subscriptions ORDER BY date DESC LIMIT 10', 
    [], 
    (err, rows) => {
      if (err) {
        console.error('Error fetching recent subscribers:', err);
        return res.status(500).json({ error: 'Failed to fetch recent subscribers' });
      }
      res.json(rows);
    }
  );
});

// GET monthly subscriber growth
app.get('/api/subscribers/monthly', (req, res) => {
  const sql = `SELECT strftime('%Y-%m', date) as month, COUNT(*) as count 
               FROM subscriptions 
               GROUP BY month 
               ORDER BY month DESC 
               LIMIT 12`;
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Error fetching monthly subscribers:', err);
      return res.status(500).json({ error: 'Failed to fetch monthly data' });
    }
    res.json(rows.reverse()); // Chronological order
  });
});

// CREATE subscription
app.post('/api/subscribe', (req, res) => {
  const { firstName, lastName, email, gender, age, country } = req.body;
  
  if (!firstName || !lastName || !email) {
    return res.status(400).json({ error: 'First name, last name, and email are required' });
  }
  
  const date = new Date().toISOString();
  
  db.run(
    'INSERT INTO subscriptions (firstName, lastName, email, gender, age, country, date) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [firstName, lastName, email, gender || '', age || null, country || '', date],
    function(err) {
      if (err) {
        if (err.message && err.message.includes('UNIQUE')) {
          return res.status(400).json({ error: 'This email is already subscribed' });
        }
        console.error('Error creating subscription:', err);
        return res.status(500).json({ error: 'Failed to subscribe' });
      }
      res.status(201).json({ 
        message: 'Subscription successful! Welcome to our community.',
        id: this.lastID 
      });
    }
  );
});

// ==========================================
// CONTACT API ENDPOINTS
// ==========================================

// GET all contact messages
app.get('/api/messages', (req, res) => {
  db.all(
    `SELECT id, name, email, subject, message, created_at as date, read FROM messages ORDER BY created_at DESC`,
    [],
    (err, messages) => {
      if (err) {
        console.error('Error fetching messages:', err);
        return res.status(500).json({ 
          success: false,
          error: 'Failed to fetch messages' 
        });
      }
      
      res.json({
        success: true,
        messages: messages
      });
    }
  );
});
app.get('/api/contacts', (req, res) => {
  db.all('SELECT * FROM contacts ORDER BY date DESC LIMIT 50', [], (err, messages) => {
    if (err) {
      console.error('Error fetching contacts:', err);
      return res.status(500).json({ error: 'Failed to fetch messages' });
    }
    res.json(messages);
  });
});

// CREATE contact message
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: 'Name, email, and message are required'
    });
  }
  
  const date = new Date().toISOString();
  
  // Save to both contacts and messages tables
  db.serialize(() => {
    db.run(
      'INSERT INTO contacts (name, email, subject, message, date) VALUES (?, ?, ?, ?, ?)',
      [name, email, subject || '', message, date]
    );

    db.run(
      'INSERT INTO messages (name, email, subject, message, created_at) VALUES (?, ?, ?, ?, ?)',
      [name, email, subject || '', message, date],
      function(err) {
        if (err) {
          console.error('Error saving message:', err);
          return res.status(500).json({
            success: false,
            error: 'Failed to submit message'
          });
        }
        res.json({ 
          success: true,
          message: 'Thank you for your message! We will get back to you soon.',
          messageId: this.lastID
        });
      }
    );
  });
});

// ==========================================
// EVENTS/CALENDAR API ENDPOINTS
// ==========================================

// GET all events
app.get('/api/events', (req, res) => {
  db.all('SELECT * FROM events ORDER BY start_date ASC', [], (err, events) => {
    if (err) {
      console.error('Error fetching events:', err);
      return res.status(500).json({ error: 'Failed to fetch events' });
    }
    res.json(events);
  });
});

// GET upcoming events
app.get('/api/events/upcoming', (req, res) => {
  const today = new Date().toISOString();
  
  db.all(
    'SELECT * FROM events WHERE start_date >= ? ORDER BY start_date ASC LIMIT 10',
    [today],
    (err, events) => {
      if (err) {
        console.error('Error fetching upcoming events:', err);
        return res.status(500).json({ error: 'Failed to fetch upcoming events' });
      }
      res.json(events);
    }
  );
});

// CREATE event
app.post('/api/events', (req, res) => {
  const { title, description, start_date, end_date, location, color } = req.body;
  
  if (!title || !start_date || !end_date) {
    return res.status(400).json({ error: 'Title, start date, and end date are required' });
  }
  
  const created_at = new Date().toISOString();
  
  db.run(
    'INSERT INTO events (title, description, start_date, end_date, location, color, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [title, description || '', start_date, end_date, location || '', color || '#6366f1', created_at],
    function(err) {
      if (err) {
        console.error('Error creating event:', err);
        return res.status(500).json({ error: 'Failed to create event' });
      }
      
      db.get('SELECT * FROM events WHERE id = ?', [this.lastID], (err, event) => {
        if (err) {
          console.error('Error fetching event:', err);
          return res.status(500).json({ error: 'Event created but failed to retrieve' });
        }
        res.status(201).json(event);
      });
    }
  );
});

// UPDATE event
app.put('/api/events/:id', (req, res) => {
  const { title, description, start_date, end_date, location, color } = req.body;
  const eventId = req.params.id;
  
  if (!title || !start_date || !end_date) {
    return res.status(400).json({ error: 'Title, start date, and end date are required' });
  }
  
  db.run(
    `UPDATE events 
     SET title = ?, description = ?, start_date = ?, end_date = ?, location = ?, color = ?
     WHERE id = ?`,
    [title, description || '', start_date, end_date, location || '', color || '#6366f1', eventId],
    function(err) {
      if (err) {
        console.error('Error updating event:', err);
        return res.status(500).json({ error: 'Failed to update event' });
      }
      
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Event not found' });
      }
      
      db.get('SELECT * FROM events WHERE id = ?', [eventId], (err, event) => {
        if (err) {
          console.error('Error fetching event:', err);
          return res.status(500).json({ error: 'Event updated but failed to retrieve' });
        }
        res.json(event);
      });
    }
  );
});

// DELETE event
app.delete('/api/events/:id', (req, res) => {
  db.run('DELETE FROM events WHERE id = ?', [req.params.id], function(err) {
    if (err) {
      console.error('Error deleting event:', err);
      return res.status(500).json({ error: 'Failed to delete event' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json({ message: 'Event deleted successfully' });
  });
});

// ==========================================
// USER MANAGEMENT API ENDPOINTS
// ==========================================

// GET all users
app.get('/api/users', (req, res) => {
  db.all(
    'SELECT id, username, email, role, created_at FROM users ORDER BY created_at DESC', 
    [], 
    (err, users) => {
      if (err) {
        console.error('Error fetching users:', err);
        return res.status(500).json({ error: 'Failed to fetch users' });
      }
      res.json(users);
    }
  );
});

// CREATE user
app.post('/settings/add-user', async (req, res) => {
  const { username, email, password, role } = req.body;
  
  if (!username || !password) {
    return res.status(400).send('Username and password required');
  }
  
  try {
    const hash = await bcrypt.hash(password, 10);
    const created_at = new Date().toISOString();
    
    db.run(
      'INSERT INTO users (username, password, email, role, created_at) VALUES (?, ?, ?, ?, ?)', 
      [username, hash, email || '', role || 'admin', created_at], 
      function(err) {
        if (err) {
          if (err.message && err.message.includes('UNIQUE')) {
            return res.status(400).send('Username already exists');
          }
          console.error('Error creating user:', err);
          return res.status(500).send('Error adding user');
        }
        res.redirect('/settings');
      }
    );
  } catch (error) {
    console.error('Error hashing password:', error);
    res.status(500).send('Error adding user');
  }
});

// UPDATE user role
app.post('/settings/edit-user', (req, res) => {
  const { id, role } = req.body;
  
  if (!id || !role) {
    return res.status(400).send('User ID and role required');
  }
  
  db.run('UPDATE users SET role = ? WHERE id = ?', [role, id], function(err) {
    if (err) {
      console.error('Error updating user:', err);
      return res.status(500).send('Error updating user role');
    }
    res.redirect('/settings');
  });
});

// DELETE user
app.post('/settings/delete-user', (req, res) => {
  const { id } = req.body;
  
  if (!id) {
    return res.status(400).send('User ID required');
  }
  
  db.run('DELETE FROM users WHERE id = ?', [id], function(err) {
    if (err) {
      console.error('Error deleting user:', err);
      return res.status(500).send('Error deleting user');
    }
    res.redirect('/settings');
  });
});

// ==========================================
// ANALYTICS API ENDPOINTS
// ==========================================

// GET monthly visit stats
app.get('/api/visits/monthly', (req, res) => {
  const sql = `SELECT strftime('%Y-%m', date) as month, COUNT(*) as count 
               FROM visits 
               GROUP BY month 
               ORDER BY month DESC 
               LIMIT 13`;
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Error fetching monthly visits:', err);
      return res.status(500).json({ error: 'Failed to fetch visit data' });
    }
    res.json(rows.reverse()); // Chronological order
  });
});

// GET device distribution
app.get('/api/visits/devices', (req, res) => {
  db.all(
    `SELECT device, COUNT(*) as count FROM visits GROUP BY device`, 
    [], 
    (err, rows) => {
      if (err) {
        console.error('Error fetching device data:', err);
        return res.status(500).json({ error: 'Failed to fetch device data' });
      }
      res.json(rows);
    }
  );
});

// ==========================================
// ERROR HANDLING MIDDLEWARE
// ==========================================

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Not Found', 
    message: 'The requested resource was not found on this server',
    path: req.originalUrl 
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(err.status || 500).json({ 
    error: 'Internal Server Error',
    message: err.message || 'Something went wrong on the server'
  });
});

// ==========================================
// START SERVER
// ==========================================

app.listen(PORT, () => {
  console.log(`
  ╔═══════════════════════════════════════════════╗
  ║                                               ║
  ║   🚀 LIDUGOG BLOG BACKEND API SERVER         ║
  ║                                               ║
  ║   Status: ✅ Running                          ║
  ║   Port: ${PORT}                              ║
  ║   URL: http://localhost:${PORT}              ║
  ║                                               ║
  ║   📚 API Documentation:                       ║
  ║   • Posts: /api/posts                        ║
  ║   • Comments: /api/posts/:id/comments        ║
  ║   • Subscriptions: /api/subscribe            ║
  ║   • Contact: /api/contact                    ║
  ║   • Events: /api/events                      ║
  ║                                               ║
  ║   🎨 Admin Dashboard: http://localhost:${PORT}║
  ║                                               ║
  ╚═══════════════════════════════════════════════╝
  `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    db.close((err) => {
      if (err) {
        console.error('Error closing database:', err);
      }
      console.log('Database connection closed');
      process.exit(0);
    });
  });
});

module.exports = app;
// ==========================================

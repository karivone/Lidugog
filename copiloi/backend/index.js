
// --- Requires and setup ---
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const db = require('./db');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

// Serve manage blogs page at /manage-blogs
app.get('/manage-blogs', (req, res) => {
  res.sendFile(path.join(__dirname, 'manage-blogs.html'));
});
// ...existing code...
// Serve calendar page at /calendar
app.get('/calendar', (req, res) => {
  res.sendFile(path.join(__dirname, 'calendar.html'));
});
// API endpoint for frontend subscriptions
app.post('/api/subscribe', (req, res) => {
  const { firstName, lastName, email, gender, age, country } = req.body;
  if (!firstName || !lastName || !email) {
    return res.status(400).json({ error: 'First name, last name, and email are required.' });
  }
  const date = new Date().toISOString();
  db.run(
    'INSERT INTO subscriptions (firstName, lastName, email, gender, age, country, date) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [firstName, lastName, email, gender || '', age || null, country || '', date],
    function(err) {
      if (err) {
        if (err.message && err.message.includes('UNIQUE')) {
          return res.status(400).json({ error: 'You are already subscribed.' });
        }
        return res.status(500).json({ error: 'Failed to subscribe.' });
      }
      res.json({ message: 'Subscription successful!' });
    }
  );
});
// ...existing code...
// API endpoint to get all subscriptions
app.get('/api/subscriptions', (req, res) => {
  db.all('SELECT * FROM subscriptions ORDER BY date DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});
// Serve subscriptions management page at /subscriptions
app.get('/subscriptions', (req, res) => {
  db.all('SELECT * FROM subscriptions ORDER BY date DESC', [], (err, subs) => {
    if (err) return res.status(500).send('Error loading subscriptions.');
    const rows = subs.length ? subs.map(s => `
      <tr>
        <td>${s.firstName} ${s.lastName}</td>
        <td>${s.email}</td>
        <td>${s.gender || ''}</td>
        <td>${s.age || ''}</td>
        <td>${s.country || ''}</td>
        <td>${s.date ? new Date(s.date).toLocaleString() : ''}</td>
      </tr>
    `).join('') : '<tr><td colspan="6" style="color:#aaa;">No subscriptions yet.</td></tr>';
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Subscriptions - Admin</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Inter:400,600,700&display=swap">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
        <style>
          body { font-family: 'Inter', sans-serif; background: #0c0c0cff; color: #222; margin: 0; }
          .layout { display: flex; min-height: 100vh; }
          .sidebar { width: 220px; background: #0c0c0c0c; color: #f7f4f4ff; border-right: 1px solid #ececec; padding-top: 2.5rem; padding-bottom: 2rem; box-shadow: 2px 0 8px rgba(66,185,131,0.04); }
          .sidebar-logo { font-size: 1.7rem; color: #42b983; font-weight: bold; letter-spacing: -1px; margin-bottom: 2.5rem; text-align: center; }
          .nav.flex-column { list-style: none; padding: 0; margin: 0; }
          .nav-item { margin-bottom: 0.5rem; }
          .nav-link { color: #f8f7f7ff; font-weight: 600; border-radius: 8px; padding: 0.7rem 1.2rem; display: flex; align-items: center; transition: background 0.18s, color 0.18s; text-decoration: none; }
          .nav-link.active, .nav-link:hover { background: #42b983; color: #fff; }
          .main { flex: 1; padding: 2.5rem 2rem 2rem 2rem; }
          .section { background: #fff; border-radius: 14px; box-shadow: 0 2px 12px rgba(66,185,131,0.07); padding: 1.5rem 1.5rem 1.2rem 1.5rem; margin-bottom: 2rem; }
          table { width: 100%; border-collapse: collapse; margin-top: 1.2rem; }
          th, td { padding: 0.7rem 0.5rem; border-bottom: 1px solid #ececec; text-align: left; }
          th { background: #f3f3f3; color: #222; font-weight: 700; }
        </style>
      </head>
      <body>
        <div class="layout">
          <aside class="sidebar py-4">
            <div class="sidebar-logo mb-4">Lidugog</div>
            <ul class="nav flex-column">
              <li class="nav-item"><a class="nav-link" href="/admin"><i class="fa-solid fa-gauge-high me-2"></i>Dashboard</a></li>
              <li class="nav-item"><a class="nav-link" href="/create-blog"><i class="fa-solid fa-pen-to-square me-2"></i>Create Blog</a></li>
              <li class="nav-item"><a class="nav-link active" href="/subscriptions"><i class="fa-solid fa-users me-2"></i>Subscriptions</a></li>
              <li class="nav-item"><a class="nav-link" href="/settings"><i class="fa-solid fa-gear me-2"></i>Settings</a></li>
            </ul>
          </aside>
          <main class="main">
            <div class="section">
              <h2><i class="fa-solid fa-users me-2"></i>Subscriptions</h2>
              <table>
                <thead>
                  <tr><th>Name</th><th>Email</th><th>Gender</th><th>Age</th><th>Country</th><th>Date</th></tr>
                </thead>
                <tbody>
                  ${rows}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </body>
      </html>
    `);
  });
});

// Settings page for user management
app.get('/settings', (req, res) => {
  db.all('SELECT id, username, email, role, created_at FROM users ORDER BY created_at DESC', [], (err, users) => {
    if (err) return res.status(500).send('Error loading users.');
    const usersHtml = users.length ? users.map(u => `
      <tr>
        <td>${u.username}</td>
        <td>${u.email || ''}</td>
        <td>${u.role}</td>
        <td>${u.created_at}</td>
        <td>
          <form method="POST" action="/settings/delete-user" style="display:inline;">
            <input type="hidden" name="id" value="${u.id}" />
            <button type="submit" style="background:#e74c3c;color:#fff;border:none;padding:0.3rem 0.7rem;border-radius:4px;">Delete</button>
          </form>
          <form method="POST" action="/settings/edit-user" style="display:inline;margin-left:0.5rem;">
            <input type="hidden" name="id" value="${u.id}" />
            <select name="role" style="padding:0.2rem 0.4rem;border-radius:4px;">
              <option value="admin"${u.role==='admin'?' selected':''}>admin</option>
              <option value="editor"${u.role==='editor'?' selected':''}>editor</option>
            </select>
            <button type="submit" style="background:#42b983;color:#fff;border:none;padding:0.3rem 0.7rem;border-radius:4px;">Update</button>
          </form>
        </td>
      </tr>
    `).join('') : '<tr><td colspan="5" style="color:#aaa;">No users yet.</td></tr>';
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Settings - User Management</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
        <style>
          body { font-family: 'Inter', sans-serif; background: #f7f7f7; color: #222; margin: 0; }
          .layout { display: flex; min-height: 100vh; }
          .sidebar { width: 220px; background: #222; color: #fff; display: flex; flex-direction: column; padding: 2rem 1.2rem 1.2rem 1.2rem; }
          .sidebar h2 { color: #42b983; font-size: 1.5rem; margin-bottom: 2.5rem; text-align: center; letter-spacing: -1px; }
          .nav { list-style: none; padding: 0; margin: 0; }
          .nav li { margin-bottom: 1.5rem; }
          .nav a { color: #fff; text-decoration: none; font-weight: 600; font-size: 1.08rem; display: flex; align-items: center; transition: color 0.2s; }
          .nav a:hover { color: #42b983; }
          .nav .icon { color: #42b983; font-size: 1.2rem; width: 1.7rem; text-align: center; margin-right: 0.5rem; }
          .main { flex: 1; background: #f7f7f7; padding: 2.5rem 2rem 2rem 2rem; }
          .main h1 { color: #42b983; font-size: 2.1rem; margin-bottom: 0.5rem; letter-spacing: -1px; }
          .section { background: #fff; border-radius: 14px; box-shadow: 0 2px 12px rgba(66,185,131,0.07); padding: 1.5rem 1.5rem 1.2rem 1.5rem; margin-bottom: 2rem; }
          .section h2 { color: #222; font-size: 1.2rem; margin-bottom: 1rem; }
          .footer { text-align: center; color: #aaa; font-size: 0.98rem; margin-top: 2.5rem; }
          form { margin-bottom: 2rem; }
          input, select { padding: 0.6rem; border: 1px solid #ccc; border-radius: 6px; font-size: 1rem; margin-right: 0.7rem; }
          button { background: #42b983; color: #fff; border: none; padding: 0.7rem 1.2rem; border-radius: 6px; font-size: 1rem; cursor: pointer; font-weight: bold; }
          table { width: 100%; border-collapse: collapse; margin-top: 1.2rem; }
          th, td { padding: 0.7rem; border-bottom: 1px solid #eee; text-align: left; }
          th { background: #f0f0f0; color: #222; }
          tr:last-child td { border-bottom: none; }
        </style>
      </head>
      <body>
        <div class="layout">
          <aside class="sidebar">
            <h2><i class="fa-solid fa-leaf"></i> Lidugog</h2>
            <ul class="nav">
              <li><a href="/"><span class="icon"><i class="fa-solid fa-house"></i></span>Dashboard</a></li>
              <li><a href="/admin"><span class="icon"><i class="fa-solid fa-gauge-high"></i></span>Admin</a></li>
              <li><a href="/create-blog"><span class="icon"><i class="fa-solid fa-pen-to-square"></i></span>Create Blog</a></li>
              <li><a href="/messages"><span class="icon"><i class="fa-solid fa-envelope"></i></span>Messages</a></li>
              <li><a href="/calendar"><span class="icon"><i class="fa-solid fa-calendar-days"></i></span>Calendar</a></li>
              <li><a href="/settings"><span class="icon"><i class="fa-solid fa-gear"></i></span>Settings</a></li>
            </ul>
          </aside>
          <main class="main">
            <h1>Settings</h1>
            <div class="section">
              <h2><i class="fa-solid fa-user-plus"></i> Add User</h2>
              <form method="POST" action="/settings/add-user">
                <input name="username" type="text" placeholder="Username" required />
                <input name="email" type="email" placeholder="Email" />
                <input name="password" type="password" placeholder="Password" required />
                <select name="role">
                  <option value="admin">Admin</option>
                  <option value="editor">Editor</option>
                </select>
                <button type="submit">Add User</button>
              </form>
              <h2><i class="fa-solid fa-users"></i> Users</h2>
              <table>
                <thead>
                  <tr><th>Username</th><th>Email</th><th>Role</th><th>Created</th><th>Actions</th></tr>
                </thead>
                <tbody>${usersHtml}</tbody>
              </table>
            </div>
            <div class="footer">&copy; 2025 Lidugog Blog. Powered by Node.js &amp; Express.</div>
          </main>
        </div>
      </body>
      </html>
    `);
  });
// Handle user role update
app.post('/settings/edit-user', (req, res) => {
  const { id, role } = req.body;
  if (!id || !role) return res.status(400).send('User ID and role required.');
  db.run('UPDATE users SET role = ? WHERE id = ?', [role, id], function(err) {
    if (err) return res.status(500).send('Error updating user role.');
    res.redirect('/settings');
  });
});

// Handle user delete
app.post('/settings/delete-user', (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).send('User ID required.');
  db.run('DELETE FROM users WHERE id = ?', [id], function(err) {
    if (err) return res.status(500).send('Error deleting user.');
    res.redirect('/settings');
  });
});
});

// Handle add user POST
app.post('/settings/add-user', async (req, res) => {
  const { username, email, password, role } = req.body;
  if (!username || !password) return res.status(400).send('Username and password required.');
  const hash = await bcrypt.hash(password, 10);
  const created_at = new Date().toISOString();
  db.run('INSERT INTO users (username, password, email, role, created_at) VALUES (?, ?, ?, ?, ?)', [username, hash, email, role || 'admin', created_at], function(err) {
    if (err) {
      let msg = 'Error adding user.';
      if (err.message && err.message.includes('UNIQUE')) msg = 'Username already exists.';
      return res.status(400).send(msg);
    }
    res.redirect('/settings');
  });
});

// API: Get monthly visit stats (customer flow)
app.get('/api/visits/monthly', (req, res) => {
  db.all(`SELECT strftime('%Y-%m', date) as month, COUNT(*) as count FROM visits GROUP BY month ORDER BY month DESC LIMIT 13`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows.reverse()); // chronological order
  });
});

// API: Get device share (traffic share)
app.get('/api/visits/devices', (req, res) => {
  db.all(`SELECT device, COUNT(*) as count FROM visits GROUP BY device`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});
// Helper to parse device type from user-agent
function getDeviceType(ua) {
  ua = ua || '';
  if (/mobile/i.test(ua)) return 'Mobile';
  if (/tablet|ipad/i.test(ua)) return 'Tablet';
  if (/android/i.test(ua) && !/mobile/i.test(ua)) return 'Tablet';
  return 'Desktop';
}

// Log visit middleware
function logVisit(pathName) {
  return (req, res, next) => {
    const ua = req.headers['user-agent'] || '';
    const device = getDeviceType(ua);
    const date = new Date().toISOString();
    db.run('INSERT INTO visits (path, device, user_agent, date) VALUES (?, ?, ?, ?)', [pathName, device, ua, date], () => {});
    next();
  };
}


// Serve admin dashboard at /admin
app.get('/admin', logVisit('/admin'), (req, res) => {
  res.sendFile(path.join(__dirname, 'admin-dashboard.html'));
});


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

// --- In-memory data removed; now using SQLite database ---

// --- Routes ---

// Serve the create blog HTML form at /create-blog
app.get('/create-blog', (req, res) => {
  res.sendFile(path.join(__dirname, 'create-blog.html'));
});

// Blog CRUD
app.get('/api/posts', (req, res) => {
  db.all('SELECT * FROM posts ORDER BY date DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});
app.get('/api/posts/:id', (req, res) => {
  // Increment views
  db.run('UPDATE posts SET views = views + 1 WHERE id = ?', [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    db.get('SELECT * FROM posts WHERE id = ?', [req.params.id], (err2, row) => {
      if (err2) return res.status(500).json({ error: err2.message });
      if (!row) return res.status(404).json({ error: 'Post not found' });
      res.json(row);
    });
  });
});
app.post('/api/posts', upload.single('image'), (req, res) => {
  const { title, author, date, summary, imageUrl: imageUrlField } = req.body;
  if (!title || !author || !date || !summary) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  let imageUrl = '';
  if (req.file) {
    imageUrl = `/uploads/${req.file.filename}`;
  } else if (imageUrlField && imageUrlField.trim().length > 0) {
    imageUrl = imageUrlField.trim();
  }
  db.run(
    'INSERT INTO posts (title, author, date, summary, image, likes) VALUES (?, ?, ?, ?, ?, 0)',
    [title, author, date, summary, imageUrl],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      db.get('SELECT * FROM posts WHERE id = ?', [this.lastID], (err2, row) => {
        if (err2) return res.status(500).json({ error: err2.message });
        res.status(201).json(row);
      });
    }
  );
});
// --- Blog Comments API ---
// Get comments for a post
app.get('/api/posts/:id/comments', (req, res) => {
  db.all('SELECT * FROM comments WHERE post_id = ? ORDER BY date DESC', [req.params.id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Add a comment to a post
app.post('/api/posts/:id/comments', (req, res) => {
  const { name, text } = req.body;
  if (!name || !text) return res.status(400).json({ error: 'Name and text are required.' });
  const postId = parseInt(req.params.id);
  db.get('SELECT * FROM posts WHERE id = ?', [postId], (err, post) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!post) return res.status(404).json({ error: 'Post not found' });
    const date = new Date().toISOString();
    db.run(
      'INSERT INTO comments (post_id, name, text, date) VALUES (?, ?, ?, ?)',
      [postId, name, text, date],
      function (err2) {
        if (err2) return res.status(500).json({ error: err2.message });
        db.get('SELECT * FROM comments WHERE id = ?', [this.lastID], (err3, row) => {
          if (err3) return res.status(500).json({ error: err3.message });
          res.status(201).json(row);
        });
      }
    );
  });
});

// --- Blog Likes API ---
// Get like count for a post
app.get('/api/posts/:id/likes', (req, res) => {
  db.get('SELECT likes FROM posts WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Post not found' });
    res.json({ likes: row.likes || 0 });
  });
});

// Like a post (increment likes)
app.post('/api/posts/:id/likes', (req, res) => {
  const id = parseInt(req.params.id);
  db.run('UPDATE posts SET likes = likes + 1 WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    db.get('SELECT likes FROM posts WHERE id = ?', [id], (err2, row) => {
      if (err2) return res.status(500).json({ error: err2.message });
      if (!row) return res.status(404).json({ error: 'Post not found' });
      res.json({ likes: row.likes });
    });
  });
});
app.put('/api/posts/:id', upload.single('image'), (req, res) => {
  const id = parseInt(req.params.id);
  const { title, author, date, summary } = req.body;
  let imageUrl = null;
  if (req.file) {
    imageUrl = `/uploads/${req.file.filename}`;
  }
  // Build dynamic SQL for optional image update
  let sql = 'UPDATE posts SET title = ?, author = ?, date = ?, summary = ?';
  let params = [title, author, date, summary];
  if (imageUrl) {
    sql += ', image = ?';
    params.push(imageUrl);
  }
  sql += ' WHERE id = ?';
  params.push(id);
  db.run(sql, params, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    db.get('SELECT * FROM posts WHERE id = ?', [id], (err2, row) => {
      if (err2) return res.status(500).json({ error: err2.message });
      if (!row) return res.status(404).json({ error: 'Post not found' });
      res.json(row);
    });
  });
});
app.delete('/api/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  db.get('SELECT * FROM posts WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Post not found' });
    db.run('DELETE FROM posts WHERE id = ?', [id], function (err2) {
      if (err2) return res.status(500).json({ error: err2.message });
      res.json(row);
    });
  });
});

// Contact form endpoint
const renderHome = (stats, recentPostsHtml) => `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Lidugog Blog Backend</title>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
      <style>
        body { font-family: 'Inter', sans-serif; background: #f7f7f7; color: #222; margin: 0; }
        .layout { display: flex; min-height: 100vh; }
        .sidebar { width: 220px; background: #222; color: #fff; display: flex; flex-direction: column; padding: 2rem 1.2rem 1.2rem 1.2rem; }
        .sidebar h2 { color: #42b983; font-size: 1.5rem; margin-bottom: 2.5rem; text-align: center; letter-spacing: -1px; }
        .nav { list-style: none; padding: 0; margin: 0; }
        .nav li { margin-bottom: 1.5rem; }
        .nav a { color: #fff; text-decoration: none; font-weight: 600; font-size: 1.08rem; display: flex; align-items: center; transition: color 0.2s; }
        .nav a:hover { color: #42b983; }
        .nav .icon { color: #42b983; font-size: 1.2rem; width: 1.7rem; text-align: center; margin-right: 0.5rem; }
        .main { flex: 1; background: #f7f7f7; padding: 2.5rem 2rem 2rem 2rem; }
        .main h1 { color: #42b983; font-size: 2.1rem; margin-bottom: 0.5rem; letter-spacing: -1px; }
        .section { background: #fff; border-radius: 14px; box-shadow: 0 2px 12px rgba(66,185,131,0.07); padding: 1.5rem 1.5rem 1.2rem 1.5rem; margin-bottom: 2rem; }
        .section h2 { color: #222; font-size: 1.2rem; margin-bottom: 1rem; }
        .footer { text-align: center; color: #aaa; font-size: 0.98rem; margin-top: 2.5rem; }
      </style>
    </head>
    <body>
      <div class="layout">
        <aside class="sidebar">
          <h2><i class="fa-solid fa-leaf"></i> Lidugog</h2>
          <ul class="nav">
            <li><a href="/"><span class="icon"><i class="fa-solid fa-house"></i></span>Dashboard</a></li>
            <li><a href="/admin"><span class="icon"><i class="fa-solid fa-gauge-high"></i></span>Admin</a></li>
            <li><a href="/create-blog"><span class="icon"><i class="fa-solid fa-pen-to-square"></i></span>Create Blog</a></li>
            <li><a href="/messages"><span class="icon"><i class="fa-solid fa-envelope"></i></span>Messages</a></li>
            <li><a href="/calendar"><span class="icon"><i class="fa-solid fa-calendar-days"></i></span>Calendar</a></li>
            <li><a href="/settings"><span class="icon"><i class="fa-solid fa-gear"></i></span>Settings</a></li>
          </ul>
        </aside>
        <main class="main">
          <h1>Welcome to Lidugog Blog Backend</h1>
          <div class="desc">Manage blog posts, comments, subscriptions, and events from this dashboard.</div>
          <div class="section" id="blogstats">
            <h2><i class="fa-solid fa-chart-bar"></i> Blog Performance</h2>
            <div style="display:flex;gap:2rem;flex-wrap:wrap;">
              <div style="flex:1;min-width:120px;text-align:center;">
                <div style="font-size:2.2rem;color:#42b983;font-weight:bold;">${stats.totalBlogs}</div>
                <div style="color:#888;">Total Blogs</div>
              </div>
              <div style="flex:1;min-width:120px;text-align:center;">
                <div style="font-size:2.2rem;color:#42b983;font-weight:bold;">${stats.totalLikes}</div>
                <div style="color:#888;">Total Likes</div>
              </div>
            </div>
            <div style="margin-top:2rem;">
              <h3 style="color:#222;font-size:1.1rem;margin-bottom:0.7rem;">Recent Posts</h3>
              <ul style="list-style:none;padding:0;">${recentPostsHtml}</ul>
            </div>
          </div>
          <div class="section" id="calendar">
            <h2><i class="fa-solid fa-calendar-days"></i> Calendar of Events</h2>
            <div class="calendar-placeholder">(Event calendar coming soon)</div>
          </div>
          <div class="api">
            <i class="fa-solid fa-code"></i> For API usage, see <a href="/api/posts">/api/posts</a>
          </div>
          <div class="footer">&copy; 2025 Lidugog Blog. Powered by Node.js &amp; Express.</div>
        </main>
      </div>
    </body>
    </html>
`;

app.get('/', logVisit('/'), (req, res) => {
  db.all('SELECT * FROM posts ORDER BY date DESC LIMIT 5', [], (err, posts) => {
    if (err) return res.status(500).send('Error loading blog stats.');
    db.get('SELECT COUNT(*) as totalBlogs, SUM(likes) as totalLikes FROM posts', [], (err2, stats) => {
      if (err2) return res.status(500).send('Error loading blog stats.');
      const recentPostsHtml = posts.map(post => `<li style='margin-bottom:0.5rem;'><strong>${post.title}</strong> <span style='color:#888;'>(${post.date})</span> <span style='color:#42b983;font-weight:bold;'>${post.likes} <i class=\"fa-solid fa-thumbs-up\"></i></span></li>`).join('') || '<li style="color:#aaa;">No posts yet.</li>';
      res.send(renderHome(stats, recentPostsHtml));
    });
  });
});
// Messages page
app.get('/messages', (req, res) => {
  db.all('SELECT * FROM contacts ORDER BY date DESC LIMIT 20', [], (err, messages) => {
    if (err) return res.status(500).send('Error loading messages.');
    const messagesHtml = messages.length ? messages.map(m => `<li style='border-bottom:1px solid #eee;padding:0.7rem 0;'><strong>${m.name}</strong> <span style='color:#888;'>(${m.email})</span><br>${m.message}<br><span style='color:#aaa;font-size:0.95em;'>${m.date}</span></li>`).join('') : '<li style="color:#aaa;">No messages yet.</li>';
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reader Messages - Lidugog Blog</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
        <style>
          body { font-family: 'Inter', sans-serif; background: #f7f7f7; color: #222; margin: 0; }
          .layout { display: flex; min-height: 100vh; }
          .sidebar { width: 220px; background: #222; color: #fff; display: flex; flex-direction: column; padding: 2rem 1.2rem 1.2rem 1.2rem; }
          .sidebar h2 { color: #42b983; font-size: 1.5rem; margin-bottom: 2.5rem; text-align: center; letter-spacing: -1px; }
          .nav { list-style: none; padding: 0; margin: 0; }
          .nav li { margin-bottom: 1.5rem; }
          .nav a { color: #fff; text-decoration: none; font-weight: 600; font-size: 1.08rem; display: flex; align-items: center; transition: color 0.2s; }
          .nav a:hover { color: #42b983; }
          .nav .icon { color: #42b983; font-size: 1.2rem; width: 1.7rem; text-align: center; margin-right: 0.5rem; }
          .main { flex: 1; background: #f7f7f7; padding: 2.5rem 2rem 2rem 2rem; }
          .main h1 { color: #42b983; font-size: 2.1rem; margin-bottom: 0.5rem; letter-spacing: -1px; }
          .section { background: #fff; border-radius: 14px; box-shadow: 0 2px 12px rgba(66,185,131,0.07); padding: 1.5rem 1.5rem 1.2rem 1.5rem; margin-bottom: 2rem; }
          .section h2 { color: #222; font-size: 1.2rem; margin-bottom: 1rem; }
          .messages-list { list-style: none; padding: 0; margin: 0; }
          .messages-list li { border-bottom: 1px solid #eee; padding: 0.7rem 0; }
          .footer { text-align: center; color: #aaa; font-size: 0.98rem; margin-top: 2.5rem; }
          @media (max-width: 800px) {
            .layout { flex-direction: column; }
            .sidebar { width: 100%; flex-direction: row; justify-content: space-around; align-items: center; padding: 1rem 0.5rem; }
            .sidebar h2 { display: none; }
            .nav { display: flex; flex-direction: row; }
            .nav li { margin: 0 1rem 0 0; }
          }
        </style>
      </head>
      <body>
        <div class="layout">
          <aside class="sidebar">
            <h2><i class="fa-solid fa-leaf"></i> Lidugog</h2>
            <ul class="nav">
              <li><a href="/"><span class="icon"><i class="fa-solid fa-house"></i></span>Dashboard</a></li>
              <li><a href="/admin"><span class="icon"><i class="fa-solid fa-gauge-high"></i></span>Admin</a></li>
              <li><a href="/create-blog"><span class="icon"><i class="fa-solid fa-pen-to-square"></i></span>Create Blog</a></li>
              <li><a href="/messages"><span class="icon"><i class="fa-solid fa-envelope"></i></span>Messages</a></li>
              <li><a href="/calendar"><span class="icon"><i class="fa-solid fa-calendar-days"></i></span>Calendar</a></li>
              <li><a href="/settings"><span class="icon"><i class="fa-solid fa-gear"></i></span>Settings</a></li>
              <!-- Add more admin features here -->
            </ul>
          </aside>
          <main class="main">
            <h1>Reader Messages</h1>
            <div class="section">
              <h2><i class="fa-solid fa-envelope"></i> Messages from Readers</h2>
              <ul class="messages-list">${messagesHtml}</ul>
            </div>
            <div class="footer">&copy; 2025 Lidugog Blog. Powered by Node.js &amp; Express.</div>
          </main>
        </div>
      </body>
      </html>
    `);
  });
});

// --- Start server ---
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend API running on http://localhost:${PORT}`);
});

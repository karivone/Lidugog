// ==========================================
// DATABASE INITIALIZATION & CONFIGURATION
// ==========================================
// SQLite database setup with all required tables
// ==========================================

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Database file path
const dbPath = path.join(__dirname, 'blog.db');

// Create database connection
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Error opening database:', err.message);
    process.exit(1);
  }
  console.log('✅ Connected to SQLite database');
});

// Enable foreign keys
db.run('PRAGMA foreign_keys = ON');

// ==========================================
// TABLE CREATION
// ==========================================

// Posts table
db.run(`
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    date TEXT NOT NULL,
    summary TEXT NOT NULL,
    content TEXT,
    image TEXT,
    category TEXT DEFAULT 'general',
    likes INTEGER DEFAULT 0,
    views INTEGER DEFAULT 0,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
  )
`, (err) => {
  if (err) {
    console.error('Error creating posts table:', err);
  } else {
    console.log('✅ Contacts table ready');
  }
});

// Events/Calendar table
db.run(`
  CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    start_date TEXT NOT NULL,
    end_date TEXT NOT NULL,
    location TEXT,
    color TEXT DEFAULT '#6366f1',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
  )
`, (err) => {
  if (err) {
    console.error('Error creating events table:', err);
  } else {
    console.log('✅ Events table ready');
  }
});

// Users table
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    email TEXT,
    role TEXT DEFAULT 'admin',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    last_login TEXT
  )
`, (err) => {
  if (err) {
    console.error('Error creating users table:', err);
  } else {
    console.log('✅ Users table ready');
  }
});

// Visits/Analytics table
db.run(`
  CREATE TABLE IF NOT EXISTS visits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    path TEXT NOT NULL,
    device TEXT,
    user_agent TEXT,
    ip_address TEXT,
    date TEXT DEFAULT CURRENT_TIMESTAMP
  )
`, (err) => {
  if (err) {
    console.error('Error creating visits table:', err);
  } else {
    console.log('✅ Visits table ready');
  }
});

// ==========================================
// INDEXES FOR PERFORMANCE
// ==========================================

// Create indexes for frequently queried columns
db.run('CREATE INDEX IF NOT EXISTS idx_posts_date ON posts(date DESC)');
db.run('CREATE INDEX IF NOT EXISTS idx_posts_category ON posts(category)');
db.run('CREATE INDEX IF NOT EXISTS idx_comments_post_id ON comments(post_id)');
db.run('CREATE INDEX IF NOT EXISTS idx_subscriptions_email ON subscriptions(email)');
db.run('CREATE INDEX IF NOT EXISTS idx_contacts_date ON contacts(date DESC)');
db.run('CREATE INDEX IF NOT EXISTS idx_events_start_date ON events(start_date)');
db.run('CREATE INDEX IF NOT EXISTS idx_visits_date ON visits(date DESC)');

console.log('✅ Database indexes created');

// ==========================================
// SEED DATA (Optional - for development)
// ==========================================

// Check if we need to seed initial data
db.get('SELECT COUNT(*) as count FROM posts', [], (err, row) => {
  if (err) {
    console.error('Error checking posts:', err);
    return;
  }
  
  // If no posts exist, add sample posts
  if (row.count === 0) {
    console.log('📝 Seeding initial blog posts...');
    
    const samplePosts = [
      {
        title: 'Welcome to Lidugog Blog',
        author: 'Lidugog Team',
        date: new Date().toISOString().split('T')[0],
        summary: 'Welcome to our blog! This is where we share stories, insights, and meaningful conversations about life, faith, and personal growth. Join us on this journey of discovery and connection.',
        content: 'Welcome to our blog! This is where we share stories, insights, and meaningful conversations about life, faith, and personal growth. Join us on this journey of discovery and connection.',
        category: 'announcement',
        likes: 0,
        views: 0
      },
      {
        title: 'The Power of Community',
        author: 'Kayewi',
        date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
        summary: 'Exploring how meaningful connections and community support can transform our lives. Discover the importance of building authentic relationships.',
        content: 'Exploring how meaningful connections and community support can transform our lives. Discover the importance of building authentic relationships.',
        category: 'life',
        likes: 15,
        views: 234
      },
      {
        title: 'Finding Purpose in Daily Life',
        author: 'Kayewi',
        date: new Date(Date.now() - 172800000).toISOString().split('T')[0],
        summary: 'Sometimes the most profound moments happen in the ordinary. Learn how to find meaning and purpose in your everyday experiences.',
        content: 'Sometimes the most profound moments happen in the ordinary. Learn how to find meaning and purpose in your everyday experiences.',
        category: 'growth',
        likes: 23,
        views: 456
      }
    ];
    
    const stmt = db.prepare(`
      INSERT INTO posts (title, author, date, summary, content, category, likes, views, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    samplePosts.forEach(post => {
      stmt.run(
        post.title,
        post.author,
        post.date,
        post.summary,
        post.content,
        post.category,
        post.likes,
        post.views,
        new Date().toISOString()
      );
    });
    
    stmt.finalize(() => {
      console.log('✅ Sample posts created');
    });
  }
});

// Check if we need to create a default admin user
db.get('SELECT COUNT(*) as count FROM users', [], async (err, row) => {
  if (err) {
    console.error('Error checking users:', err);
    return;
  }
  
  // If no users exist, create default admin
  if (row.count === 0) {
    console.log('👤 Creating default admin user...');
    
    const bcrypt = require('bcryptjs');
    const defaultPassword = 'admin123'; // Change this in production!
    
    try {
      const hashedPassword = await bcrypt.hash(defaultPassword, 10);
      
      db.run(
        'INSERT INTO users (username, password, email, role, created_at) VALUES (?, ?, ?, ?, ?)',
        ['admin', hashedPassword, 'admin@lidugog.com', 'admin', new Date().toISOString()],
        (err) => {
          if (err) {
            console.error('Error creating default user:', err);
          } else {
            console.log('✅ Default admin user created (username: admin, password: admin123)');
            console.log('⚠️  IMPORTANT: Change the default password immediately!');
          }
        }
      );
    } catch (error) {
      console.error('Error hashing password:', error);
    }
  }
});

// ==========================================
// DATABASE UTILITIES
// ==========================================

// Function to safely close database
const closeDatabase = () => {
  return new Promise((resolve, reject) => {
    db.close((err) => {
      if (err) {
        console.error('Error closing database:', err);
        reject(err);
      } else {
        console.log('Database connection closed');
        resolve();
      }
    });
  });
};

// Function to run database migrations
const runMigration = (sql) => {
  return new Promise((resolve, reject) => {
    db.run(sql, (err) => {
      if (err) {
        console.error('Migration error:', err);
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

// Function to get database stats
const getDatabaseStats = () => {
  return new Promise((resolve, reject) => {
    const stats = {};
    
    const queries = [
      { name: 'posts', sql: 'SELECT COUNT(*) as count FROM posts' },
      { name: 'comments', sql: 'SELECT COUNT(*) as count FROM comments' },
      { name: 'subscriptions', sql: 'SELECT COUNT(*) as count FROM subscriptions' },
      { name: 'contacts', sql: 'SELECT COUNT(*) as count FROM contacts' },
      { name: 'events', sql: 'SELECT COUNT(*) as count FROM events' },
      { name: 'users', sql: 'SELECT COUNT(*) as count FROM users' },
      { name: 'visits', sql: 'SELECT COUNT(*) as count FROM visits' }
    ];
    
    let completed = 0;
    
    queries.forEach(query => {
      db.get(query.sql, [], (err, row) => {
        if (!err && row) {
          stats[query.name] = row.count;
        }
        completed++;
        
        if (completed === queries.length) {
          resolve(stats);
        }
      });
    });
  });
};

// ==========================================
// EXPORT DATABASE CONNECTION
// ==========================================

module.exports = db;
module.exports.closeDatabase = closeDatabase;
module.exports.runMigration = runMigration;
module.exports.getDatabaseStats = getDatabaseStats;

// Log database initialization complete
console.log(`
╔═══════════════════════════════════════════════╗
║  📊 DATABASE INITIALIZATION COMPLETE          ║
║                                               ║
║  All tables created successfully              ║
║  Indexes optimized for performance            ║
║  Ready to accept connections                  ║
╚═══════════════════════════════════════════════╝
`);('✅ Posts table ready');
  }
});

// Comments table
db.run(`
  CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    post_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    text TEXT NOT NULL,
    date TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
  )
`, (err) => {
  if (err) {
    console.error('Error creating comments table:', err);
  } else {
    console.log('✅ Comments table ready');
  }
});

// Subscriptions table
db.run(`
  CREATE TABLE IF NOT EXISTS subscriptions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    gender TEXT,
    age INTEGER,
    country TEXT,
    date TEXT DEFAULT CURRENT_TIMESTAMP,
    active INTEGER DEFAULT 1
  )
`, (err) => {
  if (err) {
    console.error('Error creating subscriptions table:', err);
  } else {
    console.log('✅ Subscriptions table ready');
  }
});

// Contacts table
db.run(`
  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    date TEXT DEFAULT CURRENT_TIMESTAMP,
    read INTEGER DEFAULT 0
  )
`, (err) => {
  if (err) {
    console.error('Error creating contacts table:', err);
  } else {
    console.log('✅ Contacts table ready');
  }
});



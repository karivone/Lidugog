const sqlite3 = require('sqlite3').verbose();

// Create/connect to SQLite database
const db = new sqlite3.Database('./blog.db', (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Connected to SQLite database');
    initializeDatabase();
  }
});

// Initialize database tables and indexes
function initializeDatabase() {
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
  `, createTablesCallback('posts'));

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
  `, createTablesCallback('comments'));

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
  `, createTablesCallback('contacts'));

  // Messages table
  db.run(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      read INTEGER DEFAULT 0
    )
  `, createTablesCallback('messages'));

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
  `, createTablesCallback('events'));

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
  `, createTablesCallback('users'));

  // Subscribers table
  db.run(`
    CREATE TABLE IF NOT EXISTS subscribers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      status TEXT DEFAULT 'active',
      subscribed_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `, createTablesCallback('subscribers'));

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
  `, createTablesCallback('visits'));

  // Create indexes after a short delay to ensure tables are created
  setTimeout(() => {
    createIndexes();
    seedInitialData();
  }, 1000);
}

// Helper function for table creation callbacks
function createTablesCallback(tableName) {
  return (err) => {
    if (err) {
      console.error('Error creating ' + tableName + ' table:', err);
    } else {
      console.log('✅ ' + tableName + ' table ready');
    }
  };
}

// Create database indexes
function createIndexes() {
  const indexes = [
    { name: 'idx_posts_date', table: 'posts', columns: 'date DESC' },
    { name: 'idx_posts_category', table: 'posts', columns: 'category' },
    { name: 'idx_comments_post_id', table: 'comments', columns: 'post_id' },
    { name: 'idx_contacts_date', table: 'contacts', columns: 'date DESC' },
    { name: 'idx_events_start_date', table: 'events', columns: 'start_date' },
    { name: 'idx_visits_date', table: 'visits', columns: 'date DESC' }
  ];

  indexes.forEach(index => {
    db.run('CREATE INDEX IF NOT EXISTS ' + index.name + ' ON ' + index.table + '(' + index.columns + ')',
      err => err && console.error('Error creating index ' + index.name + ':', err));
  });

  console.log('✅ Database indexes created');
}

// Seed initial data
function seedInitialData() {
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
          summary: 'Welcome to our blog! Join us on this journey.',
          content: 'Welcome to our blog! This is where we share stories and insights.',
          category: 'announcement',
          likes: 0,
          views: 0
        },
        {
          title: 'The Power of Community',
          author: 'Kayewi',
          date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
          summary: 'Exploring how community support transforms lives.',
          content: 'Exploring how meaningful connections and community support can transform our lives.',
          category: 'life',
          likes: 15,
          views: 234
        }
      ];
      
      const stmt = db.prepare(
        'INSERT INTO posts (title, author, date, summary, content, category, likes, views, created_at) ' +
        'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
      );
      
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

  // Create default admin user if none exists
  createDefaultAdmin();
}

// Create default admin user
async function createDefaultAdmin() {
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
}

// Database utilities
function closeDatabase() {
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
}

function getDatabaseStats() {
  return new Promise((resolve, reject) => {
    const stats = {};
    
    const queries = [
      { name: 'posts', sql: 'SELECT COUNT(*) as count FROM posts' },
      { name: 'comments', sql: 'SELECT COUNT(*) as count FROM comments' },
      { name: 'subscribers', sql: 'SELECT COUNT(*) as count FROM subscribers' },
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
}

// Export database connection and utilities
module.exports = db;
module.exports.closeDatabase = closeDatabase;
module.exports.getDatabaseStats = getDatabaseStats;

// Log database initialization complete
console.log(
  '╔═══════════════════════════════════════════════╗\n' +
  '║  📊 DATABASE INITIALIZATION COMPLETE          ║\n' +
  '║                                               ║\n' +
  '║  All tables created successfully              ║\n' +
  '║  Indexes optimized for performance            ║\n' +
  '║  Ready to accept connections                  ║\n' +
  '╚═══════════════════════════════════════════════╝'
);

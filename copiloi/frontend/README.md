# frontend

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
# 🚀 Lidugog Blog - Modernized Backend

## Overview
Complete modernization of the backend API server with improved organization, error handling, and performance optimizations.

---

## ✨ Key Improvements

### 1. **Code Organization**
- ✅ Clear section separators with comments
- ✅ Logical grouping of related endpoints
- ✅ Consistent naming conventions
- ✅ Separated concerns (routes, middleware, utilities)

### 2. **Enhanced Error Handling**
```javascript
// Before: Basic error responses
if (err) return res.status(500).json({ error: err.message });

// After: Comprehensive error handling with logging
if (err) {
  console.error('Error fetching posts:', err);
  return res.status(500).json({ 
    error: 'Failed to fetch posts',
    message: 'Please try again later'
  });
}
```

### 3. **Improved File Upload**
- ✅ 5MB file size limit
- ✅ File type validation (jpeg, jpg, png, gif, webp)
- ✅ Unique filename generation
- ✅ Better error messages

### 4. **Database Enhancements**
- ✅ Proper indexes for performance
- ✅ Foreign key constraints
- ✅ Sample data seeding
- ✅ Default admin user creation
- ✅ Database utilities (close, migrate, stats)

### 5. **API Response Standardization**
```javascript
// Consistent response format
res.status(201).json({ 
  message: 'Subscription successful! Welcome to our community.',
  id: this.lastID 
});
```

### 6. **Better Logging**
```javascript
console.log(`
╔═══════════════════════════════════════════════╗
║   🚀 LIDUGOG BLOG BACKEND API SERVER         ║
║   Status: ✅ Running                          ║
║   Port: 4000                                  ║
║   URL: http://localhost:4000                  ║
╚═══════════════════════════════════════════════╝
`);
```

---

## 📚 API Endpoints Reference

### **Blog Posts**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/posts` | Get all posts |
| GET | `/api/posts/:id` | Get single post (increments views) |
| POST | `/api/posts` | Create new post (with image upload) |
| PUT | `/api/posts/:id` | Update post |
| DELETE | `/api/posts/:id` | Delete post |

### **Comments**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/posts/:id/comments` | Get all comments for a post |
| POST | `/api/posts/:id/comments` | Add comment to post |

### **Likes**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/posts/:id/likes` | Get like count |
| POST | `/api/posts/:id/likes` | Increment likes |

### **Subscriptions**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/subscriptions` | Get all subscriptions |
| GET | `/api/subscribers/recent` | Get recent 10 subscribers |
| GET | `/api/subscribers/monthly` | Get monthly growth data |
| POST | `/api/subscribe` | Create new subscription |

### **Contact Messages**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/contacts` | Get all contact messages |
| POST | `/api/contact` | Submit new contact message |

### **Events/Calendar**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/events` | Get all events |
| GET | `/api/events/upcoming` | Get upcoming events |
| POST | `/api/events` | Create new event |
| PUT | `/api/events/:id` | Update event |
| DELETE | `/api/events/:id` | Delete event |

### **Analytics**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/visits/monthly` | Get monthly visit stats |
| GET | `/api/visits/devices` | Get device distribution |

### **Users**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get all users |
| POST | `/settings/add-user` | Create new user |
| POST | `/settings/edit-user` | Update user role |
| POST | `/settings/delete-user` | Delete user |

---

## 🗄️ Database Schema

### **posts**
```sql
- id (PRIMARY KEY)
- title (TEXT, NOT NULL)
- author (TEXT, NOT NULL)
- date (TEXT, NOT NULL)
- summary (TEXT, NOT NULL)
- content (TEXT)
- image (TEXT)
- category (TEXT, DEFAULT 'general')
- likes (INTEGER, DEFAULT 0)
- views (INTEGER, DEFAULT 0)
- created_at (TEXT)
- updated_at (TEXT)
```

### **comments**
```sql
- id (PRIMARY KEY)
- post_id (FOREIGN KEY -> posts.id)
- name (TEXT, NOT NULL)
- text (TEXT, NOT NULL)
- date (TEXT)
```

### **subscriptions**
```sql
- id (PRIMARY KEY)
- firstName (TEXT, NOT NULL)
- lastName (TEXT, NOT NULL)
- email (TEXT, UNIQUE, NOT NULL)
- gender (TEXT)
- age (INTEGER)
- country (TEXT)
- date (TEXT)
- active (INTEGER, DEFAULT 1)
```

### **contacts**
```sql
- id (PRIMARY KEY)
- name (TEXT, NOT NULL)
- email (TEXT, NOT NULL)
- subject (TEXT)
- message (TEXT, NOT NULL)
- date (TEXT)
- read (INTEGER, DEFAULT 0)
```

### **events**
```sql
- id (PRIMARY KEY)
- title (TEXT, NOT NULL)
- description (TEXT)
- start_date (TEXT, NOT NULL)
- end_date (TEXT, NOT NULL)
- location (TEXT)
- color (TEXT, DEFAULT '#6366f1')
- created_at (TEXT)
- updated_at (TEXT)
```

### **users**
```sql
- id (PRIMARY KEY)
- username (TEXT, UNIQUE, NOT NULL)
- password (TEXT, NOT NULL) // bcrypt hashed
- email (TEXT)
- role (TEXT, DEFAULT 'admin')
- created_at (TEXT)
- last_login (TEXT)
```

### **visits**
```sql
- id (PRIMARY KEY)
- path (TEXT, NOT NULL)
- device (TEXT)
- user_agent (TEXT)
- ip_address (TEXT)
- date (TEXT)
```

---

## 🔧 Setup Instructions

### 1. **Install Dependencies**
```bash
npm install express cors sqlite3 multer bcryptjs body-parser
```

### 2. **Initialize Database**
```bash
node db.js
```

### 3. **Start Server**
```bash
node index.js
```

### 4. **Access Admin Panel**
```
http://localhost:4000
```

### 5. **Default Credentials**
```
Username: admin
Password: admin123
```
⚠️ **Change immediately in production!**

---

## 🔐 Security Features

1. **Password Hashing**: All passwords encrypted with bcrypt
2. **File Validation**: Only images allowed for uploads
3. **File Size Limits**: 5MB max per upload
4. **SQL Injection Protection**: Parameterized queries
5. **CORS Enabled**: Cross-origin requests allowed
6. **Unique Email Validation**: Prevents duplicate subscriptions

---

## 📊 Performance Optimizations

1. **Database Indexes**: Added on frequently queried columns
2. **Foreign Keys**: Enabled for data integrity
3. **Cascading Deletes**: Auto-delete related data
4. **Efficient Queries**: Optimized SELECT statements
5. **Connection Pooling**: SQLite connection reuse

---

## 🎯 Best Practices Implemented

1. ✅ RESTful API design
2. ✅ Consistent error handling
3. ✅ Proper HTTP status codes
4. ✅ Descriptive error messages
5. ✅ Input validation
6. ✅ Graceful shutdown handling
7. ✅ Comprehensive logging
8. ✅ Code comments and documentation

---

## 🚦 Error Handling

### HTTP Status Codes Used:
- **200 OK**: Successful GET/PUT requests
- **201 Created**: Successful POST requests
- **400 Bad Request**: Invalid input
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server errors

### Example Error Response:
```json
{
  "error": "Failed to create post",
  "message": "Please check your input and try again"
}
```

---

## 📝 Development Workflow

### Adding a New Endpoint:
```javascript
// 1. Define route
app.post('/api/new-endpoint', (req, res) => {
  const { field1, field2 } = req.body;
  
  // 2. Validate input
  if (!field1 || !field2) {
    return res.status(400).json({ 
      error: 'Required fields missing' 
    });
  }
  
  // 3. Database operation
  db.run('INSERT INTO table...', [field1, field2], function(err) {
    if (err) {
      console.error('Error:', err);
      return res.status(500).json({ 
        error: 'Operation failed' 
      });
    }
    
    // 4. Success response
    res.status(201).json({ 
      message: 'Success',
      id: this.lastID 
    });
  });
});
```

---

## 🔄 Migration Guide

### From Old to New Backend:

1. **Replace** `index.js` with modernized version
2. **Replace** `db.js` with new database initialization
3. **Run** database initialization: `node db.js`
4. **Update** any custom routes or middleware
5. **Test** all endpoints with Postman or similar tool
6. **Deploy** to production

---

## 📞 Support & Troubleshooting

### Common Issues:

**Database locked error:**
```bash
# Close all connections and restart
rm blog.db
node db.js
node index.js
```

**Port already in use:**
```bash
# Change PORT in index.js or kill existing process
lsof -ti:4000 | xargs kill -9
```

**File upload failing:**
```bash
# Ensure uploads directory exists and has write permissions
mkdir uploads
chmod 755 uploads
```

---

## 🎉 What's New

- ✨ Modern ES6+ syntax
- 🎨 Beautiful console logging
- 🔧 Better error handling
- 📊 Enhanced analytics tracking
- 🗄️ Optimized database structure
- 🔐 Improved security measures
- 📝 Comprehensive documentation
- 🚀 Performance improvements

---

## 📈 Next Steps

1. Add JWT authentication for admin routes
2. Implement rate limiting
3. Add input sanitization
4. Create API documentation with Swagger
5. Add unit and integration tests
6. Implement caching layer (Redis)
7. Add email notifications
8. Create backup and restore utilities

---

## 📄 License

Copyright © 2025 Lidugog Blog. All rights reserved.

---

**Built with ❤️ using Node.js, Express, and SQLite**
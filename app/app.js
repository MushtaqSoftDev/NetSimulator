const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 2. Static files (Bootstrap, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// 3. View Engine Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 4. Database Connection
const dbURI = process.env.MONGO_URI || 'mongodb://mongodb:27017/mydatabase';
mongoose.connect(dbURI)
  .then(() => {
    console.log('-----------------------------------------');
    console.log('MongoDB Connection: SUCCESS');
    console.log('Database running on: localhost:27017');
    console.log('-----------------------------------------');
  })
  .catch(err => console.error('MongoDB connection error:', err));

// 5. Routes Setup
// We import the router from your routes folder
const mainRoutes = require('./routes/index'); 
app.use('/', mainRoutes);

// 6. Start Server
app.listen(PORT, () => {
  console.log('-----------------------------------------');
  console.log(`🚀 App is running at: http://localhost:${PORT}`);
  console.log(`📊 MongoExpress at: http://localhost:8081`);
  console.log('-----------------------------------------');
});


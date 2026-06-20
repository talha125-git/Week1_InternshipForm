require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const registrationRoutes = require('./routes/registrationRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/registrations', registrationRoutes);

app.get('/', (req, res) => {
  res.send('Internship Registration API is running.');
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    // Only listen on a port if not running on Vercel
    if (!process.env.VERCEL) {
      app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
      });
    }
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error.message);
  });

// Export the app for Vercel
module.exports = app;

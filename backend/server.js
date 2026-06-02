// Loads enviroment variables first before any other code is executed

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db');


// Connect to MongoDB
connectDB();
const app = express();

// Middleware

app.use(cors());
// incoming JSON reequest bodies 
app.use(express.json());

//Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/projects/:projectId/tasks', require('./routes/taskRoutes')); // nested task routes under projects

app.get('/', (req, res) => res.json({ message: 'Welcome to the Pro Tasker API' }));

// Connect to MongoDB and start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
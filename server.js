const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/database.js');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection
connectDB();

// Routes
app.use('/api/team-members', require('./routes/teamMemberRoutes.js'));  // เส้นทางสมาชิกทีม
app.use('/api/book', require('./routes/meetingRoutes.js'));  // เส้นทางการจองการประชุม

// Error handing
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: err.message });
});

// start server
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🌐✅`));
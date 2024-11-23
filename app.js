const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./Database/db');
const taskRoutes = require('./Routes/taskRoutes');  

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to the database
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(morgan('dev'));

// Task routes
app.use('/api/tasks', taskRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
//6741f12e9581629891578736
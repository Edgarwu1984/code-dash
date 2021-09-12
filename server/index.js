const express = require('express');
const connectDB = require('./config/db');
const morgan = require('morgan');
const dotenv = require('dotenv');
const colors = require('colors');
const {
  errorHandler,
  notFound,
} = require('./middleware/errorHandlingMiddleware');
const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');
const instructorRoutes = require('./routes/instructorRoutes');

dotenv.config();

// CONNECT MONGODB
connectDB();

const app = express();

// MIDDLEWARE
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ROUTES
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/instructors', instructorRoutes);

// ERROR HANDLING MIDDLEWARE
app.use(notFound);
app.use(errorHandler);

// START SERVER
const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on PORT ${PORT}`.yellow
      .bold
  )
);

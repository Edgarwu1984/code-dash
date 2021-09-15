// IMPORT MODULES && DEPENDENCIES
const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const colors = require('colors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
// IMPORT CONFIG TO CONNECT DATABASE
const connectDB = require('./config/db');
// IMPORT MIDDLEWARE
const {
  errorHandler,
  notFound,
} = require('./middleware/errorHandlingMiddleware');
const limiter = require('./middleware/rateLimitMiddleware');
// IMPORT ROUTES
const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');
const instructorRoutes = require('./routes/instructorRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

// USE THE DOTENV
dotenv.config();

// CONNECT MONGODB
connectDB();

const app = express();

// GLOBAL MIDDLEWARE
app.use(helmet()); // Set HTTP Headers security

// Read json data
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize()); // {"$gt": ""} remove the $ in query

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
// Prevent duplicates query
app.use(
  hpp({
    whitelist: ['rating', 'numReviews'],
  })
);

// Limit the request
app.use('/api/', limiter);

// Request logger
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ROUTES
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/instructors', instructorRoutes);
app.use('/api/reviews', reviewRoutes);

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

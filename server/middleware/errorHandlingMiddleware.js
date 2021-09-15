const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode; // Set default status code to 500
  res.status(statusCode);

  // Show stack trace in development mode
  const stackMessages =
    process.env.NODE_ENV === 'production' ? null : err.stack;

  let error = { ...err };

  // MongoDB Error
  if (err.name === 'CastError') {
    res.status(400).json({
      status: 'Failed',
      messages: `Invalid '${error.path}' with '${error.value}'`,
      stack: stackMessages,
    });
  } else if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(error => error.message);

    res.status(400).json({
      status: 'Failed',
      messages: `Invalid input data. ${errors.join('. ')}`, // List all the errors, separated by '.'
      stack: stackMessages,
    });
  } else {
    res.json({
      status: statusCode,
      messages: err.message,
      stack: stackMessages,
    });
  }

  next();
};

// Handle Invalid routes
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);

  res.status(404);
  next(error);
};

module.exports = { errorHandler, notFound };

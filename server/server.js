const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const colors = require('colors');

dotenv.config();

const app = express();

app.use(morgan('dev'));
app.use(express.json());

// START SERVER
const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on PORT ${PORT}`.yellow
      .bold
  )
);

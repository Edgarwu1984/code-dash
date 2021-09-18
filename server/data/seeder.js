// DATA
const users = require('./users');
const instructors = require('./instructors');
const courses = require('./courses');
const reviews = require('./reviews');

// MODELS
const User = require('../models/userModel');
const Instructor = require('../models/instructorModel');
const Course = require('../models/courseModel');
const Review = require('../models/reviewModel');

// DATABASE
const connectDB = require('../config/db');

// DOTENV
const dotenv = require('dotenv');

// COLORS
const colors = require('colors');

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // Users
    await User.deleteMany();
    await User.insertMany(users);

    // Instructors
    // await Instructor.deleteMany();
    // await Instructor.create(instructors);

    // Courses
    // await Course.deleteMany();
    // await Course.create(courses);

    // Reviews
    // await Review.deleteMany();
    // await Review.create(reviews);

    console.log('Data Imported.'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

importData();

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
    // Reset Data
    await User.deleteMany();
    await Instructor.deleteMany();
    await Course.deleteMany();
    // await Review.deleteMany();

    // Import Users
    await User.insertMany(users);
    // await Review.insertMany(reviews);

    // Import Instructors & Get Author
    const createInstructors = await Instructor.insertMany(instructors);
    const instructor = createInstructors[0]._id;

    // Insert instructor into Course
    const sampleCourses = courses.map(course => {
      return { ...course, instructor: instructor };
    });

    await Course.insertMany(sampleCourses);

    console.log('Data Imported.'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

importData();

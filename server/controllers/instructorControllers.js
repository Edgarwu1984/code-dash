const Instructor = require('../models/instructorModel');
const asyncHandler = require('../utils/asyncHandler');

const getInstructors = asyncHandler(async (req, res) => {
  const instructors = await Instructor.find();
  res.status(200).json({
    status: 'Success',
    result: instructors.length,
    data: instructors,
  });
});

const getInstructorById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const instructor = await Instructor.findById(id);
  if (instructor) {
    res.status(200).json({
      status: 'Success',
      data: instructor,
    });
  } else {
    res.status(404);
    throw new Error('Can not found instructor.');
  }
});

module.exports = { getInstructors, getInstructorById };

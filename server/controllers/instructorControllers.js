const Instructor = require('../models/instructorModel');

const getInstructors = async (req, res) => {
  try {
    const instructors = await Instructor.find();
    res.status(200).send(instructors);
  } catch (error) {
    res.status(404).send({ message: `${error}` });
  }
};

const getInstructorById = async (req, res) => {
  try {
    const id = req.params.id;
    const instructor = await Instructor.findById(id);
    if (instructor) {
      res.status(200).send(instructor);
    } else {
      res.status(404).send({ message: 'Can not found instructor.' });
    }
  } catch (error) {
    res.status(404).send({ message: `${error}` });
  }
};

module.exports = { getInstructors, getInstructorById };

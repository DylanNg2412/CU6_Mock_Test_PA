const Instructor = require("../models/instructor");

const getInstructors = async () => {
  try {
    const instructor = await Instructor.find();
    return instructor;
  } catch (error) {
    throw new Error(error);
  }
};

const getInstructor = async (id) => {
  const instructor = await Instructor.findById(id).populate("instructor");
  return instructor;
};

const addInstructor = async (name, qualification, profile, coursesTaught) => {
  const newInstructor = new Instructor({
    name,
    qualification,
    profile,
    coursesTaught,
  });
  await newInstructor.save();
  return newInstructor;
};

const updateInstructor = async (
  instructor_id,
  name,
  qualification,
  profile,
  coursesTaught
) => {
  const updatedInstructor = await Instructor.findByIdAndUpdate(
    instructor_id,
    {
      name,
      qualification,
      profile,
      coursesTaught,
    },
    { new: true }
  );
  return updatedInstructor;
};

const deleteInstructor = async (id) => {
  return await Instructor.findByIdAndDelete(id);
};

module.exports = {
  getInstructors,
  getInstructor,
  addInstructor,
  updateInstructor,
  deleteInstructor,
};

const Course = require("../models/course");

const getCourses = async () => {
  try {
    const courses = await Course.find().populate("instructor");
    return courses;
  } catch (error) {
    throw new Error(error);
  }
};

const getCourse = async (id) => {
  const course = await Course.findById(id).populate();
  return course;
};

const addCourse = async (
  title,
  instructor,
  startDate,
  endDate,
  subject,
  description,
  enrollmentCount
) => {
  const newCourse = new Course({
    title,
    instructor,
    startDate,
    endDate,
    subject,
    description,
    enrollmentCount,
  });
  await newCourse.save();
  return newCourse;
};

const updateCourse = async (
  course_id,
  title,
  instructor,
  startDate,
  endDate,
  subject,
  description,
  enrollmentCount
) => {
  const updatedCourse = await Course.findByIdAndUpdate(
    course_id,
    {
      title,
      instructor,
      startDate,
      endDate,
      subject,
      description,
      enrollmentCount,
    },
    { new: true }
  );
  return updatedCourse;
};

const deleteCourse = async (id) => {
  return await Course.findByIdAndDelete(id);
};

module.exports = {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
};

const express = require("express");
const {
  getInstructors,
  getInstructor,
  addInstructor,
  updateInstructor,
  deleteInstructor,
} = require("../controllers/instructor");
const router = express.Router();

// instruction: import the instructor model
const Instructor = require("../models/instructor");

// instruction: GET /: List all instructors
router.get("/", async (req, res) => {
  try {
    const instructors = await getInstructors();
    res.status(200).send(instructors);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

// instruction: setup GET /:id: Get a specific instructor  by its _id
router.get("/:id", async (req, res) => {
  try {
    const instructor = await getInstructor(req.params.id);
    if (instructor) {
      res.status(200).send(instructor);
    } else {
      res.status(404).send("Instructor Not Found");
    }
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

// instruction: setup POST /: Add a new instructor
router.post("/", async (req, res) => {
  try {
    const name = req.body.name;
    const qualification = req.body.qualification;
    const profile = req.body.profile;
    const coursesTaught = req.body.coursesTaught;
    const newInstructor = await addInstructor(
      name,
      qualification,
      profile,
      coursesTaught
    );
    res.status(200).send(newInstructor);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

// instruction: setup PUT /:id: Update a instructor by its _id
router.put("/:id", async (req, res) => {
  try {
    const instructor_id = req.params.id;
    const name = req.body.name;
    const qualification = req.body.qualification;
    const profile = req.body.profile;
    const coursesTaught = req.body.coursesTaught;
    const updatedInstructor = await updateInstructor(
      instructor_id,
      name,
      qualification,
      profile,
      coursesTaught
    );
    const instruction = await Instructor.findById(instructor_id);
    res.status(200).send(instruction);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});
// instruction: setup DELETE /:id: Delete a instructor by its _id
router.delete("/:id", async (req, res) => {
  try {
    const instructor_id = req.params.id;
    await deleteInstructor(instructor_id);
    res.status(200).send("Instructor has been deleted");
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

// instruction: export the router
module.exports = router;

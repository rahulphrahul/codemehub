const express = require("express");
const Student = require("../models/studentModel");
const router = express.Router();

const {
  findAllStudent,
  createStudent,
  markAttendance,
  updateAttendanceId,
  getAllAttendance,
  getReport
} = require("../controller/studentCOntroller");

router.post("/", createStudent);

router.get("/", findAllStudent);
router.get("/get-attendance", getAllAttendance);
router.get("/get-report", getReport);

router.post("/mark-attendance", markAttendance);
router.patch("/update-attendance/:id", updateAttendanceId);


module.exports = router;

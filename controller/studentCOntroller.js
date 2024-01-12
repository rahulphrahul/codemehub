// Import necessary modules and Student model
const Student = require("../models/studentModel");
const Attendance = require("../models/attendanceModel");
const mongoose = require("mongoose");

// Function to create a new student
const createStudent = async (req, res) => {
  // Extract student data from the request body
  const { name, roll_number } = req.body;

  try {
    // Create a new student with the provided data
    const student = await Student.create({
      name,
      roll_number,
    });
    res.json({ message: "student created successfully", data: student });
  } catch (error) {
    res.json({ error: error.message });
  }
};

// Function to fetch all active students
const findAllStudent = async (req, res) => {
  try {
    // Find all students with "Active" status
    const student = await Student.find({});
    res.json({ message: "List all students successfully...", data: student });
  } catch (error) {
    res.json({ error: error.message });
  }
};
// Function to mark attendance for a student
const markAttendance = async (req, res) => {
  const { date, roll_number, present } = req.body;

  try {
    const attendance = await Attendance.create({
      date,
      roll_number,
      present,
    });
    res.json({ message: "Attendance added successfully", data: attendance });
  } catch (error) {
    res.json({ error: error.message });
  }
};

// Function to update attendance by ID
const updateAttendanceId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.json({ error: "No such entry" });
    }

    // Find and update entry by ID with the provided data
    const attendance = await Attendance.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      }
    );

    if (!attendance) {
      return res.json({ error: "No such entry" });
    }

    res.json({
      message: "Updated attendance details by ID successfully...",
      data: attendance,
    });
  } catch (error) {
    res.json({ error: error.message });
  }
};
// Function to fetch all attendances
const getAllAttendance = async (req, res) => {
  try {
    // Find all students with "Active" status
    const attendance = await Attendance.find({});
    res.json({
      message: "List all attendance successfully...",
      data: attendance,
    });
  } catch (error) {
    res.json({ error: error.message });
  }
};

const getReport = async (req, res) => {
  try {
    // Get all students
    const students = await Student.find();

    // Create an array to store attendance for each student
    const attendanceData = [];

    // Iterate through each student
    for (const student of students) {
      // Get attendance for the current student
      const studentAttendance = await Attendance.find({
        roll_number: student.roll_number,
      });

      // Create an object to store attendance data for the current student
      const studentAttendanceObject = {
        name: student.name,
        roll_number: student.roll_number,
        attendance: {},
      };

      // Populate attendance data for each date
      studentAttendance.forEach((attendance) => {
        studentAttendanceObject.attendance[attendance.date] =
          attendance.present;
      });

      // Push the attendance object to the array
      attendanceData.push(studentAttendanceObject);
    }

    res.json(attendanceData);
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = {
  createStudent,
  findAllStudent,
  markAttendance,
  updateAttendanceId,
  getAllAttendance,
  getReport
};

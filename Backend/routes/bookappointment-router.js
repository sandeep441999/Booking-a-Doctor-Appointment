const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Appointment = require("../models/Appointment");


//creating a new appointment and storing in database with the below details

router.post("/", (req, res, next) => {
  const appointment = new Appointment({
    _id: new mongoose.Types.ObjectId(),
    patientName: req.body.patientName,
    patientId: req.body.patientId,
    patientEmail: req.body.patientEmail,
    patientAge: req.body.patientAge,
    patientGender: req.body.patientGender,
    medicalIssues: req.body.medicalIssues,
    medicationsSuggested: req.body.medicationsSuggested,
    appointmentDate: req.body.appointmentDate,
    timeSlot: req.body.timeSlot,
    completed: req.body.completed,
    doctorId: req.body.doctorId,
    doctorName: req.body.doctorName,
    doctorEmail: req.body.doctorEmail,
  });
  appointment
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Appointment Created",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;

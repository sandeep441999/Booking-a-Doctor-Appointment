const express = require("express");
const Appointment = require("../models/Appointment");
const router = express.Router();

//geting the details of appointments of a particular doctor and sending it as aresponse

router.post("/", (req, res, next) => {
  Appointment.find({ doctorId: req.body.doctorId })
    .exec()
    .then((appointments) => {
        res.json(appointments);
    });
});

//geting the details of appointments of a particular patient and sending it as aresponse

router.post("/patient", (req, res, next) => {
    Appointment.find({ patientId: req.body.patientId })
      .exec()
      .then((appointments) => {
          res.json(appointments);
      });
  });

module.exports = router;

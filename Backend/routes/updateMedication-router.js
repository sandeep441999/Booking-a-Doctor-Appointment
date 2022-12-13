const express = require("express");
const mongoose = require("mongoose");
const Appointment = require("../models/Appointment");
const router = express.Router();

router.post("/", (req, res, next) => {

  //getting the updates from frontend form and storing in a updates variable

  const updates = req.body;

  if (mongoose.Types.ObjectId(req.body.doctorId)) {

    //updating that document after finding it using the Id of user
    //{ patientId: mongoose.Types.ObjectId(req.body.patientId) },

    Appointment.updateOne(
      { doctorId: mongoose.Types.ObjectId(req.body.doctorId) },
      { $set: updates }
    ).then(result => {
        res.status(200).json(result);
    }).catch(err => {
        res.status(500).json({error: "could not update the document"});
    });
  } else {
    res.status(500).json({error: "not a valid document"});
  }
});


module.exports = router;

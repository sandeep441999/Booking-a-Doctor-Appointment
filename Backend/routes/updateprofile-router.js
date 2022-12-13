const express = require("express");
const mongoose = require("mongoose");
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");
const router = express.Router();

router.post("/:id", (req, res, next) => {

  //getting the updates from frontend form and storing in a updates variable

  const updates = req.body;

  if (mongoose.Types.ObjectId(req.params.id)) {

    //updating that document after finding it using the Id of user

    Doctor.updateOne(
      { _id: mongoose.Types.ObjectId(req.params.id) },
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

router.post("/patient/:id", (req, res, next) => {

  //getting the updates from frontend form and storing in a updates variable

    const updates = req.body;
  
    if (mongoose.Types.ObjectId(req.params.id)) {

      //updating that document after finding it using the Id of user

      Patient.updateOne(
        { _id: mongoose.Types.ObjectId(req.params.id) },
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

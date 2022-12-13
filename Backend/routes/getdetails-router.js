const express = require("express");
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");
const router = express.Router();

//geting the details of a particular doctor when his email address is provided and sending it as aresponse

router.post("/", (req, res, next) => {
  Doctor.find({ email: req.body.email })
    .exec()
    .then((user) => {
        res.json(user);
    });
});

//geting the details of a particular doctor when his email address is provided and sending it as aresponse

router.post("/patient", (req, res, next) => {
    Patient.find({ email: req.body.email })
      .exec()
      .then((user) => {
          res.json(user);
      });
  });

module.exports = router;

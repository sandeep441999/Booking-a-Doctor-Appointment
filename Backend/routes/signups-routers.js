const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const router = express.Router();

const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");

router.post("/", (req, res, next) => {

  // finding whether the email already exist in doctor database or not.

  Doctor.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({ message: "Mails exists" });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {

            // when the email not in database then creating the document for new user in mongodb

            const doctor = new Doctor({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              qualification: req.body.qualification,
              speciality: req.body.speciality,
              experience: req.body.experience
            });
            doctor
              .save()
              .then((result) => {
                res.status(201).json({
                  message: "Doctor account created",
                });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({
                  error: err,
                });
              });
          }
        });
      }
    });
});

router.post("/patient", (req, res, next) => {
  // finding whether the email already exist in patient database or not.
  Patient.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({ message: "Mails exists" });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {

            // when the email not in database then creating the document for new user in mongodb

            const patient = new Patient({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
              firstName: req.body.firstName,
              lastName: req.body.lastName,
            });
            patient
              .save()
              .then((result) => {
                res.status(201).json({
                  message: "Patinet account created",
                });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({
                  error: err,
                });
              });
          }
        });
      }
    });
});

// the below router is used to delete a particular user when user Id is given

router.delete("/:did", (req, res, next) => {
  Doctor.remove({ _id: req.params.did })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Doctor account deleted",
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

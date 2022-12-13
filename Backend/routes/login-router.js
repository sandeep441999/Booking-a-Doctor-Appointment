const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

//importing the doctor and patient model/schema

const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");

router.post("/", (req, res, next) => {

  //searching whether user exist in database to login, if exist we let him to login
  Doctor.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Authorization Failed",
        });
      }

      //if email exists in database then verifying the password entered is corrector not and procceed accordingly

      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Authorization Failed",
          });
        }
        if (result) {

          //if password matches then we let him login and create access token and refresh token for consistency during his use of website

          const access_token = jwt.sign(
            {
              email: user[0].email,
              doctorId: user[0]._id,
            },
            process.env.JWT_ACCESS_KEY,
            {
              expiresIn: "1h",
            }
          );
          const refresh_token = jwt.sign(
            {
              email: user[0].email,
              doctorId: user[0]._id,
            },
            process.env.JWT_REFRESH_KEY,
            {
              expiresIn: "1d",
            }
          );

          //storing the refresh token in cookie to access it later

          res.cookie("jwt", refresh_token, {
            httpOnly: true,
            sameSite: "None",
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
          });
          return res.status(200).json({
            message: "Authorization Successful",
            access_token: access_token,
          });
        }
        res.status(401).json({
          message: "Authorization Failed",
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.post("/patient", (req, res, next) => {

  //searching whether user exist in database to login, if exist we let him to login

  Patient.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Authorization Failed",
        });
      }

      //if email exists in database then verifying the password entered is corrector not and procceed accordingly

      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Authorization Failed",
          });
        }
        if (result) {

          //if password matches then we let him login and create access token and refresh token for consistency during his use of website

          const access_token = jwt.sign(
            {
              email: user[0].email,
              patientId: user[0]._id,
            },
            process.env.JWT_ACCESS_KEY,
            {
              expiresIn: "1h",
            }
          );
          const refresh_token = jwt.sign(
            {
              email: user[0].email,
              patientId: user[0]._id,
            },
            process.env.JWT_REFRESH_KEY,
            {
              expiresIn: "1d",
            }
          );

          //storing the refresh token in cookie to access it later
          
          res.cookie("jwt", refresh_token, {
            httpOnly: true,
            sameSite: "None",
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
          });
          return res.status(200).json({
            message: "Authorization Successful",
            access_token: access_token,
          });
        }
        res.status(401).json({
          message: "Authorization Failed",
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.post("/doctorprofile", async (req, res, next) => {
  const user = await Doctor.findById(req.user._id);

  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    user.age = req.body.age || user.age;
    user.qualification = req.body.qualification || user.qualification;
    user.speciality = req.body.speciality || user.speciality;
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedProfile = await Doctor.save();

    res.json({ updatedProfile });
  } else {
    res.status(404);
    throw new Error("user not found!");
  }
});

module.exports = router;

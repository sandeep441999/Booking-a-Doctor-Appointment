const express = require('express');

const router = express.Router();


const Dummy_Patient_List = [
    {
      pid: "p1",
      Name: "Sam_p",
      Age: "45",
      Speciality: "Cardiology",
      Qualification: "MBBS",
    },
    {
      pid: "p2",
      Name: "Guru_p",
      Age: "22",
      Speciality: "Neurology",
      Qualification: "MBBS + Speciality",
    },
    {
      pid: "p3",
      Name: "KV_p",
      Age: "25",
      Speciality: "Heart",
      Qualification: "MBBS + Heart Speciality",
    },
    {
      pid: "p4",
      Name: "Vikas_p",
      Age: "65",
      Speciality: "Pyhsio Therapy",
      Qualification: "MBBS + PhsioTheraphy",
    },
  ];


  module.exports = router;
const express = require('express');

const router = express.Router();


  const Dummy_Doctors_List = [
    {
      id: "d1",
      Name: "Sam",
      Age: "45",
      Speciality: "Cardiology",
      Qualification: "MBBS",
    },
    {
      id: "d2",
      Name: "Guru",
      Age: "22",
      Speciality: "Neurology",
      Qualification: "MBBS + Speciality",
    },
    {
      id: "d3",
      Name: "KV",
      Age: "25",
      Speciality: "Heart",
      Qualification: "MBBS + Heart Speciality",
    },
    {
      id: "d4",
      Name: "Vikas",
      Age: "65",
      Speciality: "Pyhsio Therapy",
      Qualification: "MBBS + PhsioTheraphy",
    },
  ];

  //fetcing a particular doctor details using his Id
  
router.get('/:did', (req, res, next) => {
    const doctorId = req.params.did;
    const doctor = Dummy_Doctors_List.find(d => {
        return d.id === doctorId;
    });
    res.json({doctor});
});

module.exports = router;
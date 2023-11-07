import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

import Card from "../../components/ui/Card";
import classes from "../../components/signups/NewSignupForm.module.css";
import { useSelector } from "react-redux";

const BookAppointment = () => {

  //Initializing the references using useRef for capture the entered values

  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const dateInputRef = useRef();
  const ageInputRef = useRef();
  const genderInputRef = useRef();
  const descriptionInputRef = useRef();

  const user = useSelector((state) => state.auth.user);  //collecting the values of user logged in using useSelector which stored in Redux Store

  const [doctorData, setDoctorData] = useState([]);

  const [isAppointmentBooked, setIsAppointmentBooked] = useState(false);
  const Message = "Appointment Booked";

  const router = useRouter();
  const doctorEmail = router.query;

  console.log("BookAppointment");
  console.log(doctorEmail);

  useEffect(() => {
    const getDoctorData = () => {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(doctorEmail),
      };

      //fetching the details of doctor to use those details in appointment data

      fetch("http://localhost:4000/getdetails", options)
        .then((Response) => {
          return Response.json();
        })
        .then((data) => {
          setDoctorData(data);
        })
        .catch((err) => console.log(err));
    };

    getDoctorData();
  }, []);

  console.log("doctorData");
  console.log(doctorData);

  const submitHandler = (event) => {
    event.preventDefault();

    const appointmentData = {
      patientName: nameInputRef.current.value,
      patientId: user._id,
      patientEmail: emailInputRef.current.value,
      patientAge: ageInputRef.current.value,
      patientGender: genderInputRef.current.value,
      medicalIssues: descriptionInputRef.current.value,
      medicationsSuggested: "",
      appointmentDate: dateInputRef.current.value,
      timeSlot: doctorEmail.timeSlot,
      completed: false,
      doctorId: doctorData[0]._id,
      doctorName: doctorData[0].firstName + " " + doctorData[0].lastName,
      doctorEmail: doctorData[0].email,
    };

    console.log("appointmentData");
    console.log(appointmentData);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(appointmentData),
    };

    //Sending data backend API to store in mongodb database using fetch API

    fetch("http://localhost:4000/bookappointment", options)
      .then((Response) => {
        if(Response.ok){
          setIsAppointmentBooked(true);
        }
        return Response.json();
      })
      .then((data) => {
        setDoctorData(data);
      })
      .catch((err) => console.log(err));

    console.log(nameInputRef.current.value);
    console.log(dateInputRef.current.value);
  };

  //Rendering the bookappointment form

  return (
    <Card>
      <div>
        <h1>{isAppointmentBooked && Message}</h1>
      </div>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="name">Patient Name</label>
          <input type="text" required id="name" ref={nameInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="email">Email</label>
          <input type="text" required id="email" ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="date">Select Appointment Date</label>
          <input type="date" required id="date" ref={dateInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="age">Age</label>
          <input type="text" required id="age" ref={ageInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="gender">Gender</label>
          <input type="text" required id="gender" ref={genderInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="description">Description of Health Issues</label>
          <textarea
            type="text"
            required
            id="description"
            rows="5"
            ref={descriptionInputRef}
          />
        </div>
        <div className={classes.actions}>
          <button type="submit">Schedule Appointment</button>
        </div>
      </form>
    </Card>
  );
};

export default BookAppointment;

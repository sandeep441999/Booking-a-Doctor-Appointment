import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

import Card from "../ui/Card";
import classes from "../signups/DoctorItem.module.css";
import { useSelector } from "react-redux";

// const slots = [
//   {
//     time: "10-11 am",
//     available: true,
//   },
//   {
//     time: "11-12 am",
//     available: true,
//   },
//   {
//     time: "2-3 pm",
//     available: true,
//   },
//   {
//     time: "3-4 pm",
//     available: true,
//   },
// ];

//Rendering the AppointmentItem component usingthe received props

function AppointmentItem(props) {
  const router = useRouter();

  //   const showAppointmentsHandler = () => {
  //     console.log(showSlots);
  //     console.log(slots);
  //     setShowSlots((showSlots) => !showSlots);
  //   };

  //   const bookAppointmentHandler = () => {
  //     console.log(emailRef.current.value);
  //     router.push('/BookAppointment');
  //   };
  console.log("In Appointment Item");

  const medicationsSuggestedInputRef = useRef();

  const isDoctor = useSelector((state) => state.auth.isDoctor);
  const user = useSelector((state) => state.auth.user);
  const [showMedicationsBox, setShowMedicationsBox] = useState(false);
  const [medicationsSuggested, setMedicationsSuggested] = useState("");

  const [isMedicationsUpdated, setIsMedicationsUpdated] = useState(false);
  const Message = "Medications Updated";

  const submitMedicationsSuggested = (event) => {

    event.preventDefault();

    const enteredMedicationsSuggested =
      medicationsSuggestedInputRef.current.value;

    const data = {
      doctorId: user._id,
      medicationsSuggested: enteredMedicationsSuggested,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch("http://localhost:4000/updatemedication", options)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        setIsMedicationsUpdated(true);
      });
  };

  //dyamically rendering the data of appointment based on loggen in user such as if doctor logs in showing the patient details in appointment info vice versa

  return (
    <li className={classes.item}>
      <Card>
        <div
          className={classes.content}
          data-testid={`doctor-${props.patientId}`}
        >
          {!isDoctor ? (
            <h3>{props.doctorName}</h3>
          ) : (
            <h3>{props.patientName}</h3>
          )}
          <address>
            <strong>Date: </strong>
            {props.appointmentDate}
          </address>
          <address>
            <strong>Time Slot: </strong>
            {props.timeSlot}
          </address>
          <address>
            <strong>medicalIssues: </strong>
            {props.medicalIssues}
          </address>
          {/* <address>
            <strong>Experience: </strong>
            {props.Experience}
          </address> */}
          {!isDoctor ? (
            <address>
              <strong>Doctor Email: </strong>
              {props.doctorEmail}
            </address>
          ) : (
            <address>
              <strong>Patient Email: </strong>
              {props.patientEmail}
            </address>
          )}
        </div>
        <div className={classes.actions}>
          {isDoctor && (
            <button onClick={() => setShowMedicationsBox(true)}>
              Add Medications
            </button>
          )}
        </div>
        <div className={classes.actions}>
          {isDoctor && showMedicationsBox && (
            <textarea
              type="text"
              id="medicationsSuggested"
              value={medicationsSuggested}
              onChange={(e) => setMedicationsSuggested(e.target.value)}
              ref={medicationsSuggestedInputRef}
            />
          )}
        </div>
        <div>
        <h1>{isMedicationsUpdated && Message}</h1>
      </div>
        <div className={classes.actions}>
          {isDoctor && showMedicationsBox && (
            <button onClick={submitMedicationsSuggested}>submit</button>
          )}
        </div>
        {/* <div className={classes.actions}>
          <button onClick={showAppointmentsHandler}>Book an Appointment</button>
        </div> */}
        {/* <div className={classes.actions}>
          {showSlots && slots.map((slot) => <Link href={{ pathname: '/BookAppointment', query: props.Email }} >{slot.time}</Link>)}
        </div> */}
      </Card>
    </li>
  );
}

export default AppointmentItem;

import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import Card from "../ui/Card";
import classes from "./DoctorItem.module.css";

const slots = [
  {
    time: "10-11 am",
    available: true,
  },
  {
    time: "11-12 am",
    available: true,
  },
  {
    time: "2-3 pm",
    available: true,
  },
  {
    time: "3-4 pm",
    available: true,
  },
];

//Rendering the doctoritem component to list each doctor item

function DoctorItem(props) {
  const [showSlots, setShowSlots] = useState(false);
  const router = useRouter();


  //below function is written whether to show timeslot for booking appointment or not.

  const showAppointmentsHandler = () => {
    console.log(showSlots);
    console.log(slots);
    setShowSlots((showSlots) => !showSlots);
  };

  const bookAppointmentHandler = () => {
    console.log(emailRef.current.value);
    router.push('/BookAppointment');
  };

  //Rendering each doctor details in a specific and attract style using the props received.

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.content} data-testid={`doctor-${props.id}`}>
          <h3>{props.Name}</h3>
          <address>
            <strong>Qualification: </strong>
            {props.Qualification}
          </address>
          <address>
            <strong>Speciality: </strong>
            {props.Speciality}
          </address>
          <address>
            <strong>Experience: </strong>
            {props.Experience}
          </address>
          <address>
            <strong>Email: </strong>
            {props.Email}
          </address>
        </div>
        <div className={classes.actions}>
          <button onClick={showAppointmentsHandler}>Book an Appointment</button>
        </div>
        <div className={classes.actions}>
          {/* {showSlots && slots.map((slot) => <button onClick={bookAppointmentHandler}>{slot.time}</button>)} */}
          {showSlots && slots.map((slot) => <button><Link href={{ pathname: '/BookAppointment', query: { email: props.Email, timeSlot: slot.time } }} >{slot.time}</Link></button>)}
        </div>
      </Card>
    </li>
  );
}

export default DoctorItem;

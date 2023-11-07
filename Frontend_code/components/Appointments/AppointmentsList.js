import AppointmentItem from "./AppointmentItem";
import classes from "../signups/DoctorsList.module.css";
import { useState } from "react";

//Rending the appointmentslist component and passing the props to the appointmentitem component

function AppointmentsList(props) {

  return (
    <ul className={classes.list}>
      {props.appointmentslist.map((appointment) => (
        <AppointmentItem
          key={appointment._id}
          _id={appointment._id}
          patientName={appointment.patientName}
          patientId={appointment.patientId}
          patientEmail={appointment.patientEmail}
          patientAge={appointment.patientAge}
          patientGender={appointment.patientGender}
          medicalIssues={appointment.medicalIssues}
          medicationsSuggested={appointment.medicationsSuggested}
          appointmentDate={appointment.appointmentDate}
          timeSlot={appointment.timeSlot}
          completed={appointment.completed}
          doctorId={appointment.doctorId}
          doctorName={appointment.doctorName}
          doctorEmail={appointment.doctorEmail}
        />
      ))}
    </ul>
  );
}

export default AppointmentsList;

import { Fragment } from "react";

import DoctorsList from "../../components/signups/DoctorsList";
import PatientProfile from "../../components/Profiles/PatientProfile";
import MainNavigation from "../../components/layout/MainNavigation";
import classes from "./index.module.css";

// const Dummy_Doctors_List = [
//   {
//     id: "d1",
//     Name: "Sam",
//     Age: "45",
//     Speciality: "Cardiology",
//     Qualification: "MBBS",
//   },
//   {
//     id: "d2",
//     Name: "Guru",
//     Age: "22",
//     Speciality: "Neurology",
//     Qualification: "MBBS + Speciality",
//   },
//   {
//     id: "d3",
//     Name: "KV",
//     Age: "25",
//     Speciality: "Heart",
//     Qualification: "MBBS + Heart Speciality",
//   },
//   {
//     id: "d4",
//     Name: "Vikas",
//     Age: "65",
//     Speciality: "Pyhsio Therapy",
//     Qualification: "MBBS + PhsioTheraphy",
//   },
// ];

//Rendering PatientProfile component for viewing patient profile

const PatientHomePage = () => {
  return (
    <Fragment>
      <h1>Profile</h1>
      <PatientProfile />
      {/* <DoctorsList doctorslist={Dummy_Doctors_List} /> */}
    </Fragment>
  );
};

export default PatientHomePage;

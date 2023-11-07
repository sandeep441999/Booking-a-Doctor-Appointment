import Card from "../../components/ui/Card";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import AppointmentsList from "../../components/Appointments/AppointmentsList";

//Rendering MyAppointments component to list all appointments

const MyAppointments = () => {
  const user = useSelector((state) => state.auth.user);
  const isDoctor = useSelector((state) => state.auth.isDoctor);
  const [appointments, setAppointments] = useState([]);


  // Getting appointments from mongodb database using fetch API

  useEffect(() => {
    const getAppointments = () => {
        let dataId = {};
        let url = {};

      //Based on doctor or patient login status initializing data for passing fetch api

        if(!isDoctor) {
            dataId = {
                patientId: user._id,
              };
            url = "/patient"
        } else {
            dataId = {
                doctorId: user._id,
              };
              url = ""
        }


      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataId),
      };

      //fetching appointments of logged in user from mongodb database

      fetch("http://localhost:4000/getappointments" + url, options)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          console.log(data);
          setAppointments(data);
        })
        .catch((err) => console.log(err));
    };
    getAppointments();
  }, []);

  console.log("My appointments");
  console.log(appointments);


  return (
      <AppointmentsList appointmentslist = {appointments}/>
    // <DoctorsList doctorslist={Doctors_List} />
  );
};

export default MyAppointments;

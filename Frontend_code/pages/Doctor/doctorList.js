import DoctorsList from "../../components/signups/DoctorsList";
import { useEffect, useState } from "react";

const DUMMY_Doctors_List = [
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

console.log("In DoctorsList");


//Rendering DoctorList component to view doctors list


const doctorList = () => {
  const [Doctors_List, setDoctorsList] = useState([]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    //fetching doctors list from mongodb database by sending request to backend api using fetch api

    fetch("http://localhost:4000/", options)
      .then((Response) => {
        return Response.json();
      })
      .then((data) => {
        setDoctorsList(data);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(Doctors_List);

  return <DoctorsList doctorslist={Doctors_List} />;  //sending doctors list as props to doctorslist component
};

export default doctorList;

// import DoctorsList from "../../components/signups/DoctorsList";
import { Fragment } from "react";
import DoctorProfile from "../../components/Profiles/DoctorProfile";

// const Dummy_Doctors_List = [{ id: "d1",
// Name: 'Sam',
// Age: '45',
// Speciality: 'Cardiology',
// Qualification: 'MBBS'
// },
// { id: "d2",
// Name: 'Guru',
// Age: '22',
// Speciality: 'Neurology',
// Qualification: 'MBBS + Speciality'
// },
// { id: "d3",
// Name: 'KV',
// Age: '25',
// Speciality: 'Heart',
// Qualification: 'MBBS + Heart Speciality'
// },
// { id: "d4",
// Name: 'Vikas',
// Age: '65',
// Speciality: 'Pyhsio Therapy',
// Qualification: 'MBBS + PhsioTheraphy'}
// ];

//Rendering DoctorProfile component for viewing doctor profile

const Doctor = () => {
  return <Fragment>
    <h1>Profile</h1>
    <DoctorProfile />
  </Fragment>;
};

export default Doctor;

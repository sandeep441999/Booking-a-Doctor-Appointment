import DoctorItem from './DoctorItem';
import classes from './DoctorsList.module.css';


//Rendering the doctorList component and passing all the props to doctoritem component

function DoctorsList(props) {
  return (
    <ul className={classes.list}>
      {props.doctorslist.map((doctor) => (
        <DoctorItem
          key={doctor._id}
          id={doctor._id}
          Name={doctor.firstName}
          Qualification={doctor.qualification}
          Experience={doctor.experience}
          Speciality={doctor.speciality}
          Email={doctor.email}
        />
      ))}
    </ul>
  );
}

export default DoctorsList;

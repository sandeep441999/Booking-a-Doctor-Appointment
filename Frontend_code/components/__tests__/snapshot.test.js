import { render, screen, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
//import "jest-dom/extend-expect";
import '@testing-library/jest-dom'

import DoctorItem from "../signups/DoctorItem";



test("matches snapshot", () => {
  const doctor = {
    id: "d1",
    Name: "Sam",
    Age: "45",
    Speciality: "Cardiology",
    Qualification: "MBBS",
  };
  const tree = renderer
    .create(
      <DoctorItem
        key={doctor.id}
        id={doctor.id}
        Name={doctor.Name}
        Qualification={doctor.Qualification}
        Age={doctor.Age}
        Speciality={doctor.Speciality}
      />
    )
    .toJSON();
    expect(tree).toMatchSnapshot();
});
import { useRef, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import Card from "../ui/Card";
import classes from "./NewSignupForm.module.css";

function NewSignupForm(props) {

  //Initializing the references using useRef for capture the entered values

  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const qualificationInputRef = useRef();
  const specialityInputRef = useRef();
  const experienceInputRef = useRef();

  const [isAccountCreated, setIsAccountCreated] = useState(false);
  const errorMessage = "Account already Exists";

  const router = useRouter();

  function submitHandler(event) {
    event.preventDefault();

    //capturing the entered data using the reference created

    const enteredFirstName = firstNameInputRef.current.value;
    const enteredLastName = lastNameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredQualification = qualificationInputRef.current.value;
    const enteredSpeciality = specialityInputRef.current.value;
    const enteredExperience = experienceInputRef.current.value;

    const doctorData = {
      firstName: enteredFirstName,
      lastName: enteredLastName,
      email: enteredEmail,
      password: enteredPassword,
      qualification: enteredQualification,
      speciality: enteredSpeciality,
      experience: enteredExperience
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(doctorData),
    };

    //sending POST request to backend API using fetch API for signing up the new Doctor Account

    fetch("http://localhost:4000/signup", options)
      .then((Response) => {
        if (!Response.ok) {
          // firstNameInputRef.current.value = "";
          // lastNameInputRef.current.value = "";
          emailInputRef.current.value = "";
          passwordInputRef.current.value = "";
          setIsAccountCreated(true);
        } else {
          console.log("Successful");
          setIsAccountCreated(false);
          router.push("/Login");
          return Response.json();
        }
      })
      .catch((err) => console.log(err));

    console.log(doctorData);
  }

  //Rendering the signup form for doctor

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.error}>{isAccountCreated && errorMessage}</div>
        <div className={classes.control}>
          <label htmlFor="firstName">First Name</label>
          <input type="text" required id="firstName" ref={firstNameInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="lasttName">Last Name</label>
          <input type="text" required id="lastName" ref={lastNameInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="email">Email</label>
          <input type="text" required id="email" ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Password</label>
          <input type="text" required id="password" ref={passwordInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="qualification">Qualification</label>
          <input type="text" required id="qualification" ref={qualificationInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="speciality">Speciality</label>
          <input type="text" required id="speciality" ref={specialityInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="experience">Experience</label>
          <input type="text" required id="experience" ref={experienceInputRef} />
        </div>
        <div className={classes.actions}>
          <button>SignUp</button>
        </div>
        <div>
          <Link href="/Signup/patient">SignUp as a Customer</Link>
        </div>
      </form>
    </Card>
  );
}

export default NewSignupForm;

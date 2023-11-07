import { useRef, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import Card from "../ui/Card";
import classes from "./NewSignupForm.module.css";

//Rendering the newsignupformpatient component

function NewSignupFormPatient(props) {

  //Initializing the references using useRef for capture the entered values

  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

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

    const patientData = {
      firstName: enteredFirstName,
      lastName: enteredLastName,
      email: enteredEmail,
      password: enteredPassword,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patientData),
    };

    //sending POST request to backend API using fetch API for signing up the new Patient Account

    fetch("http://localhost:4000/signup/patient", options)
      .then((Response) => {
        if (!Response.ok) {
          firstNameInputRef.current.value = "";
          lastNameInputRef.current.value = "";
          emailInputRef.current.value = "";
          passwordInputRef.current.value = "";
          setIsAccountCreated(true);
        } else {
          console.log("Successful");
          setIsAccountCreated(false);
          router.push("/Login/patient");
          return Response.json();
        }
      })
      .catch((err) => console.log(err));
  }

  //Rendering the signup form for patient

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
        <div className={classes.actions}>
          <button>SignUp</button>
        </div>
        <div>
          <Link href="/Signup">SignUp as a Doctor</Link>
        </div>
      </form>
    </Card>
  );
}

export default NewSignupFormPatient;

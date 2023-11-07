import { useRef, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/index";

import Card from "../ui/Card";
import classes from "./NewSignupForm.module.css";

function LoginFormPatient(props) {

  //Initializing the references using useRef for capture the entered values

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const router = useRouter();
  const dispatch = useDispatch()

  const [isAccountCreated, setIsAccountCreated] = useState(false);
  const errorMessage = "Authentication Failed";

  function submitHandler(event) {
    event.preventDefault();

    //capturing the entered data using the reference created

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const patientData = {
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

    //sending POST request to backend API using fetch API for login of Patient Account

    fetch("http://localhost:4000/login/patient", options)
      .then((Response) => {
        if (!Response.ok) {
          emailInputRef.current.value = "";
          passwordInputRef.current.value = "";
          setIsAccountCreated(true);
        } else {
          console.log("Successful");
          setIsAccountCreated(false);
          router.push("/Patient");
          return Response.json();
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
    //fetching user details to use in login page and to store it globally to have consistency
    fetch("http://localhost:4000/getdetails/patient", options)
    .then((Response) => {
      return Response.json();
    })
    .then((data) => {
      const [ arraydata ] = data;
      const firstNameDoctor = arraydata.firstName;
      dispatch(authActions.login(arraydata));
    })
    .catch((err) => console.log(err));
  }

  //Rendering the Login form for patient

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.error}>{isAccountCreated && errorMessage}</div>
        <div className={classes.control}>
          <label htmlFor="email">Email</label>
          <input type="text" required id="email" ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Password</label>
          <input type="text" required id="password" ref={passwordInputRef} />
        </div>
        <div className={classes.actions}>
          <button type="submit">Login</button>
        </div>
        <div>
          <Link href="/Login">Login as a doctor</Link>
        </div>
      </form>
    </Card>
  );
}

export default LoginFormPatient;

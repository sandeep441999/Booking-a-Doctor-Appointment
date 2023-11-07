import { useRef, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/index";

import Card from "../ui/Card";
import classes from "./NewSignupForm.module.css";

function LoginForm(props) {

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

    const doctorData = {
      email: enteredEmail,
      password: enteredPassword,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(doctorData),
    };

    //sending POST request to backend API using fetch API for login of Doctor Account

    fetch("http://localhost:4000/login", options)
      .then((Response) => {
        if (!Response.ok) {
          emailInputRef.current.value = "";
          passwordInputRef.current.value = "";
          setIsAccountCreated(true);
        } else {
          console.log("Successful");
          setIsAccountCreated(false);
          dispatch(authActions.setDoctor());
          router.push("/Doctor");
          return Response.json();
        }
      })
      .then((data) => {
        const { mesage, access_token } = data;
        console.log(access_token);
        console.log(data);
      })
      .catch((err) => console.log(err));

      //fetching user details to use in login page and to store it globally to have consistency
      
      fetch("http://localhost:4000/getdetails", options)
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

  //Rendering the login form for doctor

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
          <Link href="/Login/patient">Login as a Customer</Link>
        </div>
      </form>
    </Card>
  );
}

export default LoginForm;

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/index";
import Router from "next/router";

import classes from "./MainNavigation.module.css";

//Rendering the Nav Bar

const MainNavigation = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isDoctor = useSelector((state) => state.auth.isDoctor);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    console.log(isLoggedIn);
  }, [isLoggedIn]);

  const logoutHandler = () => {
    Router.push("/Login");
    dispatch(authActions.logout());
  };

//creating dynamic nav bar based on the login status

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link href="/">Medi+Care</Link>
      </div>
      {isLoggedIn ? (
        <nav>
          <ul>
            { !isDoctor &&
              <li>
                <Link href="/Doctor/doctorList">DoctorsList</Link>
              </li>
            }
            <li>
              <Link href="/MyAppointments">My Appointments</Link>
            </li>
            <li>
              <h1>{user.firstName}</h1>
            </li>
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          </ul>
        </nav>
      ) : (
        <nav>
          <ul>
            <li>
              <Link href="/Signup/">Sign Up</Link>
            </li>
            <li>
              <Link href="/Login">Login</Link>
            </li>
            <li>
              <Link href="/Doctor/doctorList">DoctorsList</Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default MainNavigation;

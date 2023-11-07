import NewSignupForm from "../../components/signups/NewSignupForm";
import { Fragment } from "react";
import Card from "../../components/ui/Card";
import LoginFormPatient from "../../components/signups/LoginFormPatient";

//Rendering LoginFormPatient component for patient Login form

const LogIn = () => {
  return (
    <Fragment>
      <Card>
        <h1> LogIn as a Customer</h1>
        <LoginFormPatient />
      </Card>
    </Fragment>
  );
};

export default LogIn;

import NewSignupForm from "../../components/signups/NewSignupForm";
import { Fragment } from "react";
import Card from "../../components/ui/Card";
import LoginForm from "../../components/signups/loginform";
import LoginFormPatient from "../../components/signups/LoginFormPatient";

//Rendering LoginForm component for doctor Login form

const LogIn = () => {
  return (
    <Fragment>
      <Card>
        <h1> LogIn as a Doctor</h1>
        <LoginForm />
      </Card>
    </Fragment>
  );
};

export default LogIn;

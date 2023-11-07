import { Fragment } from "react";
import Card from "../../components/ui/Card";
import NewSignupForm from "../../components/signups/NewSignupForm";
import NewSignupFormPatient from "../../components/signups/NewSignupFormPatient";

//Rendering NewSignupForm component for doctor signup form

const SignUp = () => {
  return (
    <Fragment>
      <Card>
        <h1>SignUp as a Doctor</h1>
        <NewSignupForm />
      </Card>
    </Fragment>
  );
};

export default SignUp;

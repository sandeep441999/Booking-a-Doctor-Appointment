import { Fragment } from "react";
import Card from "../../components/ui/Card";

import NewSignupFormPatient from "../../components/signups/NewSignupFormPatient";

//Rendering NewSignupFormPatient component for patient signup form

const SignUp = () => {
  return (
    <Fragment>
      <Card>
        <h1>SignUp as a Customer</h1>
        <NewSignupFormPatient />
      </Card>
    </Fragment>
  );
};

export default SignUp;

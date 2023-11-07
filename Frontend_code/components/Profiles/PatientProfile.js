import Card from "../ui/Card";
import classes from "../../components/signups/NewSignupForm.module.css";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";

const patientProfile = (props) => {

  //Initializing the references using useRef for capture the entered values

  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const ageInputRef = useRef();
  const genderInputRef = useRef();
  const phoneNumberInputRef = useRef();
  const medicalProblemsInputRef = useRef();

  const user = useSelector((state) => state.auth.user); // fetching the logged in user details to show in his profile page.

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [medicalProblems, setMedicalProblems] = useState(user.medicalProblems);

  const [isAccountUpdated, setIsAccountUpdated] = useState(false);
  const Message = "Profile Updated";

  const submitHandler = (event) => {
    event.preventDefault();

    //capturing the entered data using the reference created

    const enteredFirstName = firstNameInputRef.current.value;
    const enteredLastName = lastNameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredAge = ageInputRef.current.value;
    const enteredGender = genderInputRef.current.value;
    const enteredPhoneNumber = phoneNumberInputRef.current.value;
    const enteredMedicalProblems = medicalProblemsInputRef.current.value;

    const patientData = {
      firstName: enteredFirstName,
      lastName: enteredLastName,
      email: enteredEmail,
      password: enteredPassword,
      age: enteredAge,
      gender: enteredGender,
      phoneNumber: enteredPhoneNumber,
      medicalProblems: enteredMedicalProblems,
    };

    console.log(patientData);
    console.log("/update/patient/" + user._id);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patientData),
    };

    //sending an update request to backend to update Patient profile in momgodb data base using Fetch API

    fetch("http://localhost:4000/update/patient/" + user._id, options)
      .then((response) => {
        if (response.ok) {
          setIsAccountUpdated(true);
        }
        return response.json();
      })
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  //Rendering the Profile details of a user in form type

  return (
    <div>
      <div>
        <Card>
          <div>
            <h1>{isAccountUpdated && Message}</h1>
          </div>
          <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes.control}>
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                required
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                ref={firstNameInputRef}
              />
            </div>
            <div className={classes.control}>
              <label htmlFor="lasttName">Last Name</label>
              <input
                type="text"
                required
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                ref={lastNameInputRef}
              />
            </div>
            <div className={classes.control}>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                required
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                ref={emailInputRef}
              />
            </div>
            <div className={classes.control}>
              <label htmlFor="password">Password</label>
              <input
                type="text"
                required
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                ref={passwordInputRef}
              />
            </div>
            <div className={classes.control}>
              <label htmlFor="age">Age</label>
              <input
                type="text"
                required
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                ref={ageInputRef}
              />
            </div>
            <div className={classes.control}>
              <label htmlFor="gender">Gender</label>
              <input
                type="text"
                required
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                ref={genderInputRef}
              />
            </div>
            <div className={classes.control}>
              <label htmlFor="medicalProblems">Medical Problems</label>
              <input
                type="text"
                required
                id="medicalProblems"
                value={medicalProblems}
                onChange={(e) => setMedicalProblems(e.target.value)}
                ref={medicalProblemsInputRef}
              />
            </div>
            <div className={classes.control}>
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="text"
                required
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                ref={phoneNumberInputRef}
              />
            </div>
            <div className={classes.actions}>
              <button type="submit">Update</button>
            </div>
            {/* <div>
              <Link href="/Signup/patient">SignUp as a Customer</Link>
            </div> */}
          </form>
        </Card>
      </div>
    </div>
  );
};

export default patientProfile;

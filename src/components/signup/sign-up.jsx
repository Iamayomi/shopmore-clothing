import { useState } from "react";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "./sign-up.styles.scss";
import "../login/login.style.scss";
import FormInput from "../ui/form/form";
import Button from "../ui/button/button";

import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";

const SignUp = () => {
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { displayName, email, password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      alert("password don't match");
      return;
    }

    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);

      await createUserProfileDocument(user, { displayName });

      setFormData({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const { displayName, email, password, confirmPassword } = formData;
  return (
    <>
      <div className="sign-up">
        <h2 className="title">I don't have an account</h2>
        <span>Sign up with your email and password</span>
        <form className="sign-up-form" onSubmit={handleSubmit}>
          <FormInput name="email" type="email" label="Email" handleChange={handleChange} value={email} required />
          <FormInput name="displayName" type="text" label="Display Name" handleChange={handleChange} value={displayName} required />
          <FormInput name="password" type="password" label="Password" handleChange={handleChange} value={password} required />
          <FormInput name="confirmPassword" type="password" label="Confirm Password" handleChange={handleChange} value={confirmPassword} required />
          <div className="sign-in-user">
            <p>Have an account?</p>
            <Link className="sign-in-link" to="/signin">
              SignIn
            </Link>
          </div>
          <Button type="submit">Sign Up</Button>
        </form>
      </div>
    </>
  );
};

export default SignUp;

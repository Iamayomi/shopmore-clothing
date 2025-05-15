import { Component } from "react";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "./sign-up.styles.scss";
import "../login/login.style.scss";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";

class SignUp extends Component {
  constructor() {
    super();

    this.state = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { displayName, email, password, confirmPassword } = this.state;
    if (password !== confirmPassword) {
      alert("password don't match");
      return;
    }

    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);

      await createUserProfileDocument(user, { displayName });

      this.setState({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { displayName, email, password, confirmPassword } = this.state;
    return (
      <>
        <div className="sign-up">
          <h2 className="title">I don't have an account</h2>
          <span>Sign up with your email and password</span>
          <form className="sign-up-form" onSubmit={this.handleSubmit}>
            <FormInput name="email" type="email" label="Email" handleChange={this.handleChange} value={email} required />
            <FormInput name="displayName" type="text" label="Display Name" handleChange={this.handleChange} value={displayName} required />
            <FormInput name="password" type="password" label="Password" handleChange={this.handleChange} value={password} required />
            <FormInput name="confirmPassword" type="password" label="Confirm Password" handleChange={this.handleChange} value={confirmPassword} required />
            <div className="sign-in-user">
              <p>Have an account?</p>
              <Link className="sign-in-link" to="/signin">
                SignIn
              </Link>
            </div>
            <CustomButton type="submit">Sign Up</CustomButton>
          </form>
        </div>
      </>
    );
  }
}

export default SignUp;

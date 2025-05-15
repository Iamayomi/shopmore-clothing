import { Component } from "react";

import { Link } from "react-router-dom";

import "./login.style.scss";

import FormInput from "../form-input/form-input.component";

import CustomButton from "../custom-button/custom-button.component";

import { signInWithGoogle } from "../../firebase/firebase.utils";

class LogIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.setState({ email: "", password: "" });
  };

  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <>
        <div className="sign-in">
          <h2>I already have an account</h2>
          <span>Sign with your email and password</span>

          <form onSubmit={this.handleSubmit}>
            <FormInput name="email" type="email" label="email" handleChange={this.handleChange} value={this.state.email} required />

            <FormInput name="password" type="password" label="password" handleChange={this.handleChange} value={this.state.password} required />

            <div className="buttons">
              <CustomButton type="submit">Sign In</CustomButton>

              <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
                <i className="fab fa-google google-icon"></i>
                Sign with Google
              </CustomButton>
            </div>
            <div className="forgot-password">
              <p>Forget?</p>
              <Link className="forgot-password-link" to="/forgot-password">
                Password
              </Link>
            </div>
            <div className="new-account">
              <p>Don't have an account?</p>
              <Link className="signup-link" to="/signup">
                Signup
              </Link>
            </div>
          </form>
        </div>
      </>
    );
  }
}
export default LogIn;

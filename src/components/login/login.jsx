import { useState } from "react";
import { Link } from "react-router-dom";
import "./login.style.scss";
import FormInput from "../ui/form/form";
import Button from "../ui/button/button";
import { auth, signInWithGoogle } from "../../firebase/firebase.utils";
import { signInWithEmailAndPassword } from "firebase/auth";

const LogIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setFormData({ email: "", password: "" });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign with your email and password</span>

        <form onSubmit={handleSubmit}>
          <FormInput name="email" type="email" label="email" handleChange={handleChange} value={formData.email} required />

          <FormInput name="password" type="password" label="password" handleChange={handleChange} value={formData.password} required />

          <div className="buttons">
            <Button type="submit">Sign In</Button>

            <Button onClick={signInWithGoogle} isGoogleSignIn>
              <i className="fab fa-google google-icon"></i>
              Sign with Google
            </Button>
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
};
export default LogIn;

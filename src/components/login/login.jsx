import { useState } from "react";
import { Link } from "react-router-dom";
import "./login.style.scss";
import FormInput from "../ui/form/form";
import Button from "../ui/button/button";
import Message from "../ui/message/message";

import { auth, signInWithGooglePopup, createUserProfileDocument } from "../../firebase/firebase.utils";
import { signInWithEmailAndPassword } from "firebase/auth";

const LogIn = () => {
  const [message, setMessage] = useState(null);

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
      setMessage({
        type: "success",
        message: "User Signed in successfully!",
      });
    } catch (error) {
      console.log(error);
      setMessage({
        type: "error",
        message: `User Failed to sign in: ${error.message}`,
      });
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGooglePopup();
      await createUserProfileDocument(result.user);
      setMessage({
        type: "success",
        message: "Signed in successfully!",
      });
    } catch (error) {
      setMessage({
        type: "error",
        message: `Failed to sign in: ${error.message}`,
      });
    }
  };

  const closeMessge = () => {
    setMessage(null);
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

            <Button onClick={handleGoogleSignIn} isGoogleSignIn>
              <i className="fab fa-google google-icon"></i>
              Sign with Google
            </Button>
            {message && <Message type={message.type} message={message.message} onClose={closeMessge} />}
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

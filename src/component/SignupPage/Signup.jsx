import React, { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextInput from "../textInput/TextInput";
import { enqueueSnackbar } from "notistack";
import "./Signup.css";

const Signup = () => {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const signupHandler = useCallback(async () => {
    if (!username || !email || !password) {
      enqueueSnackbar("All fields are required.", { variant: "error" });
      return;
    }

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `https://coodrootz-be.onrender.com/api/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            email: email,
            password: password,
          }),
        }
      );

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        navigate("/login");
      } else {
        enqueueSnackbar(data.message || "Signup failed.", { variant: "error" });
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar("An error occurred during signup.", { variant: "error" });
    } finally {
      setTimeout(() => setIsSubmitting(false), 3000);
    }
  }, [username, email, password, isSubmitting, navigate]);

  return (
    <div className="signup-page">
      <h2>Signup</h2>
      <form onSubmit={submitHandler}>
        <TextInput
          labelTitle="Username"
          onChange={(e) => setusername(e.target.value)}
          className="login-password-input"
          value={username}
        />
        <TextInput
          labelTitle="Email"
          onChange={(e) => setemail(e.target.value)}
          className="login-password-input"
          value={email}
        />
        <TextInput
          labelTitle="Password"
          onChange={(e) => setpassword(e.target.value)}
          className="login-password-input"
          value={password}
        />

        <button type="submit" onClick={signupHandler} disabled={isSubmitting}>
          Signup
        </button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Signup;

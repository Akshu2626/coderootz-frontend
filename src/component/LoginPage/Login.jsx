import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextInput from "../textInput/TextInput";
import "./Login.css";
import Cookies from "js-cookie";
import { enqueueSnackbar } from "notistack";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    const handlePopState = (event) => {
      event.preventDefault();
      navigate("/dashboard", { replace: true });
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate]);

  const loginHandler = useCallback(async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    if (!email || !password) {
      enqueueSnackbar("Please fill in all fields", { variant: "error" });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(
        `https://coodrootz-be.onrender.com/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );
      const data = await response.json();
      console.log(data);

      if (data.token) {
        Cookies.set("token", data.token, { expires: 7 });
        Cookies.set("user", JSON.stringify(data.user), { expires: 7 });
        navigate("/dashboard");
      } else {
        enqueueSnackbar("Login failed", { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar("An error occurred. Please try again.", {
        variant: "error",
      });
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  }, [email, password, isSubmitting, navigate]);

  return (
    <div className="login-page">
      <h2 className="login-page-heading">Login</h2>
      <form onSubmit={submitHandler}>
        <TextInput
          placeholder="Enter your email"
          type="email"
          labelTitle="Email"
          onChange={(e) => setemail(e.target.value)}
          className="login-email-input"
          value={email}
        />
        <TextInput
          placeholder="Enter your password"
          type="password"
          labelTitle="Password"
          onChange={(e) => setpassword(e.target.value)}
          className="login-password-input"
          value={password}
        />

        <button type="submit" onClick={loginHandler} className="login-btn">
          Login
        </button>
      </form>
      <p className="login-page-para">
        Don't have an account?{" "}
        <Link to="/signup" className="login-signbtn">
          Signup
        </Link>
      </p>
    </div>
  );
};

export default Login;

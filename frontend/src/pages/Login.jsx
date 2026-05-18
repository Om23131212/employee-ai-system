import { useState } from "react";

import axios from "axios";

import {
  useNavigate,
  Link
} from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] =
  useState("");

  const [password, setPassword] =
  useState("");

  const [loading, setLoading] =
  useState(false);

  const submitHandler = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const { data } = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password
        }
      );

      localStorage.setItem(
        "token",
        data.token
      );

      alert("Login Successful");

      navigate("/dashboard");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Login Failed"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="auth-container">

      <form
        className="glass-card"
        onSubmit={submitHandler}
      >

        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button type="submit">

          {
            loading
            ? "Loading..."
            : "Login"
          }

        </button>

        <p
          style={{
            marginTop:"15px",
            textAlign:"center"
          }}
        >

          Don't have account?

          <Link
            to="/signup"
            style={{
              color:"white",
              marginLeft:"5px"
            }}
          >
            Create Account
          </Link>

        </p>

      </form>

    </div>
  );
}

export default Login;
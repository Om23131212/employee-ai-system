import { useState } from "react";

import axios from "axios";

import {
  useNavigate,
  Link
} from "react-router-dom";

function Signup() {

  const navigate = useNavigate();

  const [name, setName] =
  useState("");

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

      console.log({
        name,
        email,
        password
      });

      const response =
      await axios.post(
        "http://localhost:5000/api/auth/signup",
        {
          name,
          email,
          password
        }
      );

      console.log(response.data);

      alert("Account Created");

      navigate("/");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        error.message ||
        "Signup Failed"
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

        <h2>Create Account</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

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
            ? "Creating..."
            : "Create Account"
          }

        </button>

        <p
          style={{
            marginTop:"15px",
            textAlign:"center"
          }}
        >

          Already have account?

          <Link
            to="/"
            style={{
              color:"white",
              marginLeft:"5px"
            }}
          >
            Login
          </Link>

        </p>

      </form>

    </div>
  );
}

export default Signup;
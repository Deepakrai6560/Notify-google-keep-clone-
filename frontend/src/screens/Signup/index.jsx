import React, { useState } from "react";
import styles from "../Login/login.module.css";  // reuse login styles for consistency
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState(""); // optional field
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/users/register", {
        name,
        email,
        password,
      });

      console.log("Signup success:", response.data);
      localStorage.setItem("token", response.data.token); // if token is returned
      navigate("/"); // or navigate to login if needed
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.card} onSubmit={handleSignup}>
        <h2 className={styles.title}>Sign Up</h2>
        <input
          type="text"
          placeholder="Name"
          className={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className={styles.button}>
          Sign Up
        </button>
        <span>
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Signup;

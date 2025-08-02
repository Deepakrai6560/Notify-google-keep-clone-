import React, { useState } from "react";
import styles from "./Login.module.css";
import axios from "axios";
import { useNavigate ,Link} from "react-router-dom";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3000/api/users/login", { email, password })
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("token", response.data.token);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });

    console.log("Email:", email);
    console.log("Password:", password);
    // Here you can handle login logic
  };

  return (
    <div className={styles.container}>
      <form className={styles.card} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Login</h2>
        <input type="email" placeholder="Email" className={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className={styles.input} value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className={styles.button}>
          Login
        </button>
        <span>
          If user Doesn't exists <Link to="/signup">Signup</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;

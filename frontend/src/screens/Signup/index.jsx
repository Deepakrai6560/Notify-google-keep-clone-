import React from "react";
import styles from "../Login/login.module.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./login.module.css"

const Signup = () => {
  const navigate = useNavigate();

  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().min(2, "Name too short").required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post("http://localhost:3000/api/users/register", values);
        console.log("Signup success:", response.data);
        localStorage.setItem("token", response.data.token);
        navigate("/");
      } catch (error) {
        console.error("Signup error:", error.response?.data || error.message);
      }
    },
  });

  return (
    <div className={styles.container}>
      <form className={styles.card} onSubmit={formik.handleSubmit}>
        <h2 className={styles.title}>Sign Up</h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          className={styles.input}
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.name && formik.errors.name && (
          <div className={styles.error}>{formik.errors.name}</div>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          className={styles.input}
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email && (
          <div className={styles.error}>{formik.errors.email}</div>
        )}

        <input
          type="password"
          name="password"
          placeholder="Password"
          className={styles.input}
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password && formik.errors.password && (
          <div className={styles.error}>{formik.errors.password}</div>
        )}

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

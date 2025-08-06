import React from "react";
import styles from "./login.module.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const Login = () => {
  const navigate = useNavigate();

  const loginValidationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginValidationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await axios.post("http://localhost:3000/api/users/login", values);
        localStorage.setItem("token", response.data.token);
        navigate("/");
      } catch (error) {
        console.log("Login error:", error.response?.data || error.message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className={styles.container}>
      <form className={styles.card} onSubmit={formik.handleSubmit}>
        <h2 className={styles.title}>Login</h2>

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

        <button type="submit" className={styles.button} disabled={formik.isSubmitting}>
          {formik.isSubmitting ? "Logging in..." : "Login"}
        </button>

        <span>
          If user doesn't exist, <Link to="/signup">Signup</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;

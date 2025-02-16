import React, { useContext, useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link, Navigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";
import { motion } from "framer-motion";
import "./Login.css";
import Me from "/login.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        { email, password, role },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setEmail("");
      setPassword("");
      setRole("");
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
    setIsLoading(false);
  };

  if (isAuthorized) {
    return <Navigate to={"/"} />;
  }

  return (
    <motion.section
      className="loginContainer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Left Section with JobZee Info */}
      <div className="loginLeft">
        <motion.img
          src={Me}
          alt="JobZee Logo"
          className="logo"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          style={{ width: "300px", height: "auto" }}
        />

        <h1 className="infoTitle">Welcome to HireMeToo</h1>
        <p className="infoDescription">
          Your gateway to new career opportunities. Connect with top employers
          today.
        </p>
        <div className="jobZeeInfo">
          <h3 className="infoSubtitle">Why Choose HireMeToo?</h3>
          <ul className="infoList">
            <li>Find jobs that match your skills</li>
            <li>Connect with leading companies</li>
            <li>Get career guidance & resume tips</li>
            <li>1000+ verified job listings</li>
          </ul>
        </div>
      </div>

      {/* Login Form */}
      <motion.div
        className="loginBox"
        initial={{ x: 50 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>Login</h2>
        <form>
          <div className="inputField">
            <label>Role</label>
            <div className="inputWrapper">
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">Select Role</option>
                <option value="Employer">Employer</option>
                <option value="Job Seeker">Job Seeker</option>
              </select>
              <FaRegUser />
            </div>
          </div>
          <div className="inputField">
            <label>Email</label>
            <div className="inputWrapper">
              <input
                type="email"
                placeholder="example@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <MdOutlineMailOutline />
            </div>
          </div>
          <div className="inputField">
            <label>Password</label>
            <div className="inputWrapper">
              <input
                type="password"
                placeholder="Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <RiLock2Fill />
            </div>
          </div>
          <button type="submit" onClick={handleLogin} disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
          <Link to={"/register"}>Create an account</Link>
        </form>
      </motion.div>
    </motion.section>
  );
};

export default Login;

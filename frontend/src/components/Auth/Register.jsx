import React, { useContext, useState } from "react";
import { FaRegUser, FaPencilAlt, FaPhone, FaLock } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";
import { motion } from "framer-motion";
import "./Register.css";
import Me from "../../../public/register.png";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/register",
        { name, phone, email, role, password },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );
      toast.success(data.message);
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setRole("");
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthorized) return <Navigate to={"/"} />;

  return (
    <motion.section
      className="registerContainer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Left Section with JobZee Info */}
      <div className="registerLeft">
        <motion.img 
          src={Me}
          alt="JobZee Logo"
          className="logo"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          style={{ width: "300px", height: "auto" }}
        />
        <h1 className="infoTitle">Join HireMeToo Today</h1>
        <p className="infoDescription">Unlock exclusive features and connect with top employers. Your dream job is just a few clicks away.</p>
        <div className="jobZeeInfo">
          <h3 className="infoSubtitle">Benefits of Registering:</h3>
          <ul className="infoList">
            <li>Personalized job recommendations</li>
            <li>Direct messaging with employers</li>
            <li>Access to premium job listings</li>
            <li>Career development resources</li>
            <li>Early access to new job postings</li>
          </ul>
        </div>
      </div>

      {/* Register Form */}
      <motion.div 
        className="registerBox"
        initial={{ x: 50 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>Register</h2>
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
            <label>Name</label>
            <div className="inputWrapper">
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <FaPencilAlt />
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
            <label>Phone</label>
            <div className="inputWrapper">
              <input
                type="number"
                placeholder="Your Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <FaPhone />
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
              <FaLock />
            </div>
          </div>
          <button type="submit" onClick={handleRegister}>
            Register
          </button>
          <Link to={"/login"}>Already have an account? Login Now</Link>
        </form>
      </motion.div>
    </motion.section>
  );
};

export default Register;

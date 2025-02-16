import React, { useContext } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const Navbar = () => {
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/user/logout", {
        withCredentials: true,
      });
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthorized(true);
    }
  };

  return (
    <motion.nav
      style={{
        width: "100%",
        background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 0.1))",
        backdropFilter: "blur(10px)",
        padding: "10px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 100,
        transition: "all 0.3s ease-in-out",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <ul
        style={{
          display: "flex",
          width: "75%",
          justifyContent: "space-evenly",
          alignItems: "center",
          listStyle: "none",
          padding: "2px",
          margin: "2px",
          gap: "100px", // Reduced gap between menu items
        }}
      >
        <li>
          <Link to="/" style={{ color: "white", textDecoration: "none", fontSize: "1rem", display: "flex", alignItems: "center", gap: "5px" }}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/job/getall" style={{ color: "white", textDecoration: "none", fontSize: "1rem" }}>
            All Jobs
          </Link>
        </li>
        <li>
          <Link to="/applications/me" style={{ color: "white", textDecoration: "none", fontSize: "1rem" }}>
            {user && user.role === "Employer" ? "Applicant's Applications" : "My Applications"}
          </Link>
        </li>
        {user && user.role === "Employer" && (
          <>
            <li>
              <Link to="/job/post" style={{ color: "white", textDecoration: "none", fontSize: "1rem" }}>
                Post New Job
              </Link>
            </li>
            <li>
              <Link to="/job/me" style={{ color: "white", textDecoration: "none", fontSize: "1rem" }}>
                View Your Jobs
              </Link>
            </li>
          </>
        )}
        <li>
          <motion.button
            onClick={handleLogout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: "#e74c3c",
              color: "white",
              border: "none",
              padding: "7px 15px",
              borderRadius: "5px",
              fontSize: "1rem",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            Logout
          </motion.button>
        </li>
      </ul>
    </motion.nav>
  );
};

export default Navbar;
import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../main";

const Application = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();
  const { id } = useParams(); 

  const handleApplication = async (e) => {
    e.preventDefault();

    if (!id) {
      toast.error("Invalid Job ID. Please try again.");
      return;
    }

    const requestData = {
      name,
      email,
      phone,
      address,
      coverLetter,
      jobId: id,
    };

    console.log("Sending application:", requestData); // Debugging: Check payload before sending

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/application/post",
        requestData,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      // Reset form fields
      setName("");
      setEmail("");
      setCoverLetter("");
      setPhone("");
      setAddress("");

      toast.success(data.message);
      navigateTo("/job/getall");
    } catch (error) {
      console.error("Error submitting application:", error.response?.data);
      toast.error(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  if (!isAuthorized || (user && user.role === "Employer")) {
    navigateTo("/");
  }

  return (
    <section
      style={{
        width: "100%",
        padding: "100px 20px",
        background: "linear-gradient(to right, #1a1a2e, #16213e, #0f3460)",
        color: "white",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          width: "90%",
          background: "rgba(255, 255, 255, 0.1)",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
          backdropFilter: "blur(8px)",
          margin: "auto",
        }}
      >
        <h3
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            marginBottom: "20px",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          Application Form
        </h3>
        <form
          onSubmit={handleApplication}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />
          <input
            type="number"
            placeholder="Your Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="Your Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={inputStyle}
          />
          <textarea
            placeholder="Cover Letter..."
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            style={{
              ...inputStyle,
              resize: "vertical",
              minHeight: "150px",
            }}
          />
          <button type="submit" style={buttonStyle}>
            Send Application
          </button>
        </form>
      </div>
    </section>
  );
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  fontSize: "1rem",
  borderRadius: "8px",
  border: "none",
  background: "rgba(255, 255, 255, 0.2)",
  color: "white",
  transition: "all 0.3s ease-in-out",
};

const buttonStyle = {
  width: "100%",
  padding: "14px",
  fontSize: "1.2rem",
  fontWeight: "bold",
  textTransform: "uppercase",
  borderRadius: "8px",
  background: "#2ecc71",
  color: "white",
  border: "none",
  cursor: "pointer",
  transition: "all 0.3s ease-in-out",
};

export default Application;

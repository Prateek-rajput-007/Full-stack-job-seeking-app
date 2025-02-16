import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
import "./PostJob.css";

const PostJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [fixedSalary, setFixedSalary] = useState("");
  const [salaryType, setSalaryType] = useState("default");

  const { isAuthorized, user } = useContext(Context);

  const handleJobPost = async (e) => {
    e.preventDefault();
    if (salaryType === "Fixed Salary") {
      setSalaryFrom("");
      setSalaryTo("");
    } else if (salaryType === "Ranged Salary") {
      setFixedSalary("");
    } else {
      setSalaryFrom("");
      setSalaryTo("");
      setFixedSalary("");
    }
  
    await axios
      .post(
        "http://localhost:4000/api/v1/job/post",
        fixedSalary.length >= 4
          ? {
              title,
              description,
              category,
              country,
              city,
              location,
              fixedSalary,
            }
          : {
              title,
              description,
              category,
              country,
              city,
              location,
              salaryFrom,
              salaryTo,
            },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        
        // Reset form fields
        setTitle("");
        setDescription("");
        setCategory("");
        setCountry("");
        setCity("");
        setLocation("");
        setSalaryFrom("");
        setSalaryTo("");
        setFixedSalary("");
        setSalaryType("default");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  

  const navigateTo = useNavigate();
  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigateTo("/");
  }

  return (
    <div className="post-job-page-custom">
      <div className="post-job-container-custom">
        <h3 className="post-job-title-custom">POST NEW JOB</h3>
        <form onSubmit={handleJobPost}>
          <div className="post-job-inputWrapper-custom">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Job Title"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="Graphics & Design" style={{color: "black"}}>Graphics & Design</option>
              <option value="Mobile App Development" style={{color: "black"}}>Mobile App Development</option>
              <option value="Frontend Web Development" style={{color: "black"}}>Frontend Web Development</option>
              <option value="MERN Stack Development" style={{color: "black"}}>MERN STACK Development</option>
              <option value="Account & Finance" style={{color: "black"}}>Account & Finance</option>
              <option value="Artificial Intelligence" style={{color: "black"}}>Artificial Intelligence</option>
              <option value="Video Animation" style={{color: "black"}}>Video Animation</option>
              <option value="MEAN Stack Development" style={{color: "black"}}>MEAN STACK Development</option>
              <option value="MEVN Stack Development" style={{color: "black"}}>MEVN STACK Development</option>
              <option value="Data Entry Operator" style={{color: "black"}}>Data Entry Operator</option>
            </select>
          </div>
          <div className="post-job-inputWrapper-custom">
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Country"
            />
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
            />
          </div>
          <div className="post-job-inputWrapper-custom">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
            />
          </div>
          <div className="post-job-salary-wrapper-custom">
            <select
              className="post-job-salary-type-custom"
              value={salaryType}
              onChange={(e) => setSalaryType(e.target.value)}
            >
              <option value="default" >Select Salary Type</option>
              <option value="Fixed Salary" style={{color: "black"}}>Fixed Salary</option>
              <option value="Ranged Salary" style={{color: "black"}}>Ranged Salary</option>
            </select>
            <div className="post-job-salary-inputs-custom">
              {salaryType === "default" ? (
                <p className="post-job-salary-message-custom">Please provide Salary Type *</p>
              ) : salaryType === "Fixed Salary" ? (
                <input
                  type="number"
                  placeholder="Enter Fixed Salary"
                  value={fixedSalary}
                  onChange={(e) => setFixedSalary(e.target.value)}
                  className="post-job-inputWrapper-custom"
                />
              ) : (
                <div className="post-job-ranged-salary-custom">
                  <input
                    type="number"
                    placeholder="Salary From"
                    value={salaryFrom}
                    onChange={(e) => setSalaryFrom(e.target.value)}
                    className="post-job-inputWrapper-custom"
                  />
                  <input
                    type="number"
                    placeholder="Salary To"
                    value={salaryTo}
                    onChange={(e) => setSalaryTo(e.target.value)}
                    className="post-job-inputWrapper-custom"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="post-job-inputWrapper-custom">
            <textarea
              rows="10"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Job Description"
            />
          </div>
          <button type="submit" className="post-job-button-custom">Create Job</button>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
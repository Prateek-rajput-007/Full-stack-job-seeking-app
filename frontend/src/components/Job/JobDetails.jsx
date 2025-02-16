import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
import "./JobDetails.css";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const navigateTo = useNavigate();

  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/job/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setJob(res.data.job);
      })
      .catch((error) => {
        navigateTo("/notfound");
      });
  }, []);

  if (!isAuthorized) {
    navigateTo("/login");
  }

  return (
    <section className="jobDetail page">
      <div className="container">
        <h3>Job Details</h3>
        <div className="banner">
          <p>
            Title: <span style={{ color: "white" }}> {job.title}</span>
          </p>
          <p>
            Category: <span style={{ color: "white" }}>{job.category}</span>
          </p>
          <p>
            Country: <span style={{ color: "white" }}>{job.country}</span>
          </p>
          <p>
            City: <span style={{ color: "white" }}>{job.city}</span>
          </p>
          <p>
            Location: <span style={{ color: "white" }}>{job.location}</span>
          </p>
          <p>
            Description: <span style={{ color: "white" }}>{job.description}</span>
          </p>
          <p>
            Job Posted On: <span style={{ color: "white" }}>{job.jobPostedOn}</span>
          </p>
          <p>
            Salary:{" "}
            {job.fixedSalary ? (
              <span style={{ color: "white" }}>{job.fixedSalary}</span>
            ) : (
              <span style={{ color: "white" }}>
                {job.salaryFrom} - {job.salaryTo}
              </span>
            )}
          </p>
          {user && user.role === "Employer" ? (
            <></>
          ) : (
            <Link to={`/application/${job._id}`}>Apply Now</Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobDetails;
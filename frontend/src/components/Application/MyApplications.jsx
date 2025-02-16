import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./MyApplications.css";

const MyApplications = () => {
  const { user, isAuthorized } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/");
      return;
    }

    const fetchApplications = async () => {
      try {
        const endpoint =
          user?.role === "Employer"
            ? "http://localhost:4000/api/v1/application/employer/getall"
            : "http://localhost:4000/api/v1/application/jobseeker/getall";

        const { data } = await axios.get(endpoint, { withCredentials: true });
        setApplications(data.applications);
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    };

    if (user) {
      fetchApplications();
    }
  }, [isAuthorized, user, navigateTo]);

  const deleteApplication = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:4000/api/v1/application/delete/${id}`,
        { withCredentials: true }
      );
      toast.success(data.message);
      setApplications((prev) => prev.filter((app) => app._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete application");
    }
  };

  return (
    <section className="my-applications-page">
      <div className="my-applications-container">
        <h1 className="my-applications-title">
          {user?.role === "Job Seeker" ? "My Applications" : "Applications From Job Seekers"}
        </h1>

        {applications.length === 0 ? (
          <h4>No Applications Found</h4>
        ) : user?.role === "Job Seeker" ? (
          applications.map((app) => (
            <JobSeekerCard
              key={app._id}
              application={app}
              deleteApplication={deleteApplication}
            />
          ))
        ) : (
          applications.map((app) => (
            <EmployerCard key={app._id} application={app} />
          ))
        )}
      </div>
    </section>
  );
};

export default MyApplications;

const JobSeekerCard = ({ application, deleteApplication }) => (
  <div className="my-applications-card">
    <div className="detail">
      <p><span>Name:</span> {application.name}</p>
      <p><span>Email:</span> {application.email}</p>
      <p><span>Phone:</span> {application.phone}</p>
      <p><span>Address:</span> {application.address}</p>
      <p><span>Cover Letter:</span> {application.coverLetter}</p>
    </div>
    <div className="btn_area">
      <button onClick={() => deleteApplication(application._id)}>Delete Application</button>
    </div>
  </div>
);

const EmployerCard = ({ application }) => (
  <div className="my-applications-card">
    <div className="detail">
      <p><span>Name:</span> {application.name}</p>
      <p><span>Email:</span> {application.email}</p>
      <p><span>Phone:</span> {application.phone}</p>
      <p><span>Address:</span> {application.address}</p>
      <p><span>Cover Letter:</span> {application.coverLetter}</p>
    </div>
  </div>
);
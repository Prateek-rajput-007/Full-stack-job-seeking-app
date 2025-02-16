import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";

const MyJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const { isAuthorized, user } = useContext(Context);

  const navigateTo = useNavigate();
  //Fetching all jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/job/getmyjobs",
          { withCredentials: true }
        );
        setMyJobs(data.myJobs);
      } catch (error) {
        toast.error(error.response.data.message);
        setMyJobs([]);
      }
    };
    fetchJobs();
  }, []);
  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigateTo("/");
  }

  //Function For Enabling Editing Mode
  const handleEnableEdit = (jobId) => {
    //Here We Are Giving Id in setEditingMode because We want to enable only that job whose ID has been send.
    setEditingMode(jobId);
  };

  //Function For Disabling Editing Mode
  const handleDisableEdit = () => {
    setEditingMode(null);
  };

  //Function For Updating The Job
  const handleUpdateJob = async (jobId) => {
    const updatedJob = myJobs.find((job) => job._id === jobId);
    await axios
      .put(`http://localhost:4000/api/v1/job/update/${jobId}`, updatedJob, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setEditingMode(null);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  //Function For Deleting Job
  const handleDeleteJob = async (jobId) => {
    await axios
      .delete(`http://localhost:4000/api/v1/job/delete/${jobId}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setMyJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleInputChange = (jobId, field, value) => {
    // Update the job object in the jobs state with the new value
    setMyJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId ? { ...job, [field]: value } : job
      )
    );
  };

  return (
    <div style={{
      width: "100%",
      padding: "190px 20px",
      background: "linear-gradient(to right, #1a1a2e, #16213e, #0f3460)",
      color: "white",
      textAlign: "center",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      boxSizing: "border-box"
    }}>
      <div style={{
        maxWidth: "800px",
        width: "90%",
        background: "rgba(255, 255, 255, 0.1)",
        padding: "40px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
        backdropFilter: "blur(8px)",
        margin: "auto"
      }}>
        <h1 style={{
          fontSize: "2rem",
          fontWeight: "bold",
          marginBottom: "20px",
          textTransform: "uppercase",
          letterSpacing: "1px"
        }}>Your Posted Jobs</h1>
        {myJobs.length > 0 ? (
          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "30px",
            flexWrap: "wrap",
            marginTop: "30px"
          }}>
            {myJobs.map((element) => (
              <div style={{
                background: "rgba(255, 255, 255, 0.1)",
                borderRadius: "15px",
                padding: "30px",
                textAlign: "center",
                cursor: "pointer",
                transition: "all 0.3s ease-in-out",
                position: "relative",
                overflow: "hidden",
                backdropFilter: "blur(10px)",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                width: "350px"
              }} key={element._id}>
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  marginBottom: "20px"
                }}>
                  <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    marginBottom: "20px"
                  }}>
                    <div>
                      <span>Title:</span>
                      <input
                        type="text"
                        disabled={editingMode !== element._id}
                        value={element.title}
                        onChange={(e) =>
                          handleInputChange(element._id, "title", e.target.value)
                        }
                        style={{
                          width: "100%",
                          padding: "12px",
                          fontSize: "1rem",
                          borderRadius: "8px",
                          border: "none",
                          background: "rgba(255, 255, 255, 0.2)",
                          color: "white",
                          transition: "all 0.3s ease-in-out"
                        }}
                      />
                    </div>
                    <div>
                      <span>Country:</span>
                      <input
                        type="text"
                        disabled={editingMode !== element._id}
                        value={element.country}
                        onChange={(e) =>
                          handleInputChange(element._id, "country", e.target.value)
                        }
                        style={{
                          width: "100%",
                          padding: "12px",
                          fontSize: "1rem",
                          borderRadius: "8px",
                          border: "none",
                          background: "rgba(255, 255, 255, 0.2)",
                          color: "white",
                          transition: "all 0.3s ease-in-out"
                        }}
                      />
                    </div>
                    <div>
                      <span>City:</span>
                      <input
                        type="text"
                        disabled={editingMode !== element._id}
                        value={element.city}
                        onChange={(e) =>
                          handleInputChange(element._id, "city", e.target.value)
                        }
                        style={{
                          width: "100%",
                          padding: "12px",
                          fontSize: "1rem",
                          borderRadius: "8px",
                          border: "none",
                          background: "rgba(255, 255, 255, 0.2)",
                          color: "white",
                          transition: "all 0.3s ease-in-out"
                        }}
                      />
                    </div>
                    <div>
                      <span>Category:</span>
                      <select
                        value={element.category}
                        onChange={(e) =>
                          handleInputChange(element._id, "category", e.target.value)
                        }
                        disabled={editingMode !== element._id}
                        style={{
                          width: "100%",
                          padding: "12px",
                          fontSize: "1rem",
                          borderRadius: "8px",
                          border: "none",
                          background: "rgba(255, 255, 255, 0.2)",
                          color: "white",
                          transition: "all 0.3s ease-in-out"
                        }}
                      >
                        <option value="Graphics & Design">Graphics & Design</option>
                        <option value="Mobile App Development">Mobile App Development</option>
                        <option value="Frontend Web Development">Frontend Web Development</option>
                        <option value="MERN Stack Development">MERN STACK Development</option>
                        <option value="Account & Finance">Account & Finance</option>
                        <option value="Artificial Intelligence">Artificial Intelligence</option>
                        <option value="Video Animation">Video Animation</option>
                        <option value="MEAN Stack Development">MEAN STACK Development</option>
                        <option value="MEVN Stack Development">MEVN STACK Development</option>
                        <option value="Data Entry Operator">Data Entry Operator</option>
                      </select>
                    </div>
                    <div>
                      <span>
                        Salary:{" "}
                        {element.fixedSalary ? (
                          <input
                            type="number"
                            disabled={editingMode !== element._id}
                            value={element.fixedSalary}
                            onChange={(e) =>
                              handleInputChange(element._id, "fixedSalary", e.target.value)
                            }
                            style={{
                              width: "100%",
                              padding: "12px",
                              fontSize: "1rem",
                              borderRadius: "8px",
                              border: "none",
                              background: "rgba(255, 255, 255, 0.2)",
                              color: "white",
                              transition: "all 0.3s ease-in-out"
                            }}
                          />
                        ) : (
                          <div style={{
                            display: "flex",
                            gap: "10px"
                          }}>
                            <input
                              type="number"
                              disabled={editingMode !== element._id}
                              value={element.salaryFrom}
                              onChange={(e) =>
                                handleInputChange(element._id, "salaryFrom", e.target.value)
                              }
                              style={{
                                flex: 1,
                                padding: "12px",
                                fontSize: "1rem",
                                borderRadius: "8px",
                                border: "none",
                                background: "rgba(255, 255, 255, 0.2)",
                                color: "white",
                                transition: "all 0.3s ease-in-out"
                              }}
                            />
                            <input
                              type="number"
                              disabled={editingMode !== element._id}
                              value={element.salaryTo}
                              onChange={(e) =>
                                handleInputChange(element._id, "salaryTo", e.target.value)
                              }
                              style={{
                                flex: 1,
                                padding: "12px",
                                fontSize: "1rem",
                                borderRadius: "8px",
                                border: "none",
                                background: "rgba(255, 255, 255, 0.2)",
                                color: "white",
                                transition: "all 0.3s ease-in-out"
                              }}
                            />
                          </div>
                        )}
                      </span>
                    </div>
                    <div>
                      <span>Expired:</span>
                      <select
                        value={element.expired}
                        onChange={(e) =>
                          handleInputChange(element._id, "expired", e.target.value)
                        }
                        disabled={editingMode !== element._id}
                        style={{
                          width: "100%",
                          padding: "12px",
                          fontSize: "1rem",
                          borderRadius: "8px",
                          border: "none",
                          background: "rgba(255, 255, 255, 0.2)",
                          color: "white",
                          transition: "all 0.3s ease-in-out"
                        }}
                      >
                        <option value={true}>TRUE</option>
                        <option value={false}>FALSE</option>
                      </select>
                    </div>
                  </div>
                  <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    marginBottom: "20px"
                  }}>
                    <div>
                      <span>Description:</span>
                      <textarea
                        rows={5}
                        value={element.description}
                        disabled={editingMode !== element._id}
                        onChange={(e) =>
                          handleInputChange(element._id, "description", e.target.value)
                        }
                        style={{
                          width: "100%",
                          padding: "12px",
                          fontSize: "1rem",
                          borderRadius: "8px",
                          border: "none",
                          background: "rgba(255, 255, 255, 0.2)",
                          color: "white",
                          transition: "all 0.3s ease-in-out",
                          resize: "vertical",
                          minHeight: "120px"
                        }}
                      />
                    </div>
                    <div>
                      <span>Location: </span>
                      <textarea
                        value={element.location}
                        rows={5}
                        disabled={editingMode !== element._id}
                        onChange={(e) =>
                          handleInputChange(element._id, "location", e.target.value)
                        }
                        style={{
                          width: "100%",
                          padding: "12px",
                          fontSize: "1rem",
                          borderRadius: "8px",
                          border: "none",
                          background: "rgba(255, 255, 255, 0.2)",
                          color: "white",
                          transition: "all 0.3s ease-in-out",
                          resize: "vertical",
                          minHeight: "120px"
                        }}
                      />
                    </div>
                  </div>
                </div>
                {/* Out Of Content Class */}
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "20px"
                }}>
                  <div style={{
                    display: "flex",
                    gap: "10px"
                  }}>
                    {editingMode === element._id ? (
                      <>
                        <button
                          onClick={() => handleUpdateJob(element._id)}
                          style={{
                            background: "#2ecc71",
                            color: "white",
                            border: "none",
                            padding: "10px",
                            borderRadius: "5px",
                            fontSize: "1rem",
                            cursor: "pointer",
                            transition: "all 0.3s ease"
                          }}
                        >
                          <FaCheck />
                        </button>
                        <button
                          onClick={() => handleDisableEdit()}
                          style={{
                            background: "#e74c3c",
                            color: "white",
                            border: "none",
                            padding: "10px",
                            borderRadius: "5px",
                            fontSize: "1rem",
                            cursor: "pointer",
                            transition: "all 0.3s ease"
                          }}
                        >
                          <RxCross2 />
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleEnableEdit(element._id)}
                        style={{
                          background: "#3498db",
                          width: "250%",
                          color: "white",
                          border: "none",
                          padding: "10px",
                          borderRadius: "5px",
                          fontSize: "1rem",
                          cursor: "pointer",
                          transition: "all 0.3s ease"
                        }}
                      >
                        Edit
                      </button>
                    )}
                  </div>
                  <button
                    onClick={() => handleDeleteJob(element._id)}
                    style={{
                      background: "#e74c3c",
                      width: "60%",
                      color: "white",
                      border: "none",
                      padding: "10px",
                      borderRadius: "5px",
                      fontSize: "1rem",
                      cursor: "pointer",
                      transition: "all 0.3s ease"
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>You've not posted any job or may be you deleted all of your jobs!</p>
        )}
      </div>
    </div>
  );
};

export default MyJobs;
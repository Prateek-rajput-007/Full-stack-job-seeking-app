import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import { getJobSeekerApplications, getEmployerApplications, deleteApplication } from "../../services/applicationService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaFileAlt, FaTrash, FaFilePdf, FaFileWord, FaFileUpload } from "react-icons/fa";

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
        let response;
        if (user?.role === "Employer") {
          response = await getEmployerApplications();
        } else {
          response = await getJobSeekerApplications();
        }

        // Merge resume data from localStorage
        const applicationsWithResumes = response.data.applications.map(app => {
          const savedResume = localStorage.getItem(`application_resume_${app._id}`);
          if (savedResume) {
            try {
              const resumeData = JSON.parse(savedResume);
              return { ...app, resume: resumeData.name };
            } catch (error) {
              console.error('Error parsing resume data:', error);
            }
          }
          return app;
        });

        setApplications(applicationsWithResumes);
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    };

    if (user) {
      fetchApplications();
    }
  }, [isAuthorized, user, navigateTo]);

  const handleDelete = async (id) => {
    try {
      const { data } = await deleteApplication(id);
      toast.success(data.message);
      setApplications((prev) => prev.filter((app) => app._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete application");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative max-w-7xl mx-auto mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            {user?.role === "Job Seeker" ? "My Applications" : "Applications From Job Seekers"}
          </h1>
          <p className="text-slate-400 text-lg">
            {user?.role === "Job Seeker"
              ? "Track all your submitted applications"
              : "Review applications for your job postings"}
          </p>
        </motion.div>

        {applications.length === 0 ? (
          <div className="text-center py-20">
            <h4 className="text-2xl font-bold text-slate-500">No Applications Found</h4>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {user?.role === "Job Seeker" ? (
              applications.map((app, index) => (
                <JobSeekerCard
                  key={app._id}
                  application={app}
                  deleteApplication={handleDelete}
                  index={index}
                />
              ))
            ) : (
              applications.map((app, index) => (
                <EmployerCard key={app._id} application={app} index={index} />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplications;

const JobSeekerCard = ({ application, deleteApplication, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:border-violet-500/30 transition-all duration-300"
  >
    <div className="p-6 space-y-4">
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-violet-500/10 rounded-lg flex items-center justify-center text-violet-400">
            <FaUser />
          </div>
          <div>
            <p className="text-sm text-slate-400">Applicant</p>
            <p className="text-white font-semibold">{application.name}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-fuchsia-500/10 rounded-lg flex items-center justify-center text-fuchsia-400">
            <FaEnvelope />
          </div>
          <div className="overflow-hidden">
            <p className="text-sm text-slate-400">Email</p>
            <p className="text-white font-medium truncate">{application.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-400">
            <FaPhone />
          </div>
          <div>
            <p className="text-sm text-slate-400">Phone</p>
            <p className="text-white font-medium">{application.phone}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-400">
            <FaMapMarkerAlt />
          </div>
          <div>
            <p className="text-sm text-slate-400">Address</p>
            <p className="text-white font-medium">{application.address}</p>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-800 space-y-4">
        {/* Resume Section */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center text-amber-400 flex-shrink-0">
            {application.resume ? (
              application.resume.endsWith('.pdf') ? <FaFilePdf /> :
                application.resume.endsWith('.doc') || application.resume.endsWith('.docx') ? <FaFileWord /> :
                  <FaFileUpload />
            ) : (
              <FaFileUpload />
            )}
          </div>
          <div className="flex-1">
            <p className="text-sm text-slate-400 mb-1">Resume</p>
            {application.resume ? (
              <p className="text-white font-medium text-sm truncate">{application.resume}</p>
            ) : (
              <p className="text-slate-500 text-sm italic">No resume uploaded</p>
            )}
          </div>
        </div>

        {/* Cover Letter Section */}
        <div className="flex items-start gap-3">
          <FaFileAlt className="text-slate-500 mt-1 flex-shrink-0" />
          <div>
            <p className="text-sm text-slate-400 mb-1">Cover Letter</p>
            <p className="text-slate-300 text-sm leading-relaxed line-clamp-3 hover:line-clamp-none transition-all">
              {application.coverLetter}
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={() => deleteApplication(application._id)}
        className="w-full mt-4 py-3 bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold rounded-xl shadow-lg shadow-red-500/20 hover:shadow-red-500/40 hover:from-red-600 hover:to-red-800 transition-all duration-300 flex items-center justify-center gap-2"
      >
        <FaTrash />
        Delete Application
      </button>
    </div>
  </motion.div>
);

const EmployerCard = ({ application, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:border-violet-500/30 transition-all duration-300"
  >
    <div className="p-6 space-y-4">
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-violet-500/10 rounded-lg flex items-center justify-center text-violet-400">
            <FaUser />
          </div>
          <div>
            <p className="text-sm text-slate-400">Applicant</p>
            <p className="text-white font-semibold">{application.name}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-fuchsia-500/10 rounded-lg flex items-center justify-center text-fuchsia-400">
            <FaEnvelope />
          </div>
          <div className="overflow-hidden">
            <p className="text-sm text-slate-400">Email</p>
            <p className="text-white font-medium truncate">{application.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-400">
            <FaPhone />
          </div>
          <div>
            <p className="text-sm text-slate-400">Phone</p>
            <p className="text-white font-medium">{application.phone}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-400">
            <FaMapMarkerAlt />
          </div>
          <div>
            <p className="text-sm text-slate-400">Address</p>
            <p className="text-white font-medium">{application.address}</p>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-800 space-y-4">
        {/* Resume Section */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center text-amber-400 flex-shrink-0">
            {application.resume ? (
              application.resume.endsWith('.pdf') ? <FaFilePdf /> :
                application.resume.endsWith('.doc') || application.resume.endsWith('.docx') ? <FaFileWord /> :
                  <FaFileUpload />
            ) : (
              <FaFileUpload />
            )}
          </div>
          <div className="flex-1">
            <p className="text-sm text-slate-400 mb-1">Resume</p>
            {application.resume ? (
              <p className="text-white font-medium text-sm truncate">{application.resume}</p>
            ) : (
              <p className="text-slate-500 text-sm italic">No resume uploaded</p>
            )}
          </div>
        </div>

        {/* Cover Letter Section */}
        <div className="flex items-start gap-3">
          <FaFileAlt className="text-slate-500 mt-1 flex-shrink-0" />
          <div>
            <p className="text-sm text-slate-400 mb-1">Cover Letter</p>
            <p className="text-slate-300 text-sm leading-relaxed max-h-40 overflow-y-auto custom-scrollbar">
              {application.coverLetter}
            </p>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

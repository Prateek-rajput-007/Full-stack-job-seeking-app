import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getJobDetails } from "../../services/jobService";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaBriefcase,
  FaBuilding,
  FaDollarSign,
  FaCalendarAlt,
  FaArrowLeft,
  FaPaperPlane,
} from "react-icons/fa";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const [loading, setLoading] = useState(true);
  const navigateTo = useNavigate();
  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    getJobDetails(id)
      .then((res) => {
        setJob(res.data.job);
        setLoading(false);
      })
      .catch((error) => {
        navigateTo("/notfound");
      });
  }, [id, navigateTo]);

  if (!isAuthorized) {
    navigateTo("/login");
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-16 pb-10 px-4 sm:px-6 lg:px-8">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-3xl mx-auto">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <Link
            to="/job/getall"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <FaArrowLeft />
            <span>Back to All Jobs</span>
          </Link>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl overflow-hidden"
        >
          {/* Header Section */}
          <div className="bg-gradient-to-r from-violet-600/10 to-fuchsia-600/10 border-b border-slate-800 p-5 sm:p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="inline-block px-4 py-2 bg-violet-500/10 text-violet-400 text-sm font-semibold rounded-full border border-violet-500/20 mb-4">
                  {job.category}
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                  {job.title}
                </h1>
                <div className="flex flex-wrap gap-4 text-slate-400">
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-violet-400" />
                    <span>
                      {job.city}, {job.country}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-violet-400" />
                    <span>Posted: {new Date(job.jobPostedOn).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <div className="hidden sm:block">
                <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <FaBriefcase className="text-xl text-white" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-900/50 rounded-xl p-3 border border-slate-800">
                <div className="flex items-center gap-2 text-slate-400 mb-2">
                  <FaDollarSign className="text-violet-400" />
                  <span className="text-xs font-medium uppercase tracking-wider">Salary</span>
                </div>
                <p className="text-lg font-bold text-white">
                  {job.fixedSalary ? (
                    `$${job.fixedSalary.toLocaleString()}`
                  ) : (
                    `$${job.salaryFrom?.toLocaleString()} - $${job.salaryTo?.toLocaleString()}`
                  )}
                </p>
              </div>

              <div className="bg-slate-900/50 rounded-xl p-3 border border-slate-800">
                <div className="flex items-center gap-2 text-slate-400 mb-2">
                  <FaBuilding className="text-violet-400" />
                  <span className="text-xs font-medium uppercase tracking-wider">Location</span>
                </div>
                <p className="text-sm font-semibold text-white">{job.location}</p>
              </div>
            </div>
          </div>

          {/* Job Description */}
          <div className="p-5 sm:p-6 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-gradient-to-b from-violet-500 to-fuchsia-500 rounded-full"></span>
                Job Description
              </h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                  {job.description}
                </p>
              </div>
            </div>

            {/* Additional Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-800">
              <div className="space-y-2 text-sm">
                <h3 className="text-sm font-semibold text-white mb-3">Job Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between py-1.5 border-b border-slate-800">
                    <span className="text-slate-400">Category</span>
                    <span className="text-white font-medium">{job.category}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-800">
                    <span className="text-slate-400">Country</span>
                    <span className="text-white font-medium">{job.country}</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-slate-400">City</span>
                    <span className="text-white font-medium">{job.city}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <h3 className="text-sm font-semibold text-white mb-3">Compensation</h3>
                <div className="space-y-2">
                  <div className="flex justify-between py-1.5 border-b border-slate-800">
                    <span className="text-slate-400">Type</span>
                    <span className="text-white font-medium">
                      {job.fixedSalary ? "Fixed Salary" : "Ranged Salary"}
                    </span>
                  </div>
                  {job.fixedSalary ? (
                    <div className="flex justify-between py-1.5">
                      <span className="text-slate-400">Amount</span>
                      <span className="text-white font-medium">
                        ${job.fixedSalary.toLocaleString()}
                      </span>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between py-1.5 border-b border-slate-800">
                        <span className="text-slate-400">From</span>
                        <span className="text-white font-medium">
                          ${job.salaryFrom?.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between py-1.5">
                        <span className="text-slate-400">To</span>
                        <span className="text-white font-medium">
                          ${job.salaryTo?.toLocaleString()}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Apply Button */}
            {user && user.role !== "Employer" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="pt-6"
              >
                <Link
                  to={`/application/${job._id}`}
                  className="flex items-center justify-center gap-3 w-full py-2.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-sm font-semibold rounded-xl hover:from-violet-500 hover:to-fuchsia-500 transition-all duration-300 shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 group"
                >
                  <FaPaperPlane className="transform group-hover:translate-x-1 transition-transform" />
                  <span>Apply Now</span>
                </Link>
              </motion.div>
            )}

            {/* Info Box for Employers */}
            {user && user.role === "Employer" && (
              <div className="p-6 bg-violet-500/10 border border-violet-500/20 rounded-xl">
                <p className="text-slate-400 text-center">
                  You're viewing this job as an employer. Job seekers can apply to this position.
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Related Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 p-4 bg-slate-900/30 border border-slate-800 rounded-xl"
        >
          <p className="text-slate-400 text-sm text-center">
            <strong className="text-violet-400">Note:</strong> Make sure to review all job details carefully before applying. Prepare your cover letter in advance for the best results.
          </p>
        </motion.div>
      </div >
    </div >
  );
};

export default JobDetails;
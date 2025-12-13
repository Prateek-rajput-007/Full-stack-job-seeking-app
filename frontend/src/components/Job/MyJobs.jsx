import { getMyJobs, updateJob, deleteJob } from "../../services/jobService";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaCheckCircle, FaTimesCircle, FaEye, FaEdit, FaTrash,
  FaBriefcase, FaMapMarkerAlt, FaMoneyBillWave, FaCalendarAlt
} from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const MyJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");

  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const { data } = await getMyJobs();
        setMyJobs(data.myJobs || []);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch jobs");
        setMyJobs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigateTo("/");
    return null;
  }

  const handleEditClick = (job) => {
    setEditingJob({ ...job });
    setIsModalOpen(true);
  };

  const handleDeleteJob = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      setIsDeleting(jobId);
      await deleteJob(jobId);
      toast.success("Job deleted successfully");
      setMyJobs(prev => prev.filter(job => job._id !== jobId));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete");
    } finally {
      setIsDeleting(null);
    }
  };

  const handleUpdateJob = async (e) => {
    e?.preventDefault();
    try {
      const { data } = await updateJob(editingJob._id, editingJob);
      toast.success(data.message || "Job updated successfully!");
      setMyJobs(prev => prev.map(job => job._id === editingJob._id ? editingJob : job));
      setIsModalOpen(false);
      setEditingJob(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update job");
    }
  };

  const handleInputChange = (field, value) => {
    setEditingJob(prev => ({ ...prev, [field]: value }));
  };

  const handleSalaryTypeChange = (e) => {
    const isFixed = e.target.value === "fixed";
    setEditingJob(prev => ({
      ...prev,
      fixedSalary: isFixed ? prev.fixedSalary || "" : undefined,
      salaryFrom: !isFixed ? prev.salaryFrom || "" : undefined,
      salaryTo: !isFixed ? prev.salaryTo || "" : undefined,
    }));
  };

  const formatSalary = (job) => {
    if (job.fixedSalary) return `$${parseInt(job.fixedSalary).toLocaleString()}/month`;
    return `$${parseInt(job.salaryFrom || 0).toLocaleString()} - $${parseInt(job.salaryTo || 0).toLocaleString()}/month`;
  };

  const filteredJobs = myJobs.filter((job) => {
    if (filterStatus === "all") return true;
    if (filterStatus === "active") return !job.expired;
    if (filterStatus === "expired") return job.expired;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -right-40 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 -left-40 w-96 h-96 bg-fuchsia-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto z-10 mt-15">
        {/* Header with Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-white">Job Dashboard</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">Manage, edit, and track all your job postings in one place.</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            <motion.div whileHover={{ scale: 1.02, y: -4 }}
              className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl p-6 hover:border-violet-500/50 transition-all duration-300 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm mb-1 uppercase tracking-wider">Total Jobs</p>
                  <p className="text-4xl font-bold text-white">{myJobs.length}</p>
                </div>
                <div className="w-14 h-14 bg-violet-500/10 rounded-2xl flex items-center justify-center text-violet-400 text-2xl">
                  <FaBriefcase />
                </div>
              </div>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02, y: -4 }}
              className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl p-6 hover:border-emerald-500/50 transition-all duration-300 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm mb-1 uppercase tracking-wider">Active Jobs</p>
                  <p className="text-4xl font-bold text-white">{myJobs.filter(j => !j.expired).length}</p>
                </div>
                <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 text-2xl">
                  <FaCheckCircle />
                </div>
              </div>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02, y: -4 }}
              className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl p-6 hover:border-red-500/50 transition-all duration-300 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm mb-1 uppercase tracking-wider">Expired Jobs</p>
                  <p className="text-4xl font-bold text-white">{myJobs.filter(j => j.expired).length}</p>
                </div>
                <div className="w-14 h-14 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-500 text-2xl">
                  <FaTimesCircle />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Filter Bar */}
          <div className="flex items-center justify-center bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl p-2 mb-10 shadow-lg w-max mx-auto">
            {["all", "active", "expired"].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-8 py-2.5 rounded-xl font-medium transition-all capitalize ${filterStatus === status
                  ? "bg-slate-800 text-white border border-slate-700 shadow-inner"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                  }`}
              >
                {status}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Jobs Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-80 bg-slate-900/50 rounded-3xl animate-pulse"></div>
            ))}
          </div>
        ) : filteredJobs.length > 0 ? (
          <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredJobs.map((job, index) => (
                <motion.div
                  layout
                  key={job._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group bg-slate-900/40 backdrop-blur-sm border border-slate-800 rounded-3xl overflow-hidden hover:border-violet-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-violet-900/10"
                >
                  <div className="p-6 space-y-6">
                    {/* Header: Status + Category */}
                    <div className="flex gap-3 mb-4">
                      <div className="flex flex-wrap gap-2">
                        <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${job.expired ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'}`}>
                          {job.expired ? "Expired" : "Active"}
                        </span>
                        <span className="px-3 py-1 rounded-lg text-xs font-bold bg-slate-800 text-slate-300 border border-slate-700">
                          {job.category}
                        </span>
                      </div>
                    </div>

                    {/* Title & Info */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-white group-hover:text-violet-400 transition-colors line-clamp-1">{job.title}</h3>

                      <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                        <div className="flex items-center gap-2">
                          <FaMapMarkerAlt className="text-violet-500" /> {job.city}, {job.country}
                        </div>
                        <div className="flex items-center gap-2">
                          <FaMoneyBillWave className="text-emerald-500" /> {formatSalary(job)}
                        </div>
                      </div>
                    </div>

                    {/* Posted Date */}
                    <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-sm text-slate-500">
                      <span className="flex items-center gap-2">
                        <FaCalendarAlt /> Posted {new Date(job.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="bg-slate-900/50 p-4 border-t border-slate-800 grid grid-cols-3 gap-3">
                    <button onClick={() => navigateTo(`/job/${job._id}`)}
                      className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:bg-violet-600 hover:text-white transition-all text-sm font-medium">
                      <FaEye /> View
                    </button>

                    <button onClick={() => handleEditClick(job)}
                      className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:bg-emerald-600 hover:text-white transition-all text-sm font-medium">
                      <FaEdit /> Edit
                    </button>

                    <button onClick={() => handleDeleteJob(job._id)} disabled={isDeleting === job._id}
                      className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:bg-red-600 hover:text-white transition-all text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed">
                      {isDeleting === job._id ? <div className="animate-spin w-4 h-4 border-2 border-white/20 border-t-white rounded-full" /> : <FaTrash />}
                      <span>{isDeleting === job._id ? "" : "Delete"}</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="text-center py-24 bg-slate-900/30 rounded-3xl border border-slate-800">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-slate-800 rounded-full flex items-center justify-center">
                <FaBriefcase className="text-4xl text-slate-600" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">No Jobs Found</h3>
              <p className="text-slate-400 mb-8">You haven't posted any jobs yet or none match your filters.</p>
              <button onClick={() => navigateTo("/job/post")}
                className="px-8 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold rounded-xl shadow-lg hover:shadow-violet-500/25 hover:scale-105 transition-all">
                Post Your First Job
              </button>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        <AnimatePresence>
          {isModalOpen && editingJob && (
            <div
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setIsModalOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto custom-scrollbar"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="sticky top-0 bg-slate-900/95 backdrop-blur z-10 border-b border-slate-800 p-6 flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-white">Edit Job Listing</h2>
                  <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-800 rounded-xl transition-colors text-slate-400 hover:text-white">
                    <RxCross2 className="text-2xl" />
                  </button>
                </div>

                <form onSubmit={handleUpdateJob} className="p-6 md:p-8 space-y-6">
                  {/* Job Title */}
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Job Title</label>
                    <input type="text" value={editingJob.title || ""} onChange={(e) => handleInputChange("title", e.target.value)}
                      className="w-full px-5 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all" required />
                  </div>

                  {/* Location */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">Country</label>
                      <input type="text" value={editingJob.country || ""} onChange={(e) => handleInputChange("country", e.target.value)}
                        className="w-full px-5 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">City</label>
                      <input type="text" value={editingJob.city || ""} onChange={(e) => handleInputChange("city", e.target.value)}
                        className="w-full px-5 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all" required />
                    </div>
                  </div>

                  {/* Category & Status */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">Category</label>
                      <select value={editingJob.category || ""} onChange={(e) => handleInputChange("category", e.target.value)}
                        className="w-full px-5 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all" required>
                        {["Graphics & Design", "Mobile App Development", "Frontend Web Development", "MERN Stack Development", "Account & Finance", "Artificial Intelligence", "Video Animation", "MEAN Stack Development", "MEVN Stack Development", "Data Entry Operator"].map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">Status</label>
                      <select value={editingJob.expired} onChange={(e) => handleInputChange("expired", e.target.value === "true")}
                        className="w-full px-5 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all">
                        <option value={false}>Active</option>
                        <option value={true}>Expired</option>
                      </select>
                    </div>
                  </div>

                  {/* Salary Type */}
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-3">Salary Type</label>
                    <div className="flex gap-6">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${!editingJob.fixedSalary ? 'border-violet-500' : 'border-slate-600'}`}>
                          {!editingJob.fixedSalary && <div className="w-3 h-3 bg-violet-500 rounded-full" />}
                        </div>
                        <input type="radio" name="salaryType" value="range" checked={!editingJob.fixedSalary} onChange={handleSalaryTypeChange} className="hidden" />
                        <span className="text-slate-300 group-hover:text-white transition-colors">Range (From - To)</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${editingJob.fixedSalary ? 'border-violet-500' : 'border-slate-600'}`}>
                          {editingJob.fixedSalary && <div className="w-3 h-3 bg-violet-500 rounded-full" />}
                        </div>
                        <input type="radio" name="salaryType" value="fixed" checked={!!editingJob.fixedSalary} onChange={handleSalaryTypeChange} className="hidden" />
                        <span className="text-slate-300 group-hover:text-white transition-colors">Fixed Salary</span>
                      </label>
                    </div>
                  </div>

                  {/* Salary Input */}
                  {editingJob.fixedSalary !== undefined && (
                    <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800">
                      {editingJob.fixedSalary ? (
                        <div>
                          <label className="block text-sm font-medium text-slate-400 mb-2">Fixed Salary Amount</label>
                          <input type="number" placeholder="e.g. 50000" value={editingJob.fixedSalary || ""} onChange={(e) => handleInputChange("fixedSalary", e.target.value)}
                            className="w-full px-5 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all" required />
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">Minimum</label>
                            <input type="number" placeholder="Min" value={editingJob.salaryFrom || ""} onChange={(e) => handleInputChange("salaryFrom", e.target.value)}
                              className="w-full px-5 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all" required />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">Maximum</label>
                            <input type="number" placeholder="Max" value={editingJob.salaryTo || ""} onChange={(e) => handleInputChange("salaryTo", e.target.value)}
                              className="w-full px-5 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all" required />
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Description</label>
                    <textarea rows={6} value={editingJob.description || ""} onChange={(e) => handleInputChange("description", e.target.value)}
                      className="w-full px-5 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all resize-none" required />
                  </div>

                  {/* Location Details */}
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Location Details (Optional)</label>
                    <textarea rows={3} value={editingJob.location || ""} onChange={(e) => handleInputChange("location", e.target.value)}
                      className="w-full px-5 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all resize-none" />
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-4 pt-4 border-t border-slate-800">
                    <button type="button" onClick={() => setIsModalOpen(false)}
                      className="flex-1 px-6 py-3 bg-slate-800 text-slate-300 font-bold rounded-xl hover:bg-slate-700 transition-all">
                      Cancel
                    </button>
                    <button type="submit"
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold rounded-xl shadow-lg hover:shadow-violet-500/30 transition-all">
                      Save Changes
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MyJobs;
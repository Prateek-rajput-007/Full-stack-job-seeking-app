import React, { useContext, useEffect, useState, useMemo } from "react";
import { getAllJobs } from "../../services/jobService";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Context } from "../../main";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSearch, FaMapMarkerAlt, FaBriefcase, FaDollarSign, FaClock,
  FaTag, FaChevronRight, FaTimes, FaGlobe, FaFilter
} from "react-icons/fa";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState(location.state?.search || "");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [loading, setLoading] = useState(true);
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const { data } = await getAllJobs();
        setJobs(data.jobs || []);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = !selectedCategory || job.category === selectedCategory;
      const matchesLocation =
        !selectedLocation ||
        job.city.toLowerCase().includes(selectedLocation.toLowerCase()) ||
        job.country.toLowerCase().includes(selectedLocation.toLowerCase());

      return matchesSearch && matchesCategory && matchesLocation;
    });
  }, [jobs, searchTerm, selectedCategory, selectedLocation]);

  const categories = [...new Set(jobs.map((j) => j.category))].sort();
  const locations = [...new Set(jobs.map((j) => `${j.city}, ${j.country}`))].sort();

  const formatSalary = (job) => {
    if (job.fixedSalary) return `$${parseInt(job.fixedSalary).toLocaleString()}/mo`;
    return `$${parseInt(job.salaryFrom).toLocaleString()} - $${parseInt(job.salaryTo).toLocaleString()}/mo`;
  };

  const getTimeAgo = (date) => {
    const diff = (new Date() - new Date(date)) / (1000 * 60 * 60);
    if (diff < 24) return "Today";
    if (diff < 48) return "Yesterday";
    if (diff < 168) return `${Math.floor(diff / 24)}d ago`;
    return new Date(date).toLocaleDateString();
  };

  if (!isAuthorized) {
    navigateTo("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-16 pb-12 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-fuchsia-600/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mt-10">

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
            Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-white">Dream Career</span>
          </h1>
          <p className="text-slate-400 text-base max-w-2xl mx-auto">
            Browse through thousands of job opportunities from top companies and startups.
          </p>
        </motion.div>

        {/* Search & Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl p-4 mb-8 shadow-2xl relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 relative z-10">
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search by job title, skill, or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-950/50 border border-slate-700 text-white rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-violet-500/50 placeholder-slate-500 transition-all text-sm"
              />
            </div>

            {/* Category Dropdown */}
            <div className="md:col-span-3 relative">
              <FaBriefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-slate-950/50 border border-slate-700 text-white rounded-xl py-2.5 pl-10 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-violet-500/50 cursor-pointer text-slate-300 text-sm"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 text-xs">▼</div>
            </div>

            {/* Location Dropdown */}
            <div className="md:col-span-3 relative">
              <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full bg-slate-950/50 border border-slate-700 text-white rounded-xl py-2.5 pl-10 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-violet-500/50 cursor-pointer text-slate-300 text-sm"
              >
                <option value="">All Locations</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 text-xs">▼</div>
            </div>

            {/* Filter Icon / Clear */}
            <div className="md:col-span-1 flex items-center justify-center">
              {(searchTerm || selectedCategory || selectedLocation) ? (
                <button
                  onClick={() => { setSearchTerm(""); setSelectedCategory(""); setSelectedLocation(""); }}
                  className="p-2.5 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500/20 transition-colors tooltip"
                  title="Clear Filters"
                >
                  <FaTimes />
                </button>
              ) : (
                <div className="p-2.5 bg-slate-800 text-slate-500 rounded-xl">
                  <FaFilter />
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Total Jobs", value: jobs.length, icon: <FaBriefcase />, color: "text-violet-400" },
            { label: "Categories", value: categories.length, icon: <FaTag />, color: "text-fuchsia-400" },
            { label: "Locations", value: new Set(jobs.map(j => j.city)).size, icon: <FaMapMarkerAlt />, color: "text-emerald-400" },
            { label: "Companies", value: new Set(jobs.map(j => j.title)).size, icon: <FaGlobe />, color: "text-blue-400" }, // Mock company count
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + (index * 0.1) }}
              className="bg-slate-900/40 border border-slate-800 p-4 rounded-xl flex flex-col items-center justify-center text-center hover:bg-slate-800/60 transition-colors"
            >
              <div className={`text-2xl mb-2 ${stat.color}`}>{stat.icon}</div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-xs text-slate-500 uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>


        {/* Jobs Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-64 bg-slate-900/50 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        ) : filteredJobs.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredJobs.map((job, index) => (
                <motion.div
                  key={job._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Link to={`/job/${job._id}`} className="block h-full">
                    <div className="group relative h-full bg-slate-900/40 backdrop-blur-sm border border-slate-800 hover:border-violet-500/50 rounded-2xl p-5 transition-all duration-300 hover:shadow-2xl hover:shadow-violet-900/20 hover:-translate-y-2 flex flex-col justify-between overflow-hidden">

                      {/* Hover Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-fuchsia-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      <div className="relative z-10">
                        <div className="flex justify-between items-start mb-4">
                          <span className="bg-slate-800 text-slate-300 text-xs font-medium px-3 py-1 rounded-full border border-slate-700 group-hover:border-violet-500/30 transition-colors">
                            {job.category}
                          </span>
                          {job.expired && (
                            <span className="bg-red-500/10 text-red-500 text-xs px-2 py-1 rounded border border-red-500/20">
                              Expired
                            </span>
                          )}
                        </div>

                        <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-violet-400 transition-colors">
                          {job.title}
                        </h3>

                        <div className="space-y-2 mb-6">
                          <div className="flex items-center text-slate-400 text-sm">
                            <FaMapMarkerAlt className="mr-2 text-violet-500" />
                            {job.city}, {job.country}
                          </div>
                          <div className="flex items-center text-slate-400 text-sm">
                            <FaClock className="mr-2 text-fuchsia-500" />
                            {getTimeAgo(job.createdAt)}
                          </div>
                          <div className="flex items-center text-slate-200 font-semibold mt-2">
                            <FaDollarSign className="mr-1 text-emerald-400" />
                            {job.fixedSalary ? (
                              <span>{job.fixedSalary}</span>
                            ) : (
                              <span>{job.salaryFrom} - {job.salaryTo}</span>
                            )}
                            <span className="text-slate-500 text-xs font-normal ml-1">/mo</span>
                          </div>
                        </div>
                      </div>

                      <div className="relative z-10 pt-4 border-t border-slate-800/50">
                        <button className="w-full py-2.5 rounded-xl bg-slate-800 group-hover:bg-gradient-to-r group-hover:from-violet-600 group-hover:to-fuchsia-600 text-white font-medium transition-all duration-300 flex items-center justify-center gap-2 text-sm">
                          View Details
                          <FaChevronRight className="text-xs group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="text-center py-20 text-slate-500">
            <FaBriefcase className="text-6xl mx-auto mb-4 text-slate-700" />
            <h3 className="text-2xl font-bold text-slate-400">No jobs found</h3>
            <p>Try adjusting your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
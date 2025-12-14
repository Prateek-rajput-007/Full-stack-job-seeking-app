import React, { useContext, useState } from "react";
import { postJob } from "../../services/jobService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
import { motion } from "framer-motion";
import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaDollarSign,
  FaFileAlt,
  FaCheckCircle,
  FaGlobe,
  FaCity
} from "react-icons/fa";
import { FaSpinner } from "react-icons/fa6";

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
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleJobPost = async (e) => {
    e.preventDefault();

    if (!title || !description || !category || !country || !city || !location) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (salaryType === "default") {
      toast.error("Please select a salary type.");
      return;
    }
    if (salaryType === "Fixed Salary" && !fixedSalary) {
      toast.error("Please provide a fixed salary.");
      return;
    }
    if (salaryType === "Ranged Salary" && (!salaryFrom || !salaryTo)) {
      toast.error("Please provide a salary range.");
      return;
    }

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

    const jobData = salaryType === "Fixed Salary"
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
      };

    try {
      setIsLoading(true);
      const res = await postJob(jobData);
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
      setCurrentStep(1);
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigateTo("/");
  }

  const handleNext = () => {
    if (currentStep === 1) {
      if (!title || !category) {
        toast.error("Please provide a title and category.");
        return;
      }
    }
    if (currentStep === 2) {
      if (!country || !city || !location) {
        toast.error("Please provide complete location details.");
        return;
      }
    }
    if (currentStep === 3) {
      if (salaryType === "default") {
        toast.error("Please select a salary type.");
        return;
      }
      if (salaryType === "Fixed Salary" && !fixedSalary) {
        toast.error("Please provide a fixed salary.");
        return;
      }
      if (salaryType === "Ranged Salary" && (!salaryFrom || !salaryTo)) {
        toast.error("Please provide a salary range.");
        return;
      }
    }
    setCurrentStep((prev) => prev + 1);
  };

  const steps = [
    { number: 1, title: "Basic Info", icon: <FaBriefcase /> },
    { number: 2, title: "Location", icon: <FaMapMarkerAlt /> },
    { number: 3, title: "Salary", icon: <FaDollarSign /> },
    { number: 4, title: "Details", icon: <FaFileAlt /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative max-w-4xl mx-auto mt-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-3xl mb-6 shadow-xl shadow-violet-500/30">
            <FaBriefcase className="text-4xl text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Post a{" "}
            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
              New Job
            </span>
          </h1>
          <p className="text-slate-400 text-base">
            Create an attractive job listing to find the perfect candidates
          </p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-lg sm:text-xl transition-all duration-300 ${currentStep >= step.number
                      ? "bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/30"
                      : "bg-slate-800 text-slate-500 border-2 border-slate-700"
                      }`}
                  >
                    {step.icon}
                  </div>
                  <span className="text-xs sm:text-sm text-slate-400 mt-2 hidden sm:block">
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 rounded-full transition-all duration-300 ${currentStep > step.number
                      ? "bg-gradient-to-r from-violet-600 to-fuchsia-600"
                      : "bg-slate-800"
                      }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl"
        >
          <form onSubmit={handleJobPost} className="space-y-8">
            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-xl flex items-center justify-center">
                    <FaBriefcase className="text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Basic Information</h2>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-violet-400 mb-3 uppercase tracking-wider">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Senior React Developer"
                    required
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white text-base placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-violet-400 mb-3 uppercase tracking-wider">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white text-base focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select a Category</option>
                    <option value="Graphics & Design">Graphics & Design</option>
                    <option value="Mobile App Development">Mobile App Development</option>
                    <option value="Frontend Web Development">Frontend Web Development</option>
                    <option value="MERN Stack Development">MERN Stack Development</option>
                    <option value="Account & Finance">Account & Finance</option>
                    <option value="Artificial Intelligence">Artificial Intelligence</option>
                    <option value="Video Animation">Video Animation</option>
                    <option value="MEAN Stack Development">MEAN Stack Development</option>
                    <option value="MEVN Stack Development">MEVN Stack Development</option>
                    <option value="Data Entry Operator">Data Entry Operator</option>
                  </select>
                </div>
              </motion.div>
            )}

            {/* Step 2: Location */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-xl flex items-center justify-center">
                    <FaMapMarkerAlt className="text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Location Details</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-violet-400 mb-3 uppercase tracking-wider flex items-center gap-2">
                      <FaGlobe className="text-sm" />
                      Country *
                    </label>
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder="e.g. United States"
                      required
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white text-base placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-violet-400 mb-3 uppercase tracking-wider flex items-center gap-2">
                      <FaCity className="text-sm" />
                      City *
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. New York"
                      required
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white text-base placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-violet-400 mb-3 uppercase tracking-wider">
                    Detailed Address *
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. 123 Main Street, Building A, Floor 5"
                    required
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white text-base placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                  />
                </div>
              </motion.div>
            )}

            {/* Step 3: Salary */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-xl flex items-center justify-center">
                    <FaDollarSign className="text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Compensation</h2>
                </div>

                <div className="p-6 bg-gradient-to-br from-violet-500/5 to-fuchsia-500/5 border border-violet-500/10 rounded-2xl space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-violet-400 mb-3 uppercase tracking-wider">
                      Salary Type *
                    </label>
                    <select
                      value={salaryType}
                      onChange={(e) => setSalaryType(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white text-base focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                    >
                      <option value="default">Select Salary Type</option>
                      <option value="Fixed Salary">Fixed Salary</option>
                      <option value="Ranged Salary">Ranged Salary</option>
                    </select>
                  </div>

                  {salaryType === "default" ? (
                    <div className="text-center py-8">
                      <p className="text-slate-500 text-lg">Please select a salary type to continue</p>
                    </div>
                  ) : salaryType === "Fixed Salary" ? (
                    <div>
                      <label className="block text-sm font-semibold text-violet-400 mb-3 uppercase tracking-wider">
                        Annual Salary Amount *
                      </label>
                      <div className="relative">
                        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 text-lg">$</span>
                        <input
                          type="number"
                          placeholder="Enter fixed salary"
                          value={fixedSalary}
                          onChange={(e) => setFixedSalary(e.target.value)}
                          required
                          className="w-full pl-10 pr-5 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white text-base placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-violet-400 mb-3 uppercase tracking-wider">
                          Minimum Salary *
                        </label>
                        <div className="relative">
                          <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 text-lg">$</span>
                          <input
                            type="number"
                            placeholder="Min salary"
                            value={salaryFrom}
                            onChange={(e) => setSalaryFrom(e.target.value)}
                            required
                            className="w-full pl-10 pr-5 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white text-base placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-violet-400 mb-3 uppercase tracking-wider">
                          Maximum Salary *
                        </label>
                        <div className="relative">
                          <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 text-lg">$</span>
                          <input
                            type="number"
                            placeholder="Max salary"
                            value={salaryTo}
                            onChange={(e) => setSalaryTo(e.target.value)}
                            required
                            className="w-full pl-10 pr-5 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white text-base placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Step 4: Details */}
            {currentStep === 4 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-xl flex items-center justify-center">
                    <FaFileAlt className="text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Job Description</h2>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-violet-400 mb-3 uppercase tracking-wider">
                    Detailed Description *
                  </label>
                  <textarea
                    rows="10"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the role, responsibilities, requirements, qualifications, and benefits in detail..."
                    required
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white text-base placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all resize-none"
                  />
                  <p className="text-sm text-slate-500 mt-3 flex items-center gap-2">
                    <FaCheckCircle className="text-violet-400" />
                    Include key responsibilities, required skills, and what makes your company great
                  </p>
                </div>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4 pt-6">
              {currentStep > 1 && (
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="flex-1 py-4 bg-slate-800 text-white text-lg font-semibold rounded-xl border-2 border-slate-700 hover:border-slate-600 transition-all duration-300"
                >
                  Previous
                </motion.button>
              )}

              {currentStep < 4 ? (
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleNext}
                  className="flex-1 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-lg font-semibold rounded-xl hover:from-violet-500 hover:to-fuchsia-500 transition-all duration-300 shadow-lg shadow-violet-500/30"
                >
                  Next
                </motion.button>
              ) : (
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isLoading}
                  className="flex-1 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-lg font-semibold rounded-xl hover:from-violet-500 hover:to-fuchsia-500 transition-all duration-300 shadow-lg shadow-violet-500/30 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      Creating Job...
                    </>
                  ) : (
                    <>
                      <FaCheckCircle />
                      Create Job
                    </>
                  )}
                </motion.button>
              )}
            </div>
          </form>
        </motion.div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          <div className="p-6 bg-violet-500/10 border border-violet-500/20 rounded-2xl">
            <h4 className="text-violet-400 font-semibold mb-2">💡 Be Specific</h4>
            <p className="text-slate-400 text-sm">Clear job titles and descriptions attract better candidates</p>
          </div>
          <div className="p-6 bg-fuchsia-500/10 border border-fuchsia-500/20 rounded-2xl">
            <h4 className="text-fuchsia-400 font-semibold mb-2">🎯 Set Realistic Expectations</h4>
            <p className="text-slate-400 text-sm">Accurate requirements help find the right fit faster</p>
          </div>
          <div className="p-6 bg-purple-500/10 border border-purple-500/20 rounded-2xl">
            <h4 className="text-purple-400 font-semibold mb-2">✨ Highlight Benefits</h4>
            <p className="text-slate-400 text-sm">Showcase what makes your company a great place to work</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PostJob;
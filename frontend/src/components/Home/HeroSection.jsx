import React from "react";
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus, FaCheck, FaArrowRight } from "react-icons/fa";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  const ref = React.useRef(null);
  const inView = useInView(ref, { triggerOnce: false, amount: 0.2 });

  const details = [
    { id: 1, title: "150K+", subTitle: "Active Job Listings", icon: <FaSuitcase /> },
    { id: 2, title: "95K+", subTitle: "Registered Companies", icon: <FaBuilding /> },
    { id: 3, title: "300K+", subTitle: "Job Seekers", icon: <FaUsers /> },
    { id: 4, title: "110K+", subTitle: "Verified Employers", icon: <FaUserPlus /> },
  ];

  return (
    <div ref={ref} className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-20 pb-16 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        {/* Hero Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20 lg:mb-32">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Welcome to{" "}
                <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                  HireMeToo
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-300 leading-relaxed">
                Your ultimate job-seeking platform, connecting job seekers with top companies.
                Explore thousands of job opportunities tailored to your skills and career aspirations.
              </p>
            </div>

            {/* Features List */}
            <ul className="space-y-3">
              {[
                "AI-Powered Job Recommendations",
                "One-Click Apply Feature",
                "Resume Builder & Profile Optimization",
                "Verified Employer Listings"
              ].map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-3 text-slate-300"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 flex items-center justify-center">
                    <FaCheck className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-base sm:text-lg">{feature}</span>
                </motion.li>
              ))}
            </ul>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/job/getall")}
              className="group relative px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-lg font-semibold rounded-xl shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Explore Jobs
                <FaArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-fuchsia-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.button>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/20 to-fuchsia-500/20 z-10"></div>
              <img
                src="/me.png"
                alt="Professional workspace"
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Floating decoration */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-2xl opacity-20 blur-xl animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl opacity-20 blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {details.map((element, index) => (
            <motion.div
              key={element.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group relative bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 sm:p-8 hover:border-violet-500/50 transition-all duration-300 cursor-pointer"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-fuchsia-500/5 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300"></div>

              <div className="relative space-y-3">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 flex items-center justify-center text-violet-400 text-2xl sm:text-3xl group-hover:scale-110 transition-transform duration-300">
                  {element.icon}
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1">
                    {element.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-400 group-hover:text-slate-300 transition-colors">
                    {element.subTitle}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
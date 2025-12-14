import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import { motion } from "framer-motion";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaUserPlus />,
      title: "Create an Account",
      description: "Sign up as a Job Seeker or Employer to unlock exclusive job opportunities and professional networks.",
      color: "from-blue-500 to-cyan-500",
      delay: 0.2
    },
    {
      icon: <MdFindInPage />,
      title: "Find a Job / Post a Job",
      description: "Browse top-tier job listings or post a job to hire the best talent in the industry with our advanced filters.",
      color: "from-violet-500 to-purple-500",
      delay: 0.4
    },
    {
      icon: <IoMdSend />,
      title: "Apply / Recruit",
      description: "Apply for jobs in one click or review applications to find your perfect hire efficiently and effectively.",
      color: "from-fuchsia-500 to-pink-500",
      delay: 0.6
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="relative py-16 sm:py-20 bg-slate-950 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-fuchsia-600/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            How{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-purple-400">
              HireMeToo
            </span>{" "}
            Works
          </h2>
          <p className="text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Whether you're looking for your next dream job or searching for the perfect candidate,
            our platform streamlines the entire process.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 relative"
        >
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-[60px] left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-violet-500/20 via-fuchsia-500/20 to-violet-500/20"></div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative group"
            >
              {/* Card */}
              <div className="relative h-full bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 hover:border-violet-500/30 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-violet-500/10 group-hover:-translate-y-2">
                {/* Float Effect Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`}></div>

                <div className="relative flex flex-col items-center text-center space-y-6">
                  {/* Icon Container */}
                  <div className="relative">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} p-0.5 shadow-xl shadow-violet-500/20 group-hover:scale-110 transition-transform duration-500`}>
                      <div className="w-full h-full bg-slate-950/90 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                        <span className="text-3xl text-white">
                          {step.icon}
                        </span>
                      </div>
                    </div>
                    {/* Step Number Badge */}
                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-sm font-bold text-slate-300 shadow-lg">
                      {index + 1}
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-violet-200 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
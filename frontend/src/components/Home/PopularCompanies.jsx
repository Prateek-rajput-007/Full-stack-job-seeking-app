import React from "react";
import { FaMicrosoft, FaApple, FaMapMarkerAlt } from "react-icons/fa";
import { SiTesla } from "react-icons/si";
import { motion } from "framer-motion";

const companies = [
  {
    id: 1,
    title: "Microsoft",
    location: "Redmond, Washington, USA",
    openPositions: 10,
    icon: <FaMicrosoft />,
    color: "from-blue-500 to-cyan-500",
    bg: "bg-blue-500/10"
  },
  {
    id: 2,
    title: "Tesla",
    location: "Austin, Texas, USA",
    openPositions: 5,
    icon: <SiTesla />,
    color: "from-red-500 to-pink-500",
    bg: "bg-red-500/10"
  },
  {
    id: 3,
    title: "Apple",
    location: "Cupertino, California, USA",
    openPositions: 20,
    icon: <FaApple />,
    color: "from-slate-400 to-slate-600",
    bg: "bg-slate-500/10"
  },
];

const PopularCompanies = () => {
  return (
    <section className="relative py-24 sm:py-32 bg-slate-950 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-violet-500/5 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-fuchsia-500/5 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Top{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-purple-400">
              Companies
            </span>
          </h2>
          <p className="text-base text-slate-400 max-w-2xl mx-auto">
            Join world-class organizations that are actively hiring top talent.
          </p>
        </motion.div>

        {/* Companies Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {companies.map((company, index) => (
            <motion.div
              key={company.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              <div className="relative h-full bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 hover:border-violet-500/30 transition-all duration-500 flex flex-col items-center text-center">
                {/* Gradient Border Glow */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${company.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl ${company.bg} flex items-center justify-center text-4xl mb-6 shadow-xl shadow-slate-950/50 group-hover:scale-110 transition-transform duration-500`}>
                  <span className={`text-3xl text-white`}>
                    {company.icon}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-2">{company.title}</h3>
                <p className="text-slate-400 mb-6 flex items-center gap-2 text-sm justify-center">
                  <FaMapMarkerAlt className="text-violet-400" />
                  {company.location}
                </p>

                {/* Open Positions Button */}
                <button className="w-full py-3 rounded-xl bg-slate-800 text-white font-medium border border-slate-700 hover:border-violet-500/50 hover:bg-slate-700 transition-all duration-300 flex items-center justify-between px-6 group/btn mt-auto">
                  <span>Open Positions</span>
                  <span className={`px-3 py-1 rounded-lg bg-gradient-to-br ${company.color} text-white font-bold text-sm shadow-lg`}>
                    {company.openPositions}
                  </span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCompanies;
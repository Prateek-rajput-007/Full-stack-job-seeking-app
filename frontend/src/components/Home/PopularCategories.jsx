import React from "react";
import { motion } from "framer-motion";
import {
  MdOutlineDesignServices,
  MdOutlineWebhook,
  MdAccountBalance,
  MdOutlineAnimation
} from "react-icons/md";
import { TbAppsFilled } from "react-icons/tb";
import { FaReact } from "react-icons/fa";
import { GiArtificialIntelligence } from "react-icons/gi";
import { IoGameController } from "react-icons/io5";

const categories = [
  {
    id: 1,
    title: "Graphics & Design",
    positions: "305+",
    description: "Shape visual identities with creative design solutions.",
    icon: <MdOutlineDesignServices />,
    color: "from-pink-500 to-rose-500",
    bg: "bg-pink-500/10"
  },
  {
    id: 2,
    title: "Mobile App Development",
    positions: "500+",
    description: "Build seamless mobile experiences for iOS and Android.",
    icon: <TbAppsFilled />,
    color: "from-blue-500 to-cyan-500",
    bg: "bg-blue-500/10"
  },
  {
    id: 3,
    title: "Frontend Web Development",
    positions: "200+",
    description: "Create responsive and dynamic user interfaces.",
    icon: <MdOutlineWebhook />,
    color: "from-violet-500 to-purple-500",
    bg: "bg-violet-500/10"
  },
  {
    id: 4,
    title: "MERN Stack Development",
    positions: "1000+",
    description: "Develop full-stack applications using MongoDB, Express, React, Node.",
    icon: <FaReact />,
    color: "from-cyan-500 to-blue-500",
    bg: "bg-cyan-500/10"
  },
  {
    id: 5,
    title: "Account & Finance",
    positions: "150+",
    description: "Manage financial records and strategic planning.",
    icon: <MdAccountBalance />,
    color: "from-emerald-500 to-teal-500",
    bg: "bg-emerald-500/10"
  },
  {
    id: 6,
    title: "Artificial Intelligence",
    positions: "867+",
    description: "Innovate with machine learning and AI algorithms.",
    icon: <GiArtificialIntelligence />,
    color: "from-fuchsia-500 to-pink-500",
    bg: "bg-fuchsia-500/10"
  },
  {
    id: 7,
    title: "Video Animation",
    positions: "50+",
    description: "Bring stories to life with motion graphics and animation.",
    icon: <MdOutlineAnimation />,
    color: "from-orange-500 to-red-500",
    bg: "bg-orange-500/10"
  },
  {
    id: 8,
    title: "Game Development",
    positions: "80+",
    description: "Design interactive and immersive gaming experiences.",
    icon: <IoGameController />,
    color: "from-purple-500 to-indigo-500",
    bg: "bg-purple-500/10"
  },
];

const PopularCategories = () => {
  return (
    <section className="relative py-24 sm:py-32 bg-slate-950 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-1.5 rounded-full border border-violet-500/20 bg-violet-500/10 text-violet-400 text-sm font-semibold mb-6">
            Trending Categories
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Explore{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-purple-400">
              Careers
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Discover opportunities in the most in-demand fields and take your career to the next level.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative h-full bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-6 hover:border-violet-500/30 transition-all duration-300 flex flex-col items-center text-center group-hover:bg-slate-900/60">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl ${category.bg} flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <span className={`text-3xl text-white`}>
                    {category.icon}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-violet-200 transition-colors">
                  {category.title}
                </h3>
                <p className="text-slate-400 text-sm mb-4">
                  {category.positions} Open Positions
                </p>

                {/* Description */}
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                  {category.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;
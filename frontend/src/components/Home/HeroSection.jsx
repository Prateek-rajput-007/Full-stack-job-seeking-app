import React from "react";
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useInView } from "framer-motion";
import "./HeroSection.css"; 

const HeroSection = () => {
  const navigate = useNavigate(); 
  const ref = React.useRef(null);
  const inView = useInView(ref, { triggerOnce: false });

  const details = [
    { id: 1, title: "150K+", subTitle: "Active Job Listings", icon: <FaSuitcase /> },
    { id: 2, title: "95K+", subTitle: "Registered Companies", icon: <FaBuilding /> },
    { id: 3, title: "300K+", subTitle: "Job Seekers", icon: <FaUsers /> },
    { id: 4, title: "110K+", subTitle: "Verified Employers", icon: <FaUserPlus /> },
  ];

  return (
    <div className="heroSection" ref={ref}>
      <div className="container">
        <motion.div
          className="textContent"
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 1.5 }}
        >
          <h1>Welcome to <span>HireMeToo</span></h1>
          <p>
            Your ultimate job-seeking platform, connecting job seekers with top companies.
            Explore thousands of job opportunities tailored to your skills and career aspirations.
            Start your journey to success today with HireMeToo!
          </p>
          <ul className="features-list">
            <li>✔ AI-Powered Job Recommendations</li>
            <li>✔ One-Click Apply Feature</li>
            <li>✔ Resume Builder & Profile Optimization</li>
            <li>✔ Verified Employer Listings</li>
          </ul>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="exploreBtn"
            onClick={() => navigate("/job/getall")} 
          >
            Explore Jobs
          </motion.button>
        </motion.div>

        <motion.div
          className="heroImage"
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ duration: 1.5 }}
        >
          <img src="/images.jpeg" alt="hero" />
        </motion.div>
      </div>

      <div className="stats">
        {details.map((element) => (
          <motion.div
            className="statCard"
            key={element.id}
            whileHover={{ scale: 1.1 }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 1.5, delay: element.id * 0.2 }}
          >
            <div className="icon">{element.icon}</div>
            <div className="content">
              <h3>{element.title}</h3>
              <p>{element.subTitle}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;

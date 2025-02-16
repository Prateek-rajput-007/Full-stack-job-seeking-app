import React from "react";
import { FaMicrosoft, FaApple } from "react-icons/fa";
import { SiTesla } from "react-icons/si";
import { motion } from "framer-motion";
import "./PopularCompanies.css";

const companies = [
  {
    id: 1,
    title: "Microsoft",
    location: "Street 10 Karachi, Pakistan",
    openPositions: 10,
    icon: <FaMicrosoft />,
  },
  {
    id: 2,
    title: "Tesla",
    location: "Street 10 Karachi, Pakistan",
    openPositions: 5,
    icon: <SiTesla />,
  },
  {
    id: 3,
    title: "Apple",
    location: "Street 10 Karachi, Pakistan",
    openPositions: 20,
    icon: <FaApple />,
  },
];

const PopularCompanies = () => {
  return (
    <motion.div
      className="popular-companies"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5 }}
      viewport={{ once: false, amount: 0.2 }}
    >
      <div className="popular-companies-container">
        <h3 className="popular-companies-title">TOP COMPANIES</h3>
        <div className="popular-companies-banner">
          {companies.map((element) => (
            <motion.div
              className="popular-companies-card"
              key={element.id}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: false, amount: 0.2 }}
            >
              <div className="popular-companies-content">
                <div className="popular-companies-icon">{element.icon}</div>
                <div className="popular-companies-text">
                  <p>{element.title}</p>
                  <p>{element.location}</p>
                </div>
              </div>
              <button className="popular-companies-button">
                Open Positions {element.openPositions}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default PopularCompanies;

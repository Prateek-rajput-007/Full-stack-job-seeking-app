import React from "react";
import {
  MdOutlineDesignServices,
  MdOutlineWebhook,
  MdAccountBalance,
  MdOutlineAnimation,
} from "react-icons/md";
import { TbAppsFilled } from "react-icons/tb";
import { FaReact } from "react-icons/fa";
import { GiArtificialIntelligence } from "react-icons/gi";
import { IoGameController } from "react-icons/io5";
import { motion } from "framer-motion";
import "./PopularCategories.css";

const categories = [
  { id: 1, title: "Graphics & Design", positions: "305+", icon: <MdOutlineDesignServices /> },
  { id: 2, title: "Mobile App Development", positions: "500+", icon: <TbAppsFilled /> },
  { id: 3, title: "Frontend Web Development", positions: "200+", icon: <MdOutlineWebhook /> },
  { id: 4, title: "MERN Stack Development", positions: "1000+", icon: <FaReact /> },
  { id: 5, title: "Account & Finance", positions: "150+", icon: <MdAccountBalance /> },
  { id: 6, title: "Artificial Intelligence", positions: "867+", icon: <GiArtificialIntelligence /> },
  { id: 7, title: "Video Animation", positions: "50+", icon: <MdOutlineAnimation /> },
  { id: 8, title: "Game Development", positions: "80+", icon: <IoGameController /> },
];

const PopularCategories = () => {
  return (
    <section className="popular-categories">
      <div className="container">
        <h2 className="section-title" style={{ textAlign: "center" }}>Explore <span>Popular Categories</span></h2>
        <div className="categories-grid">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              className="category-card"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="icon">{category.icon}</div>
              <h3>{category.title}</h3>
              <p>{category.positions} Open Positions</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;

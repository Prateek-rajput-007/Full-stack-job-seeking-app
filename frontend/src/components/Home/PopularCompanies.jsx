import React from "react";
import { FaMicrosoft, FaApple } from "react-icons/fa";
import { SiTesla } from "react-icons/si";
import "./PopularCompanies.css";

const PopularCompanies = () => {
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
  return (
    <div className="popular-companies">
      <div className="popular-companies-container">
        <h3 className="popular-companies-title">TOP COMPANIES</h3>
        <div className="popular-companies-banner">
          {companies.map((element) => {
            return (
              <div className="popular-companies-card" key={element.id}>
                <div className="popular-companies-content">
                  <div className="popular-companies-icon">{element.icon}</div>
                  <div className="popular-companies-text">
                    <p>{element.title}</p>
                    <p>{element.location}</p>
                  </div>
                </div>
                <button className="popular-companies-button">Open Positions {element.openPositions}</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PopularCompanies;
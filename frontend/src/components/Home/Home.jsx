import React, { useContext } from "react";
import { Context } from "../../main";
import { Navigate } from "react-router-dom";
import HeroSection from "./HeroSection";
import HowItWorks from "./HowItWorks";
import PopularCategories from "./PopularCategories";
import PopularCompanies from "./PopularCompanies";
import JobSeekerHome from "./JobSeekerHome";

const Home = () => {
  const { isAuthorized, user } = useContext(Context);

  if (!isAuthorized) {
    return <Navigate to={"/login"} />;
  }

  // If user is a Job Seeker, show the personalized dashboard
  if (user && user.role === "Job Seeker") {
    return <JobSeekerHome />;
  }

  // Fallback for non-Job Seekers (e.g., Employers) or initial state
  return (
    <>
      <section className="homePage page">
        <HeroSection />
        <HowItWorks />
        <PopularCategories />
        <PopularCompanies />
      </section>
    </>
  );
};

export default Home;
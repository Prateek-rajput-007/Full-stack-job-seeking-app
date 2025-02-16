import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import { motion, useInView } from "framer-motion";
import "./HowItWorks.css";

const HowItWorks = () => {
  const ref = React.useRef(null);
  const inView = useInView(ref, { triggerOnce: false });

  const steps = [
    { icon: <FaUserPlus />, title: "Create an Account", description: "Sign up as a Job Seeker or Employer to unlock exclusive job opportunities." },
    { icon: <MdFindInPage />, title: "Find a Job / Post a Job", description: "Browse top job listings or post a job to hire the best talent in the industry." },
    { icon: <IoMdSend />, title: "Apply for Jobs / Recruit Talent", description: "Apply for jobs in one click or review applications to find your perfect hire." },
  ];

  return (
    <motion.section ref={ref} className="howitworks">
      <div className="container">
        <h2 className="section-title"><span className="highlight">How</span> JobZee Works</h2>
        <p className="subtext">Whether you're a job seeker or an employer, JobZee makes the hiring process seamless and efficient.</p>
        <div className="steps-container">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="step-card"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 1.5 }}
            >
              <div className="step-icon">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default HowItWorks;

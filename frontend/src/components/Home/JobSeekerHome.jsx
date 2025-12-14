import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { getAllJobs } from "../../services/jobService";
import { getJobSeekerApplications } from "../../services/applicationService";
import { motion } from "framer-motion";
import {
    FaBriefcase,
    FaArrowRight,
    FaBuilding,
    FaMapMarkerAlt,
    FaDollarSign,
    FaClock,
    FaLightbulb,
    FaCode,
    FaPaintBrush,
    FaBullhorn,
    FaChartLine
} from "react-icons/fa";
import PopularCompanies from "./PopularCompanies";

const JobSeekerHome = () => {
    const { user } = useContext(Context);
    const [recentJobs, setRecentJobs] = useState([]);
    const [applicationCount, setApplicationCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const jobsRes = await getAllJobs();
                const appsRes = await getJobSeekerApplications();

                if (jobsRes.data && jobsRes.data.jobs) {
                    setRecentJobs(jobsRes.data.jobs.slice(0, 3));
                }

                if (appsRes.data && appsRes.data.applications) {
                    setApplicationCount(appsRes.data.applications.length);
                }
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const getTimeAgo = (date) => {
        const diff = (new Date() - new Date(date)) / (1000 * 60 * 60);
        if (diff < 24) return "Today";
        if (diff < 48) return "Yesterday";
        return `${Math.floor(diff / 24)}d ago`;
    };

    const tips = [
        "Tailor your resume for every single application.",
        "Research the company values before your interview.",
        "Follow up on your applications after one week.",
        "Keep your LinkedIn profile up to date.",
        "Network with professionals in your desired field."
    ];
    // Use a stable tip based on day to avoid hydration mismatch if SSR (though this is SPA)
    // For now simple random is fine or fixed index
    const dailyTip = tips[0];

    const categories = [
        { name: "Development", icon: <FaCode />, count: "120+" },
        { name: "Design", icon: <FaPaintBrush />, count: "85+" },
        { name: "Marketing", icon: <FaBullhorn />, count: "60+" },
        { name: "Finance", icon: <FaChartLine />, count: "45+" },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10 mt-20">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16 text-center"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">{user.name}</span>
                    </h1>
                    <p className="text-slate-400 text-lg mb-8">Find your dream job with HireMeToo</p>

                    <div className="mt-8">
                        <p className="text-slate-400 text-lg">Explore opportunities from top companies</p>
                    </div>
                </motion.div>

                {/* Categories Row */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="mb-12"
                >
                    <h2 className="text-2xl font-bold text-white mb-6 border-l-4 border-violet-500 pl-4">
                        Popular Categories
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {categories.map((cat, index) => (
                            <Link to="/job/getall" key={index} className="group relative bg-slate-900/50 border border-slate-800 hover:border-violet-500/50 p-6 rounded-2xl transition-all hover:-translate-y-1 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="relative z-10 flex flex-col items-center text-center">
                                    <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center text-2xl text-violet-400 group-hover:scale-110 group-hover:bg-violet-500/10 transition-all mb-4">
                                        {cat.icon}
                                    </div>
                                    <h3 className="text-white text-lg font-semibold mb-1">{cat.name}</h3>
                                    <p className="text-sm text-slate-500 group-hover:text-slate-400 transition-colors">{cat.count} Openings</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                >
                    {/* Left Column (Stats & Tip) */}
                    <div className="lg:col-span-1 space-y-8">
                        {/* My Activity */}
                        <motion.div variants={itemVariants} className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shadow-xl sticky top-24">
                            <h2 className="text-xl font-bold text-white mb-6 border-l-4 border-fuchsia-500 pl-4">
                                My Activity
                            </h2>
                            <div className="bg-slate-800/50 rounded-2xl p-6 text-center hover:bg-slate-800 transition-colors mb-6 border border-slate-700/50">
                                <div className="text-4xl font-bold text-white mb-2">{applicationCount}</div>
                                <div className="text-sm text-slate-400 font-medium uppercase tracking-wide">Applications Submitted</div>
                            </div>
                            <Link to="/applications/me" className="block text-center w-full py-3 bg-gradient-to-r from-slate-800 to-slate-700 hover:from-violet-600 hover:to-fuchsia-600 text-slate-300 hover:text-white rounded-xl font-semibold transition-all shadow-lg">
                                View Application History
                            </Link>
                        </motion.div>

                        {/* Daily Tip */}
                        <motion.div variants={itemVariants} className="bg-gradient-to-br from-violet-900/40 to-fuchsia-900/40 backdrop-blur-xl border border-violet-500/20 rounded-3xl p-6 shadow-xl">
                            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <FaLightbulb className="text-yellow-400" />
                                Career Tip of the Day
                            </h2>
                            <p className="text-slate-200 text-sm leading-relaxed italic border-l-2 border-white/20 pl-4">
                                "{dailyTip}"
                            </p>
                        </motion.div>
                    </div>

                    {/* Right Column (Jobs) */}
                    <div className="lg:col-span-2">
                        <motion.div variants={itemVariants} className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-xl">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-bold text-white border-l-4 border-emerald-500 pl-4">
                                    Recommended Jobs
                                </h2>
                                <Link to="/job/getall" className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-violet-400 hover:text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                                    Browse All Jobs <FaArrowRight className="text-xs" />
                                </Link>
                            </div>

                            {loading ? (
                                <div className="space-y-4">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="h-28 bg-slate-800/50 rounded-2xl animate-pulse"></div>
                                    ))}
                                </div>
                            ) : recentJobs.length > 0 ? (
                                <div className="space-y-4">
                                    {recentJobs.map((job) => (
                                        <Link key={job._id} to={`/job/${job._id}`} className="block group">
                                            <div className="bg-slate-800/30 hover:bg-slate-800/80 border border-slate-700/50 hover:border-violet-500/50 rounded-2xl p-6 transition-all duration-300 flex flex-col sm:flex-row sm:items-center gap-6 hover:shadow-lg hover:shadow-violet-900/10">
                                                <div className="w-16 h-16 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 rounded-2xl flex items-center justify-center text-3xl text-violet-400 group-hover:scale-110 transition-transform flex-shrink-0">
                                                    <FaBuilding />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="text-xl font-bold text-white group-hover:text-violet-400 transition-colors mb-2">{job.title}</h3>
                                                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-400">
                                                        <span className="flex items-center gap-2"><FaMapMarkerAlt className="text-violet-500/70" /> {job.city}</span>
                                                        <span className="flex items-center gap-2"><FaDollarSign className="text-emerald-500/70" /> {job.fixedSalary ? job.fixedSalary : `${job.salaryFrom} - ${job.salaryTo}`}</span>
                                                        <span className="flex items-center gap-2"><FaClock className="text-fuchsia-500/70" /> {getTimeAgo(job.createdAt)}</span>
                                                    </div>
                                                </div>
                                                <div className="sm:text-right flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-4">
                                                    <span className="inline-block px-4 py-1.5 bg-violet-500/10 text-violet-300 text-xs font-semibold rounded-full border border-violet-500/20">
                                                        {job.category}
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-16 text-slate-500 bg-slate-800/30 rounded-2xl border border-slate-800 border-dashed">
                                    <FaBriefcase className="text-4xl mx-auto mb-4 opacity-50" />
                                    <p className="text-lg">No jobs found matching your criteria.</p>
                                    <Link to="/job/getall" className="text-violet-400 hover:text-violet-300 text-sm mt-2 inline-block">Explore all jobs</Link>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default JobSeekerHome;

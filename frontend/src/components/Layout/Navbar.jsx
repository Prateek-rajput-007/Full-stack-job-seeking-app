import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../main";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { logout } from "../../services/userService";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { FaSignOutAlt, FaBars, FaTimes, FaSignInAlt, FaUserPlus } from "react-icons/fa";

const Navbar = () => {
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    try {
      const response = await logout();
      toast.success(response.data.message);
      setIsAuthorized(false);
      if (isMobileMenuOpen) setIsMobileMenuOpen(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthorized(true);
    }
  };

  const isActivePath = (path) => location.pathname === path;

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-slate-950/95 backdrop-blur-md shadow-xl border-b border-slate-800/50"
        : "bg-slate-950/80 backdrop-blur-sm"
        }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">

          {/* LOGO */}
          <Link
            to="/"
            className="font-bold text-xl bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent whitespace-nowrap"
          >
            HireMeToo
          </Link>

          {/* Desktop - Hidden in Mobile */}
          <ul className="hidden lg:flex items-center gap-6">
            <li>
              <Link
                to="/"
                className={`text-sm font-medium transition-colors relative ${isActivePath("/") ? "text-white" : "text-slate-400 hover:text-white"
                  }`}
              >
                Home
                {isActivePath("/") && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500 to-fuchsia-500"
                  />
                )}
              </Link>
            </li>

            <li>
              <Link
                to="/job/getall"
                className={`text-sm font-medium transition-colors relative ${isActivePath("/job/getall")
                  ? "text-white"
                  : "text-slate-400 hover:text-white"
                  }`}
              >
                All Jobs
                {isActivePath("/job/getall") && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500 to-fuchsia-500"
                  />
                )}
              </Link>
            </li>

            <li>
              <Link
                to="/applications/me"
                className={`text-sm font-medium transition-colors relative ${isActivePath("/applications/me")
                  ? "text-white"
                  : "text-slate-400 hover:text-white"
                  }`}
              >
                {user?.role === "Employer"
                  ? "Applicant's Applications"
                  : "My Applications"}

                {isActivePath("/applications/me") && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500 to-fuchsia-500"
                  />
                )}
              </Link>
            </li>

            {user?.role === "Employer" && (
              <>
                <li>
                  <Link
                    to="/job/post"
                    className={`text-sm font-medium transition-colors relative ${isActivePath("/job/post")
                      ? "text-white"
                      : "text-slate-400 hover:text-white"
                      }`}
                  >
                    Post New Job
                    {isActivePath("/job/post") && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500 to-fuchsia-500"
                      />
                    )}
                  </Link>
                </li>

                <li>
                  <Link
                    to="/job/me"
                    className={`text-sm font-medium transition-colors relative ${isActivePath("/job/me")
                      ? "text-white"
                      : "text-slate-400 hover:text-white"
                      }`}
                  >
                    View Your Jobs
                    {isActivePath("/job/me") && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500 to-fuchsia-500"
                      />
                    )}
                  </Link>
                </li>
              </>
            )}

            {/* Logout Button or Login/Register */}
            {isAuthorized ? (
              <li>
                <button
                  onClick={handleLogout}
                  className="cursor-pointer flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md hover:from-red-600 hover:to-red-700 transition-all"
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              </li>
            ) : (
              <div className="flex items-center gap-4">
                <li>
                  <Link
                    to="/login"
                    className={`text-sm font-medium transition-colors ${isActivePath("/login")
                      ? "text-white"
                      : "text-slate-400 hover:text-white"
                      }`}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="text-sm font-medium bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-violet-500/20 transition-all"
                  >
                    Register
                  </Link>
                </li>
              </div>
            )}
          </ul>

          {/* Mobile Toggle Button */}
          <button
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-md bg-slate-800/50 text-slate-300 hover:text-white hover:bg-slate-800 transition"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-slate-950 border-t border-slate-800"
          >
            <ul className="px-4 py-4 flex flex-col space-y-2 text-sm font-medium text-slate-300">

              {/* HOME */}
              <li>
                <Link
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg ${isActivePath("/")
                    ? "bg-violet-500/20 text-white"
                    : "hover:bg-slate-800/60 hover:text-white"
                    }`}
                >
                  Home
                </Link>
              </li>

              {/* ALL JOBS */}
              <li>
                <Link
                  to="/job/getall"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg ${isActivePath("/job/getall")
                    ? "bg-violet-500/20 text-white"
                    : "hover:bg-slate-800/60 hover:text-white"
                    }`}
                >
                  All Jobs
                </Link>
              </li>

              {/* MY/APPLICANT APPLICATIONS */}
              <li>
                <Link
                  to="/applications/me"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg ${isActivePath("/applications/me")
                    ? "bg-violet-500/20 text-white"
                    : "hover:bg-slate-800/60 hover:text-white"
                    }`}
                >
                  {user?.role === "Employer"
                    ? "Applicant's Applications"
                    : "My Applications"}
                </Link>
              </li>

              {/* EMPLOYER OPTIONS */}
              {user?.role === "Employer" && (
                <>
                  <li>
                    <Link
                      to="/job/post"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block px-4 py-3 rounded-lg ${isActivePath("/job/post")
                        ? "bg-violet-500/20 text-white"
                        : "hover:bg-slate-800/60 hover:text-white"
                        }`}
                    >
                      Post New Job
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/job/me"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block px-4 py-3 rounded-lg ${isActivePath("/job/me")
                        ? "bg-violet-500/20 text-white"
                        : "hover:bg-slate-800/60 hover:text-white"
                        }`}
                    >
                      View Your Jobs
                    </Link>
                  </li>
                </>
              )}

              {/* AUTH ACTIONS Mobile */}
              <li className="pt-3 border-t border-slate-800">
                {isAuthorized ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 font-medium transition"
                  >
                    <FaSignOutAlt />
                    Logout
                  </button>
                ) : (
                  <div className="space-y-2">
                    <Link
                      to="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-slate-800 text-white hover:bg-slate-700 transition font-medium"
                    >
                      <FaSignInAlt />
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white hover:shadow-lg transition font-medium"
                    >
                      <FaUserPlus />
                      Register
                    </Link>
                  </div>
                )}
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;

import React, { useContext } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";

const Footer = () => {
  const { isAuthorized } = useContext(Context);
  if (!isAuthorized) return null;

  return (
    <footer className="bg-slate-950 border-t border-slate-800 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
        © 2024 HireMeToo • Made with <span className="text-red-500">♥</span> by Prateek
      </div>
    </footer>
  );
};
export default Footer;
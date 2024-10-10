import React from "react";
import logo from "../images/logo.png";
import { useLocation, useNavigate } from "react-router-dom";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  function pathMathRoute(route) {
    return location.pathname === route;
  }

  console.log("Current Path:", location.pathname); // Debugging log

  return (
    <div className="bg-[#1e2626]">
      <header className="flex justify-between items-center px-3">
        <div>
          <img
            src={logo}
            alt=""
            className="h-14 ml-6 cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>
        <div>
          <ul className="flex space-x-10 mr-12">
            <li
              className={`py-2 text-white border-b-[3px] border-b-transparent font-semibold text-sm cursor-pointer ${
                pathMathRoute("/") ? "text-white border-b-white" : ""
              }`}
              onClick={() => navigate("/")}
            >
              Home
            </li>
            <li
              className={`py-2 text-white border-b-[3px] border-b-transparent font-semibold text-sm cursor-pointer ${
                pathMathRoute("/offers") ? "text-white border-b-white" : ""
              }`}
              onClick={() => navigate("/offers")}
            >
              Offers
            </li>
            <li
              className={`py-2 border-b-[3px] font-semibold text-sm cursor-pointer ${
                pathMathRoute("/signIn")
                  ? "text-red-500 border-b-red-900"
                  : "text-white border-b-transparent"
              }`}
              onClick={() => navigate("/signIn")}
            >
              Sign In
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}

export default Header;

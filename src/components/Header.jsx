import React, { useState } from "react";
import logo from "../images/logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import { RxDropdownMenu } from "react-icons/rx";
import { FaHome } from "react-icons/fa";
import { MdLocalOffer } from "react-icons/md";
import { PiSignInBold } from "react-icons/pi";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  function pathMathRoute(route) {
    return location.pathname === route;
  }

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className="bg-[#1e2626]">
      <header className="flex justify-between items-center px-3 relative">
        <div>
          <img
            src={logo}
            alt=""
            className="h-14 ml-6 cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>

        {/* Regular Navigation for Small Screens */}
        <nav className="flex sm:hidden">
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
              className={`py-2 text-red-500 border-b-[3px] font-semibold text-sm cursor-pointer ${
                pathMathRoute("/signIn")
                  ? "text-red-500 border-b-red-600"
                  : "text-white border-b-transparent"
              }`}
              onClick={() => navigate("/signIn")}
            >
              Sign In
            </li>
          </ul>
        </nav>

        {/* Dropdown Button for Sm Screens */}
        <div className="hidden sm:flex">
          <button
            onClick={toggleDropdown}
            className="text-white focus:outline-none"
          >
            <RxDropdownMenu className="text-2xl" />
          </button>
          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-4 w-40 bg-[#2e2f41] shadow-lg rounded-md z-10">
              <ul>
                <li
                  className={`py-2 flex flex-row text-white font-semibold text-sm cursor-pointer ${
                    pathMathRoute("/") ? "text-white" : ""
                  }`}
                  onClick={() => {
                    navigate("/");
                    setIsDropdownOpen(false);
                  }}
                >
                  <FaHome className="mx-1" />
                  Home
                </li>

                <li
                  className={`py-2 flex flex-row text-white font-semibold text-sm cursor-pointer ${
                    pathMathRoute("/offers") ? "text-white" : ""
                  }`}
                  onClick={() => {
                    navigate("/offers");
                    setIsDropdownOpen(false);
                  }}
                >
                  <MdLocalOffer className="mx-1" />
                  Offers
                </li>
                <li
                  className={`py-2 flex flex-row text-white font-semibold text-sm cursor-pointer ${
                    pathMathRoute("/signIn") ? "text-red-500" : "text-white"
                  }`}
                  onClick={() => {
                    navigate("/signIn");
                    setIsDropdownOpen(false);
                  }}
                >
                  <PiSignInBold className="mx-1" />
                  Sign In
                </li>
              </ul>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default Header;

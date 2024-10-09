import React from "react";
import logo from "../images/logo.png";
import { useLocation, useNavigate } from "react-router-dom";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  function pathMathRoute(route) {
    if (route === location.pathname) {
      return true;
    }
  }

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
              className={`py-2 text-[#6457F0] border-b-[3px] border-b-transparent font-semibold text-sm cursor-pointer ${
                pathMathRoute("/") && "text-white border-b-violet-900"
              }`}
              onClick={() => navigate("/")}
            >
              Home
            </li>
            <li
              className={`py-2 text-[#6457F0] border-b-[3px] border-b-transparent font-semibold text-sm cursor-pointer ${
                pathMathRoute("/offers") && "text-white border-b-violet-900"
              }`}
              onClick={() => navigate("/offers")}
            >
              Offers
            </li>
            <li
              className={`py-2 text-[#6457F0] border-b-[3px] border-b-transparent font-semibold text-sm cursor-pointer ${
                pathMathRoute("/signIn") && "text-white border-b-violet-900"
              }`}
              onClick={() => navigate("/signIn")}
            >
              SignIn
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}

export default Header;

import React from "react";
import login from "../images/login.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import OAuth from "../components/OAuth";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { toast } from "react-toastify";

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const navigate = useNavigate();

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        toast.success("Sign In Successfully");
        navigate("/");
      }
    } catch (error) {
      toast.error("Bad user credentials");
    }
  }

  return (
    <div className="bg-[#0D1829] min-h-screen flex items-center justify-start overflow-hidden sm:flex-col">
      {/* Image Container */}
      <div className="flex flex-row justify-center items-center w-1/2 sm:w-screen">
        <img
          src={login}
          alt="login"
          className="h-screen w-auto max-w-none sm:h-auto sm:max-w-full object-cover"
        />
      </div>

      {/* Form Container */}
      <div className="flex flex-col justify-center items-center w-1/2 sm:items-center sm:justify-center sm:mt-6">
        <form className="w-full max-w-[400px]" onSubmit={onSubmit}>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={onChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              value={password}
              onChange={onChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />

            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>

            <div className="absolute right-0 bottom-3 pr-2">
              {showPassword ? (
                <AiOutlineEyeInvisible
                  className="text-xl cursor-pointer text-white"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              ) : (
                <AiOutlineEye
                  className="text-xl cursor-pointer text-white"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              )}
            </div>
          </div>

          <button
            className="w-full bg-[#C4A474] mt-4 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-[#F1E0BC] transition duration-150 ease-in-out hover:shadow-lg active:bg-[#C4A474]"
            type="submit"
          >
            Sign in
          </button>
          <div className="flex items-center my-4 before:border-t before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300">
            <p className="text-center text-white font-semibold mx-4">OR</p>
          </div>
          <OAuth />
          <p className="mt-7 text-center">
            <Link
              to="/forgotPassword"
              className="text-sm text-red-500 hover:text-red-900 transition duration-200 ease-in-out"
            >
              Forgot password?
            </Link>
          </p>
          <div className="flex justify-center whitespace-nowrap text-sm sm:text-lg mt-4">
            <p className="text-white sm:mb-5">
              Don't have an account?
              <Link
                to="/signUp"
                className="text-primary hover:text-violet-300 transition duration-200 ease-in-out ml-2"
              >
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;

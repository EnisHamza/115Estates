import React from "react";
import { FcGoogle } from "react-icons/fc";

function OAuth() {
  return (
    <button
      type="button"
      className="flex items-center justify-center w-full bg-violet-900 text-white px-7 py-3 uppercase text-sm font-medium hover:bg-violet-700 active:bg-violet-700 shadow-md hover:shadow-lg active:shadow-lg transition duration-150 ease-in-out rounded"
    >
      <FcGoogle className="text-xl bg-white rounded-full mr-2" />
      Continue with Google
    </button>
  );
}

export default OAuth;

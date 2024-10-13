import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, updateProfile } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import bg from "../images/bg.png";
import { toast } from "react-toastify";
import { db } from "../firebase";

function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [changeDetail, setChangeDetail] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { name, email } = formData;

  function onLogout() {
    auth.signOut();
    navigate("/");
  }

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  async function onSubmit() {
    try {
      if (auth.currentUser.displayName !== name) {
        //update display name in firebase auth
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        // update name in the firestore

        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, {
          name,
        });
      }
      toast.success("Profile details updated");
    } catch (error) {
      toast.error("Could not update the profile details");
    }
  }

  return (
    <div
      className="w-full h-screen"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="p-20 border-4 rounded shadow-lg text-white"
        style={{
          background: "rgba(26, 35, 101, 0.5)", // Semi-transparent background
          backdropFilter: "blur(12px)", // Apply blur
        }}
      >
        <h2 className="flex flex-row justify-center mb-12 text-2xl font-bold">
          My Profile
        </h2>
        <form>
          {/* Name Input */}

          <input
            type="text"
            id="name"
            value={name}
            disabled={!changeDetail}
            onChange={onChange}
            className={`mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out ${
              changeDetail && "bg-red-200 focus:bg-red-200"
            }`}
          />

          {/* Email Input */}

          <input
            type="email"
            id="email"
            value={email}
            disabled
            className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out"
          />

          <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6">
            <p className="flex items-center ">
              Want to change name?
              <span
                onClick={() => {
                  changeDetail && onSubmit();
                  setChangeDetail((prevState) => !prevState);
                }}
                className="text-red-600 hover:text-red-700 font-bold transition ease-in-out duration-200 ml-1 cursor-pointer"
              >
                {changeDetail ? "Apply change" : "Edit"}
              </span>
            </p>
            <p
              onClick={onLogout}
              className="text-amber-400 hover:text-amber-800 font-bold text-base transition duration-200 ease-in-out cursor-pointer"
            >
              Sign Out
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;

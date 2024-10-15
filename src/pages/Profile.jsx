import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAuth, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../firebase.js";

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
    navigate("/signIn");
  }

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    try {
      if (auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, { displayName: name });
        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, { name });
      }
      toast.success("Profile details updated");
    } catch (error) {
      toast.error("Could not update the profile details");
    }
  }

  return (
    <div className="flex items-center justify-center w-full h-screen bg-gradient-to-r from-purple-500 to-blue-600">
      <div className="bg-white bg-opacity-90 p-10 rounded-3xl shadow-2xl text-gray-800 max-w-md w-full">
        <div className="flex flex-col items-center mb-8">
          <img
            src={
              auth.currentUser.photoURL ||
              `https://ui-avatars.com/api/?name=${name}&background=random&color=4960EF`
            }
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-purple-400 shadow-lg mb-4 transform transition-transform duration-300 hover:scale-105"
          />
          <h2 className="text-4xl font-bold text-center">User Profile</h2>
        </div>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-1 text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              disabled={!changeDetail}
              onChange={onChange}
              className={`w-full h-11 px-4 py-3 text-lg rounded-lg border transition duration-200 ease-in-out ${
                changeDetail
                  ? "border-blue-400 bg-white"
                  : "border-gray-300 bg-gray-100"
              }`}
              placeholder="Enter your name"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              disabled
              className="w-full h-11 px-4 py-3 text-lg bg-gray-100 rounded-lg border border-gray-300"
            />
          </div>

          <div className="flex justify-between items-center text-sm">
            <p className="text-gray-600">
              Want to change your name?
              <span
                onClick={() => {
                  changeDetail && onSubmit();
                  setChangeDetail((prevState) => !prevState);
                }}
                className="text-blue-600 hover:text-blue-800 font-semibold cursor-pointer ml-1"
              >
                {changeDetail ? "Apply change" : "Edit"}
              </span>
            </p>
            <p
              onClick={onLogout}
              className="text-red-600 hover:text-red-800 font-semibold cursor-pointer"
            >
              Sign Out
            </p>
          </div>

          <div className="flex justify-between mt-6">
            <Link to="/createListing">
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg shadow transition hover:bg-green-600">
                Add Listing
              </button>
            </Link>
            <Link to="/myListing">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow transition hover:bg-blue-600">
                My Listing
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;

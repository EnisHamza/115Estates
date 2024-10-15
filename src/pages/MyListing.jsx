import React, { useEffect, useState } from "react";
import { db } from "../firebase.js";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import ListingItem from "../components/ListingItem";
import {
  doc,
  collection,
  getDocs,
  deleteDoc,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { toast } from "react-toastify";

function MyListing() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserListings = async () => {
      if (!auth.currentUser) {
        setLoading(false); // No user, just stop loading
        return;
      }

      const listingRef = collection(db, "listings");
      const q = query(
        listingRef,
        where("userRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      );

      try {
        const querySnap = await getDocs(q);
        const listings = querySnap.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        setListings(listings);
      } catch (error) {
        console.error("Error fetching listings: ", error);
        toast.error("Could not fetch listings.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserListings();
  }, [auth.currentUser]);

  async function onDelete(listingID) {
    if (window.confirm("Are you sure you want to delete?")) {
      await deleteDoc(doc(db, "listings", listingID));
      const updatedListings = listings.filter(
        (listing) => listing.id !== listingID
      );
      setListings(updatedListings);
      toast.success("Successfully deleted the listing");
    }
  }
  function onEdit(listingID) {
    navigate(`/editListing/${listingID}`);
  }

  return (
    <div className="max-w-6xl px-3 mx-auto bg-gray-200 p-6 rounded-lg shadow-md sm:w-96 ">
      {!loading && listings.length > 0 ? (
        <>
          <h2 className="text-3xl text-center font-bold mb-6 text-gray-800">
            My Listings
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:flex sm:flex-col sm:w-full">
            {listings.map((listing) => (
              <ListingItem
                key={listing.id}
                id={listing.id}
                listing={listing.data}
                onDelete={() => onDelete(listing.id)}
                onEdit={() => onEdit(listing.id)}
              />
            ))}
          </ul>
        </>
      ) : (
        !loading && (
          <p className="text-center text-gray-600">No listings found.</p>
        )
      )}
    </div>
  );
}

export default MyListing;

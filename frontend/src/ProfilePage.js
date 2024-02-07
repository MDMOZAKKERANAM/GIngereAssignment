import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const location = useLocation();
  const email = location.state.email;
  const navigate = useNavigate();

  const [details, setDetails] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedDetails, setEditedDetails] = useState({});

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/user?email=${email}`
      );
      setDetails(response.data);
      setEditedDetails(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [email]);

  const handleLogout = () => {
    navigate("/login");
  };

  const handleChange = (e) => {
    setEditedDetails({
      ...editedDetails,
      [e.target.name]: e.target.value,
    });
  };

  const toggleEdit = () => {
    if (isEditing) {
      axios
        .put(`http://localhost:5000/user/${details.id}`, editedDetails)
        .then((response) => {
          console.log("User details updated successfully");
          // Re-fetch user details after successful update
          fetchUserData();
        })
        .catch((error) => {
          console.error("Error updating user details:", error.message);
        });
    }
    setIsEditing(!isEditing);
  };

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  if (!details) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-gray-100 rounded-lg">
      <h1 className="text-xl self-center flex justify-center items-center font-bold mb-4">Edit Profile</h1>
      <div>
        {!isEditing ? (
          <div className="flex flex-col   gap-3">


            <p>
              <strong>Name:</strong> {details.name}
            </p>
            <p>
              <strong>College Name:</strong> {details.clgname}
            </p>
            <p>
              <strong>Branch:</strong> {details.branch}
            </p>
            <p>
              <strong>Age:</strong> {details.age}
            </p>
            <p>
              <strong>Date of Birth:</strong> {formatDate(details.dob)}
            </p>
            <p>
              <strong>Contact:</strong> {details.contact}
            </p>
          </div>
        ) : (
          <form>
            <div className=" flex flex-col justify-center items-center gap-3">
              <div>
                <input
                  type="text"
                  name="name"
                  className=" p-2 border-[1px] border-black rounded"
                  value={editedDetails.name}
                  onChange={handleChange}
                /></div>
              <div>
                <input
                  type="text"
                  className=" p-2 border-[1px] border-black rounded"
                  name="collegeName"
                  value={editedDetails.clgname}
                  onChange={handleChange}
                /></div>
              <div>
                <input
                  type="text"
                  name="branch"
                  value={editedDetails.branch}
                  className=" p-2 border-[1px] border-black rounded"
                  onChange={handleChange}
                /></div>
              <div>
                <input
                  type="text"
                  name="age"
                  value={editedDetails.age}
                  className=" p-2 border-[1px] border-black rounded"
                  onChange={handleChange}
                /></div>
              <div>
                <input
                  type="text"
                  name="dob"
                  className=" p-2 border-[1px] border-black rounded"
                  value={formatDate(editedDetails.dob)}
                  onChange={handleChange}
                /></div>
              <div>

                <input
                  type="text"
                  className=" p-2 border-[1px] border-black rounded"
                  name="contact"
                  value={editedDetails.contact}
                  onChange={handleChange}
                /></div></div>
          </form>
        )}
      </div>
      <div className="flex items-center justify-center mt-3 mb-3">
        <button
          className={`bg-${isEditing ? "green" : "blue"}-500 hover:bg-${isEditing ? "green" : "blue"
            }-700 text-white bg-orange-900 font-bold py-2 px-7 rounded focus:outline-none focus:shadow-outline`}
          type="button"
          onClick={toggleEdit}
        >
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>
      <div className="  flex justify-center items-center">
        <button className="  px-8 py-2 bg-[red] text-black font-bold rounded" onClick={handleLogout}>Logout</button>
      </div></div>
  );
};

export default ProfilePage;

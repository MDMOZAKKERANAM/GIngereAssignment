// SignupForm.js
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SignupForm = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [clgname, setClgname] = useState("");
  const [branch, setBranch] = useState("");
  const [age, setAge] = useState("");
  const [dob, setDob] = useState("");
  const [contact, setContact] = useState("");

  const handleSignup = async () => {
    try {
      const response = await axios.post("http://localhost:5000/signup", {
        email,
        password,
        name,
        clgname,
        branch,
        age,
        dob,
        contact,
      });
      console.log("Signup successful");
      setEmail("");
      setPassword("");
      setName("");
      setClgname("");
      setAge("");
      setDob("");
      setContact("");
      setBranch("");
    } catch (error) {
      console.error("Signup failed:", error.message);
    }
  };

  return (
    <>
      <div className=" flex flex-col justify-center items-center   ">
        <div className="mt-10 mb-4 flex flex-col justify-center items-center">
        <p className=" text-2xl text-[#f54c0a]  font-bold text-center ">Welcome to Ginger Media Group</p>
        <h2 className=" text-2xl text-amber-500  ">Registration Page</h2></div>
        <div className=" flex justify-center items-center">
          <form>
            <div className=" ">
              <div className="flex sm:flex-row flex-col justify-center items-center gap-6 mb-2">
              <div className=" flex flex-col ">
                <label className=" mb-1 ">Name:</label>
                <div className="p-2 border-[1px] border-[black] rounded-[5px] w-60 ">
                <input className=" focus:outline-none "
                  type="text"
                  value={name}
                  placeholder="Enter Name"
                  onChange={(e) => setName(e.target.value)}
                /></div>
              </div>
              <div className=" flex flex-col ">
                <label className="mb-1">College Name:</label>
                <div className="p-2 border-[1px] border-[black] rounded-[5px] w-60 ">
                <input className=" focus:outline-none "
                  type="text"
                  value={clgname}
                  placeholder="Enter College Name"
                  onChange={(e) => setClgname(e.target.value)}
                /></div>
              </div>
              </div>
              <div className="flex sm:flex-row flex-col justify-center items-center gap-6 mb-2">
              <div className=" flex flex-col ">
                <label className="mb-1">Branch:</label>
                <div className="p-2 border-[1px] border-[black] rounded-[5px] w-60 ">
                <input className=" focus:outline-none "
                  type="text"
                  value={branch}
                  placeholder="Enter Branch"
                  onChange={(e) => setBranch(e.target.value)}
                /></div>
              </div>
              <div className=" flex flex-col ">
                <label className=" mb-1">Email:</label>
                <div className="p-2 border-[1px] border-[black] rounded-[5px] w-60 ">
                <input className=" focus:outline-none "
                  type="email"
                  value={email}
                  placeholder="Enter Email"
                  onChange={(e) => setEmail(e.target.value)}
                /></div>
              </div>
              </div>

              <div className="flex sm:flex-row flex-col justify-center items-center gap-6 mb-2">
              <div className=" flex flex-col ">
                <label className="mb-1">Password:</label>
                <div className="p-2 border-[1px] border-[black] rounded-[5px] w-60 ">
                <input className=" focus:outline-none "
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                /></div>
              </div>
              <div className=" flex flex-col ">
                <label className="mb-1">Age:</label>
                <div className="p-2 border-[1px] border-[black] rounded-[5px] w-60 ">
                <input className=" focus:outline-none "
                  type="tel"
                  placeholder="Enter Age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                /></div>
              </div>
              </div>

              <div className="flex sm:flex-row flex-col justify-center items-center gap-6 mb-2">
              <div className=" flex flex-col ">
                <label className="mb-1">Date of birth:</label>
                <div className="p-2 border-[1px] border-[black] rounded-[5px] w-60 ">
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                /></div>
              </div>
              <div className=" flex flex-col ">
                <label className="mb-1">Contact:</label>
                <div className="p-2 border-[1px] border-[black] rounded-[5px] w-60 ">
                <input className=" focus:outline-none "
                  type="text"
                  value={contact}
                  placeholder="Enter Phone Number"
                  onChange={(e) => setContact(e.target.value)}
                /></div>
              </div>
              </div>
            </div>
            <div>
<div className="flex justify-center items-center mt-6">
              <button type="button" className=" px-16 rounded-[10px] py-3 bg-lime-500 text-[#FFF] " onClick={handleSignup}>
                Register
              </button>
              </div>
            </div>

            <div className=" flex justify-center items-center mt-4 ">
              <span className=" text-[16px] text-[#000] font-bold ">If already registered?</span>
              <Link to="/login" className="font-bold underline text-[#34a8eb] text-[19px]">Login</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignupForm;

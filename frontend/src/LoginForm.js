import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      console.log("Login successful");
      navigate("/profile", { state: { email } });
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  return (
    <div className=" flex justify-center items-center mt-10 mb-4">
     
      <form>
<div className="gap-4 flex flex-col justify-center  items-center">
<h2 className=" text-2xl text-amber-500">Login here!</h2> 
        <div>
        <label className=" mb-1">Email:</label>
        <div className="p-2 border-[1px] border-[black] rounded-[5px] w-60 ">
        <input className=" focus:outline-none "
          type="email"
          value={email}
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
        /></div></div>

        <div>
        <label className=" mb-1">Password:</label>
        <div className="p-2 border-[1px] border-[black] rounded-[5px] w-60 ">
        <input className=" focus:outline-none "
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /></div>
        </div>
        <div>


        <div className="flex justify-center items-center mt-6">
              <button type="button" className=" px-16 rounded-[10px] py-3 bg-lime-500 text-[#FFF] " onClick={handleLogin}>
                Login
              </button>
              </div>
      </div>
        <div className=" flex justify-center items-center mt-3 ">
              <span className=" text-[16px] text-[#000] font-bold ">If don't have an account?</span>
              <Link to="/" className="font-bold underline text-[#34a8eb] text-[19px]">Register</Link>
            </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;

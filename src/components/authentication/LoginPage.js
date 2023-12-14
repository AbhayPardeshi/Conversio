import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/auth/AuthProvider";
const LoginPage = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { loginHandler } = useAuth();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      email,
      password,
    };

    loginHandler(data);
 
    setEmail("");
    setPassword("");
  };

  return (
    <div className="h-screen flex ">
      <div className="flex-1 overflow-hidden">
        <img
          src="https://cdn.dribbble.com/users/2329333/screenshots/9291756/media/8323473b3e37df82514c281a506ecf31.png?resize=450x338&vertical=center"
          alt="logo"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 p-[20px] bg-[#f4f4f4] flex flex-col justify-center items-center box-border">
        <div className="w-[350px] h-[350px] bg-white p-2 items-center flex flex-col gap-4">
          <div className="flex items-center flex-col">
            <p className="font-bold text-gray-900 text-[1.5rem]">Login</p>
            <div className="w-[5rem] border-blue-500 border-b-2 mt-1 rounded-xl"></div>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col w-[250px]">
           
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              className="border-bottom-2 border-gray-400 p-2 border-b-2 outline-none text-sm"
              required
            />
            <br />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              className="border-bottom- border-gray-400 p-2 border-b-2 outline-none text-sm"
              required
            />
            <br />
            <button
              type="submit"
              className="bg-blue-600 text-white rounded-2xl px-1 py-1 text-[0.85rem] uppercase w-[100px] mx-auto"
            >
              Login
            </button>
          </form>
          <p>{message}</p>
          <p>
            Haven't registered yet?{" "}
            <Link
              to="/signin"
              className="text-cyan-800 hover:text-blue-600 hover:underline"
            >
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

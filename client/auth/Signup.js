import React, { useEffect, useState } from "react";
import { LockClosedIcon } from "@heroicons/react/solid";
import { Redirect, Link, useHistory, useLocation } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../views/action/userAction";

export default function Signup(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [values, setValues] = useState({
    user_email: undefined,
    user_password: undefined,
    user_name: undefined,
    user_type: "user",
  });
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const userSingup = useSelector((state) => state.userSignup);
  const { userRegis } = userSingup;

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(signup(values));
  };

  useEffect(() => {
    if (userRegis) {
      const redirect = location.search
        ? new URLSearchParams(location.search).get("redirect")
        : "/talent/login";
      history.push(redirect);
    }
  }, [userRegis, history]);

  return (
    <>
      <Navbar />

      


      <section class="flex flex-col md:flex-row h-screen items-center">
        <div class="bg-indigo-600 items-stretch hidden lg:block w-full  h-screen">
          <img
            src="https://i.pinimg.com/originals/73/b9/35/73b93579f24cc0196cf25d07e5102784.gif"
            alt=""
            class="w-full  object-cover"
          />
        

        <div class="bg-white w-full absolute bg-opacity-0 top-20 right-10  md:w-1/2 xl:px-28 z-10">
          <div class="w-full h-full ">
            <h1 class="text-xl md:text-2xl  text-white font-bold leading-tight ">
              Register Now !
            </h1>

            <form class="mt-6">
            {values.error && (
              <p class="text-red text-lg italic">{values.error}</p>
            )}
              <label class="block text-white">Email Address</label>
            <input
              name="user_email"
              id="user_email"
              placeholder="Enter Email Address"
              class="w-full px-4 py-3 bg-opacity-90 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
              value={values.email}
              autofocus
              autocomplete
              required
              onChange={handleChange("user_email")}
            />
             <label class="block text-white">Password</label>
            <input
            type="password"
            name="user_password"
            id="user_password"
            placeholder="Enter Password"
            minlength="6"
              class="w-full px-4 py-3 bg-opacity-90 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
              autofocus
              autocomplete
              required
              onChange={handleChange("user_password")}
            />

            <label class="block text-white">User Name</label>
            <input
              type="text"
              placeholder=" Enter User Name"
              class="w-full px-4 py-3 bg-opacity-90 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
              autofocus
              autocomplete
              required
              onChange={handleChange("user_name")}
            />
            <button
              class="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
              px-4 py-3 mt-6"
              onClick={onSubmit}
            >
         Register
            </button>
           
            
           
          </form>
           
          
          </div>
        </div>
        </div>
      </section>
    </>
    
  );
}

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../views/action/userAction"
import { useHistory, useLocation, Link } from "react-router-dom";
export default function userLogin() {
    const [values, setValues] = useState({
        user_email: "",
        user_password: "",
        error: false,
    });

    const history = useHistory();
    const location = useLocation();

    const dispatch = useDispatch();

    const handleChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value });
    };

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    useEffect(() => {
        if (userInfo) {
            const redirect = location.search
                ? new URLSearchParams(location.search).get("redirect")
                : "/talent/list";
            if (userInfo.users.user_type === "admin") {
                history.push(redirect);
            }
            else {
                history.push("/talent/");
            }
        }
    }, [userInfo, history])

    const onSubmit = (e) => {
        e.preventDefault();

        if (values.user_email && values.user_password) {
            dispatch(signin(values.user_email, values.user_password));
        }
    };

 
  return (
    
    <>
    

   
     <section class="flex flex-col md:flex-row h-screen items-center">
        <div class="bg-indigo-600 items-stretch hidden lg:block w-full  h-screen">
          <img
            src="https://img2.pngdownload.id/20180404/raq/kisspng-star-blue-desktop-wallpaper-drawing-white-white-stars-5ac4f6597195f8.6409907315228575614653.jpg"
            alt=""
            class="h-100v" style={{width: "100%"}}
          />
        

        <div class="bg-white w-full absolute bg-opacity-0 top-20 right-10  md:w-1/2 xl:px-28 z-10">
          <div class="w-full h-full ">
            <h1 class="text-xl md:text-2xl  text-blue-500 font-bold leading-tight ">
              Log in to your account
            </h1>

            <form method="POST" action="#" class="mt-6" onSubmit={onSubmit}>
              <div>
                <label class="block text-black">Email Address</label>
                <input onChange={handleChange("user_email")}
                  type="email"
                  name="user_email"
                  id="user_email"
                  placeholder="Enter Email Address"
                  class="w-full px-4 py-3 bg-opacity-90 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  // autofocus
                  autocomplete
                  required
                />
              </div>

              <div class="mt-4">
                <label class="block text-black">Password</label>
                <input onChange={handleChange("user_password")}
                  type="password"
                  name="user_password"
                  id="user_password"
                  placeholder="Enter Password"
                  minlength="6"
                  class="w-full px-4 py-3 bg-opacity-90 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                focus:bg-white focus:outline-none"
                  required
                />
              </div>

              

              <button
                type="submit"
                class="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
              px-4 py-3 mt-6"
              >
                Log In
              </button>
            </form>

            <p class="mt-8 text-black">
             <Link to="/talent/register/">
             Create Account Here!
             </Link>
            </p>
          </div>
        </div>
        </div>
      </section>
    
    </>
  );
}

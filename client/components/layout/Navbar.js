import { Link, useLocation } from "react-router-dom";
import React from "react";


export default function Navbar() {
  const location = useLocation();

  const redirect = location.search
    ? new URLSearchParams(location.search).get("redirect")
    : "/talent/login/";

  const onSubmit = () => {
    localStorage.clear();
    window.location = redirect;
  };
  return (
    <nav class=" fixed w-full top-0 z-50  ">
      <div class="container  px-6 py-4  md:flex md:justify-between md:items-center ">
        <div class="flex items-center justify-between">
        <div class="container ml-0  ">
          <a
            class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
            href="/talent/"
            target="_blank"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              class="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
           
          </a>
         
        
        </div>

          <div class="flex md:hidden">
            <button
              type="button"
              class="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
              aria-label="toggle menu"
            >
              <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
                <path
                  fill-rule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        <div class="items-center md:flex">
          <div class="flex flex-col md:flex-row md:mx-5">

            <Link to="/talent/news/">
              <div class="my-1 text-sm font-medium text-red-600 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400 md:mx-4 md:my-0">
                NEWS
              </div>
            </Link>

            <Link to="/talent/">
              <div class="my-1 text-sm font-medium text-red-600 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400 md:mx-4 md:my-0">
                TALENTS
              </div>
            </Link>

            <Link to="/talent/login/">
              <div
                hidden={
                  typeof window != "undefined" &&
                  localStorage.getItem("userInfo")
                    ? true
                    : false
                }
                class="my-1 text-sm font-medium text-red-600 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400 md:mx-4 md:my-0"
              >
                LOGIN
              </div>
            </Link>

            <Link to="/talent/userdetail/">
              <div
                hidden={
                  typeof window != "undefined" &&
                  localStorage.getItem("userInfo")
                    ? false
                    : true
                }
                class="my-1 text-sm font-medium text-red-600 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400 md:mx-4 md:my-0"
              >
               PROFILE
              </div>
            </Link>

            <div
              hidden={
                typeof window != "undefined" && localStorage.getItem("userInfo")
                  ? false
                  : true
              }
              class="my-1 text-sm font-medium text-red-600 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400 md:mx-4 md:my-0"
              onClick={onSubmit}
            >
              SIGNOUT
            </div>

          {/*   <Link to="/talent/list/">
              <div class="my-1 text-sm font-medium text-red-600 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400 md:mx-4 md:my-0">
                DASHBOARD
              </div>
            </Link> */}
          </div>

          <div class="flex justify-center md:block">
            <Link to="/talent/cart">
              <svg
                class="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

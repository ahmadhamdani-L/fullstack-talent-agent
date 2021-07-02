import React from 'react'
import { Link, useHistory, useLocation } from "react-router-dom";





export default function Sidebar() {

    return (
        <>
           
                {/* <div className="p-4">
                    <img src={codeid} className="h-12 w-12" />
                </div>
                <ul className="p-2 space-y-2 flex-1 overflow-auto" >
                    <li>
                        <Link to="/talent/dashboard" className="flex space-x-2 items-center text-gray-600 p-2 bg-gray-200 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            <span className="text-gray-900">Dashboard</span>
                        </Link>
                    </li>
                  
                 
                   
                    
                    <li>
                        <Link to="/talent/list" className="flex space-x-2 items-center text-gray-600 p-2 hover:bg-gray-200 rounded-lg hover:text-gray-900">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                            </svg>
                            <span>Talents</span>
                        </Link>
                    </li>

                </ul>

                <div className="p-2 flex items-center border-t-2 border-gray-300 space-x-4">
                    <div className="relative inline-flex">
                        <span className="inline-flex bg-red-500 w-2 h-2 absolute right-0 bottom-0 rounded-full ring-2 ring-white transform translate-x-1/3 translate-y-1/3"></span>
                        <img className='w-8 h-8 object-cover rounded-full' alt='User avatar' src='https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=200' />
                    </div>
                    <div>
                        <h3 className="font-semibold tracking-wide text-gray-800">
                        @LelouchL
                        </h3>
                        <p className="text-sm text-gray-700">
                            about
                        </p>
                    </div>
                </div> */}


<div class="md:flex pt-0 flex-col md:flex-row md:min-h-screen w-full pt-32">
  <div  class="flex flex-col w-full md:w-64 text-gray-700 bg-white dark-mode:text-gray-200 dark-mode:bg-gray-800 flex-shrink-0" x-data="{ open: false }">
    <div class="flex-shrink-0  flex flex-row items-center justify-between">
     
      <button class="rounded-lg md:hidden rounded-lg focus:outline-none focus:shadow-outline" >
        <svg fill="currentColor" viewBox="0 0 20 20" class="w-6 h-6">
          <path x-show="!open" fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z" clip-rule="evenodd"></path>
          <path x-show="open" fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
        </svg>
      </button>
    </div>
    <div class="flex-grow md:block px-4 pb-4 md:pb-0 md:overflow-y-auto">
   
   
      <Link to="/talent/list" >
      <a class="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="/list">Talents List</a>
      </Link>
     
    </div>
  </div>
</div>
            

        </>
    )
}
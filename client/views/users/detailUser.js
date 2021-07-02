import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { findOneUser } from "../action/userAction";

import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import { listOrder } from "../action/orderAction";
import Navbar from "../../components/layout/Navbar";

export default function userDetail() {
  const dispatch = useDispatch();
  const userListOne = useSelector((state) => state.userListOne);
  const { user } = userListOne;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const orderList = useSelector((state) => state.orderList);
  const { order } = orderList;
  useEffect(() => {
    dispatch(findOneUser(userInfo.users.user_id));
  }, [dispatch]);
  useEffect(() => {
    dispatch(listOrder(userInfo.users.user_id));
  }, [dispatch]);

  return (
    <>
    <Navbar/>
    <div>
      <body class="bg-grey-lighter mt-8 pt-20">
        <div class="container mx-auto">
          <div class="flex">
         
            {user && (
              <div class="flex-1">
                 <h1 className="text-center 3xl text-black font-bold pb-1 lg:pt-0">
                Avatar
              </h1>
                <div class="bg-white shadow mr-8">
                  <div class="px-6 py-6 pb-0 border-t-4 border-green">
                    <img
                      src={
                        `/api/auth/photo/` +
                        user.user_id +
                        `/` +
                        user.user_avatar
                      }
                      height="200"
                      class="rounded-full mx-auto block mb-3 -mt-6 shadow-md"
                    />
                  </div>
                </div>
              </div>
            )}
            {user && (
              <div class="flex-1">
                {" "}
                <div className="col-span-3 sm:col-span-3 pt-0">
                  <h1 className="text-center 3xl text-black font-bold pb-1 lg:pt-0">
                    Profile
                  </h1>

                  <div class=" text-xl mb-2"> {user.user_name}</div>
                  <div class=" text-grey-dark mb-6">
                    {user.user_birthdate} 
                  </div>

                  <div class=" text-grey-dark mb-6">
                    {user.user_gender} 
                  </div>

                  <div class="border-1 border-grey-light mb-4 mx-8"></div>
                  <div class="text-grey-darker mb-4">
                    Semoga Hari mu menyenangkan {user.user_name}
                  </div>
                  <div class="border border-grey-light mb-2 mx-8"></div>
                  <Link to="/talent/userupdate/">
                    <button class="text-center bg-white hover:bg-indigo-700 hover:text-white text-gray-500 font-bold py-2 px-4 rounded-full">
                      Update Profile
                    </button>
                  </Link>
                </div>
              </div>
            )}
            <div class="flex-1">
              <h1 className="text-center 3xl text-black font-bold pb-1 lg:pt-0">
                History Order
              </h1>
              {order &&
                order.map((row, index) => {
                  return (
                    <tr key={index}>
                      <div className="w-full mx-auto bg-white rounded-2xl">
                        <Disclosure as="div" className="mt-2">
                          {({ open }) => (
                            <>
                              <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                <span>{row.order_id}</span>
                                <ChevronUpIcon
                                  className={`${
                                    open ? "transform rotate-180" : ""
                                  } w-5 h-5 text-purple-500`}
                                />
                              </Disclosure.Button>
                              <Disclosure.Panel className="text-sm text-gray-500 p-3">
                                <div class="border rounded-lg border-dashed py-5 border-3 bg-indigo-500">
                                  <div class="p-3">
                                    <div class="flex flex-row items-center">
                                      {" "}
                                      <h5 class="text-white">Invoice</h5>
                                      <span class="text-white pl-10 text-lg font-bold">
                                        {row.order_payt_trx_number}
                                      </span>
                                    </div>
                                  </div>
                                  <div class="flex w-full mt-3 mb-3">
                                    {" "}
                                    <span class="border border-dashed w-full border-white"></span>{" "}
                                  </div>
                                  <div class="p-3 space-y-5">
                                    <div class="flex flex-row items-center">
                                      {" "}
                                      <h5 class="text-gray-200">
                                        ID Order
                                      </h5>{" "}
                                      <span class="text-white pl-7 text-lg font-bold">
                                        #{row.order_name}
                                      </span>{" "}
                                    </div>
                                    <div class="flex flex-row items-center">
                                      {" "}
                                      <h5 class="text-gray-200">
                                        Order Date
                                      </h5>{" "}
                                      <span class="text-white pl-3.5 text-lg font-bold">
                                        {new Date(
                                          row.order_created_on
                                        ).toLocaleDateString("en-US")}
                                      </span>{" "}
                                    </div>
                                    <div class="flex flex-row items-center">
                                      {" "}
                                      <h5 class="text-gray-200">
                                        Total Order
                                      </h5>{" "}
                                      <span class="text-white pl-3.5 text-lg font-bold">
                                        Rp.{" "}
                                        {new Intl.NumberFormat("en-US", {
                                          style: "decimal",
                                        }).format(row.order_total_due)}
                                      </span>{" "}
                                    </div>
                                  </div>
                                </div>
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      </div>
                    </tr>
                  );
                })}
            </div>
          </div>
        </div>
      </body>
      <div className=" grid grid-cols-12 gap-2">
       
      </div>
    </div>
    </>
  );
}

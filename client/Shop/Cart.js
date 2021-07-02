import React, { useState, useEffect } from "react";

import { listTalent } from "../views/action/talentAction";
import { listOneCart } from "../views/action/tacaAction";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ApiTalents from "../views/talents/ApiTalents";

export default function findallcart({ match }) {
  const dispatch = useDispatch();
  const tacaListOne = useSelector((state) => state.tacaListOne);
  const { taca } = tacaListOne;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const talentList = useSelector((state) => state.talentList);
  const { talent } = talentList;
  useEffect(() => {
    if (userInfo) {
      dispatch(listOneCart(userInfo.users.user_id));
    }
  }, [dispatch]);
  useEffect(() => {
    dispatch(listTalent());
  }, [dispatch]);

  const onDelete = async (id) => {
    ApiTalents.removelite(id).then((result) => {
      setStatus(true);
    });
  };

  return (
    <>
      <body>
        <div class="container mx-auto mt-10">
          <div class="flex shadow-md my-10">
            <div class="w-3/4 bg-red px-10 py-10">
              <div class="flex justify-between border-b pb-8">
                <h2 class="font-semibold text-2xl">TALENTS</h2>
              </div>
              <div class="flex mt-10 mb-5">
                <h3 class="font-semibold text-gray-600 text-xs uppercase w-2/5">
                  Talents Details
                </h3>
                <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                  Days
                </h3>
                <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                  Price
                </h3>
                <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                  Total
                </h3>
              </div>

              {taca &&
                taca.lite_items.map((row, index) => {
                  const item =
                    talent &&
                    talent.find((x) => x.tale_id === row.lite_tale_id);
                  return (
                    <div key={index}>
                      <div class="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                        <div class="flex w-2/5">
                          <div class="w-20">
                            <img
                              src={
                                item &&
                                `/api/talents/photo/` + item.tale_profile
                              }
                              class="w-20 rounded"
                              alt="Thumbnail"
                            />
                          </div>
                          <div class="flex flex-col justify-between ml-4 flex-grow">
                            <span class="font-bold text-sm">
                              {item && item.tale_fullname}
                            </span>
                            <span class="text-red-500 text-xs">
                              {item && item.tale_nationality}
                            </span>
                            <button
                              onClick={() => {
                                if (window.confirm("Delete this record ?"))
                                  onDelete(row.lite_id);
                                window.location = "/talent/cart";
                              }}
                              type="button"
                              className="bg-red-500 p-2 text-white hover:shadow-lg text-xs font-thin "
                            >
                              Remove
                            </button>
                          </div>
                        </div>

                        <div class="flex justify-center w-1/5">
                          <span class="font-bold text-center text-sm">
                            {parseInt(row.lite_days)}
                          </span>
                        </div>

                        <span class="text-center w-1/5 font-semibold text-sm">
                          {new Intl.NumberFormat("en-US", {
                            style: "decimal",
                          }).format(parseInt(item && item.tale_price))}
                        </span>
                        <span class="text-center w-1/5 font-semibold text-sm">
                          {new Intl.NumberFormat("en-US", {
                            style: "decimal",
                          }).format(parseInt(row.price))}
                        </span>
                      </div>
                    </div>
                  );
                })}

              <a
                href="/talent/"
                class="flex font-semibold text-indigo-600 text-sm mt-10"
              >
                <svg
                  class="fill-current mr-2 text-indigo-600 w-4"
                  viewBox="0 0 448 512"
                >
                  <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                </svg>
                Continue Hire
              </a>
            </div>

            <div id="summary" class="w-1/4 px-8 py-10">
              <h2 class="font-semibold text-2xl border-b pb-8">
                PROSES TO CHECKOUT
              </h2>

              <div class=" mt-8">
                <Link to="/talent/checkout/">
                  <button className="flex justify-center w-full px-10 py-3 mt-6 font-medium text-white uppercase bg-blue-500 rounded-full shadow item-center hover:bg-gray-700 focus:shadow-outline focus:outline-none">
                    <svg
                      aria-hidden="true"
                      data-prefix="far"
                      data-icon="credit-card"
                      className="w-8"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                    >
                      <path
                        fill="currentColor"
                        d="M527.9 32H48.1C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48.1 48h479.8c26.6 0 48.1-21.5 48.1-48V80c0-26.5-21.5-48-48.1-48zM54.1 80h467.8c3.3 0 6 2.7 6 6v42H48.1V86c0-3.3 2.7-6 6-6zm467.8 352H54.1c-3.3 0-6-2.7-6-6V256h479.8v170c0 3.3-2.7 6-6 6zM192 332v40c0 6.6-5.4 12-12 12h-72c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h72c6.6 0 12 5.4 12 12zm192 0v40c0 6.6-5.4 12-12 12H236c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h136c6.6 0 12 5.4 12 12z"
                      />
                    </svg>
                    <span className="ml-2 mt-5px">Checkout</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </body>
    </>
  );
}

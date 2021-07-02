import React, { useEffect, useState } from "react";
import { listOneOrder } from "../views/action/orderAction";
import { listTalent } from "../views/action/talentAction";
import { useDispatch, useSelector } from "react-redux";
import ButtonBayar from "../views/ButtonBayar";
import { useHistory, useLocation, Link } from "react-router-dom";
import { listOneCart } from "../views/action/tacaAction";
import { orderCancel } from "../views/action/shopAction";
import { listOneUser } from "../views/action/userAction";
import { orderUpdate } from "../views/action/shopAction";

export default function order() {
  const dispatch = useDispatch();
  const history = useHistory();
  const orderListOne = useSelector((state) => state.orderListOne);
  const { order } = orderListOne;
  const userListOne = useSelector((state) => state.userListOne);
  const { user } = userListOne;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const talentList = useSelector((state) => state.talentList);
  const { talent } = talentList;
  const orderCreate = useSelector((state) => state.orderCreate);
  const { error } = orderCreate;
  const { orderRegis } = useSelector((state) => state.orderCreate);
  const [bayar, setBayar] = useState("");

  const tacaListOne = useSelector((state) => state.tacaListOne);
  const { taca } = tacaListOne;

  useEffect(() => {
    if (orderRegis) {
      dispatch(listOneOrder(orderRegis.order_id));
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(listTalent());
  }, [dispatch]);

  if (bayar) {
    const data = {
      user_id: parseInt(userInfo.users.user_id),
      order_payt_trx_number: bayar.payt_trx_number,
    };
    console.log(data);
    dispatch(orderUpdate(data));
    window.location = "/talent/userdetail/";
  }
  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      user_id: parseInt(userInfo.users.user_id),
    };

    dispatch(orderCancel(data)).then((result) => {
      history.push("/talent/cart");
    });
  };
  return (
    <div className="flex justify-center my-6">
      <div className="flex flex-col w-full p-8 text-gray-800 bg-white shadow-lg pin-r pin-y md:w-4/5 lg:w-4/5">
        <div className="flex-1">
          <table className="w-full text-sm lg:text-base" cellSpacing="0">
            <thead>
              <tr className="pb-9 uppercase">
                <th className="hidden md:table-cell"></th>
                <th className="text-left">Talent</th>
                <th className="text-right">Days</th>
                <th className="hidden text-right md:table-cell">
                  Talent price
                </th>
                <th className="text-right">Total price</th>
              </tr>
            </thead>
            <tbody>
              {taca &&
                taca.lite_items.map((row, index) => {
                  const item =
                    talent &&
                    talent.find((x) => x.tale_id === row.lite_tale_id);
                  return (
                    <tr key={index}>
                      <td className="hidden pb-4 md:table-cell">
                        <img
                          src={
                            item && `/api/talents/photo/` + item.tale_profile
                          }
                          className="h-20 w-10 rounded"
                          alt="Thumbnail"
                        />
                      </td>
                      <td>
                        <a href="#">
                          <p className="mb-2 md:ml-4">
                            {item && item.tale_fullname}
                          </p>
                        </a>
                      </td>
                      <td className="justify-center md:justify-end md:flex mt-4">
                        <div className="w-20 h-10">
                          <div className="relative flex flex-row w-full h-8">
                            <p className="w-full font-semibold text-center text-gray-700 outline-none focus:outline-none hover:text-black focus:text-black">
                              {row.lite_days}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="hidden text-right md:table-cell">
                        <span className="text-sm lg:text-base font-medium">
                          {new Intl.NumberFormat("en-US", {
                            style: "decimal",
                          }).format(item && item.tale_price)}
                        </span>
                      </td>
                      <td className="text-right">
                        <span className="text-sm lg:text-base font-medium">
                          {new Intl.NumberFormat("en-US", {
                            style: "decimal",
                          }).format(row.price)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <div className="flex my-4 mt-6 -mx-2">
            <button
              onClick={onSubmit}
              className={
                " flex justify-center w-full px-5 py-3 mt-6 font-medium text-white uppercase bg-gray-800 rounded-full shadow item-center hover:bg-gray-700 focus:shadow-outline focus:outline-none " +
                (order && order.lite_items)
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="ml-2 mt-1px">Cancel Order</span>
            </button>
          </div>

          {order && (
            <div class="my-4 mt-6 -mx-2 lg:flex">
              <div class="lg:px-2 lg:w-1/2">
                <div class="p-4 bg-gray-100 rounded-full">
                  <h1 class="ml-2 font-bold uppercase">Your contact details</h1>
                </div>
                <div class="p-4">
                  <span class="font-bold capitalize">
                    {" "}
                    Name : {userInfo.users.user_name}
                  </span>
                  <br />
                  <span class="font-bold capitalize">
                    {" "}
                    Email : {userInfo.users.user_email}
                  </span>
                </div>
                <div class="p-4 bg-gray-100 rounded-full">
                  <h1 class="ml-2 font-bold uppercase">Your address</h1>
                </div>
                <div class="p-4">
                  <span class="font-bold capitalize">
                    {" "}
                    City : {order.order_city}
                  </span>
                  <br/>
                </div>
                <div class="p-4 bg-gray-100 rounded-full">
                  <h1 class="ml-2 font-bold uppercase">Days </h1>
                </div>
                <div class="p-4">
                  <span class="font-bold capitalize">
                    {" "}
                    Start Date: {order.order_start_date}
                  </span>
                  <br />
                  <span class="font-bold capitalize">
                    {" "}
                    end Date: {order.order_end_date}
                  </span>
                  <br />
                </div>
              </div>
              <div class="lg:px-2 lg:w-1/2">
                <div class="p-4 bg-gray-100 rounded-full">
                  <h1 class="ml-2 font-bold uppercase">Order Details</h1>
                </div>
                <div class="p-4">
                  <p class="mb-6 italic">
                    Shipping and additionnal costs are calculated based on
                    values you have entered
                  </p>
                

                  <div class="flex justify-between border-b">
                    <div class="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                      ID ORDER
                    </div>
                    <div class="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                    
                       
                    {order.order_id}
                    </div>
                  </div>

                  <div class="flex justify-between pt-4 border-b">
                    <div class="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                      Discount
                    </div>
                    <div class="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                      {new Intl.NumberFormat("en-US", {
                        style: "decimal",
                      }).format(order.order_discount)}
                    </div>
                  </div>
                  <div class="flex justify-between pt-4 border-b">
                    <div class="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                      Tax
                    </div>
                    <div class="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                      {new Intl.NumberFormat("en-US", {
                        style: "decimal",
                      }).format(order.order_tax)}
                    </div>
                  </div>
                  <div class="flex justify-between pt-4 border-b">
                    <div class="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                      Total
                    </div>
                    <div class="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                      {new Intl.NumberFormat("en-US", {
                        style: "decimal",
                      }).format(order.order_total_due)}
                    </div>
                  </div>
                  <div class="px-10 py-3 mt-6">
                    <ButtonBayar
                      amount={order.order_total_due}
                      orderNumber={order.order_id}
                      onSuccess={setBayar}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

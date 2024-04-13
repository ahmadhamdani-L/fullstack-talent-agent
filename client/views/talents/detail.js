import React, { useState, useEffect } from "react";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { useDispatch, useSelector } from "react-redux";
import { listoneTalent } from "../action/talentAction";
import { liteInput } from "../action/shopAction";
import { useHistory, Link } from "react-router-dom";
import ApiTalents from "./ApiTalents";
import ApiTalent from "./ApiTalent";
import auth from "../../auth/AuthHelper"
export default function detail({ match }) {
  const dispatch = useDispatch();
  const talentListOne = useSelector((state) => state.talentListOne);
  const { talent } = talentListOne;
  const history = useHistory();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const [values, setValues] = useState({
    user_id: undefined,
    tale_id: undefined,
    lite_days: 1,
  });

  const handleOnChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const onSubmit = (e) => {
    if (auth.isAuthenticated()) {
    e.preventDefault();
    const data = {
      user_id: parseInt(userInfo.users.user_id),
      tale_id: parseInt(talent.tale_id),
      lite_days: parseInt(values.lite_days),
    }   
     
    dispatch(liteInput(data)).then((result) => {
      history.push("/talent/cart/");
    });
  }else {
    history.push("/talent/login")
  }}
  useEffect(() => {
    dispatch(listoneTalent(match.params.id));
  }, [dispatch]);

  const [talents, setTalents] = useState([]);
  const [talentimage, setTalentImage] = useState([]);

  useEffect(() => {
    ApiTalent.findOne(match.params.id).then((data) => {
      setTalents(data);
    }),
      ApiTalents.findOne(match.params.id).then((data) => {
        setTalentImage(data);
      });
  }, []);
  if (talentimage) {
    console.log(talentimage);
  }

  return (
    <>
    <Navbar/>
      {talent && (
        <section className="text-gray-700 body-font overflow-hidden bg-white pt-20">
          <div className="container flex flex-row ">
            <div className="lg:w-4/5 ml-5 mt-5 flex flex-row ">
             <div className=" rounded-xl bg-white animate-pulse">
              <img
                className="shadow-lg object-cover rounded border-gray-200"
                src={`/api/talents/photo/` + talent.tale_profile}
                alt={`${talents.tale_id}`}
                style={{ minHeight: "52vh" }}
              />
              </div>
              <div className="lg:w-1/2 w-full lg:pl-8 ">
               
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                  {talent.tale_fullname}
                </h1>
                <div className="flex mb-4">
                  <span className="flex items-center">
                    <svg
                      fill="currentColor"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 text-red-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg
                      fill="currentColor"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 text-red-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg
                      fill="currentColor"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 text-red-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg
                      fill="currentColor"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 text-red-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 text-red-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <span className="text-gray-600 ml-3">
                      {talent.tale_rating} rating
                    </span>
                  </span>
                  <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                    <a className="text-gray-500">
                      <svg
                        fill="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                      </svg>
                    </a>
                    <a className="ml-2 text-gray-500">
                      <svg
                        fill="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                      </svg>
                    </a>
                    <a className="ml-2 text-gray-500">
                      <svg
                        fill="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                      </svg>
                    </a>
                  </span>
                </div>
                <p className="leading-relaxed">{talent.tale_deskripsi}</p>
                <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                  <div className="flex  items-center">
                    <span className=" mr-3 text-black text-bold">Days</span>
                    <div className="grid grid-cols-7 gap-6">
                      <div className="col-span-1 sm:col-span-2">
                        <input
                          type="number"
                          name="Quantity"
                          onChange={handleOnChange("lite_days")}
                          id="Quantity"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <span className="title-font font-medium text-2xl text-gray-900">
                    Rp.
                    {new Intl.NumberFormat("en-US", {
                      style: "decimal",
                    }).format(talent.tale_price)}
                  </span>
                  <button
                    className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
                    onClick={onSubmit}
                  >
                    Add Hire
                  </button>
                </div>
              </div>
              <div class="lg:w-1/5 pl-10">
              <iframe
                width="450"
                height="350"
                
                src={talent.tale_video}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
              <div>

              </div>
            </div>
            <div>
              <div>
              {talent.tale_fullname}
              </div>
            </div>
            </div>
           
          </div>
        </section>
      )}
      <div class="flex items-end justify-end fixed bottom-0 right-0 mb-4 mr-4 z-10">
        <div>
          <a
            title="Balik Ke Landing"
            href="/talent/"
            target="_blank"
            class="block w-16 h-16 rounded-full transition-all shadow hover:shadow-lg transform hover:scale-110 hover:rotate-12"
          >
            <img
              class="object-cover object-center w-full h-full rounded-full"
              src="https://i.pinimg.com/originals/60/fd/e8/60fde811b6be57094e0abc69d9c2622a.jpg"
            />
          </a>
        </div>
      </div>

      {
        // <div class="grid grid-flow-col  pt-16" >
        //   <div>
        //     {talents.talents_images && (
        //       <img
        //         src={
        //           `/api/talentsimages/` +
        //           talents.talents_images[0].taim_filename
        //         }
        //         alt={`${talents.tale_id}`}
              
        //       />
        //     )}
        //   </div>
        //   <div class="col-start-3">
        //     {talents.talents_images && (
        //       <img
        //         src={
        //           `/api/talentsimages/` +
        //           talents.talents_images[1].taim_filename
        //         }
        //         alt={`${talents.tale_id}`}
        //       />
        //     )}
        //   </div>
        //   <div>
        //     {talents.talents_images && (
        //       <img
        //         src={
        //           `/api/talentsimages/` +
        //           talents.talents_images[2].taim_filename
        //         }
        //         alt={`${talents.tale_id}`}
        //       />
        //     )}
        //   </div>
        //   <div>
        //     {talents.talents_images && (
        //       <img
        //         src={
        //           `/api/talentsimages/` +
        //           talents.talents_images[3].taim_filename
        //         }
        //         alt={`${talents.tale_id}`}
        //       />
        //     )}
        //   </div>
         
        // </div>
      }

      <Footer />
    </>
  );
  
}

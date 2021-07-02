import React, { useState, useEffect } from "react";
import ApiTalents from "./ApiTalents";
import PageHeader from "../../components/layout/PageHeader";
import { useHistory, Link } from "react-router-dom";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";

export default function Talents() {
  let history = useHistory();
  const [talents, setTalents] = useState([]);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    // fetch data talents
    ApiTalents.list().then((data) => {
      setTalents(data);
    });
  }, []);

  useEffect(() => {
    ApiTalents.list().then((data) => {
      setTalents(data);
    });

    setStatus(false);
  }, [status]);

  const onDelete = async (id) => {
    ApiTalents.remove(id).then(() => {
      setStatus(true);
    });
  };

  return (
    <>
      <div className=" p-bottom-0">
        <PageHeader
          className=" "
          title={"Talents"}
          actionType={"Add"}
          setModal={() => history.push("/talent/Add")}
        />
      </div>
      { <div className="flex flex-col -bottom-2">
                <div className="my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-white-500">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actor/Actris
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Price
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                           Body
                                        </th>

                                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    { 
                                        talents &&
                                        talents.map((row, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="flex-shrink-0 h-10 w-10">
                                                                <img className="mx-auto h-48 w-24 rounded-full" src={`/api/talents/photo/` + row.tale_profile} alt="" />
                                                            </div>
                                                            <div className="ml-4">
                                                                <div className="text-sm font-medium text-gray-900">
                                                                    {row.tale_fullname} 
                                                                </div>
                                                                <div className="text-sm text-gray-500">
                                                                    {row.tale_nationality}
                                                                </div>
                                                                <div className="text-sm text-gray-500">
                                                                    {row.tale_age} Tahun
                                                                </div>
                                                             

                                                            </div>
                                                        </div>
                                                    </td>
                                                 
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                         Rp.{row.tale_price}
                                                        </span>
                                                    </td>

                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full  ">
                                                         {row.tale_height} cm {row.tale_weight} kg
                                                        </span>
                                                    </td>



                                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                                        <div className="mt-5 flex lg:mt-0 lg:ml-4">
                                                            <span className="hidden sm:block mr-2">
                                                                <Link to={"/talent/edit/" + row.tale_id}>
                                                                    <button type="button"
                                                                        className="bg-green-500 p-2 text-white hover:shadow-lg text-xs font-thin"
                                                                    >
                                                                        Edit
                                                                      
                                                                    </button>
                                                                </Link>
                                                            </span>
                                                            <span className="hidden sm:block">
                                                                <button onClick={() => {
                                                                    if (window.confirm('Delete this record ?'))
                                                                        onDelete(row.tale_id)
                                                                }}
                                                                    type="button"
                                                                    className="bg-red-500 p-2 text-white hover:shadow-lg text-xs font-thin "
                                                                >
                                                                    Remove
                                                                </button>
                                                            </span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })

                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>}

     {/*  <div class="container mx-auto "> */}
        {/*  <div class="my-2 flex sm:flex-row flex-col">
                <div class="flex flex-row mb-1 sm:mb-0">
                    <div class="relative">
                        <select
                            class="appearance-none h-full rounded-l border block appearance-none w-full bg-white border-gray-400 text-gray-700   leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                            <option>5</option>
                            <option>10</option>
                            <option>20</option>
                        </select>
                       <div
                            class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                        </div>
                    </div>
                    <div class="relative">
                        <select
                            class="appearance-none h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500">
                            <option>All</option>
                            <option>Active</option>
                            <option>Inactive</option>
                        </select>
                        <div
                            class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                        </div>
                    </div>
                </div>
               <div class="block relative">
                    <span class="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                        <svg viewBox="0 0 24 24" class="h-4 w-4 fill-current text-gray-500">
                            <path
                                d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z">
                            </path>
                        </svg>
                    </span>
                    <input placeholder="Search"
                        class="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none" />
                </div>
            </div>  */}
      {/*   <div class="-mx-4 sm:-mx-8  sm:px-8 py-4 overflow-x-auto">
          <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table class="min-w-full leading-normal">
              <thead>
                <tr>
                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actor/Actris
                  </th>
                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Rol
                  </th>
                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Created at
                  </th>
                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              {talents &&
                talents.map((row, index) => {
                  return (
                    <tbody>
                      <tr>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div class="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="mx-auto h-48 w-24 rounded-full"
                                src={`/api/talents/photo/` + row.tale_profile}
                                alt=""
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {row.tale_fullname}
                              </div>
                              <div className="text-sm text-gray-500">
                                {row.tale_nationality}
                              </div>
                              <div className="text-sm text-gray-500">
                                {row.tale_age} Tahun
                              </div>
                            </div>
                          </div>
                        </td>
                       
                      
                      </tr>
                      
                     
                    </tbody>
                  );
                })}
            </table>
           
          </div>
        </div>
      </div> */}
    </>
  );
}

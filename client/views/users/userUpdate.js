import React, { Fragment, useRef, useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { updateUser } from '../action/userAction'
import { Dialog, Transition } from '@headlessui/react'
import { DocumentAddIcon } from '@heroicons/react/solid'
import { findOneUser } from '../action/userAction'
import { useHistory, useLocation, Link } from "react-router-dom"

export default function userUpdate() {

    const [open, setOpen] = useState(true)
    const cancelButtonRef = useRef();
    const history = useHistory();
    const [blob, setBlob] = useState([]);
    const dispatch = useDispatch();
    const [values, setValues] = useState("")
    const userSignin = useSelector(state => state.userSignin)
    const { userInfo } = userSignin
    const userListOne = useSelector(state => state.userListOne)
    const { user } = userListOne
    useEffect(() => {
        dispatch(findOneUser(userInfo.users.user_id))
      }, [dispatch])
    
    useEffect(() => {
        if (!values && user) {
            setValues({
                user_id: user.user_id,
                user_name: user.user_name,
                user_email: user.user_email,
              
                user_birthdate: user.user_birthdate,
                user_gender: user.user_gender,
                user_avatar: user.user_avatar
            })
        }
    }, [dispatch, user])

    const handleOnChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value });
    };
    const uploadSingleFile = name => event => {
        //1.untuk ubah file ke blob agar bisa di preview user_image nya
        setBlob({ ...blob, [name]: URL.createObjectURL(event.target.files[0]) })

        //2. simpan data File, bisa juga gunakan blob, lalu blob diconvert lagi
        // ke File type, spy ga bingung kita coba gunakan cara ini aja
        setValues({ ...values, ['user_avatar']: event.target.files[0] })
        //console.log(files);
    }
    const onSubmit = (e) => {
        e.preventDefault();
        console.log(values)
        dispatch(updateUser(values)).then((result) => {
        history.push("/talent/userdetail/")
          });
    }
    return (
        <div>
            <Transition.Root show={open} as={Fragment}>
                <Dialog
                    as="div"
                    static
                    className="fixed z-10 inset-0 overflow-y-auto"
                    initialFocus={cancelButtonRef}
                    open={open}
                    onClose={setOpen}
                >
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                    </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                                            <DocumentAddIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                                        </div>
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900" title={'users'} />
                                            <form action="#" method="POST">
                                                <div className="shadow overflow-hidden sm:rounded-md">
                                                    <div className="px-4 py-5 bg-white sm:p-6">
                                                        <div className="grid grid-cols-6 gap-6">
                                                            <div className="col-span-6 sm:col-span-3">
                                                                <label htmlFor="user_name" className="block text-sm font-medium text-gray-700">
                                                                    Name user
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    name="user_name"
                                                                    value={values.user_name}
                                                                    id="user_name"
                                                                    onChange={handleOnChange('user_name')} 
                                                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                                />
                                                            </div>
                                                            <div className="col-span-6 sm:col-span-3">
                                                                <label htmlFor="user_email" className="block text-sm font-medium text-gray-700">
                                                                    User Email
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    name="user_email"
                                                                    value={values.user_email}
                                                                    id="user_email"
                                                                    onChange={handleOnChange('user_email')} 
                                                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                                />
                                                            </div>
                                                           
                                                            <div className="col-span-6 sm:col-span-3">
                                                                <label htmlFor="user_birthdate" className="block text-sm font-medium text-gray-700">
                                                                    User Birthdate
                                                                </label>
                                                                <input
                                                                    type="date"
                                                                    name="user_birthdate"
                                                                    value={values.user_birthdate}
                                                                    id="user_birthdate"
                                                                    onChange={handleOnChange('user_birthdate')} 
                                                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                                />
                                                            </div>
                                                            <div className="col-span-6 sm:col-span-3">
                                                                <label htmlFor="user_gender" className="block text-sm font-medium text-gray-700">
                                                                    User Gender
                                                                </label>
                                                                <select
                                                                    type="text"
                                                                    name="user_gender"
                                                                    value={values.user_gender}
                                                                    id="user_gender"
                                                                    onChange={handleOnChange('user_gender')}
                                                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                                >   
                                                                    <option className="sr-only">Select your gender</option>
                                                                    <option>Male</option>
                                                                    <option>Female</option>
                                                                </select>
                                                            </div>
                                                            <div className="col-span-6 sm:col-span-6 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                                                <div className="space-y-2 text-center">
                                                                    <img src={blob.user_avatar} value={blob.user_avatar} />
                                                                    <div className="flex text-sm text-gray-600">
                                                                        <label for="image" className=" relative cursor-pointer bg-white font-medium text-indigo-600 hover:text-indigo-500">
                                                                            <span>Upload a file</span>
                                                                            <input id="image" accept="image/*" name="image" onChange={uploadSingleFile('user_avatar')} type="file" className="sr-only" />
                                                                        </label>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                        <button
                                            type="submit"
                                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                            onClick={onSubmit}
                                        >
                                            Submit
                                        </button>
                                    <Link to="/talent/userdetail/">
                                        <button
                                            type="submit"
                                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-200 focus:outline-none  focus:ring-offset-2  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                            ref={cancelButtonRef}
                                        >
                                            Cancel
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root >
        </div>
    )
}
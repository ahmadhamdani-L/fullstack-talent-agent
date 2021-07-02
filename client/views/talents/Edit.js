import React, { useState, useEffect } from "react";
import PageHeader from "../../components/layout/PageHeader";
import { useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import ApiTalent from "./ApiTalent";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";

export default function AddEditTalent({ match }, props) {
  let history = useHistory();

  const [blob, setBlob] = useState([]);
  const [files, setFiles] = useState([]);
  const [edit, setEdit] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const [values, setValues] = useState(
    ""
    /* tale_id: match.params.id,
    tale_fullname: undefined,
    tale_nationality: undefined,
    tale_age: undefined,
    tale_birth: undefined,
    tale_height: undefined,
    tale_weight: undefined,
    tale_price: undefined,
    tale_user_id: undefined,
    tale_profile: undefined,
    image: undefined,
    error: "",
    redirect: false, */
  );

  const uploadSingleFile = (name) => (event) => {
    setUploaded(true);
    //1.untuk ubah file ke blob agar bisa di preview image nya
    const x = event.target.files[0];
    setBlob({ ...blob, [name]: URL.createObjectURL(event.target.files[0]) });
    console.log(blob);
    //2. simpan data File, bisa juga gunakan blob, lalu blob diconvert lagi
    // ke File type, spy ga bingung kita coba gunakan cara ini aja
    setFiles({ ...files, [name]: event.target.files[0] });
    console.log(files);
  };

  useEffect(() => {
    ApiTalent.findOne2(match.params.id).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({
          ...values,
          tale_id: data.tale_id,
          tale_fullname: data.tale_fullname,
          tale_nationality: data.tale_nationality,
          tale_age: data.tale_age,
          tale_birth: data.tale_birth,
          tale_weight: data.tale_weight,
          tale_height: data.tale_height,
          tale_price: data.tale_price,
          status: data.status,
          tale_video: data.tale_video,
          tale_video: data.tale_video,
          tale_account_social:data.tale_account_social ,
          tale_video_news: data.tale_video_news,
          tale_deskripsi: data.tale_deskripsi ,
          tale_news: data.tale_news,
       
          tale_profile: data.tale_profile,
         
        });

        ApiTalent.showImage(
          `/api/talents/photo/` + data.tale_profile,
          data.tale_profile
        ).then((result) => {
          if (result.error) {
            console.log("Get Image Failed");
          } else {
            setFiles({ ...files, image: result });
            setBlob({ ...blob, image: URL.createObjectURL(result) });
          }
        });
      }
    });

    setUploaded(false);
    setEdit(true);
  }, []);

  const handleOnChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const imageUrl = `/api/talents/photo/${values.tale_profile}`;

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(edit);
    const talent = new FormData();
    talent.append("tale_id", parseInt(values.tale_id));
    talent.append("tale_fullname", values.tale_fullname);
    talent.append("tale_nationality", values.tale_nationality);
    talent.append("tale_age", parseInt(values.tale_age));
    talent.append("tale_birth", parseInt(values.tale_birth));
    talent.append("tale_height", parseInt(values.tale_height));
    talent.append("tale_weight", parseInt(values.tale_weight));
    talent.append("tale_price", parseInt(values.tale_price));
    talent.append("status", values.status);
    talent.append("tale_video", (values.tale_video));
    talent.append("tale_account_social", values.tale_account_social);
    talent.append("tale_video_news", (values.tale_video_news));
    talent.append("tale_deskripsi", (values.tale_deskripsi));
    talent.append("tale_news", (values.tale_news));
   /*  talent.append("tale_user_id", parseInt(values.tale_user_id)); */
    const myFiles = files.image;
    files.image && talent.append("tale_profile", files.image);
    console.log(talent);

    if (!edit) {
      ApiTalent.create(talent).then((data) => {
        if (data.errors) {
          console.log("create new record failed");
          setValues({ ...values, error: data.errors[0].message });
        } else {
          setValues({ ...values, redirect: true });
        }
      });
    } else {
      ApiTalent.update(talent).then((data) => {
        if (data.errors) {
          console.log("create new record failed");
          setValues({ ...values, error: data.errors[0].message });
        } else {
          setValues({ ...talent, redirect: true });
        }
      });
    }
  };

  if (values.redirect) {
    return <Redirect to={"/talent/list"} />;
  }

  return (
    <>
      <PageHeader
        title={"Talents"}
        setModal={() => history.goBack()}
        actionType={"Back"}
      />

      <form form action="#" method="POST">
        <div class="mt-10 sm:mt-0 p-1 " >
          <div class="md:grid md:grid-cols-3 md:gap-6  items-center">
            <div class="mt-5 md:mt-0 md:col-span-2">
              <form action="#" method="POST">
                <div class="shadow overflow-hidden sm:rounded-md">
                  <div class="px-4 py-5 bg-white sm:p-6">
                    <div class="grid grid-cols-6 gap-6">
                      <div class="col-span-6 sm:col-span-3">
                        <label
                          for="tale_fullname"
                          class="block text-sm font-medium text-gray-700"
                        >
                          ID
                        </label>
                        <input
                          type="number"
                          name="tale_id"
                          id="tale_id"
                          onChange={handleOnChange(parseInt("tale_id"))}
                          value={values.tale_id}
                        />

                        <label
                          for="tale_age"
                          class="block text-sm font-medium text-gray-700"
                        >
                          Nama Lengkap
                        </label>

                        <input
                          type="text"
                          name="tale_fullname"
                          id="tale_fullname"
                          onChange={handleOnChange("tale_fullname")}
                          value={values.tale_fullname}
                          autocomplete="given-name"
                          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div class="col-span-6 sm:col-span-3">
                        <label
                          for="tale_nationality"
                          class="block text-sm font-medium text-gray-700"
                        >
                          Nationality
                        </label>
                        <input
                          type="text"
                          name="tale_nationality"
                          id="tale_nationality"
                          value={values.tale_nationality}
                          onChange={handleOnChange("tale_nationality")}
                          autocomplete="tale_nationality"
                          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div class="col-span-6 sm:col-span-3">
                        <label
                          for="tale_nationality"
                          class="block text-sm font-medium text-gray-700"
                        >
                          Account Social
                        </label>
                        <input
                          type="text"
                          name="tale_account_social"
                          id="tale_account_social"
                          value={values.tale_account_social}
                          onChange={handleOnChange("tale_account_social")}
                          autocomplete="tale_account_social"
                          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div class="col-span-6 sm:col-span-3">
                        <label
                          for="tale_age"
                          class="block text-sm font-medium text-gray-700"
                        >
                          Age
                        </label>
                        <input
                          type="number"
                          name="tale_age"
                          id="tale_age"
                          value={values.tale_age}
                          onChange={handleOnChange("tale_age")}
                          autocomplete="family-name"
                          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                   
                      <div class="col-span-6 sm:col-span-4">
                        <label
                          for="tale_birth"
                          class="block text-sm font-medium text-gray-700"
                        >
                          BirthDay
                        </label>
                        <input
                          type="date"
                          name="tale_birth"
                          id="email"
                          value={values.tale_birth}
                          onChange={handleOnChange("tale_birth")}
                          autocomplete="tale_birth"
                          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                        <label
                          for="tale_height"
                          class="block text-sm font-medium text-gray-700"
                        >
                          Height
                        </label>
                        <input
                          type="number"
                          name="tale_height"
                          value={values.tale_height}
                          onChange={handleOnChange("tale_height")}
                          id="tale_height"
                          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                        <label
                          for="tale_weight"
                          class="block text-sm font-medium text-gray-700"
                        >
                          Weight
                        </label>
                        <input
                          type="number"
                          name="tale_weight"
                          value={values.tale_weight}
                          onChange={handleOnChange("tale_weight")}
                          id="weight"
                          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                        <label
                          for="status"
                          class="block text-sm font-medium text-gray-700"
                        >
                          Status
                        </label>
                        <input
                          type="text"
                          name="status"
                          value={values.status}
                          onChange={handleOnChange("status")}
                          id="status"
                          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                        <label
                          for="tale_video"
                          class="block text-sm font-medium text-gray-700"
                        >
                          Video
                        </label>
                        <input
                          type="text"
                          name="tale_video"
                          value={values.tale_video}
                          onChange={handleOnChange("tale_video")}
                          id="status"
                          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      
                      <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                        <label
                          for="tale_video_news"
                          class="block text-sm font-medium text-gray-700"
                        >
                          Video News
                        </label>
                        <input
                          type="text"
                          name="tale_video_news"
                          value={values.tale_video}
                          onChange={handleOnChange("tale_video_news")}
                          id="tale_video_news"
                          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                        <label
                          for="tale_price"
                          class="block text-sm font-medium text-gray-700"
                        >
                          Price
                        </label>
                        <input
                          type="number"
                          name="tale_price"
                          value={values.tale_price}
                          onChange={handleOnChange("tale_price")}
                          id="tale_price"
                          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      
                      <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                        <label
                          for="tale_deskripsi"
                          class="block text-sm font-medium text-gray-700"
                        >
                          Deskripsi
                        </label>
                        <input
                          type="text"
                          name="tale_deskripsi"
                          value={values.tale_deskripsi}
                          onChange={handleOnChange("tale_deskripsi")}
                          id="tale_deskripsi"
                          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      
                      <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                        <label
                          for="tale_news"
                          class="block text-sm font-medium text-gray-700"
                        >
                          News
                        </label>
                        <input
                          type="text"
                          name="tale_news"
                          value={values.tale_news}
                          onChange={handleOnChange("tale_news")}
                          id="tale_news"
                          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-2 lg:col-span-3 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-2 text-center">
                          <div className="mx-auto h-48 w-24 text-gray-400">
                            <img
                              src={blob.image}
                              alt="image"
                              className="mx-auto h-48 w-48"
                            />
                          </div>

                          <div className="flex text-sm text-gray-600">
                            <label
                              for="image"
                              className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                            >
                              <span>Upload a file</span>
                              <input
                                id="image"
                                accept="image/*"
                                name="image"
                                value={values.image}
                                onChange={uploadSingleFile("image")}
                                type="file"
                                className="sr-only"
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <Link to="/talent/list">
                      <button
                        type="submit"
                        class="inline-flex mr-3 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Cancel
                      </button>
                    </Link>

                    <button
                      type="submit"
                      onClick={onSubmit}
                      class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

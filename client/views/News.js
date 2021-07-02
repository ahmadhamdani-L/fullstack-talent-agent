import React, { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { searchTALENT } from "../views/action/talentAction";
import { pagingTalent } from "../views/action/talentAction";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core/styles";
import Footer from "../components/layout/Footer";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function News() {
  const classes = useStyles();

  const dispatch = useDispatch();

  const talentPage = useSelector((state) => state.talentPage);
  const { talent } = talentPage;
  const [page, setPage] = useState(1);

  const getRequestParams = (page) => {
    let params = {};

    if (page) {
      params["page"] = page - 1;
    }

    return params;
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    const params = getRequestParams(page);

    dispatch(pagingTalent(params));
  }, [dispatch, page]);

  const handleOnchange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const [values, setValues] = useState({
    tale_fullname: undefined,
  });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(values.tale_fullname);
    dispatch(searchTALENT(values.tale_fullname)).then((result) => {});
  };

  return (
    <>
      <Navbar />

      <section class="text-gray-700 body-font">
        <div class="bg-indigo-600 items-stretch hidden lg:block w-full  h-screen">
          <img
            src="https://cdn.dribbble.com/users/826577/screenshots/3152365/talent-agent-090816.gif"
            alt=""
            class="h-100v"
            style={{ width: "100%" }}
          />
        </div>
        {talent &&
          talent.rows &&
          talent.rows.map((row, index) => {
            return (
              <div
                key={index}
                class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center"
              >
                <div class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                  <h3 class="title-font sm:text-2xl text-1xl mb-4 font-medium text-gray-900">
                    {row.tale_fullname}
                  </h3>
                  <p class="mb-8 leading-relaxed">{row.tale_news}</p>
                  <div class="flex justify-center">
                  <Link to={"/talent/detail/" + row.tale_id}>
                    <button class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                      Views {row.tale_fullname}
                    </button>
                    </Link>
                  </div>
                </div>
                <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                  <iframe
                    width="450"
                    height="350"
                    src={row.tale_video_news}
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>
              </div>
            );
          })}
      </section>
      {
        <div className={classes.root}>
          <div className="flex justify-center">
            <Pagination
              count={talent ? talent.totalPages : 0}
              page={page}
              onChange={handlePageChange}
              showFirstButton
              showLastButton
            />
          </div>
        </div>
      }

      <section class="text-gray-700 body-font border-t border-gray-200"></section>
      <section class="text-gray-700 body-font border-t border-gray-200"></section>
      <section class="text-gray-700 body-font border-t border-gray-200"></section>

      <section class="text-gray-700 body-font border-t border-gray-200">
        <div class="container px-5 py-24 mx-auto">
          <div class="xl:w-1/2 lg:w-3/4 w-full mx-auto text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              class="inline-block w-8 h-8 text-gray-400 mb-8"
              viewBox="0 0 975.036 975.036"
            >
              <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
            </svg>

            <span class="inline-block h-1 w-10 rounded bg-indigo-500 mt-8 mb-6"></span>
          
          </div>
        </div>
      </section>
      <section class="text-gray-700 body-font relative"></section>

      <a
        href="/talent/"
        class="rounded-full w-12 h-12 bg-blue-700 fixed bottom-0 right-0 flex items-center justify-center text-gray-800 mr-8 mb-8 shadow-sm border-gray-300 border"
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

          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
        </svg>
      </a>
      <Footer />
    </>
  );
}

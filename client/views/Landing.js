import React, { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchTALENT } from "../views/action/talentAction";
import { pagingTalent } from '../views/action/talentAction';
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from '@material-ui/core/styles';
import auth from "../auth/AuthHelper"
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Landing() {

  const classes = useStyles();
  const dispatch = useDispatch();


  const talentPage = useSelector(state => state.talentPage);
  const { talent } = talentPage
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
  }

  const [values, setValues] = useState({
    tale_fullname: undefined
  });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(values.tale_fullname)
    dispatch(searchTALENT(values.tale_fullname)).then((result) => {

    });
  }


  return (
    <>
      <Navbar />

      <div class="bg-white pt-24 pl-5 flex">
        <input
          class="w-2/4 rounded pl-2"
          type="text"
          placeholder="Search Talents "
          onChange={handleOnchange('tale_fullname')}
        />
        <button class="bg-red-700 hover:bg-red-300 rounded text-white ml-2 pl-5 pr-5" onClick={onSubmit}>
          <p class="font-semibold text-xs">Search</p>
        </button>
        <div class="col-span-6 sm:col-span-4 pl-32">
          
          <select id="department" type="text" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"

          >
            <Link to="/talent/news"><option value=""  >Seleciona una Opcion </option></Link>
            <option value="1">Select option 1</option>
            <option value="2">Select option 2</option>
            <option value="3">Select option 3</option>

          </select>
        </div>
      </div>


      <div className=" grid grid-cols-4 gap-4 pt-10 ml-5   ">

        {talent && talent.rows && talent.rows.map((row, index) => {
          return (
            <div key={index}>
              <div className="">
                <div class="  bg-black h-40v    overflow-hidden bg-white  shadow-lg dark:bg-gray-800">

                  <Link to={"/talent/detail/" + row.tale_id}><img
                    class=" rounded-xl hover:grow  h-40v w-full "
                    src={`/api/talents/photo/` + row.tale_profile}
                    alt="NIKE AIR"
                  />
                  </Link>
                </div>
                <div class="px-6 py-4">
                  <div class="font-bold text-xl mb-2">{row.tale_fullname}</div>
                  <p class="text-gray-700">
                    Instagram : {row.tale_account_social}
                  </p>
                  <p class="text-gray-700">
                    Tinggi :{row.tale_height}
                  </p>
                  <p class="text-gray-700">
                    Berat : {row.tale_weight}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
        {talentPage.searching &&
          talentPage.searching.map((row, index) => {
            return (
              <div key={index}>
                <div className="">
                  <div class="  bg-black h-40v    overflow-hidden bg-white  shadow-lg dark:bg-gray-800">
                    <Link to={"/talent/detail/" + row.tale_id}>
                      <img
                        class=" rounded-xl hover:grow  h-40v w-full "
                        src={`/api/talents/photo/` + row.tale_profile}
                        alt="NIKE AIR"
                      />
                    </Link>
                  </div>
                  <div class="px-6 py-4">
                    <div class="font-bold text-xl mb-2">{row.tale_fullname}</div>

                  </div>
                </div>
              </div>
            );
          })}

      </div>
      {<div className={classes.root}>
        <div className="flex justify-center">
          <Pagination count={talent ? talent.totalPages : 0} page={page} onChange={handlePageChange} showFirstButton showLastButton />
        </div>
      </div>}

      <Footer />
    </>
  );
}

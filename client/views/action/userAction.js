import axios from 'axios'
import {
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_REGISTER_REQUEST,
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
  USER_FINDONE_REQUEST,
  USER_FINDONE_SUCCESS,
  USER_FINDONE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_FAIL,
  USER_UPDATE_SUCCESS

} from '../constants/userConstans'

export const signin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
  const user = {
    user_email: email,
    user_password: password,
  };
  try {
    const { data } = await axios.post("/api/auth/signin", user);
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    }
    );
  }
};

export const findOneUser =(id)=> async(dispatch)=>{
  dispatch({
      type: USER_FINDONE_REQUEST
  })
  try {
      const {data} = await axios.get(`/api/auth/select/${id}`)
      dispatch({type: USER_FINDONE_SUCCESS, payload:data})
  } catch (error) {
      dispatch({
          type: USER_FINDONE_FAIL,
          payload: error.response && error.response.data.message
          ? error.response.data.message : error.message
      })
  }
}

export const signup = (user) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: user });

  try {
    const { data } = await axios.post("/api/auth/signup", user);
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });  
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}

export const updateUser = (values) => async (dispatch) =>{
  dispatch({type : USER_UPDATE_REQUEST});
  console.log(values)
  const user = new FormData()
  values.user_name && user.append('user_name', values.user_name);
  values.user_email && user.append('user_email', values.user_email);
  values.user_avatar && user.append('user_avatar', values.user_avatar);
  values.user_password && user.append('user_password', values.user_password);
  values.user_birthdate && user.append('user_birthdate', values.user_birthdate);
  values.user_gender && user.append('user_gender', values.user_gender);

  try {
      const {data} = await axios.put(`/api/auth/update/${values.user_id}`, user);
      dispatch({type: USER_UPDATE_SUCCESS, payload: data})
  } catch (error) {
      dispatch({
          type:USER_UPDATE_FAIL,
          payload:
          error.response && error.response.data.message
          ? error.response.data.message : error.message,
      })
  }
}
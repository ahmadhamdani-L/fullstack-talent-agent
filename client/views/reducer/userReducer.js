import {
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_FINDONE_REQUEST,
  USER_FINDONE_FAIL,
  USER_FINDONE_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL
} from '../constants/userConstans'

export const userSigninReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true };
    case USER_SIGNIN_SUCCESS:
      return { loading: true, userInfo: action.payload };
    case USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userSignupReducer = (state ={}, action ) =>{
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return {loading: true};
    case USER_REGISTER_SUCCESS:
      return {loading: false, userRegis: action.payload}
    case USER_REGISTER_FAIL:
      return {loading: false, error: action.payload}
    default:
      return state
  }
}

export const userListOneReducer = (state = {}, action) => {
  switch(action.type){
      case USER_FINDONE_REQUEST:
          return {loading:true}
      case USER_FINDONE_SUCCESS: 
          return {loading:true, user:action.payload}
      case USER_FINDONE_FAIL:
          return {loading:false, error:action.payload}
      default:
          return state
  }
}

export const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_FINDONE_REQUEST:
      return { loading: true }
    case USER_FINDONE_SUCCESS:
      return { loading: true, user: action.payload }
    case USER_FINDONE_FAIL:
      return { loading: false, error: action.payload }
    case USER_UPDATE_REQUEST:
      return {...state, loading: true, user: {} };
    case USER_UPDATE_SUCCESS:
      return { loading: false, userUpd: action.payload.user };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload.user };
    default:
      return state
  }
}
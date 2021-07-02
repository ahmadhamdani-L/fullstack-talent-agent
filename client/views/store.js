import { createStore, compose, applyMiddleware, combineReducers } from "redux";

import { composeWithDevTools } from "redux-devtools-extension";

import thunk from "redux-thunk";

import {
  talentListReducer,
  talentListOneReducer,
  talentPageReducer,
} from "./reducer/talentReducer";

import {
  userSigninReducer,
  userSignupReducer,
  userListOneReducer,
  userUpdateReducer
} from "./reducer/userReducer";

import { tacaListOneReducer } from "./reducer/tacaReducer";

import { liteCreateReducer, orderCreateReducer, orderUpdateReducer,
  orderCancelReducer } from "./reducer/shopReducer";

import { orderListOneReducer , orderListReducer } from "./reducer/orderReducer";

const initialState = {
  userSignin: {
    userInfo:
      typeof window !== "undefined"
        ? localStorage.getItem("userInfo")
          ? JSON.parse(localStorage.getItem("userInfo"))
          : null
        : null,
  },
};
const reducer = combineReducers({
  talentList: talentListReducer,
  talentListOne: talentListOneReducer,
  talentPage: talentPageReducer,
  userSignin: userSigninReducer,
  userSignup: userSignupReducer,
  userListOne: userListOneReducer,
  userUpdate:userUpdateReducer,
  tacaListOne: tacaListOneReducer,
  liteCreate: liteCreateReducer,
  orderCreate: orderCreateReducer,
  orderListOne: orderListOneReducer,
  orderUpdate:orderUpdateReducer,
  orderCanceled:orderCancelReducer,
  orderList:orderListReducer,
});

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;

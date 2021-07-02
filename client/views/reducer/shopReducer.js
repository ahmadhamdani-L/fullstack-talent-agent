import {
    LITE_INPUT_REQUEST,
    LITE_INPUT_SUCCESS,
    LITE_INPUT_FAIL,
    ORDER_INPUT_REQUEST,
    ORDER_INPUT_SUCCESS,
    ORDER_INPUT_FAIL,
    ORDER_CANCEL_REQUEST,
    ORDER_CANCEL_FAIL,
    ORDER_CANCEL_SUCCESS  ,
    ORDER_UPDATE_REQUEST,
    ORDER_UPDATE_SUCCESS,
    ORDER_UPDATE_FAIL,   
} from '../constants/shopConstans'

export const liteCreateReducer = (state = {}, action) =>{
    switch(action.type){
      case LITE_INPUT_REQUEST:
        return {loading: true};
      case LITE_INPUT_SUCCESS:
        return {loading: false, liteRegis: action.payload}
      case LITE_INPUT_FAIL:
        return {loading: false, error: action.payload}
      default:
        return state
    }
}
export const orderCreateReducer = (state = {}, action) =>{
  switch(action.type){
    case ORDER_INPUT_REQUEST:
      return {loading: true};
    case ORDER_INPUT_SUCCESS:
      return {loading: false, orderRegis: action.payload}
    case ORDER_INPUT_FAIL:
      return {loading: false, error: action.payload}
    default:
      return state
  }
}

export const orderCancelReducer = (state = {}, action) =>{
  switch(action.type){
    case ORDER_CANCEL_REQUEST:
      return {loading: true};
    case ORDER_CANCEL_SUCCESS:
      return {loading: false, orderCl: action.payload}
    case ORDER_CANCEL_FAIL:
      return {loading: false, error: action.payload}
    default:
      return state
  }
}

export const orderUpdateReducer = (state = {}, action) =>{
  switch(action.type){
    case ORDER_UPDATE_REQUEST:
      return {loading: true};
    case ORDER_UPDATE_SUCCESS:
      return {loading: false, orderUpdate: action.payload}
    case ORDER_UPDATE_FAIL:
      return {loading: false, error: action.payload}
    default:
      return state
  }
}
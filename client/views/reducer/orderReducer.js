import {
    ORDER_LISTONE_REQUEST,
    ORDER_LISTONE_SUCCESS,
    ORDER_LISTONE_FAIL ,

    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL
} from '../constants/orderConstans'

export const orderListOneReducer = (state = {}, action) => {
    switch(action.type){
        case ORDER_LISTONE_REQUEST:
            return {loading:true}
        case ORDER_LISTONE_SUCCESS: 
            return {loading:true, order:action.payload}
        case ORDER_LISTONE_FAIL:
            return {loading:false, error:action.payload}
        default:
            return state
    }
}

export const orderListReducer = (state = {}, action) => {
    switch(action.type){
        case ORDER_LIST_REQUEST:
            return {loading:true}
        case ORDER_LIST_SUCCESS: 
            return {loading:true, order:action.payload}
        case ORDER_LIST_FAIL:
            return {loading:false, error:action.payload}
        default:
            return state
    }
}
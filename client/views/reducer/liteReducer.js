import {
    LITE_LISTONE_REQUEST,
    LITE_LISTONE_SUCCESS,
    LITE_LISTONE_FAIL
} from '../constants/liteConstants'

export const liteListOneReducer = (state = {}, action) => {
    switch(action.type){
        case LITE_LISTONE_REQUEST:
            return {loading:true}
        case LITE_LISTONE_SUCCESS: 
            return {loading:true, lite:action.payload}
        case LITE_LISTONE_FAIL:
            return {loading:false, error:action.payload}
        default:
            return state
    }
}
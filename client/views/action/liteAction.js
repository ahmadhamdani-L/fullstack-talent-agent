import axios from 'axios'
import {
    LITE_LISTONE_REQUEST,
    LITE_LISTONE_SUCCESS,
    LITE_LISTONE_FAIL,
    LITE_LIST_REQUEST,
    LITE_LIST_SUCCESS,
    LITE_LIST_FAIL
} from '../constants/liteConstants'

export const listOneLite =(id)=> async(dispatch)=>{
    dispatch({
        type: LITE_LISTONE_REQUEST
    })
    try {
        const {data} = await axios.get(`/api/lite_items/${id}`)
        dispatch({type: LITE_LISTONE_SUCCESS, payload:data})
    } catch (error) {
        dispatch({
            type: LITE_LISTONE_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message : error.message
        })
    }
}
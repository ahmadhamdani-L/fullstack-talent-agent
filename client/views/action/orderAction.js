import axios from 'axios'
import {
   ORDER_LISTONE_REQUEST,
   ORDER_LISTONE_SUCCESS,
   ORDER_LISTONE_FAIL ,

   ORDER_LIST_REQUEST,
   ORDER_LIST_SUCCESS,
   ORDER_LIST_FAIL
} from '../constants/orderConstans'

export const listOneOrder =(id)=> async(dispatch)=>{
    dispatch({
        type:ORDER_LISTONE_REQUEST
    })
    try {
        const {data} = await axios.get(`/api/shop/select/${id}`)
        dispatch({type:ORDER_LISTONE_SUCCESS, payload:data})
    } catch (error) {
        dispatch({
            type:ORDER_LISTONE_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message : error.message
        })
    }
}

export const listOrder =(id)=> async(dispatch)=>{
    dispatch({
        type:ORDER_LIST_REQUEST
    })
    try {
        const {data} = await axios.get(`/api/shop/s/${id}`)
        dispatch({type:ORDER_LIST_SUCCESS, payload:data})
    } catch (error) {
        dispatch({
            type:ORDER_LIST_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message : error.message
        })
    }
}
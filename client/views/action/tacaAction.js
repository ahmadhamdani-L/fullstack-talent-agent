import axios from 'axios'
import {
    CART_LISTONE_REQUEST,
    CART_LISTONE_SUCCESS,
    CART_LISTONE_FAIL
} from '../constants/tacaConstans'

export const listOneCart =(id)=> async(dispatch)=>{
    dispatch({
        type: CART_LISTONE_REQUEST
    })
    try {
        const {data} = await axios.get(`/api/talentscart/select/${id}`)
        dispatch({type: CART_LISTONE_SUCCESS, payload:data})
    } catch (error) {
        dispatch({
            type: CART_LISTONE_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message : error.message
        })
    }
}
import axios from 'axios'
import {
    LITE_INPUT_REQUEST,
    LITE_INPUT_SUCCESS,
    LITE_INPUT_FAIL,
    ORDER_INPUT_REQUEST,
    ORDER_INPUT_SUCCESS,
    ORDER_INPUT_FAIL,
    ORDER_CANCEL_REQUEST,
    ORDER_CANCEL_SUCCESS,
    ORDER_CANCEL_FAIL,
    ORDER_UPDATE_REQUEST,
    ORDER_UPDATE_SUCCESS,
    ORDER_UPDATE_FAIL,
} from '../constants/shopConstans'

export const liteInput = (lite) => async (dispatch) =>{
    dispatch({ type: LITE_INPUT_REQUEST, payload:lite})

    try {
        const {data} = await axios.post(`/api/Shop/item/${lite.user_id}`, lite)
        dispatch ({type: LITE_INPUT_SUCCESS, payload:data})
    } catch (error) {
        dispatch({
            type: LITE_INPUT_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          });
    }
}


export const orderUpdate = (upd) => async (dispatch) => {
    dispatch({type: ORDER_UPDATE_REQUEST, payload:upd})

    try {
        const {data} = await axios.put(`/api/Shop/ordered/${upd.user_id}`, upd)
        dispatch({type: ORDER_UPDATE_SUCCESS, payload:data})
    } catch (error) {
        dispatch({
        type: ORDER_UPDATE_FAIL,
        payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
            })
    }
}
export const orderInput = (order) => async (dispatch) => {
    dispatch({type: ORDER_INPUT_REQUEST, payload:order})

    try {
        const {data} = await axios.post(`/api/Shop/order/${order.user_id}`, order)
        dispatch({type: ORDER_INPUT_SUCCESS, payload:data})
    } catch (error) {
        dispatch({
        type: ORDER_INPUT_FAIL,
        payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
            })
    }
}

export const orderCancel = (order) => async (dispatch) => {
    dispatch({type: ORDER_CANCEL_REQUEST, payload:order})

    try {
        const {data} = await axios.put(`/api/Shop/cancel/${order.user_id}`, order)
        dispatch({type: ORDER_CANCEL_SUCCESS, payload:data})
    } catch (error) {
        dispatch({
        type: ORDER_CANCEL_FAIL,
        payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
            })
    }
}
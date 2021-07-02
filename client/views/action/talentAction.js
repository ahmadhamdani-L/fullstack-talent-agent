import axios from "axios"
import {
    TALENT_FIND_REQUEST,
    TALENT_FIND_SUCCESS,
    TALENT_FIND_FAIL,

    TALENT_FINDONE_REQUEST,
    TALENT_FINDONE_FAIL,
    TALENT_FINDONE_SUCCESS,

    TALENT_SEARCH_SUCCESS,
    TALENT_SEARCH_REQUEST,
    TALENT_SEARCH_FAIL,

    TALENT_PAGING_REQUEST,
    TALENT_PAGING_SUCCESS,
    TALENT_PAGING_FAIL
} from "../constants/talentConstans"

export const listTalent =()=> async(dispatch)=>{
    dispatch({
        type: TALENT_FIND_REQUEST
    })
    try{
        const data = await axios.get("/api/talents/read")
        dispatch({
            type:TALENT_FIND_SUCCESS,
            payload: data,
        })
    }catch (error){
        dispatch({
            type:TALENT_FIND_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const listoneTalent =(id)=> async(dispatch)=>{
    dispatch({
        type: TALENT_FINDONE_REQUEST
    })
    try {
        const {data} = await axios.get(`/api/talents/select/${id}`)
        dispatch({type: TALENT_FINDONE_SUCCESS, payload:data})
    } catch (error) {
        dispatch({
            type: TALENT_FINDONE_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message : error.message
        })
    }
}

export const pagingTalent =(params)=> async(dispatch)=>{
    dispatch({
        type: TALENT_PAGING_REQUEST
    })
    try{
        const {data} = await axios.get("/api/talents/paging/",{params})
        dispatch({
            type:TALENT_PAGING_SUCCESS,
            payload: data
        })
    }catch (error){
        dispatch({
            type:TALENT_PAGING_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const searchTALENT = (fullname) => async (dispatch) => {
    dispatch ({type : TALENT_SEARCH_REQUEST});
   
    try {
      const {data} = await axios.get(`/api/talents/search/?tale_fullname=${fullname}`);
      
      dispatch({ 
        type : TALENT_SEARCH_SUCCESS,
        payload: data
      })
    } catch (error) {
      dispatch ({
        type: TALENT_SEARCH_FAIL,
        payload:
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  }
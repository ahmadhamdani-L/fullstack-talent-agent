import axios from 'axios';

const list = async () => {
    try {
        let response = await axios.get(`/api/talents/read`)
        return await response.data
    } catch (err) {
        return await err.message
    }
}






const create = async (talents) => {
    try {
        let response = await axios.post(`/api/talents/create`, talents)
        return await response.data
    } catch (err) {
        return await err.message
    }
}

const findOne = async (data) => {
    const taim_id = parseInt(data);
    try {
        let response = await axios.get(`/api/talentsimages/select/${taim_id}`)
        return await response.data
    } catch (err) {
        return await err.message
    }
}



const showImage = async (blobUrl,fileName) => {

    try {
        let response = await axios.get(blobUrl, { responseType: 'blob' });
        return await new File([response.data], fileName);  
    } catch (error) {
        return await error.message
    }

}



const remove = async (data) => {
    const id = parseInt(data);
    try {
        let response = await axios.delete(`/api/talents/delete/${id}`)
        return await response.data
    } catch (err) {
        return await err.message
    }
}


const removelite = async (data) => {
    const id = parseInt(data);
    try {
        let response = await axios.delete(`/api/liteitem/delete/${id}`)
        return await response.data
    } catch (err) {
        return await err.message
    }
}

export default {
    list, create, remove, findOne, 
    showImage,removelite
}
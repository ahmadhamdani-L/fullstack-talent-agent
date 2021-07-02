import axios from 'axios';

const list = async () => {
    try {
        let response = await axios.get(`/api/talents/read`)
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

const findOne2 = async (data) => {
    const tale_id = parseInt(data);
    try {
        let response = await axios.get(`/api/talents/select/${tale_id}`)
        return await response.data
    } catch (err) {
        return await err.message
    }
}

const findOne3 = async (data) => {
    const tale_id = parseInt(data);
    try {
        let response = await axios.get(`/api/talents/detail/${tale_id}`)
        return await response.data
    } catch (err) {
        return await err.message
    }
}

const findOne4= async (data) => {
    const taim_id = parseInt(data);
    try {
        let response = await axios.get(`/api/talentsimages/${taim_id}`)
        return await response.data
    } catch (err) {
        return await err.message
    }
}

const create = async (data) => {
 
    try {
        let response = await axios.post(`/api/talents/profile`, data)
        return await response.data
    } catch (err) {
        return await err.message
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

const update = async (data) => {
    const id = parseInt(data.get("tale_id"));
    try {
        let response = await axios.put(`/api/talents/update/${id}`, data)
        return await response.data
    } catch (err) {
        return await err.message
    }
}

const findOne = async (data) => {
    const id = parseInt(data);
    try {
        let response = await axios.get(`/api/talents/select/${id}`)
        return await response.data
    } catch (err) {
        return await err.message
    }
}
export default {
    findOne,
    findOne2,
    findOne3,
    findOne4,
    list,
    showImage,
    create,
    remove,
    update,
 
}
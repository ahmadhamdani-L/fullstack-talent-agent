import axios from 'axios';

const list = async (id) => {
    try {
        let response = await axios.get(`/api/talentscart/lite/${id}`)
        return await response.data
    } catch (err) {
        return await err.message
    }
}

const cartOpen = async (id) => {
    try {
        let response = await axios.get(`/api/talentscart/findAllOpen/${id}`)
        return await response.data
    } catch (err) {
        return await err.message
    }
}

const createLineItems = async (data) => {
    try {
      const result = await axios.post(`/api/talentscart/chartLine`,data)
      return await result.data
    } catch (err) {
      console.log(err)
    }
  }

  const findOne = async (data) => {
    const taca_id = parseInt(data);
    try {
        let response = await axios.get(`/api/talentscart/select/${taca_id}`)
        return await response.data
    } catch (err) {
        return await err.message
    }
}

const findOne1 = async (data) => {
    const user_id = parseInt(data);
    try {
        let response = await axios.get(`/api/auth/select/${user_id}`)
        return await response.data
    } catch (err) {
        return await err.message
    }
}

const remove = async (data) => {
    const lite_id = parseInt(data);
    try {
        let response = await axios.delete(`/api/liteitem/delete/${lite_id}`)
        return await response.data
    } catch (err) {
        return await err.message
    }
}



export default {
    cartOpen ,
    createLineItems,
    findOne,
    findOne1,
    remove
}
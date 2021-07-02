import axios from "axios"

const signin = async (user) => {

  try {
    let response = await axios.post(`/api/auth/signin/`, user)
    return await response.data
  } catch (error) {
    return await error.response.data
  }
}

const signout = async () => {
  try {
    const result = await axios.get(`/api/auth/signout`)
    return await result.data
  } catch (err) {
    console.log(err)
  }
}

const signup = async (user) => {
  try {
    const result = await axios.post(`/api/auth/signup`,user)
    return await result.data
  } catch (err) {
    console.log(err)
  }
}

export {
  signin,
  signout,
  signup
}
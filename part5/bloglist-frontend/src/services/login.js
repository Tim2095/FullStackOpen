import axios from "axios"
const baseUrl = '/api/login'


const login = async (credentials) => {

  try {
    const response = await axios.post(baseUrl, credentials)

    return response.data

  } catch(err) {
    throw err.response ? err.response.data : err; // Ensure the error is thrown
  }
}

export default {
  login
}
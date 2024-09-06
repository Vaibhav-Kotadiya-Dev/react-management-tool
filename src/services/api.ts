import axios from 'axios'
import session from 'utils/session'

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 30000,
})

instance.interceptors.request.use(
  async function (config) {
    const token = JSON.parse(session.getValue('token'))
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  },
)

instance.interceptors.response.use(
  function (response) {
    if (response?.status === 401) {
        window.location.replace('/taskmanagementapp/logout');
      throw new Error(response?.data?.message);
    }
    return response
  },
  function (error) {
    if (error?.response?.status === 401) {
      window.location.replace('/taskmanagementapp/logout');
      throw new Error(error?.message);
    }
    return Promise.reject(error)
  },
)

export default instance

import axios from 'axios';

const API_BASEURL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000';

const axiosInstance = axios.create({
    baseURL: `${API_BASEURL}/api`,
});

export default axiosInstance;
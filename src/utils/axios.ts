import axiosLib from 'axios';

const axios = axiosLib.create({
    withCredentials: true,
    baseURL: window.location.origin
});

export default axios;

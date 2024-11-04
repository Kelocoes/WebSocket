import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
    },
    validateStatus: function validateStatus (status) {
        if (status >= 200 && status < 300) {
            return true;
        } else {
            return false;
        }
    }
});

export { axiosInstance };


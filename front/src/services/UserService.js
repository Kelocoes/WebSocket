import { axiosInstance } from "./axios";

export function getUserById () {
    return axiosInstance.get('/api/user/1')
        .then(response => {
            console.log(response);
            return response.data
        })
        .catch(error => error);
}

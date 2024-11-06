import { axiosInstance } from "./axios";
import axios from "axios";

export function getUserById (id) {
    return axiosInstance.get(`/api/user/${id}`)
        .then(response => {
            console.log(response.data); // {id: 1, name: 'test', email: ''}
            console.log(response.status); // 200
            console.log(response.statusText); // OK
            console.log(response.headers); // {content-type: 'application/json'}
            console.log(response.config); // {url: '/api/user/1', method: 'get', ...}
            console.log(response)
            return response.data
        })
        .catch(error => error);
}

export function createUserWithApi () {
    return axios({
        method: 'post',
        url: 'http://localhost:8080/api/user',
        data: {
            name: 'test',
            email: 'test@test.com'
        }
    }).then(response => {
        console.log(response);
        return response.data;
    }).catch(error => {
        console.error(error);
    });
}

export function createUserWithInstance () {
    return axiosInstance.post('/api/user', {
        name: 'test',
        email: 'test@test.com'
    }).then(response => {
        console.log(response);
        return response.data;
    }).catch(error => {
        console.error(error);
    });
}
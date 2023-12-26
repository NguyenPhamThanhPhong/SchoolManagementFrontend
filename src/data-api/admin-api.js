import axios from 'axios';
import APIUtil from './api-utils';

const registerUser = async (userData) => {
    try {
        const response = await axios.post(APIUtil.baseURL + '/admin-create', userData, APIUtil.jsonHeader);
        return { isError: false, data: response };
    } catch (error) {
        return { isError: true, data: error };
    }
};

const loginUser = async (username, password) => {
    try {
        var userData = { username, password }
        const response = await axios.post(APIUtil.baseURL + '/admin-login', userData, APIUtil.jsonHeader);
        return { isError: false, data: response };
    } catch (error) {
        return { isError: true, data: error };
    }
}

const getPassword = async (username) => {
    try {
        var userData = username
        const response = await axios.get(APIUtil.baseURL + `/admin-get-password-in-mail/${username}`)
        return { isError: false, data: response };
    } catch (error) {
        return { isError: true, data: error };
    }
}

const getAll = async () => {
    try {
        const response = await axios.get(APIUtil.baseURL + '/admin-get-all');
        return { isError: false, data: response };
    } catch (error) {
        return { isError: true, data: error };
    }
};


const AdminApi = {
    registerUser,
    loginUser,
    getPassword,
    getAll
}

export default AdminApi;
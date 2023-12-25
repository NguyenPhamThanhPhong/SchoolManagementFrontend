import axios from 'axios';
import APIUtil from './api-utils';

const registerUser = async (userData) => {
    try {
        const response = await axios.post(APIUtil.baseURL + '/admin-create', userData, APIUtil.jsonHeader);
        console.log(response);
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


const AdminApi = {
    registerUser,
    loginUser
}

export default AdminApi;
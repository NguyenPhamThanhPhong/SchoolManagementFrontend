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
        console.log(JSON.stringify(response))
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

const getAutoLogin = async () => {
    try {
        let tryToken = document.cookie;
        if (tryToken === undefined || tryToken === null || tryToken === '')
            return { isError: true, data: 'Token not found' };
        const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
        let isTokenExpired = false;
        if (!isTokenExpired) {
            const response = await axios.get(APIUtil.baseURL + '/admin-auto-login', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            return { isError: false, data: response.data };
        } else {
            return { isError: true, data: 'Token expired' };
        }
    } catch (error) {
        return { isError: true, data: error };
    }
};




const AdminApi = {
    registerUser,
    loginUser,
    getPassword,
    getAll,
    getAutoLogin
}
export { AdminApi }
export default AdminApi;
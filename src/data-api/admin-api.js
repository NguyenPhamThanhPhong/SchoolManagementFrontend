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

const getAutoLogin = async () => {
    try {
        const response = await axios.get(APIUtil.baseURL + '/admin-auto-login', {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                // Add any additional headers if needed
            },
        });

        // Assuming your API returns data in the response.data property
        return { isError: false, data: response.data };
    } catch (error) {
        // Handle errors appropriately
        return { isError: true, data: error.response ? error.response.data : 'Network error' };
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
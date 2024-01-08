import axios from 'axios';
import APIUtil from './api-utils';

const create = async (registration) => {
    try {
        const response = await axios.post(APIUtil.baseURL + '/registration-create', registration, APIUtil.formdataHeader);
        return { isError: false, data: response };
    } catch (error) {
        return { isError: true, data: error };
    }
}

const update = async (registration) => {
    try {
        const response = await axios.post(APIUtil.baseURL + '/registration-update', registration, APIUtil.formdataHeader);
        return { isError: false, data: response };
    } catch (error) {
        return { isError: true, data: error };
    }
}

const deleteInstance = async (id) => {
    try {
        const response = await axios.delete(APIUtil.baseURL + `/registration-delete/${id}`);
        return { isError: false, data: response };
    } catch (error) {
        return { isError: true, data: error };
    }
}

const getAll = async () => {
    try {
        const response = await axios.get(APIUtil.baseURL + '/registration-get-all');
        return { isError: false, data: response };
    } catch (error) {
        return { isError: true, data: error };
    }
}

const registrationApi = {
    create,
    update,
    deleteInstance,
    getAll
}

export { registrationApi }
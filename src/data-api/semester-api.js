import axios from 'axios';
import APIUtil from './api-utils';

const getAll = async () => {
    try {
        const response = await axios.get(APIUtil.baseURL + "/semester-get-all")
        return { isError: false, data: response };
    } catch (error) {
        return { isError: true, data: error };
    }
};

const getOne = async (id) => {
    try {
        const response = await axios.get(APIUtil.baseURL + `/semester-get-all/${id}`)
        return { isError: false, data: response };
    } catch (error) {
        return { isError: true, data: error };
    }
};

const createSemester = async (userData) => {
    try {
        const response = await axios.post(APIUtil.baseURL + '/semester-create', userData, APIUtil.jsonHeader);
        return { isError: false, data: response };
    } catch (error) {
        return { isError: true, data: error };
    }
};

const updateSemester = async (userData) => {
    try {
        const response = await axios.post(APIUtil.baseURL + '/semester-update', userData, APIUtil.jsonHeader);
        return { isError: false, data: response };
    } catch (error) {
        return { isError: true, data: error };
    }
}

const deleteSemester = async (id) => {
    try {
        const response = await axios.delete(APIUtil.baseURL + `/semester-delete/${id}`)
        return { isError: false, data: response };
    } catch (error) {
        return { isError: true, data: error };
    }
}

const SemesterApi = {
    getAll,
    getOne,
    createSemester,
    updateSemester,
    deleteSemester
}

export { SemesterApi };

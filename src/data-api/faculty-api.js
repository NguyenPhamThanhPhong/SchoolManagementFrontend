import axios from 'axios';
import APIUtil from './api-utils';

const getAll = async () => {
    try {
        const response = await axios.get(APIUtil.baseURL + "/faculty-get-all")
        return { isError: false, data: response };
    } catch (error) {
        return { isError: true, data: error };
    }
};

const getOne = async (id) => {
    try {
        const response = await axios.get(APIUtil.baseURL + `/faculty-get-all/${id}`)
        return { isError: false, data: response };
    } catch (error) {
        return { isError: true, data: error };
    }
};

const createFaculty = async (userData) => {
    try {
        const response = await axios.post(APIUtil.baseURL + '/faculty-create', userData, APIUtil.jsonHeader);
        return { isError: false, data: response };
    } catch (error) {
        return { isError: true, data: error };
    }
};

const updateFaculty = async (userData) => {
    try {
        const response = await axios.post(APIUtil.baseURL + '/faculty-update', userData, APIUtil.jsonHeader);
        return { isError: false, data: response };
    } catch (error) {
        return { isError: true, data: error };
    }
}

const autoGenerateFaculty = async (faculties) => {
    try {
        const response = await axios.post(APIUtil.baseURL + '/faculty-auto-generate', faculties, APIUtil.jsonHeader);
        return { isError: false, data: response };
    } catch (error) {
        return { isError: true, data: error };
    }
}

const deleteFaculty = async (id) => {
    try {
        const response = await axios.delete(APIUtil.baseURL + `/faculty-delete/${id}`)
        return { isError: false, data: response };
    } catch (error) {
        return { isError: true, data: error };
    }
}

const deleteMany = async (ids) => {
    try {
        const response = await axios.delete(APIUtil.baseURL + `/faculty-delete-many`, { data: { ids: ids }, headers: APIUtil.jsonHeader })
        return { isError: false, data: response };
    } catch (error) {
        return { isError: true, data: error };
    }
}

const FacultyApi = {
    getAll,
    getOne,
    createFaculty,
    autoGenerateFaculty,
    updateFaculty,
    deleteFaculty,
    deleteMany
}

export { FacultyApi };

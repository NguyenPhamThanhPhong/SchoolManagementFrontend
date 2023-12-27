import axios from 'axios';
import APIUtil from "./api-utils.js"


const subjectCreate = async (subjectCreateRequest) => {
    try {
        const response = await axios.post(APIUtil.baseURL + '/subject-create', subjectCreateRequest, APIUtil.jsonHeader);
        return { isError: false, data: response };
    } catch (error) {
        return { isError: true, data: error };
    }
}

const subjectManyRange = async (start, end) => {
    try {
        const response = await axios.get(APIUtil.baseURL + `/subject-get-many-range/${start}/${end}`);
        return { isError: false, data: response };
    } catch (error) {
        return { isError: true, data: error };
    }
}

const subjectGetbyId = async (id) => {
    try {
        const response = await axios.get(APIUtil.baseURL + `/subject-get-by-id/${id}`);
        return { isError: false, data: response };
    } catch (error) {
        return { isError: true, data: error };
    }
}

const subjectUpdateInstance = async (subject) => {
    try {
        const response = await axios.put(APIUtil.baseURL + '/subject-update-instance', subject, APIUtil.jsonHeader);
        return { isError: false, data: response };
    } catch (error) {
        return { isError: true, data: error };
    }
}

const subjectDelete = async (id) => {
    try {
        const response = await axios.delete(APIUtil.baseURL + `/subject-delete/${id}`);
        return { isError: false, data: response };
    } catch (error) {
        return { isError: true, data: error };
    }
}

const subjectApi = {
    subjectCreate,
    subjectManyRange,
    subjectGetbyId,
    subjectUpdateInstance,
    subjectDelete,
}

export { subjectApi }



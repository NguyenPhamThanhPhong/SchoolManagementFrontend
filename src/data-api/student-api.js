import axios from 'axios';
import APIUtil from './api-utils';

const studentCreate = async (userData) => {
    try {

        const response = await axios.post(APIUtil.baseURL + '/student-create', userData, APIUtil.jsonHeader);
        return { isError: false, data: response };
    } catch (error) {
        return { isError: true, data: error };
    }
};

const studentLogin = async (username, password) => {
    try {
        var userData = { username, password }
        const response = await axios.post(APIUtil.baseURL + '/student-login', userData, APIUtil.jsonHeader);
        return { isError: false, data: response };
    } catch (error) {
        return { isError: true, data: error };
    }
}
const studentAutoLogin = async () => {
    try {
        const response = await axios.get(APIUtil.baseURL + '/student-auto-login')
        return { isError: false, data: response };
    } catch (error) {
        return { isError: true, data: error };
    }

}

const studentGetPassword = async (username) => {
    try {
        const response = await axios.get(APIUtil.baseURL + `/student-get-password-in-mail/${username}`)
        return { isError: false, data: response };
    } catch (error) {
        return { isError: true, data: error };
    }
}

const studentGetFromFilter = async (filterStringObject) => {
    try {
        let myformdata = APIUtil.GenerateFormData(filterStringObject);
        const response = await axios.post(APIUtil.baseURL + '/student-get-by-text-filter', myformdata, APIUtil.formdataHeader);
        return { isError: false, data: response };
    } catch (error) {
        return { isError: true, data: error };
    }
}

const studentGetFromIds = async (ids) => {
    try {
        const response = await axios.post(APIUtil.baseURL + `/student-get-many-from-ids`, ids, APIUtil.jsonHeader);
        return { isError: false, data: response };
    } catch (error) {
        return { isError: true, data: error };
    }
}
const studentGetbyId = async (id) => {
    try {
        const response = await axios.get(APIUtil.baseURL + `/student-get-by-id/${id}`);
        return { isError: false, data: response };
    } catch (error) {
        return { isError: true, data: error };
    }

}

const studentGetManyRange = async (start, end) => {
    try {
        const response = await axios.get(APIUtil.baseURL + `/student-get-many-range/${start}/${end}`);
        return { isError: false, data: response };
    } catch (error) {
        return { isError: true, data: error };
    }
}

const studentDelete = async (id) => {
    try {
        const response = await axios.delete(APIUtil.baseURL + `/student-delete/${id}`);
        return { isError: false, data: response };
    } catch (error) {
        return { isError: true, data: error };
    }

}

const studentUpdateStringFields = async (id, updateParameters) => {
    try {
        const response = await axios.put(APIUtil.baseURL + `/student-update-string-fields/${id}`, updateParameters, APIUtil.jsonHeader);
        return { isError: false, data: response };
    } catch (error) {
        return { isError: true, data: error };
    }
}

const studentUpdateInstance = async (student) => {
    try {
        const response = await axios.put(APIUtil.baseURL + `/student-update-instance`, student, APIUtil.jsonHeader);
        return { isError: false, data: response };
    } catch (error) {
        return { isError: true, data: error };

    }
}


const StudentApi = {
    studentCreate,
    studentLogin,
    studentAutoLogin,
    studentGetPassword,
    studentGetFromFilter,
    studentGetFromIds,
    studentGetbyId,
    studentGetManyRange,
    studentDelete,
    studentUpdateStringFields,
    studentUpdateInstance
}


export { StudentApi };
export default StudentApi;
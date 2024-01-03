import axios from 'axios';
import APIUtil from "./api-utils.js"

const lecturerCreate = async (schoolMemberCreateRequest) => {
    try {
        const response = await axios.post(APIUtil.baseURL + '/lecturer-create', schoolMemberCreateRequest, APIUtil.jsonHeader);
        return { isError: false, data: response };
    } catch (error) {
        return { isError: true, data: error };
    }
}

const lecturerLogin = async (username, password) => {
    try {
        var userData = { username, password }
        const response = await axios.post(APIUtil.baseURL + '/lecturer-login', userData, APIUtil.jsonHeader);
        return { isError: false, data: response };
    } catch (error) {
        return { isError: true, data: error };
    }
}
const lecturerAutoLogin = async () => {
    try {
        const response = await axios.get(APIUtil.baseURL + '/lecturer-auto-login')
        return { isError: false, data: response };
    } catch (error) {
        return { isError: true, data: error };
    }
}

const getPassword = async (username) => {
    try {
        var userData = username
        const response = await axios.get(APIUtil.baseURL + `/lecturer-get-password-in-mail/${username}`)
        return { isError: false, data: response };
    } catch (error) {
        return { isError: true, data: error };
    }
}

const getManyRange = async (start, end) => {
    try {
        const response = await axios.get(APIUtil.baseURL + `/lecturer-get-many-range/${start}/${end}`);
        return { isError: false, data: response };
    } catch (error) {
        return { isError: true, data: error };
    }
}

const getfromIds = async (ids) => {
    try {
        const response = await axios.post(APIUtil.baseURL + `/lecturer-get-many-from-ids`, ids, APIUtil.jsonHeader);
        return { isError: false, data: response };
    } catch (error) {
        return { isError: true, data: error };
    }
}

const getbyTextFilter = async (text) => {
    try {
        let filter = APIUtil.GenerateFormData(text);
        const response = await axios.post(APIUtil.baseURL + `/lecturer-get-by-text-filter`, filter, APIUtil.formdataHeader);
        return { isError: false, data: response };
    } catch (error) {
        return { isError: true, data: error };
    }
}

const lecturerDelete = async (id) => {
    try {
        const response = await axios.delete(APIUtil.baseURL + `/lecturer-delete/${id}`);
        return { isError: false, data: response };
    } catch (error) {
        return { isError: true, data: error };
    }
}

const lecturerUpdateInstance = async (lecturer) => {
    try {
        const response = await axios.put(APIUtil.baseURL + `/lecturer-update-instance`, lecturer, APIUtil.jsonHeader);
        return { isError: false, data: response };
    } catch (error) {
        return { isError: true, data: error };
    }
}

const lecturerUpdateStringFields = async (id, updateParameters) => {
    try {
        const response = await axios.put(APIUtil.baseURL + `/lecturer-update-string-fields/${id}`, updateParameters, APIUtil.jsonHeader);
        return { isError: false, data: response };
    } catch (error) {
        return { isError: true, data: error };
    }
}

const lecturerApi = {
    lecturerCreate,
    lecturerLogin,
    lecturerAutoLogin,
    getPassword,
    getManyRange,
    getfromIds,
    getbyTextFilter,
    lecturerDelete,
    lecturerUpdateInstance,
    lecturerUpdateStringFields
}

export { lecturerApi };










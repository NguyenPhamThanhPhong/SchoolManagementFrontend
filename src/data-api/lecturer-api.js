import axios from 'axios';
import APIUtil from "./api-utils.js"

const lecturerGetAll = async () => {
    try {
        const response = await axios.get(APIUtil.baseURL + '/lecturer-get-all');
        return { isError: false, data: response };
    } catch (error) {
        return { isError: true, data: error };
    }
}

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

const getPassword = async (username) => {
    try {
        var userData = username
        const response = await axios.get(APIUtil.baseURL + `/api/Lecturer/lecturer-get-password-in-mail/${username}`)
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


const lecturerDelete = async (id, url = "") => {
    try {
        const response = await axios.delete(APIUtil.baseURL + `/lecturer-delete/${id}`, {
            data: url,
            headers: APIUtil.jsonHeader.Headers,
        });
        return { isError: false, data: response };
    } catch (error) {
        return { isError: true, data: error };
    }
}
const lecturerDeleteMany = async (ids, prevUrls = []) => {
    try {
        let deleteParam = { ids: ids, prevUrls: prevUrls }
        const response = await axios.post(APIUtil.baseURL + `/lecturer-delete-many`, { data: deleteParam, headers: APIUtil.jsonHeader })
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



const lecturerApi = {
    lecturerCreate,
    lecturerLogin,
    getPassword,
    getManyRange,
    getfromIds,
    lecturerDelete,
    lecturerDeleteMany,
    lecturerUpdateInstance,
    lecturerGetAll

}

export { lecturerApi };










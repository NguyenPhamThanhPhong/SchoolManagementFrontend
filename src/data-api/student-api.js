import axios from 'axios';
import APIUtil from './api-utils';

const studentGetAll = async () => {
    try {
        const response = await axios.get(APIUtil.baseURL + '/student-get-all');
        return { isError: false, data: response };
    } catch (error) {
        return { isError: true, data: error };
    }
}

const studentCreate = async (schoolMemberCreateRequest) => {
    try {
        const response = await axios.post(APIUtil.baseURL + '/student-create', schoolMemberCreateRequest, APIUtil.jsonHeader);
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
        const response = await axios.get(APIUtil.baseURL + `/api/Student/student-get-password-in-mail/${username}`)
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

const studentDelete = async (id, url = "") => {
    try {
        const response = await axios.delete(APIUtil.baseURL + `/student-delete/${id}`, {
            data: url,
            headers: APIUtil.jsonHeader.Headers,
        });
        return { isError: false, data: response };
    }
    catch (error) {
        return { isError: true, data: error };
    }
}

const studentDeleteMany = async (ids, prevUrls = []) => {
    try {
        let deleteParam = { ids: ids, prevUrls: prevUrls }

        const response = await axios.delete(APIUtil.baseURL + `/student-delete-many`, { data: deleteParam, headers: APIUtil.jsonHeader })
        return { isError: false, data: response };
    }
    catch (error) {
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
    studentGetFromIds,
    studentGetbyId,
    studentGetManyRange,
    studentDelete,
    studentDeleteMany,
    studentUpdateInstance,
    studentGetAll
}


export { StudentApi };
export default StudentApi;
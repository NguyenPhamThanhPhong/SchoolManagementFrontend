import axios from 'axios';
import APIUtil from './api-utils';

const registerUser = async (userData) => {
    try {

        const response = await axios.post(APIUtil.baseURL + '/student-create', userData, APIUtil.jsonHeader);
        return { isError: false, data: response.data };
    } catch (error) {
        return { isError: true, data: error.response.data };
    }
};
const getStudentFromId = async () => {
    //code here
}

const StudentApi = {
    registerUser,
    getStudentFromId
}
export default StudentApi;
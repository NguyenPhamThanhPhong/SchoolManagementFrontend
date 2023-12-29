import axios from 'axios';
import APIUtil from "./api-utils.js"

const classCreate = async (schoolClassCreateRequest) => {
    try {
        const response = await axios.post(APIUtil.baseURL + '/class-create', schoolClassCreateRequest, APIUtil.jsonHeader);
        return { isError: false, data: response };
    } catch (error) {
        return { isError: true, data: error };
    }
}

const classGetbyId = async (id) => {
    try {
        console.log(APIUtil.baseURL + `/class-get-by-id/${id}`);
        const response = await axios.get(APIUtil.baseURL + `/class-get-by-id/${id}`);
        return { isError: false, data: response };
    } catch (error) {
        return { isError: true, data: error };
    }
}
const classGetFromIds = async (ids) => {
    try {
        const response = await axios.post(APIUtil.baseURL + `/class-get-many-from-ids`, ids, APIUtil.jsonHeader);
        return { isError: false, data: response };
    } catch (error) {
        return { isError: true, data: error };
    }
}

const classGetbyFilter = async (filter) => {
    try {
        const response = await axios.post(APIUtil.baseURL + `/class-get-by-filter`, filter, APIUtil.jsonHeader);
        return { isError: false, data: response };
    } catch (error) {
        return { isError: true, data: error };
    }
}

const classGetManyRange = async (start, end) => {
    try {
        const response = await axios.get(APIUtil.baseURL + `/class-get-many-range/${start}/${end}`);
        return { isError: false, data: response };
    } catch (error) {
        return { isError: true, data: error };
    }
}
const classUpdateInstance = async (schoolClass) => {
    try {
        const response = await axios.put(APIUtil.baseURL + '/class-update-instance', schoolClass, APIUtil.jsonHeader);
        return { isError: false, data: response };
    } catch (error) {
        return { isError: true, data: error };
    }
}

const classStudentRegistration = async (id, action, studentLog) => {
    try {
        const response = await axios.post(
            APIUtil.baseURL + `/class-student-registration/${id}/${action}`,
            studentLog, APIUtil.jsonHeader);
        return { isError: false, data: response };
    } catch (error) {
        return { isError: true, data: error };
    }
}

const classUpdateSchedule = async (id, schedulePiece) => {
    try {
        const scheduleUnit = APIUtil.GenerateFormData(schedulePiece);
        const response = await axios.put(APIUtil.baseURL + `/class-update-schedule/${id}`, scheduleUnit, APIUtil.jsonHeader);
        return { isError: false, data: response };
    } catch (error) {
        return { isError: true, data: error };
    }
}

const classAppendSection = async (id, position, updateOption, section) => {
    try {
        const response = await axios.put(APIUtil.baseURL + `/class-append-sections/${id}/${position}/${updateOption}`, section, APIUtil.jsonHeader);
        return { isError: false, data: response };
    } catch (error) {
        return { isError: true, data: error };

    }
}

const classDelete = async (id, prevUrls) => {
    try {
        const response = await axios.delete(APIUtil.baseURL + `/class-delete/${id}`, {
            data: prevUrls,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return { isError: false, data: response };
    } catch (error) {
        return { isError: true, data: error };
    }
}


const schoolClassApi = {
    classCreate,
    classGetbyId,
    classGetFromIds,
    classGetbyFilter,
    classGetManyRange,
    classUpdateInstance,
    classStudentRegistration,
    classUpdateSchedule,
    classAppendSection,
    classDelete
}

export { schoolClassApi }
export default schoolClassApi;
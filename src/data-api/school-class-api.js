import axios from 'axios';
import APIUtil from "./api-utils.js"

const classGetAll = async () => {
    try {
        const response = await axios.get(APIUtil.baseURL + '/class-get-all');
        return { isError: false, data: response };
    } catch (error) {
        return { isError: true, data: error };
    }
}

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

const classStudentRegistration = async (id, option, studentId, studentName) => {
    try {
        let schoolClassRegistrationRequest = { id: id, option: option, studentId: studentId, name: studentName };
        const response = await axios.post(
            APIUtil.baseURL + `/class-student-registration`,
            schoolClassRegistrationRequest, APIUtil.jsonHeader);
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

const classDeleteMany = async (ids = []) => {
    try {
        const response = await axios.delete(APIUtil.baseURL + `/class-delete-many`, { data: ids, headers: APIUtil.jsonHeader });
        return { isError: false, data: response };
    }
    catch (error) {
        return { isError: true, data: error };
    }
}

const saveScores = async (classId, studentItems) => {
    try {
        const response = await axios.post(APIUtil.baseURL + `/save-scores/${classId}`, studentItems, APIUtil.jsonHeader);
        return { isError: false, data: response };
    }
    catch (error) {
        return { isError: true, data: error };
    }
}
const submitScores = async (classId, studentItems) => {
    try {
        const response = await axios.post(APIUtil.baseURL + `/submit-scores/${classId}`, studentItems, APIUtil.jsonHeader);
        return { isError: false, data: response };
    }
    catch (error) {
        return { isError: true, data: error };
    }
}

const createExam = async (classId, exam) => {
    try {
        const response = await axios.post(APIUtil.baseURL + `/create-exam/${classId}`, exam, APIUtil.jsonHeader);
        return { isError: false, data: response };
    }
    catch (error) {
        return { isError: true, data: error };
    }

}

const deleteExam = async (classId, examId) => {
    try {
        const response = await axios.delete(APIUtil.baseURL + `/delete-exam/${classId}/${examId}`);
        return { isError: false, data: response };
    }
    catch (error) {
        return { isError: true, data: error };
    }
}

const updateExam = async (classId, exams) => {
    try {
        const response = await axios.put(APIUtil.baseURL + `/update-exam`, exams, APIUtil.jsonHeader);
        return { isError: false, data: response };
    }
    catch (error) {
        return { isError: true, data: error };
    }
}

const classUpdateSection = async (id, index, updateSectionRequest) => {
    try {
        const response = await axios.post(APIUtil.baseURL + `/api/SchoolClass/class-update-sections/${id}/${index}`, updateSectionRequest, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return { isError: false, data: response };
    }
    catch (error) {
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
    classDelete,
    classDeleteMany,
    classGetAll,
    saveScores,
    submitScores,
    createExam,
    deleteExam,
    updateExam,
    classUpdateSection
}

export { schoolClassApi }
export default schoolClassApi;
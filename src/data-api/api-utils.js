

function GenerateFormData(data) {
    const form = new FormData();
    for (const key in data) {
        form.append(key, data[key]);
    }
    return form;
}

function validateStartEnd(start, end) {
    if (typeof start !== 'number' || typeof end !== 'number')
        return { isError: true, data: 'start and end must be number' };
    if (start > end)
        return { isError: true, data: 'start must be less than end' };
}


const baseURL = 'https://localhost:5051'

const jsonHeader = {
    Headers: {
        'Content-Type': 'application/json'
    }
}
const formdataHeader = {
    Headers: {
        'Content-Type': 'multipart/form-data'
    }
}
const APIUtil = {
    baseURL,
    GenerateFormData,
    validateStartEnd,
    jsonHeader,
    formdataHeader
}



export default APIUtil

export {
    baseURL,
    GenerateFormData,
    validateStartEnd,
    jsonHeader,
    formdataHeader
}

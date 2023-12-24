

function GenerateFormData(data) {
    const form = new FormData();
    for (const key in data) {
        form.append(key, data[key]);
    }
    return form;
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
    jsonHeader,
    formdataHeader
}



export default APIUtil

export {
    baseURL,
    GenerateFormData,
    jsonHeader,
    formdataHeader
}

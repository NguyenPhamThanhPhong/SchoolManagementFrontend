import axios from 'axios';
import APIUtil from './api-utils';


const postCreate = async (postData) => {
    try {
        const response = await axios.post(APIUtil.baseURL + '/post-create', postData, APIUtil.formdataHeader);
        return { isError: false, data: response };
    } catch (error) {
        return { isError: true, data: error };
    }
}

const postGetbyId = async (id) => {
    try {
        const response = await axios.get(APIUtil.baseURL + `/post-get-by-id/${id}`)
        return { isError: false, data: response };
    }
    catch (error) {
        return { isError: true, data: error };
    }
}

const postGetManyRange = async (start, end) => {
    try {
        const response = await axios.get(APIUtil.baseURL + `/post-get-many-range/${start}/${end}`)
        return { isError: false, data: response };
    }
    catch (error) {
        return { isError: true, data: error };
    }
}

const postUpdateInstance = async (postUpdateRequest) => {
    try {
        const response = await axios.post(APIUtil.baseURL + '/post-update-instance', postUpdateRequest, APIUtil.formdataHeader);
        return { isError: false, data: response };
    } catch (error) {
        return { isError: true, data: error };
    }
}

const postDelete = async (id, urls = null) => {
    try {
        console.log(JSON.stringify(urls))
        const response = await axios.delete(APIUtil.baseURL + `/post-delete/${id}`, { data: urls, headers: APIUtil.jsonHeader })
        return { isError: false, data: response };
    }
    catch (error) {
        return { isError: true, data: error };
    }
}

const postDeleteMany = async (ids, prevUrls) => {
    try {
        let request = {
            ids: ids,
            prevUrls: prevUrls
        }
        const response = await axios.delete(APIUtil.baseURL + `/post-delete-many`, { data: request, headers: APIUtil.jsonHeader });
        return { isError: false, data: response };
    }
    catch (error) {
        return { isError: true, data: error };
    }
}

const PostApi = {
    postCreate,
    postGetbyId,
    postGetManyRange,
    postUpdateInstance,
    postDelete,
    postDeleteMany
}
export { PostApi }
import {axios} from '../../infra/axios';

export async function makeRequest(method: string, url: string, data: object = {}, headers: any = {}) {
    try {
        const response = await axios.request({
            method: method,
            url: url,
            data: data,
            headers: headers
        });
        return response.data;
    } catch (error: any) {
        return error;
    }            
}
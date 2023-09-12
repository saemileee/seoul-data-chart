import axios from 'axios';
class AxiosInstance {
    baseUrl: string;
    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }
    instance(endPoint: string) {
        return axios.create({
            baseURL: this.baseUrl + endPoint,
            headers: {
                'Access-Control-Allow-Credentials': 'true',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
                'Access-Control-Allow-Headers':
                    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
            },
        });
    }
}

const httpClient = new AxiosInstance(import.meta.env.REACT_APP_BASE_URL || '');

export const seoulAPI = httpClient.instance('/response');

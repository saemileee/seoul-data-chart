import axios from 'axios';
class AxiosInstance {
    baseUrl: string;
    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }
    instance(endPoint: string) {
        return axios.create({
            baseURL: this.baseUrl + endPoint,
        });
    }
}

const httpClient = new AxiosInstance(import.meta.env.VITE_BASE_URL_BASE_URL);

export const seoulAPI = httpClient.instance('/response');

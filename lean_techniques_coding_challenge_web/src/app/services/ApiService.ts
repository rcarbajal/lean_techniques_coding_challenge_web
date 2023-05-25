import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { ApiResponse, HttpMethod } from '../types/APITypes';
import { Photo } from '../models/Photo';


export default class ApiService {
    private onTimeoutCallback: VoidFunction = () => {};
    private apiUrl: string = "";

    constructor(onTimeout: VoidFunction = () => {}) {
        this.onTimeoutCallback = onTimeout;
        this.apiUrl = process.env.API_URL as string;
    }

    public async getPhotoAlbum(albumId: number = 0): Promise<ApiResponse<Photo[]>> {
        let response: ApiResponse<Photo[]> = {};

        if (albumId > 0) {
            try {
                const photos = await this.fetchLocal(`${this.apiUrl}?albumId=${albumId}`, 'GET');
                response = {
                    data: photos
                }
            }
            catch(err: any) {
                response = {
                    message: err.message
                }
            }
        }

        return response;
    }

    private async fetchLocal(
        path: string,
        method: HttpMethod,
        body: string | null = null,
        headersConfig: Record<string, string> = {}
    ) {
        const headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            ...(headersConfig || {}),
        };

        const requestConfig: AxiosRequestConfig<any> = { headers, timeout: parseInt(process.env.DEFAULT_TIMEOUT as string, 10) };

        let response: AxiosResponse<any, any>;
        switch(method) {
            case "GET":
                response = await axios.get(path, requestConfig);
                break;
            case "PUT":
                response = await axios.put(path, body, requestConfig);
                break;
            case "POST":
                response = await axios.post(path, body, requestConfig);
                break;
            case "DELETE":
                response = await axios.delete(path, requestConfig);
                break;
        }

        if (!(response.status >= 200 && response.status <= 299)) {
            switch (response.status) {
                case 408:
                case 504:
                    this.onTimeoutCallback?.();
                    break;
            }

            throw new Error(response.data ?? response.statusText);
        }

        return response.data;
    };
}
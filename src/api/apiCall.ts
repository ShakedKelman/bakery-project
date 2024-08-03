import axios, { AxiosError } from 'axios';
import { appConfig } from '../config';
import { OrderModel } from '../models/OrderModel';

export default async function apiCall(url: string, method: string, headers = {},   data?: any) {
    const fullUrl = appConfig.serverUrl + url;
    console.log('Making API call:', fullUrl, method, headers, data); // Log the request details

    const options = {
        method,
        headers,
        data,
    };

    try {
        const response = await axios(fullUrl, options);
        return {
            status: true,
            data: response.data,
        };
    } catch (error: any) { // Type assertion using ': any' or a specific type like AxiosError
        console.error('API call error:', error); // Log the error details

        return {
            status: false,
            errorMessage: error.message,
            data: error.response?.data,
        };
    }
}




/*
 * Filename: FetchAPIData.js
 * Path: c:\zCodes\therapiest project\nick-fury
 * Created Date: Sunday, June 13th 2021, 10:48:14 am
 * Author: Numan Ahmed
 * Description: Responsible for All HTTP API Requests with Access Token
 * Developed with ❤️
 * Copyright (c) Numan
 */


import axios from "axios";
import { toast } from "react-toastify";
import { getCookie } from "./CookiesHelper";

/**
 * Fetch Data from the API & return Response
 * @param {String} method - HTTP requests - GET || POST || PUT || DELETE
 * @param {String} endpoint 
 * @param {Object} data 
 * @returns - {Object} - API response
 */
const FetchAPIData = async (method = 'post', endpoint, data = null) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL + '/nick-fury/api';
    const accessToken = getCookie('db_access_token');
    let config = {};

    if ((method == 'post' || method == 'put') && data) {
        config = {
            method: method,
            url: BASE_URL + endpoint,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': accessToken
            },
            data: data
        };
    }

    if (method == 'get') {
        config = {
            method: 'get',
            url: BASE_URL + endpoint,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': accessToken
            },
        };
    }

    if (method == 'delete') {
        config = {
            method: 'delete',
            url: BASE_URL + endpoint,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': accessToken
            },
        };
    }

    let response = await axios(config)
        .catch((error) => {
            if (error.response) {
                if (error.response.data.msg) {
                    toast.error(error.response.data.msg);
                    // console.error('Error occur in Fetch api: ', error.response.data.msg);
                }
            }
        });

    return response;
}

export default FetchAPIData;
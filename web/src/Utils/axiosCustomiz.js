import axios from "axios";
import { toast } from 'react-toastify';
import { interceptorLoadingElements } from "./fomatter";

const instance = axios.create({
    baseURL: 'http://localhost:8017/',
});

// max time of 1 request 
instance.defaults.timeout = 1000 * 60 * 5

//accept cookie to axios handle jwt token 
instance.defaults.withCredentials = true

instance.interceptors.request.use(function (config) {

    // const access_token = store?.getState()?.account?.account?.access_token;
    // config.headers["Authorization"] = "Bearer " + access_token;

    interceptorLoadingElements(true)

    return config;
}, function (error) {
    return Promise.reject(error);
});
//handle middleware errors response

instance.interceptors.response.use(function (response) {
    interceptorLoadingElements(false)

    return response && response.data ? response.data : response;;
}, function (error) {

    interceptorLoadingElements(false)

    if (error?.response?.status !== 401) {
        toast.error(error?.response?.data?.message)
    }

    return Promise.reject(error);
});

export default instance;
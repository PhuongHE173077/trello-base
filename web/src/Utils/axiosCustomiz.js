import axios from "axios";

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

    return config;
}, function (error) {
    return Promise.reject(error);
});
//handle middleware errors response

instance.interceptors.response.use(function (response) {
    return response && response.data ? response.data : response;;
}, function (error) {
    console.log("🚀 ~ error:", error)

    return error && error.response && error.response.data ? error.response.data : Promise.reject(error);
});

export default instance;
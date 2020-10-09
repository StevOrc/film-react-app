import axios from 'axios';
import config from '../config.json';

const apiEndpoint = "https://api.themoviedb.org/4";

const apiMovie = axios.create({
    baseURL: apiEndpoint
});


apiMovie.interceptors.request.use( req => {
    console.log(`ÌNTERCEPTOR Bearer ${config.Token}`);
    req.headers['Authorization'] = `Bearer ${config.Token}`;
    return req;
});

export default apiMovie;
import axios from 'axios';
import md5 from 'md5';

const today = new Date().toISOString().slice(0, 10).split('-')
    .join('');

const $apiAuth = axios.create({
    baseURL: __API__,
    headers: {
        'X-Auth': md5(`${process.env.PASSWORD}_${today}`),
        'Content-Type': 'application/json',
    },
});

const authInterceptor = (config: any) => config;

$apiAuth.interceptors.request.use(authInterceptor);

export { $apiAuth };

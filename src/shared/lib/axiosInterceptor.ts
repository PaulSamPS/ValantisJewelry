import axios from 'axios';
import md5 from 'md5';

const getDate = () => {
    const year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;
    const date = new Date().getDate();

    if (month < 10) month = Number(`0${month}`);

    return year + month + date;
};

const today = new Date().toISOString().slice(0, 10).split('-').join('');

const $apiAuth = axios.create({
    baseURL: __API__,
    headers: {
        'X-Auth': md5(`Valantis_${today}`),
        'Content-Type': 'application/json',
    },
});

const authInterceptor = (config: any) => config;

$apiAuth.interceptors.request.use(authInterceptor);

export { $apiAuth };

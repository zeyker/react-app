import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://167.172.206.249'
});



export default instance;
import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.rawg.io/api',
    params: {
        key: 'cc85a27dcf1f4ae38afbb4b569ecac05'
    }
})
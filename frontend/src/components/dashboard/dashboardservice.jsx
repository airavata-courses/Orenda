import axios from 'axios';

const USER_API_BASE_URL = '/api/';
// const USER_API_BASE_URL = '0.0.0.0:5000/';

class dashService {

    submitTask(data){
        return axios.post(USER_API_BASE_URL + "task", data);
    }
    sessions(data){
        return axios.post("/sessionService/session", data);
    }

    
}

export default new dashService();
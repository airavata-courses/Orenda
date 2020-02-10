import axios from 'axios';

const USER_API_BASE_URL = 'http://localhost:5000/';

class dashService {

    submitTask(data){
        return axios.post(USER_API_BASE_URL + "task", data);
    }

    
}

export default new dashService();
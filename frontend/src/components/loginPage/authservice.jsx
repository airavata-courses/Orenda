import axios from 'axios';

// const USER_API_BASE_URL = '0.0.0.0:5009/';
const USER_API_BASE_URL = 'http://user-management-service:5009/user/';

class AuthService {

    login(credentials){
        return axios.post(USER_API_BASE_URL + "login", credentials);
    }

    register(userData){
        return axios.post(USER_API_BASE_URL + "register", userData);
    }

    getUserInfo(){
        return JSON.parse(localStorage.getItem("userInfo"));
    }

    getAuthHeader() {
       return {headers: {Authorization: 'Bearer ' + this.getUserInfo().token }};
    }

    logOut() {
        localStorage.removeItem("userInfo");
        return axios.post(USER_API_BASE_URL + 'logout', {}, this.getAuthHeader());
    }
}

export default new AuthService();
import axios from "axios";
import {apiUrl} from "../../config/config";

class AdminAuthService {
    AdminSignin(dataPost) {
        return axios.post(`${apiUrl}/admin/signin`, dataPost)
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("admin", JSON.stringify(response.data));
                }
                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("admin");
    }


    getCurrentAdmin() {
        return JSON.parse(localStorage.getItem('admin'));
    }
}

export default new AdminAuthService();

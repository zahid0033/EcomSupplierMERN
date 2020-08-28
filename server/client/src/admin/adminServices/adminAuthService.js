import axios from "axios";


class AdminAuthService {
    AdminSignin(dataPost) {
        return axios.post(`/api/admin/signin`, dataPost)
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

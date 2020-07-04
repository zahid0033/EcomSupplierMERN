import axios from 'axios';
import {apiUrl} from "../../config/config";

class SupplierAuthService {
    supplierSignup (dataPost) {
        return axios.post(`${apiUrl}/supplier/signup`,dataPost)
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("supplier", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    supplierSignin (dataPost) {
        return axios.post(`${apiUrl}/supplier/signin`,dataPost)
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("supplier", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout(){
        localStorage.removeItem("supplier");
    }

    getCurrentSupplier() {
        return JSON.parse(localStorage.getItem('supplier'));
    }
}

export default new SupplierAuthService();
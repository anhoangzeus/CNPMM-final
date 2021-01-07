import axiosClient from "./axiosClient";

const userApi = {
    loginFacebook: (userData) => {
        const url="users/loginfacebook";
        return axiosClient.post(url,userData);
    },
}
export default userApi;
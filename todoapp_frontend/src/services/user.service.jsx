import request from "../utils/request";

const getUserById = async (userId) => {
    return request.get(`/users/${userId}`);
};

export { getUserById };

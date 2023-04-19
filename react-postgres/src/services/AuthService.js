import axios from "axios"

const login = async (postData) => {
    const res = await axios.post(
                    '/users/login',
                    postData
                );
    console.log('User login response', res)
    return res.data;
}

export default {
    login
};
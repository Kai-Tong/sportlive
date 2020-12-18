/**
 * 登录模块接口demo
 */

import base from "./base"
import axios from "./http.js"

const login = {
    useLogin(params) {
        return axios.get(base.getToken, {
            params: params
        });
    }
}
export default login
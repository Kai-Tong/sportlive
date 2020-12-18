/**
 * 检查用户名是否存在模块接口
 */

import base from "./base"
import axios from "./http.js"

const checkname = {
    checkUser(params) {
        return axios.get(base.checkname, {
            params: params
        });
    }
}
export default checkname
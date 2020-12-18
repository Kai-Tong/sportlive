/**
 * 退出登录模块接口
 */

import base from "./base"
import axios from "./http.js"

const loginout = {
    useLoginout(params) {
        return axios.get(base.loginout, {
            params: params
        });
    }
}
export default loginout
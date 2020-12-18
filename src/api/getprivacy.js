/**
 * 登录模块接口demo
 */

import base from "./base"
import axios from "./http.js"

const getprivacy = {
    useGetprivacy(params) {
        return axios.get(base.getprivacy, {
            params: params
        });
    }
}
export default getprivacy
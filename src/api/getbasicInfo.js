/**
 * 基本资料获取模块接口
 */

import base from "./base"
import axios from "./http.js"

const getbasicInfo = {
    getbasic(params) {
        return axios.get(base.getbasicInfo, {
            params: params
        });
    }
}
export default getbasicInfo
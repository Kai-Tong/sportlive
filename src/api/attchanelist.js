/**
 * 关注频道，获取频道模块接口
 */

import base from "./base"
import axios from "./http.js"

const attchanelist = {
    attchanel(params) {
        return axios.get(base.attchanelist, {
            params: params
        });
    }
}
export default attchanelist
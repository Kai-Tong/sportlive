/**
 * 级联选中模块接口
 */

import base from "./base"
import axios from "./http.js"

const getformatechanel = {
    getChanel(params) {
        return axios.get(base.getformatechanel, {
            params: params
        });
    }
}

export default getformatechanel
/**
 * 反馈列表模块接口
 */

import base from "./base"
import axios from "./http.js"

const suggestList = {
    getSuggestList(params) {
        return axios.get(base.suggestList, {
            params: params
        });
    }
}
export default suggestList
/**
 * 用户关注频道编辑模块接口
 */

import base from "./base"
import axios from "./http.js"

const editchanel = {
    editerchanel(content) {
        return axios.post(base.editchanel,
            content
        );
    }
}

export default editchanel
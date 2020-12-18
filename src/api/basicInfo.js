/**
 * 基本信息模块接口demo
 */

import base from "./base"
import axios from "./http.js"

const basic = {
    basicInfo(content) {
        return axios.put(base.basicInfo,
            content
        );
    }
}

export default basic
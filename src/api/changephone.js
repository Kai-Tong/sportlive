/**
 * 设置-修改手机号模块接口
 */

import base from "./base"
import axios from "./http.js"

const changephone = {
    changemobile(content) {
        return axios.put(base.changephone,
            content
        );
    }
}

export default changephone
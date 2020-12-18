/**
 * 设置-修改邮箱模块接口
 */

import base from "./base"
import axios from "./http.js"

const changemail = {
    email(content) {
        return axios.put(base.changemail,
            content
        );
    }
}

export default changemail
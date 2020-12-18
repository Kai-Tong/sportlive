/**
 * 设置-修改密码模块接口
 */

import base from "./base"
import axios from "./http.js"

const setpassword = {
    setPwd(content) {
        return axios.put(base.setpassword,
            content
        );
    }
}

export default setpassword
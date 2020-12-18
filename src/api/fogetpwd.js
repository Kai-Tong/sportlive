/**
 * 设置-修改密码模块接口
 */

import base from "./base"
import axios from "./http.js"

const fogetpwd = {
    changePwd(content) {
        return axios.put(base.fogetpwd,
            content
        );
    }
}

export default fogetpwd
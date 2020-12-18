/**
 * 设置-修改昵称模块接口demo
 */

import base from "./base"
import axios from "./http.js"

const nickname = {
    changeNickname(content) {
        return axios.put(base.nickname,
            content
        );
    }
}

export default nickname
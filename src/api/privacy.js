/**
 * 隐私设置模块接口demo
 */

import base from "./base"
import axios from "./http.js"

const privacy = {
    usePrivacy(content) {
        return axios.post(base.privacy,
            content
        );
    }
}

export default privacy
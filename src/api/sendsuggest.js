/**
 * 反馈提交模块接口
 */

import base from "./base"
import axios from "./http.js"

const sendsuggest = {
    suggest(content) {
        return axios.post(base.sendsuggest,
            content
        );
    }
}

export default sendsuggest
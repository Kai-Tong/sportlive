
/**
 * 举报模块接口
 */

import base from "./base"
import axios from "./http.js"

const report = {
    reportType(content) {
        return axios.post(base.report,
            content
        );
    },
    uploadreport : base.report
}

export default report
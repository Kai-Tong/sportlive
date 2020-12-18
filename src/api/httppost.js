import base from "./base"
import axios from "./http.js"
const httppost = {
  follow() {
    return base.follow
  },
  star(){
    return base.star
  },
  follow1(){
    return base.follow1
  },
  comment(data){
    return axios.post(base.comment,data)
  }
}

export default httppost

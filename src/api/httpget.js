import base from "./base"
import axios from "./http.js"
const homeindex = {
  gethomeindex() {
    return axios.get(base.homeindex

    );
  },
  getliveindex() {
    return base.liveindex
  },
  getnewsindex(params) {
    return axios.get(base.newsindex,
      {params}
    );
  },
  getlivedel() {
    return base.livedel
  },
  livevideo() {
    return axios.get(base.livevideo);
  },
  newsdel() {
    return base.newsdel
  },
  fourm(params) {
    return axios.get(base.fourm, {
      params
    });
  },
  search(params) {
    return axios.get(base.search, {
      params
    });
  },
  rate(){
    return base.rate
  },
  forumdel(){
    return base.forumdel
  },
  sta(){
    return base.sta
  }
}

export default homeindex

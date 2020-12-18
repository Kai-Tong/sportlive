    //存储 永久缓存
    function Lset(key, value) {
      if (!Array.isArray(value)) {
        let cache = localStorage.getItem(key);
        if (cache) {
          localStorage.removeItem(key);
          localStorage.setItem(key, JSON.stringify(value));
        } else {
          localStorage.setItem(key, JSON.stringify(value));
        }
      } else if (Array.isArray(value)) {
        let cacheflag = localStorage.getItem(key);
        let cache = JSON.stringify(value);
        if (cacheflag) {
          localStorage.removeItem(key);
          localStorage.setItem(key, cache)
        } else {
          localStorage.setItem(key, cache)
        }
      }
    };
    //存储不删除
    function LsetN(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    }
    //删除本地存储
    function Lremove(key) {
      localStorage.removeItem(key);
    }
    //取出 永久缓存
    function Lget(key) {
      let value = localStorage.getItem(key)
      return value
    };
    //删除 永久缓存
    function Ldel(key) {
      localStorage.removeItem(key)
    };
    /**
     * 
     * @param {*} key 
     * @param {*} value 
     */

    //存储 临时缓存
    function Sset(key, value) {
      if (!Array.isArray(value)) {
        let cache = sessionStorage.getItem(key);
        if (cache) {
          sessionStorage.removeItem(key);
          sessionStorage.setItem(key, JSON.stringify(value))
        } else {
          sessionStorage.setItem(key, JSON.stringify(value))
        }
      } else if (Array.isArray(value)) { //存储数组 临时缓存
        let cacheflag = sessionStorage.getItem(key);
        let cache = JSON.stringify(value);
        if (cacheflag) {
          sessionStorage.removeItem(key);
          sessionStorage.setItem(key, cache)
        } else {
          sessionStorage.setItem(key, cache)
        }
      }

    };
    //删除临时缓存
    function Sremove(key) {
      sessionStorage.removeItem(key);
    }
    //取出 临时缓存
    function Sget(key) {
      let value = sessionStorage.getItem(key)
      return value
    };
    //删除 临时缓存
    function Sdel(key) {
      sessionStorage.removeItem(key)
    }
    export {
      Lset,
      Lget,
      Ldel,
      Sset,
      Sget,
      Sdel,
      LsetN,
      Lremove,
      Sremove
    }

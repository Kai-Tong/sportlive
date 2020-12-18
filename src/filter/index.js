//整数留下2位
let money = value => {
    if (!value) return "0.00";
    value = Math.round(parseFloat(value) * 100) / 100;
    let xsd = value.toString().split(".");
    if (xsd.length == 1) {
      value = value.toString() + ".00";
      return value;
    }
    return value
  }
  
  //千位转化
  let Thousands = value => {
    return (value || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
  }
  
  //时间戳转换
  let formDate = value => {
      let date = new Date(value * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      let Y = date.getFullYear() + '-';
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      let D = date.getDate() + ' ';
      let h = date.getHours().length <= 1 ? '0' + date.getHours() + ':' : date.getHours() + ':';
      let m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
      let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
      return Y + M + D + h + m + s;
  }
  export {
    money,
    Thousands,
    formDate
  }
  
  
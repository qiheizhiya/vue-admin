export function stripscript(s) {
  var pattern = new RegExp(
    "[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{ }【】‘；：”“'。，、？]"
  );
  var rs = "";
  for (var i = 0; i < s.length; i++) {
    rs = rs + s.substr(i, 1).replace(pattern, "");
  }
  return rs;
}
export function valEmail(value){
  let reg = /^([a-zA-z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4}$)/;
  return reg.test(value);
}
export function valPwd(value){
  let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}/;
  return reg.test(value);
}
export function valCode(value){
  let reg = /^[a-z0-9]{6}$/;
  return reg.test(value);
}

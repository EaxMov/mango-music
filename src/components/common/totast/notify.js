export function notifyToast(_this,msg,type,offset=0,title='芒仔提示  (ง ˙o˙)ว'){
  return  _this.$notify({
    title: '芒仔提示:'+ title,
    message: msg,
    type: type,
    offset:offset
  });
}
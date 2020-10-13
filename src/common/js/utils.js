//转化时间戳
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};

//歌词处理
export function DealLrc(lrc){  
  var lrcArr = {}
  var lrc = lrc.split('\n')
  var reg = /\[\d*:\d*\.\d*\]/g
  for (let index = 0,length = lrc.length; index < length; index++) {
       var timeArr = lrc[index].match(reg)  //歌词时间匹配数组
       if(!timeArr) continue  //如果匹配为空，跳出这个循环
       var timetemp = timeArr[0]   //歌词事件
       var content = lrc[index].replace(timetemp,'')  //歌词
       var minute = Number(timetemp.match(/\[\d*/i).toString().slice(1)) //截取分钟
        var second = Number(timetemp.match(/:\d*/i).toString().slice(1)) //截取秒
        var ms = Number(timetemp.match(/\.\d*/i).toString().slice(1)) //截取毫秒
        if(ms > 600){second + 1} //如果毫秒大于600，则让秒数+1 ，否则忽略不计
        var time = minute * 60 + second
            if(content.match(reg)){
               var timetemp = content.match(reg)[0]
               var content2 = content.replace(timetemp,'')
               content = content2
               var minute = Number(timetemp.match(/\[\d*/i).toString().slice(1)) //截取分钟
               var second = Number(timetemp.match(/:\d*/i).toString().slice(1)) //截取秒
               var ms = Number(timetemp.match(/\.\d*/i).toString().slice(1)) //截取毫秒
               if(ms > 600){second + 1} //如果毫秒大于600，则让秒数+1 ，否则忽略不计
               var time2 = minute * 60 + second
               lrcArr[time2] = content2  //把时间当key,把歌词当key的内容
            }
          lrcArr[time] = content  //把时间当key,把歌词当key的内容
  }
  return lrcArr
}


//歌曲时间处理
export function reFormatTime(res){
  var time = typeof res
  var miao = '00'
  var sencend = '00'
  var hour = '00'
  if(res && time === 'number' || time === 'string'){
    if(res !== '00:00'){
      miao =  Math.floor(res)
    }
    if(miao>=60){
      sencend = ( Math.floor(( miao / 60))+ '').padStart(2,'0')
      miao = ((miao - (sencend * 60)) + '').padStart(2,'0')
      return sencend + ":" + miao
    }
    else if(miao>=3600){
      sencend = ( Math.floor(( miao / 60))+ '').padStart(2,'0')
      miao = ((miao - (sencend * 60)) + '').padStart(2,'0')
      hour = ( Math.floor(( sencend / 60))+ '').padStart(2,'0')
      sencend = ((sencend - (hour * 60)) + '').padStart(2,'0')
      return hour + ':' + sencend + ":" + miao
    }
    return sencend + ":" + (miao + '').padStart(2,'0')
  }
  else{
    return '00:00'
  }
}

//播放量过滤
export function playCount(count){
  let playcountW =  Math.floor(count / 10000)
  if(playcountW.toString() > 0 && playcountW.toString().length < 5){ 
    return playcountW + '万'
  }
  else if(playcountW.toString().length > 4){
    return Math.floor(playcountW / 10000) + '亿'
  }
  else{
    return count
  }
}


//多个歌手拼接
export function ManySingers(Singers){
  var singers = []
  if(!Singers){
    return ''
  }
  singers = Singers.map(item => {
    return item.name
  }).join(' / ')

  return singers
}

/*
* 将时间戳转化为 “几周前” 的形式
*/

export function getAgoAt (dateTimeStamp) {
  var result = ''
  var minute = 1000 * 60
  var hour = minute * 60
  var day = hour * 24
  var month = day * 30
  var year = month * 12
  var now = new Date().getTime()
  var diffValue = now - dateTimeStamp
  if (diffValue < 0) return
  var yearC= diffValue / year
  var monthC = diffValue / month
  var weekC = diffValue / (7 * day)
  var dayC = diffValue / day
  var hourC = diffValue / hour
  var minC = diffValue / minute
  if(monthC > 12 && yearC >= 1){
    result = "" + parseInt(yearC) + "年前"
  }
  else if (monthC >= 1 && monthC < 12) {
    result = "" + parseInt(monthC) + "月前"
  }
  else if (weekC>=1) {
    result = "" + parseInt(weekC) + "周前"
  }
  else if (dayC >= 1) {
    result = ""+ parseInt(dayC) + "天前"
  }
  else if (hourC >= 1){
    result = "" + parseInt(hourC) + "小时前"
  }
  else if (minC >= 1) {
    result = ""+ parseInt(minC) + "分钟前"
  } else {
    result = "刚刚"
  }
  return result
}
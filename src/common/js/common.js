/*
把获取到的giehub时间格式转化为自己的格式2018-01-22 18:56:00
*/

export function conversionTime (str) {
  let _time = new Date(str)
  let year = _time.getFullYear()
  let month = _time.getMonth() + 1
  let strDate = _time.getDate()
  let hours = _time.getHours()
  let minutes = _time.getMinutes()
  let seconds = _time.getSeconds()

  month = month < 10 ? `0${month}` : month
  strDate = strDate < 10 ? `0${strDate}` : strDate
  return year + '-' + month + '-' + strDate + ' ' + hours + ':' + minutes + ':' + seconds
}

/**
 * 随机色
 */
export function randomColor () {
  return '#' + Math.random().toString(16).substring(2).substr(0, 6)
}

/**
 * 自动添加浏览器前缀
 */
let elementStyle = document.createElement('div').style

let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }

  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }

  return false
})()

export function prefixStyle (style) {
  if (vendor === false) {
    return false
  }

  if (vendor === 'standard') {
    return style
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}

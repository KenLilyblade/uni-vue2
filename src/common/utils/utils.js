export function typeTest(val) {
  return Object.prototype.toString.call(val).slice(7, -1)
}

export function toast(options) {
  if (options !== 'Object') {
    uni.showToast({
      title: options,
      icon: 'none'
    })
  }
}

export function guid() {
  return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4()
}
function S4() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
}
export function humpStr(str) {
  if (!str) return ''
  let hump = str
    .split('_')
    .map((it, index) => {
      if (index === 0) return it
      return it[0].toUpperCase() + it.slice(1)
    })
    .join('')
  return hump
}

export function matchData(list, val, valField, res, listField) {
  if (!list || !val || !valField || !res) return null
  if (!listField) listField = valField
  let data = list.find(it => +it[listField] === +val[valField])
  // console.log(data)
  return data ? data[res] : null
}

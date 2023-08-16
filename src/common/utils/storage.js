const storageName = 'token'
export function setToken(type, token) {
  if (!type) {
    throw Error('参数缺失，应为add或remove')
  }
  switch (type) {
    case 'add':
      uni.setStorage({ key: storageName, data: token })
      break
    case 'remove':
      uni.removeStorage({ key: storageName })
      break
    default:
      break
  }
}
export function getToken() {
  const token = uni.getStorageSync(storageName)
  return token || null
}

export function getStorage(storageName) {
  const storage = uni.getStorageSync(storageName)
  return storage || null
}

export function setStorage(type, storageName, token) {
  if (!type) {
    throw Error('参数缺失，应为add或remove')
  }
  switch (type) {
    case 'add':
      uni.setStorage({ key: storageName, data: token })
      break
    case 'remove':
      uni.removeStorage({ key: storageName })
      break
    default:
      break
  }
}

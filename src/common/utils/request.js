import { setToken, getStorage } from '@/common/utils/storage'
import { router } from '@/router'
const request_url = process.env.VUE_APP_WEB_URL
function request(option = {}) {
  return new Promise((resolve, rejected) => {
    const token = getStorage('token')
    option.header = option.header || {}
    if (token) option.header['x-auth-token'] = token
    uni.request({
      url: `${request_url}${option.url}`,
      method: option.method || 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        ...option.header
      },
      data: option.data,
      timeout: 30000,
      success(res) {
        const { data } = res
        // console.log(data);
        if (data.code !== 1)
          uni.showToast({
            title: data['msg'],
            icon: 'error'
          })
        if (+data.code === 2 || !data.code) {
          setToken('remove')
          router.replaceAll({ name: 'login' })
          // uni.reLaunch({
          //   url: '/pages/login/login'
          // })
        }

        // 返回数据
        resolve(data)
      },
      fail(err) {
        uni.showToast({
          title: err
        })
        rejected(err)
      }
    })
  })
}
export default request

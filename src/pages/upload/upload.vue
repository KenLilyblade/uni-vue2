<template>
  <view>
    <button @tap="upload">点击</button>
  </view>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    upload() {
      let _that = this
      wx.chooseMessageFile({
        count: 1, //最多可以选择的文件个数，可以 0～100
        type: 'file', //所选的文件的类型，具体看官方文档
        success(res) {
          console.log('res: ', res)
          // tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFiles[0].path
          let filename = res.tempFiles[0].name //用于页面显示的名字
          wx.uploadFile({
            url: 'https://iot.huiyuntc.net' + '/resource/uploadDocument', //上传的路径
            filePath: tempFilePaths, //刚刚在data保存的文件路径
            name: 'file', //后台获取的凭据
            formData: {
              file: res.tempFiles[0],
              company_id: '',
              app_id: '',
              app_key: '',
              ver: '',
              timestamp: '',
              sign: ''
              //如果是需要带参数，请在formData里面添加，不需要就去掉这个就可以的
            },
            async success(res) {
              console.log(res)
            }
          })
        }
      })
    }
  }
}
</script>

<style>
</style>
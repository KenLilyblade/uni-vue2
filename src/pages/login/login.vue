<template>
  <view class="login">
    <view class="header flex-center">
      <image class="" src="../../static/login/logo.png" mode="widthFix" lazy-load="false"> </image>
    </view>
    <view class="login-box">
      <input class="" v-model="phone" type="text" placeholder="账号" />
      <view class="login-captch flex-h-center">
        <input class="" v-model="verCode" type="text" placeholder="密码" />
        <text>发送验证码</text>
      </view>
      <button @tap="login">手机登录</button>
      <view class="login-wx">切换微信绑定手机号登录</view>
    </view>
  </view>
</template>

<script>
import { setToken, getToken, setStorage } from '@/common/utils/storage.js'
import api from '@/common/api/api.js'
import request from '@/common/utils/request.js'

export default {
  data() {
    return {
      phone: '',
      verCode: '',
      captcha: '',
      captchaUrl: ''
    }
  },
  onLoad() {
    this.captchaUrlId = this.$tool.guid()
  },
  methods: {
    login() {
      uni.request({
        url: 'http://192.168.2.233:8080/login',
        method: 'post',
        data: {
          phone: this.phone,
          verCode: this.verCode
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
        },
        success: res => {
          console.log(res)
          if (res.data.code === 200) {
            this.$tool.toast('登录成功')
            this.toHome()
          } else {
            this.$tool.toast('账号或密码错误')
          }
        },
        fail: err => {}
      })
    },
    toHome() {
      uni.navigateTo({
        url: '/pages/404/404'
      })
    },
    handleLogin() {
      if (!Object.values(this.model).every(it => it)) {
        this.$tool.toast('请填写用户名或密码')
        return
      }
      request({
        url: api.common.login,
        data: {
          ...this.model,
          uuid: this.captchaUrlId
        }
      }).then(res => {
        if (res.code === 1) {
          this.$tool.toast('登录成功')
          // 设置token
          setStorage('add', 'token', res.token)
          setStorage('add', 'userInfo', res.model)
          // this.getCaptchaUrl()
          this.findSysMenu()
          uni.reLaunch({
            url: '/pages/index/index'
          })
        } else {
          this.$tool.toast(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  background-position: center bottom;
  background-size: 100% 100%;
  background-image: url('../../static/login/bg.png');
  .header {
    height: 50vh;
    image {
      width: 300rpx;
      height: 400rpx;
    }
  }
  .login-box {
    padding: 0 60rpx;
    & > input {
      padding: 10rpx;
      margin-top: 20rpx;
      border-bottom: 1px solid #eee;
    }
    .login-captch {
      padding: 10rpx;
      margin-top: 50rpx;
      border-bottom: 1px solid #eee;
      input {
        flex: 1;
      }
      text {
        color: #1a7caf;
        font-size: 28rpx;
      }
    }
    .login-wx {
      text-align: center;
      color: #1a7caf;
      font-size: 28rpx;
      margin-top: 50rpx;
    }
    button {
      margin-top: 90rpx;
      background-color: #177df9;
      border-radius: 40px;
      color: #fff;
    }
  }
}
</style>

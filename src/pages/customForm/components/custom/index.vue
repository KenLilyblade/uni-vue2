<template>
  <view>
    <ActiveForm ref="activeForm" v-model="formData"></ActiveForm>
    <u-button @tap="submit">提交</u-button>
  </view>
</template>

<script>
import request from '@/common/utils/request'
import ActiveForm from '@/components/active-form/active-form'
import dataSourceManage from '../../dataSourceManage'
export default {
  components: {
    ActiveForm
  },
  props: {
    formId: {
      type: [String, Number],
      default: 12
    },
    orderId: {
      type: [String, Number],
      default: 936
    }
  },
  data() {
    return {
      formData: []
    }
  },
  created() {
    this.initData()
  },
  methods: {
    async validate(){
      try {
        this.$refs.activeForm.$vervify(this.formData) //表单校验 成功会继续往下走 失败抛出异常
      } catch (error) {
        throw new Error(error)
      }
    },
     // 提交表单
    async submit() {
      if(!this.orderId)return
      for (const it of this.formData) {
        let url = it.valueId?api.opm.updateUserDefineFormValue:api.opm.insertUserDefineFormValue
        const data={keyId:it['rules']['name'],keyValue:it['rules']['value'],orderId:this.orderId}
        if(it.valueId)data['id']=it['valueId']
        await request({url,data:data})
      }
      // const res = this.$refs.activeForm.$submitForm(this.formData) //校验成功 获取表单值
      // console.log('res: ', res);
    },
    async initData() {
      if (!this.formId) return
      const formData = await this.conversionData()
      if(!this.orderId)return this.formData = formData 
      const newFromData= await this.matchData(formData)
      this.formData = newFromData 
    },
    //匹配数据
    async matchData(formData){
      let formDataValue = await this.findUserDefineFormValue()
      if(!formDataValue.length)return formData
      for (const it of formData) {
          const idx = formDataValue.find(value=>value.keyId===it.id) 
          if(idx){
            it['rules']['value'] = it.type==='select'? +idx['keyValue']:idx['keyValue']
            it['valueId'] = idx['id']
            if(it.type==='select'){
              it['rules']['label'] = it['list'].find(option=>+option.value===+idx.keyValue)?.name
            }
          }  
      }
      return formData
    },
    //转换数据
    async conversionData(){
      const defineForm = await this.getUserDefineForm()
      let widgetList = defineForm.widgetList
      let formData = []
      for (const it of widgetList) {
        // 键名替换
        let item = {
          ...it,
          label: it.options.label,
          type: it.type === 'input' ? 'text' : it.type,
          placeholder: it.options.label,
          rules: {
            name: it.options.name,
            value: '',
            label: '',
            verify: it.options.required,
            errMess: `${it.options.label}不能为空`
          }
        }
        //下拉框取数据
        if (it.type === 'select') {
          const apiInfo = dataSourceManage.find(type => type.dataSourceType === it.options.dataSourceType)
          if (apiInfo) {
            const selectList = await this.fetchData(apiInfo.api, apiInfo.query)
            item['list'] = selectList.map(option => ({ ...option, name: option[apiInfo['label']], value: option[apiInfo['value']] }))
            item['title'] = `请选择${it.options.label}`
            item['show'] = false
          }
        }
        formData.push(item)
      }
      return formData
    },
    async getUserDefineForm() {
      const { model, code } = await request({ url: '/admin/getUserDefineForm', data: { id: 12 } })
      if (code === 1 && model) return JSON.parse(model.userData)
    },
    async fetchData(url, query) {
      const { data, code } = await request({ url, data: { ...query } })
      if (code === 1) return data
    },
    async findUserDefineFormValue() {
      const { data, code } = await request({ url: '/admin/findUserDefineFormValue', data: { orderId: 936 } })
      if (code === 1) return data
    }
  }
}
</script>

<style>
</style>